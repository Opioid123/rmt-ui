import {combineReducers} from 'redux'
import resources from './reducers/resourcesReducer'
//import resourceTransactions from './reducers/resourcesTransactionsReducer'

const rootReducer = combineReducers({
    resources: resources,
    //resourceTransactions: resourceTransactions
})

export default rootReducer