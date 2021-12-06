<template>
    <v-select
        :options="countries"
        :filterable="false"
        @open="onOpen"
        @close="onClose"
        @search="(search, loading) => { 
            loading(true)
            fetch(search).then(loading(false));
        }"
    >
        <template v-slot:list-footer>
            <li v-show="hasNextPage" ref="load" class="loader">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Cargando items...
            </li>
        </template>

        <template v-slot:no-options>
            Indique una texto
        </template>

        <template v-slot:option="item">
            {{ item.name }}
        </template>

        <template v-slot:selected-option="item">
            <div class="selected d-center">
                {{ item }}
            </div>
        </template>
    </v-select>
</template>

<script>

export default {
    name: 'InfiniteScroll',
    data() {
        return {
            observer: null,
            limit: 10,
            search: '',
            countries: [
                {
                    id: 1,
                    name: 'Canada',
                    meta: {}
                },
                {
                    id: 2,
                    name: 'Nueva Zelanda',
                    meta: {}
                },
                {
                    id: 3,
                    name: 'Chile',
                    meta: {}
                },
                {
                    id: 4,
                    name: 'Colombia',
                    meta: {}
                },
                {
                    id: 5,
                    name: 'Peru',
                    meta: {}
                },
                {
                    id: 6,
                    name: 'Venezuela',
                    meta: {}
                },
                {
                    id: 7,
                    name: 'España',
                    meta: {}
                },
                {
                    id: 8,
                    name: 'Corea del Sur',
                    meta: {}
                },
                {
                    id: 9,
                    name: 'Bolivia',
                    meta: {}
                },
                {
                    id: 10,
                    name: 'Corea del Norte',
                    meta: {}
                },
                {
                    id: 11,
                    name: 'China',
                    meta: {}
                },
                {
                    id: 12,
                    name: 'Colombia',
                    meta: {}
                },
                {
                    id: 13,
                    name: 'Argentina',
                    meta: {}
                },
                {
                    id: 14,
                    name: 'Panama',
                    meta: {}
                },
                {
                    id: 15,
                    name: 'Ecuador',
                    meta: {}
                },
                {
                    id: 16,
                    name: 'El Salvador',
                    meta: {}
                },
                {
                    id: 17,
                    name: 'Noruega',
                    meta: {}
                },
                {
                    id: 18,
                    name: 'Mexico',
                    meta: {}
                },
                {
                    id: 19,
                    name: 'Uruguay',
                    meta: {}
                },
                {
                    id: 20,
                    name: 'Australia',
                    meta: {}
                },
                {
                    id: 21,
                    name: 'Suecia',
                    meta: {}
                },
                {
                    id: 22,
                    name: 'Rusia',
                    meta: {}
                },
            ],
        }
    },
    computed: {
        filtered() {
            return this.countries
        },
        paginated() {
            return this.filtered.slice(0, this.limit)
        },
        hasNextPage() {
            return this.paginated.length < this.filtered.length
        },
    },
    mounted() {
        this.observer = new IntersectionObserver(this.infiniteScroll)
    },
    methods: {
        fetch(e){
            console.log('e',e)
            return new Promise(resolve => setTimeout(() => {
                this.countries = [
                    {
                        id: 1,
                        name: 'canadaasd',
                        meta: {}
                    },
                ]
                resolve(true)
            }, 1000))
        },
        async onOpen() {
            console.log('onOpen')
            if (this.hasNextPage) {
                await this.$nextTick()
                this.observer.observe(this.$refs.load)
            }
        },
        onClose() {
            this.observer.disconnect()
        },
        string_random(length){
            let result             = '';
            const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        async infiniteScroll([{ isIntersecting, target }]) {
            if (isIntersecting) {
                const ul = target.offsetParent
                const scrollTop = target.offsetParent.scrollTop
                this.limit += 10
                await this.$nextTick()
                ul.scrollTop = scrollTop

                setTimeout(() => {
                    this.countries.push({
                        id: 1,
                        name: this.string_random(10),
                        meta: {}
                    })
                }, 1000)
            }
        },
    },
}
</script>

<style scoped>
    .loader {
        text-align: center;
        color: #bbbbbb;
    }
</style>