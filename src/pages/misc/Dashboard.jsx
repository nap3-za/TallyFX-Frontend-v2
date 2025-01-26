import React, { Fragment, useEffect, useState, useRef, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PropTypes from  "prop-types"
import { connect } from "react-redux";

import { createTrade } from "../../reduxApp/actions/trade/actions";
import { getFieldChoices } from "../../reduxApp/actions/app/actions";

import { Select, Label } from "flowbite-react";

import Spinner from "../../components/misc/Spinner";
import { getUrl } from "../../AppUrls";

import {
	RISK_APPETITES,
	ORDER_TYPES,

	FC_ADD_TRADE,

	getOptions,
} from "../../FieldChoices"


import { initFlowbite } from "flowbite";


function Dashboard(props) {

    const [fieldChoices, setFieldChoices] = useState({
      symbols: null,
      journals: null,
      tradingModels: null,
      entryModels: null,
    })

	function handleAddTradeClick(event) {
	    const populateFieldChoices = (data) => {setFieldChoices(data)}
        props.getFieldChoices(populateFieldChoices, FC_ADD_TRADE);
	}

    let SYMBOLS = [];
    let JOURNALS = [];
    let ENTRY_MODELS = [];
    let TRADING_MODELS = [];

    if (fieldChoices !== null && fieldChoices.symbols !== null) {
    	SYMBOLS = getOptions("Symbol", fieldChoices.symbols);
    	JOURNALS = getOptions("Journal", fieldChoices.journals);
    	TRADING_MODELS = getOptions("Trading model", fieldChoices.tradingModels);
    	ENTRY_MODELS = getOptions("Entry model", fieldChoices.entryModels);
    }

	// - - - - -

	const createTradeForm = useRef(null);

	const createTradeDataInitial = {
		symbol: null,
		journal: null, trading_model: null, entry_model: null,
		risk_appetite: null, riskreward_profile: null,
		order_type: null,
		fill_price: null, exit_price: null,
		stoploss_price: null, takeprofit_price: null,
		execution_time: null, exit_time: null,
		trade_review: null,	
	}
	const [createTradeData, setCreateTradeData] = useState({
		...createTradeDataInitial
	})

	function handleCreateTradeChange(event) {
	  const { name, value } = event.target
	  event.preventDefault();
	  setCreateTradeData((prevState) => {
		return {
		  ...createTradeData,
		  [name]: value,
		};
	  });
	}

	function handleCreateTradeSubmit(event) {
	  event.preventDefault();
	  props.createTrade(createTradeData);
	  clearCreateTradeForm();
	}

	function clearCreateTradeForm() {
	  createTradeForm.current && createTradeForm.current.reset();
	  setCreateTradeData((prevState) => {
		return {
			...createTradeDataInitial
		}
	  })

	}

	
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
					  <button onClick={handleAddTradeClick} type="button" data-modal-target="add-trade-modal" data-modal-toggle="add-trade-modal" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
						  <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
						  Add Trade
					  </button>
				  </div>
				</div>
			</div>
		</div>

		<div id="add-trade-modal" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" tabIndex="-1" aria-hidden="true" >
			<div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
				
				<div className="relative bg-white rounded-lg mt-[400px] shadow dark:bg-gray-800">
					
					<div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
						<h3 className="text-xl font-semibold dark:text-white">
							New Trade
						</h3>
						<button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-toggle="add-trade-modal">
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
						</button>
					</div>
					<form action="#" onSubmit={handleCreateTradeSubmit} ref={createTradeForm}>
					<div className="p-6 space-y-6">
						
							<div className="grid grid-cols-6 gap-6">
					
								<div className="col-span-6 sm:col-span-3">
									<div className="mb-2 block">
									<Label htmlFor="symbol" value="Select your symbol" />
									</div>
									<Select name="symbol" onChange={handleCreateTradeChange} id="symbol" required>
										{...SYMBOLS}
									</Select>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<div className="mb-2 block">
									<Label htmlFor="journal" value="Select your journal" />
									</div>
									<Select name="journal" onChange={handleCreateTradeChange} id="journal" required>
										{...JOURNALS}
									</Select>
								</div>


								<div className="col-span-6 sm:col-span-3">
									<div className="mb-2 block">
									<Label htmlFor="trading_model" value="Select your trading_model" />
									</div>
									<Select name="trading_model" onChange={handleCreateTradeChange} id="trading_model" required>
										{...TRADING_MODELS}
									</Select>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<div className="mb-2 block">
									<Label htmlFor="entry_model" value="Select your entry_model" />
									</div>
									<Select name="entry_model" onChange={handleCreateTradeChange} id="entry_model" required>
										{...ENTRY_MODELS}
									</Select>
								</div>


								<div className="col-span-6">
									<div className="mb-2 block">
									<Label htmlFor="order_type" value="Select your order_type" />
									</div>
									<Select name="order_type" onChange={handleCreateTradeChange} id="order_type" required>
										{...ORDER_TYPES}
									</Select>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<div className="mb-2 block">
									<Label htmlFor="risk_appetite" value="Select your risk_appetite" />
									</div>
									<Select name="risk_appetite" onChange={handleCreateTradeChange} id="risk_appetite" required>
										{...RISK_APPETITES}
									</Select>
								</div>


								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="riskreward_profile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Risk Reward
									</label>
									<input type="text" name="riskreward_profile" placeholder="Risk reward" onChange={handleCreateTradeChange} id="riskreward_profile" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="fill_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Fill price
									</label>
									<input type="text" name="fill_price" placeholder="Fill price" onChange={handleCreateTradeChange} id="fill_price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>


								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="exit_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Exit price
									</label>
									<input type="text" name="exit_price" placeholder="Exit price" onChange={handleCreateTradeChange} id="exit_price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="stoploss_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Stoploss
									</label>
									<input type="text" name="stoploss_price" placeholder="Stoploss" onChange={handleCreateTradeChange} id="stoploss_price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="takeprofit_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Takeprofit
									</label>
									<input type="text" name="takeprofit_price" placeholder="Takeprofit" onChange={handleCreateTradeChange} id="takeprofit_price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="execution_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Execution time
									</label>
									<input type="text" name="execution_time" placeholder="YYYY-MM-DD hh:mm:ss" onChange={handleCreateTradeChange} id="execution_time" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="exit_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Exit time
									</label>
									<input type="text" name="exit_time" placeholder="" onChange={handleCreateTradeChange} id="exit_time" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>

								<div className="col-span-6">
									<label htmlFor="trade_review" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trade review</label>
									<textarea name="trade_review" placeholder="Lorem ipsum dolor et" onChange={handleCreateTradeChange} id="trade_review" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"></textarea>
								</div>
							</div> 
						
					</div>
						
					<div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
						<button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit" >Create Trade</button>
					</div>
					</form>
				</div>
			</div>
		</div>

		</Fragment>
	)
}

Dashboard.propTypes = {
	createTrade: PropTypes.func,
	getFieldChoices: PropTypes.func,
}


export default connect(null, { createTrade, getFieldChoices })(Dashboard);



