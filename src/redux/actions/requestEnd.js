import {REQUEST_END} from './resourcesActionType'

const createRequestEndAction = (status) => {
    return {type: REQUEST_END, payload: status}
}

export default createRequestEndAction;