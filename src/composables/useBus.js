import { computed } from 'vue'
import { useStore } from 'vuex'

export default () => {

    const modules = 'bus';

    const store = useStore();

    // dispatch -> actions
    // commit -> mutations

    console.log('useBus.js -> store.state.bus', store);

    return {
        fetchingData: computed(() => store.getters[`${modules}/fetchingData`] ),
        errors: computed(() => store.getters[`${modules}/errors`] ),

        listFetchingData: computed(() => store.getters[`${modules}/listFetchingData`] ),
        listErrors: computed(() => store.getters[`${modules}/listErrors`] ),
        listData: computed(() => store.getters[`${modules}/listData`] ),

        // Methods
        getList: ( e ) => store.dispatch(`${modules}/getList`, e ),
        findOne: ( e ) => store.dispatch(`${modules}/findOne`, e ),
        create: ( e ) => store.dispatch(`${modules}/create`, e ),
        state_change: ( e ) => store.dispatch(`${modules}/state_change`, e ),

        setFetchingData: ( e ) => store.dispatch(`${modules}/setFetchingData`, e ),
    }
}