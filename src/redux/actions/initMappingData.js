import {INIT_MAPPING} from './resourcesActionType'
import createRequestBeginAction from './requestBegin'
import createRequestEndAction from './requestEnd'

import _ from 'lodash'
import {ResourceService} from '../../service/ResourceService';

const initMappingDataAction = (payload) => {
    return {type: INIT_MAPPING, payload}
}

const initMappingData = () => {
    const resourceservice = new ResourceService();
    return (dispatch) =>{
        dispatch(createRequestBeginAction(true))
        _.delay(() =>{
           resourceservice.getMappingData().then(data => { console.log('suri mapping', data)
            dispatch(initMappingDataAction((Array.from(data))))
            dispatch(createRequestEndAction(false))
           }
        );
        }, 2000)
        
    }
}

export default initMappingData;

// export function getData(){
//     return fetch('http://localhost:5001/rmt')
//     .then(response => response.json())
//     .then(json => store.dispatch({type:DATA_LOADED, payload:json}))
// }