import * as types from './types'

import endpoint from '@/endpoint'

export default {
    setFetchingData ({commit}) {
        commit( types.LIST_FETCH_REQUEST )
    },
    setParams ({commit}, {
        page,
        per_page,
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
    getList ({state,commit}) {
        console.log('bus actions getList',state)
        
        commit( types.LIST_FETCH_REQUEST )

        return endpoint.get({
            url: `${types.route}/list`,
            params: state.list.params,
        })
        .then(data => {
            commit(types.LIST_FETCH_SUCCESS, data )

            return data;
        })
        .catch(err => {
            if(err?.response){
                const { response } = err
                const { data, status } = response

                commit(types.LIST_FETCH_FAILURE, { err: err.errors }) 

                return data
            }

            
        });
    },
}
