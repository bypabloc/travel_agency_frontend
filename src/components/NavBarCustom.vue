<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

            <a class="navbar-brand" href="/">Travel Agency</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                  
                  <li class="nav-item" v-for="(item, index) in menu.items" :key="index">
                      <template v-if="item.isActive">
                          <router-link :to="item.url" class="nav-link" active-class="active">{{item.text}}</router-link>
                          <hr class="dropdown-divider" v-if="item.divider">
                      </template>
                  </li>
              </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'NavBarCustom',
    setup() {
        const menu = ref({
            items: [
                {
                    name: 'Home',
                    url: '/',
                    text: 'Inicio',
                    component: 'Home.vue',
                    divider: true,
                    isActive: true,
                },
                {
                    name: 'Buses',
                    url: '/buses',
                    text: 'Buses',
                    component: 'Buses.vue',
                    isActive: false,
                },
                {
                    name: 'Drivers',
                    url: '/drivers',
                    text: 'Choferes',
                    component: 'Drivers.vue',
                    divider: true,
                    isActive: false,
                },
                {
                    name: 'Location',
                    url: '/locations',
                    text: 'Ubicaciones',
                    component: 'Location.vue',
                    isActive: false,
                },
                {
                    name: 'Journey',
                    url: '/journeys',
                    text: 'Trayectos',
                    component: 'Journey.vue',
                    divider: true,
                    isActive: false,
                },
                {
                    name: 'Passenger',
                    url: '/passengers',
                    text: 'Trayectos',
                    component: 'Passenger.vue',
                    divider: true,
                    isActive: false,
                },
                {
                    name: 'Seat',
                    url: '/seats',
                    text: 'Asientos',
                    component: 'Seat.vue',
                    isActive: false,
                },
                {
                    name: 'JourneyDriver',
                    url: '/journeys_drivers',
                    text: 'Viajes',
                    component: 'JourneyDriver.vue',
                    isActive: false,
                },
                {
                    name: 'Ticket',
                    url: '/tickets',
                    text: 'Boletos',
                    component: 'Ticket.vue',
                    isActive: false,
                },
            ]
        })

        return {
            menu,
        }
    },
}
</script>

<style scoped lang="scss">

</style>
