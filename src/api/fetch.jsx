import axios from "axios";
import { BASE_URL, API_KEY } from "../utils/requre";

axios.get(BASE_URL).then((res) => console.log(res));
