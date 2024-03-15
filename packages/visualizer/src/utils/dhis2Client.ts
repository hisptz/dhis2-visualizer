import axios, {Axios} from "axios";

export function getDHIS2Client(url: string): Axios {
		return axios.create({
				baseURL: `${url}/api`,
		});
}
