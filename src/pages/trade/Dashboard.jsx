import React, { Fragment, useEffect, useState, useRef, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PropTypes from  "prop-types"
import { connect } from "react-redux";

import { getPaginatedObjects } from "../../reduxApp/actions/app/actions";

import { EP_TRADE_VIEWSET } from "../../AppEndpoints";

import Spinner from "../../components/misc/Spinner";
import Trades from "../../components/trade/Trades";
import CreateTrade from "../../components/trade/CreateTrade";
import { getUrl } from "../../AppUrls";


import { initFlowbite } from "flowbite";


function Dashboard(props) {

	
	return (
		<Fragment>
			<Trades />
		</Fragment>
	)
}

Dashboard.propTypes = {
	getPaginatedObjects: PropTypes.func,
}


export default connect(null, { getPaginatedObjects })(Dashboard);



