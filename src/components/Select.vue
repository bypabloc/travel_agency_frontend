<template>
    <v-select
        :options="listData.list"
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
            No hay items
        </template>

        <template v-slot:option="item">
            Placa: {{ item.plate }}
            <br>
            Color: <span 
                :style="{
                    height: '25px',
                    width: '25px',
                    'background-color': item.color,
                    borderRadius: '50%',
                    display: 'inline-block',
                }"
            ></span>
            <br>
            Marca: {{ item.brand }}
            <br>
            Modelo: {{ item.model }}
            <br>
            Serial: {{ item.serial }}
            <br>
            Año: {{ item.year }}
        </template>

        <template v-slot:selected-option="item">
            <div class="selected d-center">
                Placa: {{ item.plate }}
                <br>
                Color: <span 
                    :style="{
                        height: '25px',
                        width: '25px',
                        'background-color': item.color,
                        borderRadius: '50%',
                        display: 'inline-block',
                    }"
                ></span>
                <br>
                Marca: {{ item.brand }}
                <br>
                Modelo: {{ item.model }}
                <br>
                Serial: {{ item.serial }}
                <br>
                Año: {{ item.year }}
            </div>
        </template>

    </v-select>
</template>

<script>

import { ref, onMounted, nextTick, computed, onBeforeMount } from 'vue'

import useBus from '@/composables/useBus';

export default {
    name: 'SelectableInfiniteScroll',
    setup() {

        const {
            listFetchingData,
            listErrors,
            listParams,
            listData,
            setParams,
            getList,
        } = useBus()
        
        const load = ref(null);
        const observer = ref(null);
        const limit = ref(10);
        const search = ref('');
        
        const makeid = (length) => {
            let result             = '';
            const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const infiniteScroll = async ([{ isIntersecting, target }]) => {

            console.log('infiniteScroll',{ isIntersecting, target })

            if (isIntersecting) {
                const ul = target.offsetParent
                const scrollTop = target.offsetParent.scrollTop
                limit.value += 10
                await nextTick()
                ul.scrollTop = scrollTop

                setParams({
                    per_page: limit.value,
                    page: 1,
                    search,
                })
                getList()
            }
        }

        onBeforeMount(() => {
            setParams({
                per_page: limit.value,
                page: 1,
                search,
            })
            getList()
        })

        const onOpen = async () => {
            if (hasNextPage) {
                await nextTick()
                observer.value.observe(load.value)
            }
        }

        const onClose = async () => {
            observer.value.disconnect()
        }

        const hasNextPage = computed(() => {
            return listData.value.records_total > limit.value
        })

        const fetch = async (e) => {
            console.log('e',e)
            
            setParams({
                per_page: limit.value,
                page: 1,
                search: e,
            })

            try {
                await getList()
                return new Promise(resolve)
            } catch (error) {
                
            }
        }

        onMounted(() => {
            console.log('onMounted!')
            observer.value = new IntersectionObserver(infiniteScroll)
        })

        return {
            observer,
            limit,
            search,
            load,
            fetch,
            onOpen,
            onClose,
            hasNextPage,
            listData,
            listFetchingData,
            listErrors,
            listParams,
        }
    },
}
</script>

<style scoped>
    .loader {
        text-align: center;
        color: #bbbbbb;
    }
</style>