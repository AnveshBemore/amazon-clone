import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:5001/clone-668a7/us-central1/api'//the api (cloud func) URL
});
export default instance;