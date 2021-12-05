import * as types from './types'

import endpoint from '@/endpoint'

export default {
    setFetchingData ({commit}) {
        commit( types.LIST_FETCH_REQUEST )
    },
    setParams ({commit}, {
        page=1,
        per_page=10,
        sort='',
        sort_by='',
        filter='',
        filter_by='',
    }) {
        commit( types.LIST_SET_PARAMS, {
            page,
            per_page,
            sort,
            sort_by,
            filter,
            filter_by,
        } )
    },
    create ({commit}, {
        plate,
        color,
        brand,
        model,
        serial,
        year,
    }) {
        commit( types.CREATE_FETCH_REQUEST )

        return endpoint.post({
            url: `${types.route}/create`,
            params: {
                plate,
                color,
                brand,
                model,
                serial,
                year,
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
    
    getList ({state,commit}) {
        console.log('bus actions getList',state)
        
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
            commit(types.FETCH_FAILURE, { err: err.errors }) 
            return Promise.reject(err);
        });
    },
}
