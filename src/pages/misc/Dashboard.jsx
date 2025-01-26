import React, { Fragment, useEffect, useState, useRef, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PropTypes from  "prop-types"
import { connect } from "react-redux";

import CreateTrade from "../../components/trade/CreateTrade";

import Spinner from "../../components/misc/Spinner";
import { getUrl } from "../../AppUrls";



import { initFlowbite } from "flowbite";


function Dashboard(props) {

	
	return (
		<Fragment>
		<div className="p-4 bg-white block sm:flex items-center justify-between shadow-md rounded-lg border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
			<div className="w-full px-4 mb-1">
				<div className="sm:flex">
				  <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
					  
					<h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
						Trades
					</h1>
				  </div>

				  <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
					  <CreateTrade />
				  </div>
				</div>
			</div>
		</div>


		</Fragment>
	)
}




export default connect(null, null)(Dashboard);



