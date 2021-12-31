const { validate } = require("email-validator");
const axios = require('axios')
const { URL } = require('url');
const handle = (promise) => {
	return promise
		.then(data => ([data, undefined]))
		.catch(error => Promise.resolve([undefined, error]));
}

async function getLinkedIn(email, cookie) {
	try {
		if (typeof email !== "string") throw new Error("EMAIL_MUST_BE_STRING");
		if (typeof cookie !== "string") throw new Error("COOKIE_MUST_BE_STRING");
		if (!validate(email)) throw new Error("INVALID_EMAIL_FORMAT");

		const [token, tokenError] = await getBearerToken(cookie);
		if (tokenError) throw tokenError;

		const [linkedin, linkedinError] = await getInfo(email, token);
		if (linkedinError) throw linkedinError;

		return [linkedin, undefined];
	}
	catch (error) {
		console.log(error)
		return [undefined, error];
	}
};

async function getBearerToken(cookie) {
	try {
		const baseURL = 'https://login.live.com/oauth20_authorize.srf?response_type=token&prompt=none&redirect_uri=https%3A%2F%2Foutlook.live.com%2Fowa%2Fauth%2Fdt.aspx&scope=liveprofilecard.access&client_id=292841';
		const headers = {
			'Upgrade-Insecure-Requests': '1',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'Sec-GPC': '1',
			'Cookie': '__Host-MSAAUTH=' + cookie + ';'
		};

		const [response, responseError] = await handle(axios.get(baseURL, { headers }));
		if (responseError) throw responseError;

		const http_status = response.status;
		let response_url = response?.request?.res?.responseUrl;

		if (http_status !== 200 || typeof response_url !== "string") throw new Error("UNKNOWN_TOKEN_REQUEST_ERROR");

		response_url = response_url.replace('#', '?');
		const current_url = new URL(response_url);
		const search_params = current_url.searchParams;

		if (search_params.has('error') && search_params.get('error') === 'login_required') throw new Error("OUTLOOK_COOKIE_NOT_WORKING");
		if (!search_params.has('access_token')) throw new Error("ACCESS_TOKEN_NOT_FOUND");

		return ([search_params.get('access_token'), undefined]);
	}
	catch (responseError) {
		return [undefined, responseError];
	}
}

async function getInfo(email, token) {
	try {
		const baseURL = 'https://sfeur.loki.delve.office.com/api/v1/linkedin/profiles/full?Smtp=' + email + '&ConvertGetPost=true';
		const headers = { 'Content-Type': 'application/json' };
		const body = '{"Accept":"text/plain, application/json, text/json","X-ClientType":"OwaPeopleHub","X-ClientFeature":"LivePersonaCard","X-LPCVersion":"1.20201214.3.1","authorization":"Bearer ' + token + '","X-HostAppCapabilities":"{}"}';

		const [response, responseError] = await handle(axios.post(baseURL, body, { headers }));
		if (responseError) throw responseError;

		if (response.data.persons.length > 0) return [response.data.persons[0], undefined];
		else return [false, undefined];
	}
	catch (responseError) {
		if (responseError.response.data.Error.Code == "RpsTokenInvalidFormat") return [undefined, "INVALID_TOKEN_FORMAT"];
		else if (responseError.response.data.Error.Code == "RpsTokenExpired") return [undefined, "EXPIRED_TOKEN"];
		else return [undefined, "UNKNOWN_LINKEDIN_REQUEST_ERROR"];
	}
}

module.exports = async (email, cookie) => {
	return await getLinkedIn(email, cookie)
};
