import {getDHIS2Client} from "../utils/dhis2Client";

export function useDHIS2Client() {
		const dhis2URL = import.meta.env.VITE_REACT_APP_MEDIATOR_URL ?? "http://localhost:5001";
		return getDHIS2Client(dhis2URL);
}
