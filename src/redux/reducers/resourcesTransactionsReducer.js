import {REQUEST_BEGIN, REQUEST_END} from '../actions/resourcesActionType'

const initialState = {}
const resourceTransactions1 = (state = initialState, action) => {
    switch(action.type) {
        case REQUEST_BEGIN:
            console.log('suri444 request begin', {...state, isLoading: action.payload} )
            return {...state, isLoading: action.payload}
        case REQUEST_END:
            console.log('suri444 request end', {...state, isLoading: action.payload} )
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}

export default resourceTransactions1;


