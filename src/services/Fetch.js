import axios from "axios";
import Response from "../utils/Response";

class Fetch {
    baseUrl = 'https://localhost:8080';
    route;
    token;

    constructor(route) {
        this.route = route;
    }

    auth(token) {
        this.token = token;
        return this;
    }

    async get(id, query = {}) {
        if (id) {
            return this.getById(id);
        } else {
            return this.getByQuery(query);
        }
    }

    // TODO: add body type
    async post(body) {
        try {
            const response = await axios.post(`${this.baseUrl}${this.route}`, body, this.getAuthToken());
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    getAuthToken() {
        if (this.token) {
            return {
                headers: {
                    'Authorization': `Basic ${this.token}` 
                }
            }
        }
        return {}
    }

    async getById(id) {
        try {
            const response = await axios.get(`${this.baseUrl}${this.route}/${id}`, this.getAuthToken());
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    // TODO: query type
    async getByQuery(query) {
        try {
            // TODO: add query string to url
            const response = await axios.get(`${this.baseUrl}${this.route}`, this.getAuthToken());
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async handleResponse(response) {
        const data = new Response(response.data);
        return data;
    }

    async handleError(error) {
        const errorResponseData = error.response?.data;
        const data = new Response(errorResponseData);
        return data;
    }
}

export default Fetch;

// class Fetch<T> {
//     private readonly baseUrl = 'https://localhost:8080';
//     private route: string;
//     private token?: string;

//     constructor(route: string) {
//         this.route = route;
//     }

//     public auth(token: string): Fetch<T> {
//         this.token = token;
//         return this;
//     }

//     public async get(query?: object): Promise<Response<T[]>>
//     public async get(id: number): Promise<Response<T>>
//     public async get(id?: any, query?: object): Promise<Response<T | T[]>> {
//         if (id) {
//             return this.getById(id);
//         } else {
//             return this.getByQuery(query);
//         }
//     }

//     // TODO: add body type
//     public async post(body: object): Promise<Response<T>> {
//         try {
//             const response = await axios.post(`${this.baseUrl}${this.route}`, body, this.getAuthToken());
//             return this.handleResponse(response);
//         } catch (e) {
//             const error = e as AxiosError;
//             return this.handleError(error);
//         }
//     }

//     private getAuthToken(): object {
//         if (this.token) {
//             return {
//                 headers: {
//                     'Authorization': `Basic ${this.token}` 
//                 }
//             }
//         }
//         return {}
//     }

//     private async getById(id: number): Promise<Response<T>> {
//         try {
//             const response = await axios.get(`${this.baseUrl}${this.route}/${id}`, this.getAuthToken());
//             return this.handleResponse(response);
//         } catch (e) {
//             const error = e as AxiosError;
//             return this.handleError(error);
//         }
//     }

//     // TODO: query type
//     private async getByQuery(query?: object): Promise<Response<T>> {
//         try {
//             // TODO: add query string to url
//             const response = await axios.get(`${this.baseUrl}${this.route}`, this.getAuthToken());
//             return this.handleResponse(response);
//         } catch (e) {
//             const error = e as AxiosError;
//             return this.handleError(error);
//         }
//     }

//     private async handleResponse(response: AxiosResponse): Promise<Response<T>> {
//         const data = new Response<T>(response.data);
//         return data;
//     }

//     private async handleError(error: AxiosError): Promise<Response<T>> {
//         const errorResponseData = error.response?.data as Error;
//         const data = new Response<T>(errorResponseData);
//         return data;
//     }
// }

// export default Fetch;