import { computed } from 'vue'
import { useStore } from 'vuex'

export default () => {

    const module = 'bus';

    const store = useStore();

    // dispatch -> actions
    // commit -> mutations

    console.log('useBus.js -> store.state.bus', store);

    return {
        fetchingData: computed(() => store.getters[`${module}/fetchingData`] ),
        errors: computed(() => store.getters[`${module}/errors`] ),

        listFetchingData: computed(() => store.getters[`${module}/listFetchingData`] ),
        listErrors: computed(() => store.getters[`${module}/listErrors`] ),
        listData: computed(() => store.getters[`${module}/listData`] ),
        listParams: computed(() => store.getters[`${module}/listParams`] ),

        // Methods
        setParams: ( e ) => store.dispatch(`${module}/setParams`, e ),
        getList: ( e ) => store.dispatch(`${module}/getList`, e ),

        findOne: ( e ) => store.dispatch(`${module}/findOne`, e ),
        create: ( e ) => store.dispatch(`${module}/create`, e ),
        state_change: ( e ) => store.dispatch(`${module}/state_change`, e ),

        setFetchingData: ( e ) => store.dispatch(`${module}/setFetchingData`, e ),
    }
}