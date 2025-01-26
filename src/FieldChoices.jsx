
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

function getOptions(field_name, field_choices_raw) {
	// loop through above field choices and retrieve options
	return [<>
		<option value="LOW">{field_name}</option>
		<option value="LOW">Low</option>
		<option value="BUY">Buy</option>
		<option value="LOW">Dolor</option>
	</>]
}

export const RISK_APPETITES = getOptions("Risk appetite", RISK_APPETITES_RAW);
export const ORDER_TYPES = getOptions("Order type", ORDER_TYPES_RAW);