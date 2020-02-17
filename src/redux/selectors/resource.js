import {createSelector} from 'reselect'

const getResourceListing = createSelector(
    state => state.resources,
    (resourcesState) => { console.log('suri uuuu', {resourcesState})
        return {
            resourceList: [...resourcesState.resources.resourceList],
            selectedResource: {...resourcesState.resources.resourceList[resourcesState.resources.currentResourceIndex]},
            isLoading: resourcesState.isLoading,
            isError: resourcesState.error.isError,
            errorList: [...resourcesState.error.errorList],
            ldapResource: {...resourcesState.resources.ldapResource},
            notificationList: [...resourcesState.resources.resourceList.filter(x => x.dfm === '')]
        }
    }
)

export default getResourceListing