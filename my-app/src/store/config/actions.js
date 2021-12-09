import * as types from './types'

export default {
    isOpenSideBarChange ({commit}) {
        commit(types.isOpenSideBarChange)
    },
    isOpenNavBarChange ({commit}) {
        commit(types.isOpenNavBarChange)
    },
}