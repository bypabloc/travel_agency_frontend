import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default () => {

    const object = 'config';

    const store = useStore();

    // dispatch -> actions
    // commit -> mutations

    console.log('useConfig')

    return {
        getMenuItems: computed((e) => store.getters[`${object}/getMenuItems`] ),
        isOpenSideBar: computed((e) => store.getters[`${object}/isOpenSideBar`] ),
        isOpenNavBar: computed((e) => store.getters[`${object}/isOpenNavBar`] ),

        // Methods
        isOpenSideBarChange: () => store.dispatch(`${object}/isOpenSideBarChange`),
        isOpenNavBarChange: () => store.dispatch(`${object}/isOpenNavBarChange`),
    }
}