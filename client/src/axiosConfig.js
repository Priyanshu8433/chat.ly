import axios from "axios";

axios.defaults.headers.common["Authorization"] = "Bearer YOUR_TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = "http://127.0.0.1:3000/";
