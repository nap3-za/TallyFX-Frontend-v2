import React, { Fragment } from "react";
import PropTypes from  "prop-types"
import { connect } from "react-redux";


function Dashboard(props) {
	const {user} = props;

	const createTradeForm = useRef(null);

	const [createTradeData, setCreateTradeData] = useState({
		symbol: null,
		journal: null, trading_model: null, entry_model: null,
		risk_appetite: null, riskreward_profile: null,
		order_type: null,
		fill_price: null, exit_price: null,
		stoploss_price: null, takeprofit_price: null,
		execution_time: null, exit_time: null,
		trade_review: null,
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
					  <button type="button" data-modal-target="add-trade-modal" data-modal-toggle="add-trade-modal" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
						  <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
						  Add Trade
					  </button>
				  </div>
				</div>
			</div>
		</div>

		<div id="add-trade-modal" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" tabIndex="-1" aria-hidden="true" >
			<div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
				
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
					
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
									<label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
									<input type="text" name="title" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="January" required onChange={handleCreateTradeChange} />
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
									<input type="text" name="code" id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="JAN" required onChange={handleCreateTradeChange} />
								</div>
								<div className="col-span-6">
									<label htmlFor="adages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adages</label>
									<textarea name="adages" id="adages" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Lorem ipsum dolor et" onChange={handleCreateTradeChange}></textarea>
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
	user: PropTypes.object,
	createTrade: PropTypes.func,
}

const mapStateToProps = state => ({
	user: state.account.user,
})

export default connect(mapStateToProps, { createTrade })(Dashboard);



