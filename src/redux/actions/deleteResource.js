import {DELETE_RESOURCE} from './resourcesActionType'
import createRequestBeginAction from './requestBegin'
import createRequestEndAction from './requestEnd'

import _ from 'lodash'
import {ResourceService} from '../../service/ResourceService';

const deleteAction = (payload) =>{
    console.log(payload)
    return {type: DELETE_RESOURCE, payload}
}

const deleteResource = (resource) => {
    const resourceservice = new ResourceService();
    return (dispatch) =>{
        dispatch(createRequestBeginAction(true))
        _.delay(() =>{
           resourceservice.deleteResource().then(data => {
            dispatch(deleteAction(resource))
            dispatch(createRequestEndAction(false))
           }
        );
        }, 1000)
        
    }
}

export default deleteResource;

