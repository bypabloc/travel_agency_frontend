<template>
    <NavBarCustom/>
    <div class="container">
        <LoaderViews/>
    </div>
</template>

<script>
import NavBarCustom from './components/NavBarCustom.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import LoaderViews from '@/components/LoaderViews.vue'

export default {
    name: 'NavBar',
    components: {
        NavBarCustom,
        HelloWorld,
        LoaderViews,
    },
}
</script>

<style lang="scss">

</style>
