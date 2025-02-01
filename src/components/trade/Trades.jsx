import React, { Fragment, useEffect, useState, useRef, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PropTypes from  "prop-types"
import { connect } from "react-redux";

import { getPaginatedObjects } from "../../reduxApp/actions/app/actions";
import { createTrade } from "../../reduxApp/actions/trade/actions";
import { updateTrade } from "../../reduxApp/actions/trade/actions";
import { deleteTrade } from "../../reduxApp/actions/trade/actions";
import { getFieldChoices } from "../../reduxApp/actions/app/actions";

import { EP_TRADE_VIEWSET } from "../../AppEndpoints";

import { Select, Label } from "flowbite-react";

import CreateTrade from "../../components/trade/CreateTrade";
import Spinner from "../../components/misc/Spinner";
import { getUrl } from "../../AppUrls";

import {
	RISK_APPETITES,
	ORDER_TYPES,

	FC_CREATE_UPDATE_TRADE,

	getOptions,
} from "../../FieldChoices"

import { initFlowbite } from "flowbite";


function Trades(props) {
    // - - - Field choices
    const [fieldChoices, setFieldChoices] = useState({
      symbols: null,
      journals: null,
      tradingModels: null,
      entryModels: null,
    })

	function fetchFieldChoices(event) {
	    const populateFieldChoices = (data) => {setFieldChoices(data)}
      	props.getFieldChoices(populateFieldChoices, FC_CREATE_UPDATE_TRADE);
			
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

	// - - - Fetching trades, setting up dash & forms
    const [trades, setTrades] = useState({
      count: null,
    })

    const populateTrades = (data) => {setTrades(data)}
    useEffect(
        () => {
        	fetchFieldChoices();
    		window.initFlowbite();
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
    function reloadTrades() {
    	props.getPaginatedObjects(populateTrades, EP_TRADE_VIEWSET);
    }


    // - - - Create Trade
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
		...createTradeDataInitial,
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
	  reloadTrades();
	}

	function clearCreateTradeForm() {
	  createTradeForm.current && createTradeForm.current.reset();
	}

	// - - - Update Trade
	const { trade } = props;
	const updateTradeForm = useRef(null);

	const [updateTradeData, setUpdateTradeData] = useState({
		id: null,
		data: {
			symbol: null,
			journal: null, trading_model: null, entry_model: null,
			risk_appetite: null, riskreward_profile: null,
			order_type: null,
			fill_price: null, exit_price: null,
			stoploss_price: null, takeprofit_price: null,
			execution_time: null, exit_time: null,
			trade_review: null,		
		}
	})

	function handleUpdateTradeClick(event) {
		const trade = trades.results[event.target.id]
		setUpdateTradeData((prevState) => {
			return {
				id: trade.id,
				data: {
					symbol: trade.symbol,
					journal: trade.journal, trading_model: trade.trading_model, entry_model: trade.entry_model,
					
					risk_appetite: trade.risk_appetite,
					risk_appetite_display: trade.risk_appetite_display,
					riskreward_profile: trade.riskreward_profile,
					order_type: trade.order_type, order_type_display: trade.order_type_display,
					fill_price: trade.fill_price, exit_price: trade.exit_price,
					stoploss_price: trade.stoploss_price, takeprofit_price: trade.takeprofit_price,
					execution_time: trade.execution_time, exit_time: trade.exit_time,
					trade_review: trade.trade_review,
				}	
			};
		});
	} 

	function handleUpdateTradeChange(event) {
	  const { name, value } = event.target
	  event.preventDefault();
	  setUpdateTradeData((prevState) => {
			return {
			  id: updateTradeData.id,
			  data: {
			  		...updateTradeData.data,
					[name]: value,
			  }
			};
	  });
	}

	function handleUpdateTradeSubmit(event) {
	  event.preventDefault();

	  props.updateTrade(updateTradeData.data, updateTradeData.id);
	  clearUpdateTradeForm();
	  reloadTrades();
	}

	function clearUpdateTradeForm() {
	  updateTradeForm.current && updateTradeForm.current.reset();
	}

	// - - - Delete trade
	function handleDeleteTradeClick(event) {
		event.preventDefault();
      	props.deleteTrade(event.target.id);
      	if (props.clickEvent !== undefined) {
      		props.clickEvent();
      	}
			
	}


    // - - - Trade entries
    let tradesHTML = [];
    if (trades !== null && trades.results !== undefined) {
	    for (var i = trades.results.length - 1; i >= 0; i--) {
	      tradesHTML.push(
	        <tr className="px-2 hover:bg-gray-100 dark:hover:bg-gray-700">
	          <td className="p-2 text-base font-medium text-sm text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].symbol}
	          </td>

	          <td className="p-2 text-base font-medium text-sm text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].order_type_display}
	          </td>
	          <td className="p-2 text-base font-medium text-sm text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].risk_appetite_display}
	          </td>
	          <td className="p-2 text-base font-medium text-sm text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].riskreward_profile}
	          </td>
	          <td className="p-2 text-base font-medium text-sm text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].duration}
	          </td>
	          <td className="p-2 text-base font-medium text-sm text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].net_profit_loss}
	          </td>
	          <td className="p-2 text-base font-medium text-sm text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].execution_time}
	          </td>
	          <td className="p-2 text-base font-medium text-sm text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].trading_model}
	          </td>
	          <td className="p-2 text-base font-medium text-sm text-gray-900 whitespace-nowrap dark:text-white">
	            {trades.results[i].entry_model}
	          </td>

	          <td className="p-2 space-x-2 whitespace- text-smnowrap">
			      <button type="button" data-modal-target="update-trade-modal" data-modal-toggle="update-trade-modal" className="inline-flex items-center text-sm font-medium text-center text-dark rounded-lg border-primary-700 hover:bg-primary-800 hover:text-white focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
			          <svg onClick={handleUpdateTradeClick} id={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path id={i} d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path id={i} fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
			      </button>

					<button type="button" data-modal-target="delete-trade-modal" data-modal-toggle="delete-trade-modal" className="inline-flex items-center text-sm font-medium text-center text-dark border-red-600 rounded-lg hover:bg-red-800 focus:ring-4 hover:text-white focus:ring-red-300 dark:focus:ring-red-900">
		            	<svg onClick={handleDeleteTradeClick} id={trades.results[i].id} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
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
					<CreateTrade clickEvent={reloadTrades} />
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

		<div class="sticky bottom-0 py-2 right-0 items-center w-full bg-white border border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
		    <div class="flex items-center">
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


		{/* Modals */}

		<div id="update-trade-modal" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" tabIndex="-1" aria-hidden="true" >
			<div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
				
				<div className="relative bg-white rounded-lg mt-[400px] shadow dark:bg-gray-800">
					
					<div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
						<h3 className="text-xl font-semibold dark:text-white">
							Update Trade
						</h3>
						<button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-toggle="update-trade-modal">
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
						</button>
					</div>
					<form action="#" onSubmit={handleUpdateTradeSubmit} ref={updateTradeForm}>
					<div className="p-6 space-y-6">
						
							<div className="grid grid-cols-6 gap-6">
					
								<div className="col-span-6 sm:col-span-3">
									<div className="mb-2 block">
									<Label htmlFor="symbol" value="Select your symbol" />
									</div>
									<Select name="symbol" onChange={handleUpdateTradeChange} id="symbol" required>
										<option defaultValue value={updateTradeData.data.symbol}>Current : {updateTradeData.data.symbol}</option>
										{...SYMBOLS}
									</Select>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<div className="mb-2 block">
									<Label htmlFor="journal" value="Select your journal" />
									</div>
									<Select name="journal" onChange={handleUpdateTradeChange} id="journal" required>
										<option defaultValue value={updateTradeData.data.journal}>Current : {updateTradeData.data.journal}</option>
										{...JOURNALS}
									</Select>
								</div>


								<div className="col-span-6 sm:col-span-3">
									<div className="mb-2 block">
									<Label htmlFor="trading_model" value="Select your trading_model" />
									</div>
									<Select name="trading_model" onChange={handleUpdateTradeChange} id="trading_model" required>
										<option defaultValue value={updateTradeData.data.trading_model}>Current : {updateTradeData.data.trading_model}</option>
										{...TRADING_MODELS}
									</Select>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<div className="mb-2 block">
									<Label htmlFor="entry_model" value="Select your entry_model" />
									</div>
									<Select name="entry_model" onChange={handleUpdateTradeChange} id="entry_model" required>
										<option defaultValue value={updateTradeData.data.entry_model}>Current : {updateTradeData.data.entry_model}</option>
										{...ENTRY_MODELS}
									</Select>
								</div>


								<div className="col-span-6">
									<div className="mb-2 block">
									<Label htmlFor="order_type" value="Select your order_type" />
									</div>
									<Select name="order_type" onChange={handleUpdateTradeChange} id="order_type" required>
										<option defaultValue value={updateTradeData.data.order_type}>Current : {updateTradeData.data.order_type_display}</option>
										{...ORDER_TYPES}
									</Select>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<div className="mb-2 block">
									<Label htmlFor="risk_appetite" value="Select your risk_appetite" />
									</div>
									<Select name="risk_appetite" onChange={handleUpdateTradeChange} id="risk_appetite" required>
										<option defaultValue value={updateTradeData.data.risk_appetite}>Current : {updateTradeData.data.risk_appetite_display}</option>
										{...RISK_APPETITES}
									</Select>
								</div>


								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="riskreward_profile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Risk Reward
									</label>
									<input value={updateTradeData.data.riskreward_profile} type="text" name="riskreward_profile" placeholder="Risk reward" onChange={handleUpdateTradeChange} id="riskreward_profile" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="fill_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Fill price
									</label>
									<input value={updateTradeData.data.fill_price} type="text" name="fill_price" placeholder="Fill price" onChange={handleUpdateTradeChange} id="fill_price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>


								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="exit_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Exit price
									</label>
									<input value={updateTradeData.data.exit_price} type="text" name="exit_price" placeholder="Exit price" onChange={handleUpdateTradeChange} id="exit_price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="stoploss_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Stoploss
									</label>
									<input value={updateTradeData.data.stoploss_price} type="text" name="stoploss_price" placeholder="Stoploss" onChange={handleUpdateTradeChange} id="stoploss_price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="takeprofit_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Takeprofit
									</label>
									<input value={updateTradeData.data.takeprofit_price} type="text" name="takeprofit_price" placeholder="Takeprofit" onChange={handleUpdateTradeChange} id="takeprofit_price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="execution_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Execution time
									</label>
									<input value={updateTradeData.data.execution_time} type="text" name="execution_time" placeholder="YYYY-MM-DD hh:mm:ss" onChange={handleUpdateTradeChange} id="execution_time" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="exit_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Exit time
									</label>
									<input value={updateTradeData.data.exit_time} type="text" name="exit_time" placeholder="" onChange={handleUpdateTradeChange} id="exit_time" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
								</div>

								<div className="col-span-6">
									<label htmlFor="trade_review" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trade review</label>
									<textarea value={updateTradeData.data.trade_review} name="trade_review" placeholder="Lorem ipsum dolor et" onChange={handleUpdateTradeChange} id="trade_review" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
										
									</textarea>
								</div>
							</div> 
						
					</div>
						
					<div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
						<button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit" >
							Update Trade
						</button>
					</div>
					</form>
				</div>
			</div>
		</div>

		<div id="delete-trade-modal" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" tabIndex="-1" aria-hidden="true" >
            <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">      
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">      
                    <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                        <h3 className="text-xl font-semibold dark:text-white">
                            Delete Trade
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-toggle="delete-trade-modal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                    </div>
                    
                    <div className="flex flex-row space-x-4 items-center align-center p-6">
                      <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <h3 class="text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this trade? This action is irreversible</h3>
                    </div>
                        
                      <div className="items-center px-6 py-3 space-x-4 border-t border-gray-200 rounded-b dark:border-gray-700">
                          <button onClick={handleDeleteTradeClick} data-modal-toggle="delete-trade-modal" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-900">
                              Yes, I'm sure
                          </button>
                          <button data-modal-toggle="delete-trade-modal" class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                              No, cancel
                          </button>
                      </div>
                </div>
            </div>
		</div>

		</Fragment>
	)
}

Trades.propTypes = {
	getPaginatedObjects: PropTypes.func,
	createTrade: PropTypes.func,
	updateTrade: PropTypes.func,
	deleteTrade: PropTypes.func,
	getFieldChoices: PropTypes.func,
}


export default connect(null, {
	getPaginatedObjects,
	createTrade,
	updateTrade,
	deleteTrade,
	getFieldChoices,
})(Trades);



