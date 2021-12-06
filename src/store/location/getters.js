export default {
    fetchingData( state, ) {
        return state.fetchingData
    },
    errors( state, ) {
        return state.errors
    },
    
    listFetchingData( state, ) {
        return state.list.fetchingData
    },
    listErrors( state, ) {
        return state.list.errors
    },
    listData( state, ) {
        return state.list.data
    },
    listParams( state, ) {
        return state.list.params
    },

    createFetchingData( state, ) {
        return state.create.fetchingData
    },
    createErrors( state, ) {
        return state.create.errors
    },
}