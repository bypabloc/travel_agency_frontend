import * as types from './types'

export default {
    [types.isOpenSideBarChange] (state){
        state.isOpenSideBar = !state.isOpenSideBar
    },
    [types.isOpenNavBarChange] (state){
        state.isOpenNavBar = !state.isOpenNavBar
    },
}
