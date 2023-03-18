import Fetch from "./Fetch";
import axios from "axios";
import TokenService from "./TokenService";
import Service from "./Service";
import qs from 'qs';

function queryParamsSerializer(params) {
    return qs.stringify(params, {arrayFormat: 'repeat'});
}

export default class OutgoingService extends Service {
    static async get(id) {
        const token = TokenService.get();
        const response = await axios.get(`${this.apiUrl}/outgoings/${id}`, {
            headers: {
                'Authorization': `Basic ${token}` 
            }
        });
        return response.data;
    }

    static async getAll(limit = 25, page = 1, order = 'asc', orderBy='date', filter={}) {
        const token = TokenService.get();
        const response = await axios.get(`${this.apiUrl}/outgoings`, {
            headers: {
                'Authorization': `Basic ${token}` 
            },
            params: {
                limit,
                skip: page * limit,
                sort: `${orderBy}:${order}`,
                products: filter.products ? filter.products : [],
                taxes: filter.taxes ? filter.taxes : [],
                costFrom: filter.costFrom,
                costTo: filter.costTo,
                quantityFrom: filter.quantityFrom,
                quantityTo: filter.quantityTo
            },
            paramsSerializer: {
                serialize: queryParamsSerializer
            }
        });
        return response.data;
    }
}