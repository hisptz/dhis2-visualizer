import {getDHIS2Client} from "../utils/dhis2Client";

export function useDHIS2Client() {
		const dhis2URL = import.meta.env.VITE_REACT_APP_MEDIATOR_URL;
		return getDHIS2Client(dhis2URL);
}
