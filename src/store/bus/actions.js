import * as types from './types'

import endpoint from '@/endpoint'

export default {
    setFetchingData ({commit}) {
        commit( types.LIST_FETCH_REQUEST )
    },
    getList ({commit}, {
        page,
        per_page,
        sort='',
        sort_by='',
        filter='',
        filter_by='',
    }) {
        console.log('bus actions getList')
        
        commit( types.LIST_FETCH_REQUEST )

        return endpoint.get({
            url: `${types.route}/list`,
            params: {
                page,
                per_page,
                sort,
                sort_by,
                filter,
                filter_by,
            },
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

// // Methods
// getList: ( e ) => store.dispatch(`${object}/getList`, e ),
// findOne: ( e ) => store.dispatch(`${object}/findOne`, e ),
// create: ( e ) => store.dispatch(`${object}/create`, e ),
// state_change: ( e ) => store.dispatch(`${object}/state_change`, e ),

// setFetchingData: ( e ) => store.dispatch(`${object}/setFetchingData`, e ),