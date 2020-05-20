import restConfig from "../config.json";

export default class BaseRestService {
    static fetch(url, config) {
        return new Promise((resolve, reject) => {

            if (typeof config === "undefined") {
                config = {
                    headers: {
                        'api-key': restConfig.apiKey
                    }
                }
            } else if (typeof config.headers === "undefined") {
                config.headers = {
                    'api-key': restConfig.apiKey

                }
            } else {
                config.headers["api-key"] = restConfig.apiKey
            }

            fetch(url, config).then(response => {
                if (this.wasSuccess(response)) {
                    resolve(response)
                }

            }).catch(() => {
                window.alert("Could not connect to " + url)
            })
        })
    }

    static wasSuccess(response) {
        if (response.status !== 200) {
            switch (response.status) {
                case 403:
                    window.alert("Request returned 'access denied'. Is the API key correct?")
                    return false;
                default:
                    window.alert("Unknown error returned: " + response.status + ".");

            }

        }
        return true;

    }

}