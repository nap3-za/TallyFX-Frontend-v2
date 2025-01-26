import axios from "axios";

import {
	LOADING_ON,
	LOADING_OFF,
} from "../app/types";

import {
	RAISE_ERRORS,
} from "../messages/types";

import {
	EP_TRADE_VIEWSET,
} from "../../../AppEndpoints";

import { tokenConfigurator } from "../../../Utilities";

import { raiseErrors, createMessage } from "../messages/actions";


export const createTrade = (createTradeData) => (dispatch, getState) => {
	axios.post(EP_TRADE_VIEWSET, createTradeData, tokenConfigurator(getState))
		.then(response => {
			dispatch(createMessage("Trade logged"));
			console.log(response);
			dispatch({type: LOADING_OFF});
		}).catch(error => {
			dispatch({type: LOADING_OFF});
			if (error.response) {
				dispatch(raiseErrors(error.response.data, error.response.status));
			}
		})
}