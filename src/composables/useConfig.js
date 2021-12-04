import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default () => {

    const object = 'config';

    const store = useStore();

    // dispatch -> actions
    // commit -> mutations

    console.log('useConfig',store)

    return {
        getMenuItemsStatic: (e) => store.getters[`${object}/getMenuItems`] ,
        getMenuItems: computed((e) => store.getters[`${object}/getMenuItems`] ),

        // Methods
        // Ex:
        // setFetchingData: ( e ) => store.dispatch(`${object}/setFetchingData`, e ),
    }
}