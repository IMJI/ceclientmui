import axios from "axios";
import TokenService from "./TokenService";
import Service from "./Service";

export default class RangeService extends Service {
    static async get(column) {
        const token = TokenService.get();
        const response = await axios.get(`${this.apiUrl}/ranges/${column}`, {
            headers: {
                'Authorization': `Basic ${token}` 
            }
        });
        return response.data;
    }
}