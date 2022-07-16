import axios from "axios";

export const API_URL = "http://localhost:8080/api/";
class _BackendService {
    getAllItems() {
        return axios.get(API_URL + "item/all")
    }
    postItem(item) {
        return axios.post(API_URL + "item", item)
    }
}

export const BackendService = new _BackendService()