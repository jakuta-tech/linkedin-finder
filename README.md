![Node](https://img.shields.io/badge/node-%3E%3D%20v16.10.0-green) ![License AGPL](https://img.shields.io/badge/license-AGPL-lightgrey) ![Commercial License](https://img.shields.io/badge/license-commercial-lightgrey)

![Visum background](https://images-ressources.s3.eu-west-3.amazonaws.com/BG_VISUM_TRANSP2x.png)

# **Visum LinkedIn Finder : From Email to LinkedIn Profile 📧 ➡ 👔**

# 📚 Summary

This package allows to find from an email address, an associated LinkedIn profile and to retrieve all the information displayed on its LinkedIn profile instantly. 

+ Retrieves information using the **[Outlook HACK.](https://blog.visum.run/find-any-linkedin-profile-from-an-email-outlook-hack/)**
+ Could be coupled with the **outlook-token-auto-renew module** (soon)
+ Runs on **[NodeJS.](https://nodejs.org/en/)**

# 🧰 Prerequisites

* Have one or more Outlook accounts
* Have one or more LinkedIn accounts (**[add us here](https://www.linkedin.com/company/visum-run) 🦉**)
* Follow **[these steps](https://blog.visum.run/find-any-linkedin-profile-from-an-email-outlook-hack/)** to synchronize accounts with each other

# 👇 How it works ?

Microsoft owning Outlook, acquired LinkedIn in 2016 and gives its users the ability to directly access their contacts' LinkedIn information from within Outlook :

![Outlook screenshot](https://blog.visum.run/content/images/size/w2400/2021/06/Screenshot-2021-06-01-at-15.34.39.png)

Once one's Outlook account and LinkedIn are synced, you can use a token that **expires after 24 hours** to retrieve LinkedIn information from an email.

This package allows to retrieve **automatically this token** thanks to the **cookie of the Outlook account** and then to be able to find as many LinkedIn accounts associated to an email address. 

We will use the **__Host-MSAAUTH** cookie and it does not expire.

⚠️ <em>Warning</em> : Don't **overuse** this hack. It's using your **personnal API token** binding your Outlook and LinkedIn account. If you're spamming their API servers, your LinkedIn or Outlook account may be **restricted**. So I recommend about a **hundred uses** per day maximum and per account. Do it with a fake LinkedIn account.

ℹ️ You can manage **dozens of LinkedIn and Outlook accounts** and generate **tokens automatically** for volume with the **outlook-token-auto-renew module** (soon)

ℹ️ You should have more matchs with **personnal email** than **profesionnal email** since people are registering on LinkedIn with their personnal email.

# 🛠️ Installation

```bash
npm install @visum-run/linkedin-finder
```
# 🚀 Quick Start

### 🍪 Get your cookie

Open your **Network Monitor** and log into your Outlook account.

Once the page is loaded, do a **Crtl+f** or **Cmd+f** and type **MSAAUTH** in the search bar.

You will find the cookie in the **Response Headers** of the **login.srf** request (in blue on the right) :

![Outlook Cookie](https://images-ressources.s3.eu-west-3.amazonaws.com/msaauth_cookie.png)

Copy this value. You will need it to give it as a parameter to the function.

### 📝 Javascript Example

```js
const finder = require('@visum-run/linkedin-finder')
const email = "example@gmail.com";
const cookie = "-CSUciV70WBGCI6CxrgdI3uRjcUC52NJ9kTAsI*!kGmivc7LLT1K1EWcHhMAy6d3bYvE06GMMJ8nOP1RJ7OR0DaRJJNh706qK24*LCt9Vi09hk7kK0Jxsmbgi2vFvt06FT2AQG0fklmJBWyhg5tmEaLb8Ln40ehOdC!VaMVtRWluoDnx6h*N5CCeZv5g8uGNaDlPrK!tZQY4VQ7OElCrekMgHRTiGHtYBjTNM9l2ImYa3rRxw2cl9yYIjiXwEXriQ7Q$$";

const [linkedin, linkedinError] = await finder(mail, cookie)

if (linkedinError) throw Error("An error occured")

console.log(linkedin)
```
### 🤩 JSON Output

The output will be a JSON with the below format. Here's the exact output for my email `iliesgraffion@gmail.com` :

```json
{
    "resultTemplate": "ExactMatch",
    "bound": true,
    "persons": [
        {
            "id": "urn:li:person:DgFCGRHxENv_VYOIJUAP0ixeer-eGf037HN4DJRMA3Q",
            "displayName": "Iliès Graffion",
            "headline": "CEO Visum 🦉 & Co-founder Repos Digital ⛅",
            "companyName": "Repos Digital",
            "location": "Greater Paris Metropolitan Region",
            "photoUrl": "https://media.licdn.com/dms/image/C4D03AQHY9JVjFeZruw/profile-displayphoto-shrink_400_400/0?e=1614211200&v=beta&t=s_253lBxoNoZVWKa3Zj85tNkZWGExJnVHyIX-3eIxtA",
            "linkedInUrl": "https://www.linkedin.com/in/iliesgraffion-visum-find-stacks-of-anyone/",
            "reportProfileUrl": "https://www.linkedin.com/in/iliesgraffion/report",
            "connectionCount": 500,
            "isConnectionCountObfuscated": true,
            "connectionDegree": "Self",
            "connectionStatus": "NotConnected",
            "skills": [],
            "locale": {
                "country": "us",
                "language": "en"
            },
            "schools": {
                "educationsCount": 4,
                "educationHistory": [
                    {
                        "school": {
                            "schoolName": "ESILV - Ecole Supérieure d'Ingénieurs Léonard de Vinci",
                            "schoolLocation": "Courbevoie, Ile-de-France, France",
                            "schoolLogo": "https://media.licdn.com/dms/image/C560BAQG69M6NumF8QQ/company-logo_400_400/0/esilvparis_logo?e=1614211200&v=beta&t=o2cInG66AOaHPWSnpyey9ufiVA4JPbttr0dp_1Du650",
                            "linkedInUrl": "https://www.linkedin.com/edu/school?id=42867"
                        },
                        "degreeName": "Engineering degree",
                        "startEndDate": {
                            "start": {
                                "year": 2017
                            },
                            "end": {
                                "year": 2020
                            }
                        },
                        "fieldOfStudy": "Computers, Big Data and Connected Objects",
                        "schoolName": "ESILV - Ecole Supérieure d'Ingénieurs Léonard de Vinci",
                        "schoolLocation": "Courbevoie, Ile-de-France, France",
                        "schoolLogo": "https://media.licdn.com/dms/image/C560BAQG69M6NumF8QQ/company-logo_400_400/0/esilvparis_logo?e=1614211200&v=beta&t=o2cInG66AOaHPWSnpyey9ufiVA4JPbttr0dp_1Du650",
                        "linkedInUrl": "https://www.linkedin.com/edu/school?id=42867"
                    }
                ]
            },
            "positions": {
                "positionsCount": 8,
                "positionHistory": [
                    {
                        "title": "Co-founder & CTO",
                        "startEndDate": {
                            "start": {
                                "month": 7,
                                "year": 2020
                            },
                            "end": {}
                        },
                        "description": "Repos Digital vous accompagne dans la suppression des données et la résiliation des contrats d'un défunt.",
                        "company": {
                            "companyName": "Repos Digital",
                            "companyLocation": "Paris, Ile-de-France, France",
                            "companyLogo": "https://media.licdn.com/dms/image/C4E0BAQFN0VMFEpvj1Q/company-logo_400_400/0?e=1614211200&v=beta&t=nL3munCdk7wI8urxGkcWBPq0e6Xu-Z-YnF5v2APUrzo",
                            "linkedInUrl": "https://www.linkedin.com/company/65841732/"
                        },
                        "companyName": "Repos Digital",
                        "companyLocation": "Paris, Ile-de-France, France",
                        "companyLogo": "https://media.licdn.com/dms/image/C4E0BAQFN0VMFEpvj1Q/company-logo_400_400/0?e=1614211200&v=beta&t=nL3munCdk7wI8urxGkcWBPq0e6Xu-Z-YnF5v2APUrzo",
                        "linkedInUrl": "https://www.linkedin.com/company/65841732/"
                    }
                ]
            },
            "skillEndorsements": {
                "skillEndorsementsCount": 3,
                "skillEndorsements": [
                    {
                        "skillName": "AngularJS",
                        "endorsementCount": 11,
                        "endorsers": []
                    },
                    {
                        "skillName": "Java",
                        "endorsementCount": 11,
                        "endorsers": []
                    },
                    {
                        "skillName": "PHP",
                        "endorsementCount": 10,
                        "endorsers": []
                    }
                ]
            },
            "newsMentions": {
                "newsMentionCount": 0,
                "newsMentions": []
            },
            "userGeneratedContents": {
                "userGeneratedContentCount": 2,
                "userGeneratedContents": [
                    {
                        "description": "",
                        "url": "https://www.linkedin.com/feed/update/urn:li:share:6738049258005520384",
                        "createdOn": {
                            "month": 11,
                            "year": 2020,
                            "day": 27
                        },
                        "thumbnails": [],
                        "mediaCategory": "NONE"
                    },
                    {
                        "description": "",
                        "url": "https://www.linkedin.com/feed/update/urn:li:share:6737727212352491520",
                        "createdOn": {
                            "month": 11,
                            "year": 2020,
                            "day": 26
                        },
                        "thumbnails": [],
                        "mediaCategory": "NONE"
                    }
                ]
            }
        }
    ],
    ...
}
```

## Errors

Here is a list of errors that the package can generate and that are handled :

| Name                | Description                                 
| ------------------- | -------------------------------------- 
| EMAIL_MUST_BE_STRING             | Email parameter is not a String                            
| COOKIE_MUST_BE_STRING               | Cookie parameter is not a String                              
| INVALID_EMAIL_FORMAT             | Email regex didn't validate the parameter given                               
| UNKNOWN_TOKEN_REQUEST_ERROR               | A problem during the request to get the bearer token                         
| OUTLOOK_COOKIE_NOT_WORKING             | The cookie given was rejected by Outlook                               
| ACCESS_TOKEN_NOT_FOUND               | The bearer token needed for getting linkedin profile was not found in the headers  
| INVALID_TOKEN_FORMAT               | The bearer token given doesn't have the requiered format     
| EXPIRED_TOKEN               | The bearer token given is expired     
| UNKNOWN_LINKEDIN_REQUEST_ERROR               | LinkedIn server returned an unexpected response                          

## ⚖️ License

`visum-run/linkedin-finder`'s source code is provided under a **dual license model**.

### Commercial license

If you want to use `visum-run/linkedin-finder` to develop commercial sites, tools, and applications, the Commercial License is the appropriate license. With this option, your source code is kept proprietary. Purchase an `visum-run/linkedin-finder` Commercial License at https://visum.run/pricing.

### Open source license

If you are creating an open source application under a license compatible with the GNU Affero GPL license v3, you may use `visum-run/linkedin-finder` under the terms of the [AGPL-3.0](./LICENSE.AGPL).

