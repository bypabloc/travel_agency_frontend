<template>
    <NavBarCustom/>
    <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
</template>

<script>
import NavBarCustom from './components/NavBarCustom.vue'
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'NavBar',
    components: {
        NavBarCustom,
        HelloWorld,
    },
}
</script>

<style lang="scss">

</style>
