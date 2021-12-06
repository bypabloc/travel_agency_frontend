import * as types from './types'

export default {
    [types.LIST_SET_PARAMS] (state, params ){
        state.list.params = {
            ...state.list.params,
            ...params,
        }
    },
    [types.LIST_FETCH_REQUEST] (state){
        state.list.fetchingData = true
        state.list.errors = null
    },
    [types.LIST_FETCH_SUCCESS] (state, { data }){
        state.list.fetchingData = false
        state.list.errors = null
        state.list.data = data.journeys_drivers
    },
    [types.LIST_FETCH_FAILURE] (state, { errors }){
        state.list.fetchingData = false
        state.list.errors = errors
    },

    [types.CREATE_FETCH_REQUEST] (state){
        state.create.fetchingData = true
        state.create.errors = null
    },
    [types.CREATE_FETCH_SUCCESS] (state, { data }){
        state.create.fetchingData = false
        state.create.errors = null
        state.create.data = data.journey_driver
    },
    [types.CREATE_FETCH_FAILURE] (state, { errors }){
        state.create.fetchingData = false
        state.create.errors = errors
    },

    [types.STATE_CHANGE_FETCH_REQUEST] (state){
        state.create.fetchingData = true
        state.create.errors = null
    },
    [types.STATE_CHANGE_FETCH_SUCCESS] (state, { data }){
        state.create.fetchingData = false
        state.create.errors = null
        state.create.data = data.journey_driver
    },
    [types.STATE_CHANGE_FETCH_FAILURE] (state, { errors }){
        state.create.fetchingData = false
        state.create.errors = errors
    },
}
