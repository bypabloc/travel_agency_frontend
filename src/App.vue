<template>
    <div class="wrapper">
        <SideBarCustom/>
        <div id="content">
            <NavBarCustom/>
            <div class="container">
                <LoaderViews/>
                <div class="line"></div>
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

.line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
}
</style>
