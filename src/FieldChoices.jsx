
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
	let options = []
	options.push(<option value="">{field_name}</option>)

	for (const [key, value] of Object.entries(field_choices_raw)) {
		options.push(<option value={key}>{value}</option>)
	}

	return options;
}

export const RISK_APPETITES = getOptions("Risk appetite", RISK_APPETITES_RAW);
export const ORDER_TYPES = getOptions("Order type", ORDER_TYPES_RAW);