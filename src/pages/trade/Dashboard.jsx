import React, { Fragment, useEffect, useState, useRef, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PropTypes from  "prop-types"
import { connect } from "react-redux";

import { getPaginatedObjects } from "../../reduxApp/actions/app/actions";

import { EP_TRADE_VIEWSET } from "../../AppEndpoints";

import Spinner from "../../components/misc/Spinner";
import CreateTrade from "../../components/trade/CreateTrade";
import { getUrl } from "../../AppUrls";


import { initFlowbite } from "flowbite";


function Dashboard(props) {
    const [trades, setTrades] = useState({
      count: null,
    })

    const populateTrades = (data) => {setTrades(data)}
    useEffect(
        () => {
            if (trades !== null && trades.count === null) {
                props.getPaginatedObjects(populateTrades, EP_TRADE_VIEWSET);
            }
        }
    )

    function onPrevious(event) {
    	event.preventDefault();
    	props.getPaginatedObjects(populateTrades, trades.previous);
    }
    function onNext(event) {
    	event.preventDefault();
    	props.getPaginatedObjects(populateTrades, trades.next);
    }
    function handleCreateTradeClick() {
    	props.getPaginatedObjects(populateTrades, EP_TRADE_VIEWSET);
    }


    let tradesHTML = [];
    if (trades !== null && trades.results !== undefined) {
	    for (var i = trades.results.length - 1; i >= 0; i--) {
	      tradesHTML.push(
	        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
	          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].symbol}
	          </td>

	          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].order_type_display}
	          </td>
	          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].risk_appetite_display}
	          </td>
	          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].riskreward_profile}
	          </td>
	          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].duration}
	          </td>
	          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].net_profit_loss}
	          </td>
	          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].execution_time}
	          </td>
	          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].trading_model}
	          </td>
	          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].entry_model}
	          </td>

	          <td className="p-4 space-x-2 whitespace-nowrap">
	              <button type="button" data-modal-target="update-journal-modal" data-modal-toggle="update-journal-modal" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-dark rounded-lg border-primary-700 hover:bg-primary-800 hover:text-white focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
	                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
	              </button>
	              <button type="button" data-modal-target="delete-journal-modal" data-modal-toggle="delete-journal-modal" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-dark border-red-600 rounded-lg hover:bg-red-800 focus:ring-4 hover:text-white focus:ring-red-300 dark:focus:ring-red-900">
	                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
	              </button>
	          </td>

	        </tr>
	      )
	    }
	  }
	
	return (
		<Fragment>
		<div className="p-4 bg-white block sm:flex items-center justify-between border lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
			<div className="w-full px-4">
				<div className="sm:flex">
				  <div className="items-center hidden sm:flex sm:divide-x sm:divide-gray-100 dark:divide-gray-700">
					  
					<h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
						Trades
					</h1>
				  </div>

				  <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
					  <CreateTrade clickEvent={handleCreateTradeClick} />
				  </div>
				</div>
			</div>
		</div>

        <div className="border">
            <div className="grid gap-4">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                           	Symbol
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Order Type
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Risk Appetite
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Risk Reward
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Duration
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            P&L
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Execution Time
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Trading Model
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Entry Model
                                        </th>


                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                  {...tradesHTML}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

		<div class="sticky bottom-0 right-0 items-center w-full p-4 bg-white border border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
		    <div class="flex items-center mb-4 sm:mb-0">
		    	{trades !== null && trades.previous !== null ?
		        <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
		            <svg onClick={onPrevious} class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
		        </a> : <></>
		      }

		      {trades !== null && trades.next !== null ?
		        <a href="#" class="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
		            <svg class="w-7 h-7" onClick={onNext} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
		        </a> : <></>
		      }

		        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
		        	Showing <span class="font-semibold text-gray-900 dark:text-white">1-5</span> of <span class="font-semibold text-gray-900 dark:text-white">{ trades.count }</span></span>
		    </div>
		</div>


		</Fragment>
	)
}

Dashboard.propTypes = {
	getPaginatedObjects: PropTypes.func,
}


export default connect(null, { getPaginatedObjects })(Dashboard);



