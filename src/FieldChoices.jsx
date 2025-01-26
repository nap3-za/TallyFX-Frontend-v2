
export const GENDERS = {
	MLE: "Male",
	FML: "Female",
	NBN: "Non-binary",
}

export const RISK_APPETITES_RAW = {
	HIG: "High",
	MED: "Medium",
	LOW: "Low",
}

export const ORDER_TYPES_RAW = {
	BUY: "Buy",
	SEL: "Sell",
}

function getOptions(field_choices_raw) {
	// loop through above field choices and retrieve options
	return <>
		<option value="PLH">Lorem</option>
		<option value="IPS">Ipsum</option>
		<option value="DOL">Dolor</option>
	</>
}

export const RISK_APPETITES = getOptions(RISK_APPETITES_RAW);
export const ORDER_TYPES = getOptions(ORDER_TYPES_RAW);