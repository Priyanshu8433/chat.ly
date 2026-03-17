import axios from "axios";

axios.defaults.headers.common["Authorization"] = "Bearer YOUR_TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = "https://chatly-server-lg2n.onrender.com/";
