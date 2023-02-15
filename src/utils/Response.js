import { AxiosError } from "axios";

class Response {
    data;
    error;
    successful;

    constructor(response) {
        console.log(response);
        if (response && response.name === 'AuthException') {
            this.error = response;
            this.successful = false;
        } else {
            this.data = response;
            this.successful = true;
        }
    }
}

export default Response;