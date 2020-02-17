import {INIT_RESOURCES, ADD_RESOURCE, DELETE_RESOURCE, UPDATE_RESOURCE, SELECT_RESOURCE, 
    REQUEST_BEGIN, REQUEST_END, ADD_ERROR, CLEAR_ERRORS, SELECT_LDAP, SELECT_ROLE, INIT_MAPPING} from '../actions/resourcesActionType'
import _ from 'lodash'

const initialState = {
    resources:{resourceList:[], currentResourceIndex:0, ldapResource:{}}, error: {isError: false, errorList:[]},
    mapping:{}
}
const resources = (state = initialState, action) => {
    switch(action.type) {
        case INIT_RESOURCES:
            debugger;
            return {...state, resources: {currentResourceIndex: 0, resourceList: action.payload}}
        case INIT_MAPPING:
            debugger;
            return {...state, resources: {currentResourceIndex: 0, resourceList: action.payload}}
        case ADD_RESOURCE:
            return {...state, resources: 
                {currentResourceIndex: state.resources.currentResourceIndex, 
                resourceList: [...state.resources.resourceList, action.payload]}}
        case DELETE_RESOURCE:
            debugger
            return {...state, resources: {currentResourceIndex: 0,
                resourceList:_.reject(state.resources.resourceList, action.payload)}}
        case UPDATE_RESOURCE:
            const resourceIndex = _.findIndex(state.resources.resourceList, (resource) => resource.ldap === action.payload.ldap)
            console.log('suri x', state.resources.resourceList.slice(0, resourceIndex))
            //return state;
            return {...state, resources: {currentResourceIndex: state.resources.currentResourceIndex,
                resourceList:  [...state.resources.resourceList.slice(0, resourceIndex), action.payload, ...state.resources.resourceList.slice(resourceIndex + 1)]}}
        case SELECT_RESOURCE:
            console.log('suri action.payload', action.payload, state.resources, {...state, resources: {...state.resources, ldapResource: action.payload,
            currentResourceIndex: _.findIndex(state.resources.resourceList, (resource) =>resource.ldap === action.payload.ldap)}})
            return {...state, resources: {...state.resources, ldapResource: action.payload,
                currentResourceIndex: _.findIndex(state.resources.resourceList, (resource) =>resource.ldap === action.payload.ldap)}}
        case SELECT_LDAP:
            debugger
            let newErrorList1 = state.error.errorList.filter(x => x === 'Please enter ldap').filter(x => x === 'Please enter name').filter(x => x === 'Please enter email')
            return {...state, resources: {...state.resources, ldapResource: action.payload}, error: {...state.error, 
                errorList: newErrorList1,
                isError: newErrorList1.length > 0 ? true: false
            }}
        case SELECT_ROLE:
            let newErrorList = state.error.errorList.filter(x => x === 'Please enter role')
            return {...state, resources: {...state.resources, ldapResource: action.payload}, error: {...state.error, 
                errorList: newErrorList,
                isError: newErrorList.length > 0 ? true: false
            }}
        case REQUEST_BEGIN:
            console.log('suri444 request begin', {...state, isLoading: action.payload} )
            return {...state, isLoading: action.payload}
        case REQUEST_END:
            console.log('suri444 request end', {...state, isLoading: action.payload} )
            return {...state, isLoading: action.payload}
        case ADD_ERROR:
            return {...state, error: 
                {isError: true, 
                errorList: [...state.error.errorList, action.payload]}}
        case CLEAR_ERRORS:
            return {...state, error: 
                {isError: false, 
                errorList: []}}
        default:
            return state
    }
}

export default resources;



