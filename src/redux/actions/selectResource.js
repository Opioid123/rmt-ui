import {SELECT_RESOURCE} from './resourcesActionType'

const selectResource = (payload) =>{
    console.log('suri payload', payload)
    return {type: SELECT_RESOURCE, payload}
}

export default selectResource;

