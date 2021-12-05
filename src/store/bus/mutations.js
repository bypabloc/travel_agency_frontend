import * as types from './types'

export default {
    [types.LIST_FETCH_REQUEST] (state){
        state.list.fetchingData = true
        state.list.errors = null
    },
    [types.LIST_SET_PARAMS] (state, { params }){
        state.list.params = {
            ...state.list.params,
            ...params,
        }
    },
    [types.LIST_FETCH_SUCCESS] (state, { data }){
        state.list.fetchingData = false
        state.list.errors = null
        state.list.data = data.data.buses
    },
    [types.LIST_FETCH_FAILURE] (state, { errors }){
        state.list.fetchingData = false
        state.list.errors = errors
    },
}
