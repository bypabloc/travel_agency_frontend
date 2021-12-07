import * as types from './types'

import endpoint from '@/endpoint'

export default {
    setFetchingData ({commit}) {
        commit( types.LIST_FETCH_REQUEST )
    },
    setParams ({commit}, params) {
        commit( types.LIST_SET_PARAMS, params )
    },
    getList ({state,commit}) {
        commit( types.LIST_FETCH_REQUEST )

        return endpoint.get({
            url: `${types.route}/list`,
            params: state.list.params,
        })
        .then(({ data }) => {
            commit(types.LIST_FETCH_SUCCESS, data )
            return data;
        })
        .catch(err => {
            console.log('err',err)
            commit(types.LIST_FETCH_FAILURE, { err: err.errors }) 
            return Promise.reject(err);
        });
    },
    getListJourneysAvailables ({state,commit}) {
        commit( types.LIST_FETCH_REQUEST )

        return endpoint.get({
            url: `${types.route}/journeys`,
            params: state.list.params,
        })
        .then(({ data }) => {
            commit(types.LIST_FETCH_SUCCESS, data )
            return data;
        })
        .catch(err => {
            console.log('err',err)
            commit(types.LIST_FETCH_FAILURE, { err: err.errors }) 
            return Promise.reject(err);
        });
    },
    create ({commit}, {
        datetime_start,
        states,
        journey,
        driver,
    }) {
        commit( types.CREATE_FETCH_REQUEST )

        return endpoint.post({
            url: `${types.route}/create`,
            params: {
                datetime_start,
                states,
                journey,
                driver,
            },
        })
        .then(({ data }) => { 
            commit(types.CREATE_FETCH_SUCCESS, data)
            return data;
        })
        .catch(err => {
            console.log('err',err)
            commit(types.CREATE_FETCH_FAILURE, { err: err.errors }) 
            return Promise.reject(err);
        });
    },
    state_change ({commit}, {
        id,
        states,
    }) {
        commit( types.STATE_CHANGE_FETCH_REQUEST )

        return endpoint.post({
            url: `${types.route}/state_change`,
            params: {
                id,
                states,
            },
        })
        .then(({ data }) => { 
            commit(types.STATE_CHANGE_FETCH_SUCCESS, data)
            return data;
        })
        .catch(err => {
            console.log('err',err)
            commit(types.STATE_CHANGE_FETCH_FAILURE, { err: err.errors }) 
            return Promise.reject(err);
        });
    },
}
