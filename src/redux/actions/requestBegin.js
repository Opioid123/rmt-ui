import {REQUEST_BEGIN} from './resourcesActionType'

const createRequestBeginAction = (status) => {
    return {type: REQUEST_BEGIN, payload:status}
}

export default createRequestBeginAction;