<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

            <a class="navbar-brand" href="/">Travel Agency</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                  <li class="nav-item">
                      <router-link to="/" class="nav-link" active-class="active">Home</router-link>
                      <hr class="dropdown-divider">
                  </li>
                  <li class="nav-item" v-for="(item, index) in menu" :key="index">
                      <template v-if="item.isActive">
                          <router-link :to="item.path" class="nav-link" active-class="active">{{item.text}}</router-link>
                          <hr class="dropdown-divider" v-if="item.divider">
                      </template>
                  </li>
              </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import useConfig from '@/composables/useConfig'

export default {
    name: 'NavBarCustom',
    setup() {

        const {
            getMenuItems: menu
        } = useConfig()

        return {
            menu,
        }
    },
}
</script>

<style scoped lang="scss">

</style>
