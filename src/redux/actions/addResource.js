import {ADD_RESOURCE} from './resourcesActionType'
import createRequestBeginAction from './requestBegin'
import createRequestEndAction from './requestEnd'

import _ from 'lodash'
import {ResourceService} from '../../service/ResourceService';

const addAction = (payload) =>{
    return {type: ADD_RESOURCE, payload}
}

const addResource = (resource) => {
    const resourceservice = new ResourceService();
    return (dispatch) =>{
        dispatch(createRequestBeginAction(true))
        _.delay(() =>{
           resourceservice.addResource().then(data => {
            dispatch(addAction(resource))
            dispatch(createRequestEndAction(false))
           }
        );
        }, 1000)
        
    }
}

export default addResource;

