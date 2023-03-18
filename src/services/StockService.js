import axios from "axios";
import TokenService from "./TokenService";
import Service from "./Service";

export default class StockService extends Service {
    static async getAll() {
        const token = TokenService.get();
        const response = await axios.get(`${this.apiUrl}/stock`, {
            headers: {
                'Authorization': `Basic ${token}` 
            }
        });
        return response.data;
    }
}