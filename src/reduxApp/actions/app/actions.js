import axios from "axios";

import {
	LOADING_ON,
	LOADING_OFF,
} from "../app/types";
import { RESET_REDIRECT } from "./types";

import {
	RAISE_ERRORS,
} from "../messages/types";

import {
	EP_FIELD_CHOICES,
} from "../../../AppEndpoints";

import { tokenConfigurator } from "../../../Utilities";

import { raiseErrors, createMessage } from "../messages/actions";



export const resetRedirect = () => (dispatch, getState) => {
	const redirect =  getState().app.redirect;
	dispatch({ type: RESET_REDIRECT })
	return redirect;
}


export const getFieldChoices = (populateFieldChoices, formID) => (dispatch, getState) => {
	const FIELD_CHOICES_EP = EP_FIELD_CHOICES + formID + "/";

	axios.get(FIELD_CHOICES_EP, tokenConfigurator(getState))
		.then(response => {
			console.log(response);
			populateFieldChoices(response.data);
		}).catch(error => {
			if (error.response) {
				dispatch(raiseErrors(error.response.data, error.response.status));
			}
			populateFieldChoices(null);
		})
}