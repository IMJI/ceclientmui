import axios from "axios";
import TokenService from "./TokenService";
import Service from "./Service";

export default class ProductService extends Service {
    static async getAll() {
        const token = TokenService.get();
        const response = await axios.get(`${this.apiUrl}/products`, {
            headers: {
                'Authorization': `Basic ${token}` 
            },
            params: {
                sort: `name:asc`
            }
        });
        return response.data;
    }
}