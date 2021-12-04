<template>
    <!-- <NavBarCustom/>
    <div class="container">
        <LoaderViews/>
    </div> -->

    <div class="wrapper">
        <SideBarCustom/>
    
        <div id="content">
            <NavBarCustom/>
            <div
                class="container"
                >

                <h2>Collapsible Sidebar Using Bootstrap 4</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <div class="line"></div>

                <h2>Lorem Ipsum Dolor</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <div class="line"></div>

                <h2>Lorem Ipsum Dolor</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <div class="line"></div>

                <h3>Lorem Ipsum Dolor</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>

        </div>

    </div>
</template>

<script>
import { ref } from 'vue'
import NavBarCustom from './components/NavBarCustom.vue'
import SideBarCustom from './components/SideBarCustom.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import LoaderViews from '@/components/LoaderViews.vue'

export default {
    name: 'NavBar',
    components: {
        NavBarCustom,
        SideBarCustom,
        HelloWorld,
        LoaderViews,
    },
    setup() {

        const isOpenSideBar = ref(false);
        const isOpenNavBar = ref(false);

        const collapseSideBar = () => {
            isOpenSideBar.value = !isOpenSideBar.value;
        }
        const collapseNavBar = () => {
            isOpenNavBar.value = !isOpenNavBar.value;
        }

        return {
            collapseSideBar,
            isOpenSideBar,

            collapseNavBar,
            isOpenNavBar,
        }
    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    align-items: stretch;
}
ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #6d7fcc;
}

#content {
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
}
</style>
