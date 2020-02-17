import {SELECT_LDAP} from './resourcesActionType'

const selectLdap = (payload) => {
    return {type: SELECT_LDAP, payload}
}

export default selectLdap;