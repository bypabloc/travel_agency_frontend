import * as types from './types'

export default {
    [types.LIST_FETCH_REQUEST] (state){
        state.fetchingData = true
        state.errors = null
    },
    [types.LIST_FETCH_SUCCESS] (state, { data }){
        state.fetchingData = false
        state.errors = null
        state.data = data
    },
    [types.LIST_FETCH_FAILURE] (state, { errors }){
        state.fetchingData = false
        state.errors = errors
    },
}
