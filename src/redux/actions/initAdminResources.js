import {INIT_RESOURCES} from './resourcesActionType'
import createRequestBeginAction from './requestBegin'
import createRequestEndAction from './requestEnd'

import _ from 'lodash'
import {ResourceService} from '../../service/ResourceService';

const createInitResourcesAction = (payload) => {
    return {type: INIT_RESOURCES, payload}
}

const initAdminResources = () => {
    const resourceservice = new ResourceService();
    return (dispatch) =>{
        dispatch(createRequestBeginAction(true))
        _.delay(() =>{
           resourceservice.getAdminResources().then(data => {
            dispatch(createInitResourcesAction((Array.from(data)).map(x => {return {...x, admin: x.admin? 'Yes': 'No'}})))
            dispatch(createRequestEndAction(false))
           }
        );
        }, 2000)
        
    }
}

export default initAdminResources;

// export function getData(){
//     return fetch('http://localhost:5001/rmt')
//     .then(response => response.json())
//     .then(json => store.dispatch({type:DATA_LOADED, payload:json}))
// }