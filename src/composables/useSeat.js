import { computed } from 'vue'
import { useStore } from 'vuex'

export default () => {

    const module = 'seat';

    const store = useStore();

    return {
        listFetchingData: computed(() => store.getters[`${module}/listFetchingData`] ),
        listErrors: computed(() => store.getters[`${module}/listErrors`] ),
        listData: computed(() => store.getters[`${module}/listData`] ),
        getList: () => store.dispatch(`${module}/getList`),

        listParams: computed(() => store.getters[`${module}/listParams`] ),
        setParams: ( e ) => store.dispatch(`${module}/setParams`, e ),

        createFetchingData: computed(() => store.getters[`${module}/createFetchingData`] ),
        createErrors: computed(() => store.getters[`${module}/createErrors`] ),
        create: () => store.dispatch(`${module}/create`),

        findOne: ( e ) => store.dispatch(`${module}/findOne`, e ),
        create: ( e ) => store.dispatch(`${module}/create`, e ),
        setStateChange: ( e ) => store.dispatch(`${module}/state_change`, e ),

        setFetchingData: ( e ) => store.dispatch(`${module}/setFetchingData`, e ),
    }
}