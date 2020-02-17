import {CLEAR_ERRORS} from './resourcesActionType'

const clearErrors = (payload) =>{
    return {type: CLEAR_ERRORS, payload}
}

export default clearErrors;

