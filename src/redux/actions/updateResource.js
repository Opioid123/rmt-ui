import {UPDATE_RESOURCE} from './resourcesActionType'
import createRequestBeginAction from './requestBegin'
import createRequestEndAction from './requestEnd'

import _ from 'lodash'
import {ResourceService} from '../../service/ResourceService';

const updateAction = (payload) =>{
    console.log(payload)
    return {type: UPDATE_RESOURCE, payload}
}

const updateResource = (resource) => {
    const resourceservice = new ResourceService();
    return (dispatch) =>{
        dispatch(createRequestBeginAction(true))
        _.delay(() =>{
           resourceservice.updateResource().then(data => {
            dispatch(updateAction(resource))
            dispatch(createRequestEndAction(false))
           }
        );
        }, 1000)
        
    }
}

export default updateResource;

