<template>
    <div class="">
        <label :for="name" class="form-label">Trayecto</label>
        <div class="input-group mb-3">
            <v-select
                :options="listData.list"
                :filterable="false"

                :style="{
                    width: '100%',
                }"
                
                @option:selected="onChange"
                @option:deselecting="onChange"
                @option:deselected="onChange"
                @onChange="onChange"
                @input="onChange"
                @click="onChange"
                @change="onChange"
                
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
                    <!-- <li 
                        class="loader"
                        :style="{
                            'display': 'flex',
                            'justify-content': 'center',
                            'align-content': 'center',
                        }"
                        >
                        Agregar
                    </li> -->
                </template>

                <template v-slot:no-options>
                    No hay items
                </template>

                <template v-slot:option="item">
                    Nombre: {{ item.location_origin_data.name }} - {{ item.location_destination_data.name }}
                    <br/>
                    Duración: {{ secondsToHHMMSS(item.duration_in_seconds*1000) }}
                </template>

                <template v-slot:selected-option="item">
                    <div class="selected d-center">
                        {{ item.location_origin_data.name }} - {{ item.location_destination_data.name }}
                    </div>
                </template>

            </v-select>
            <div 
                :class="[
                    (
                    errors.length ? 'invalid-feedback-custom-label ' : ''
                    ),
                ]"
                v-if="errors.length"
                >
                <ul>
                    <li v-for="(item, index) in errors" :key="index" :value="item">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'

import { ref, onMounted, nextTick, computed, onBeforeMount, watch } from 'vue'

import useJourney from '@/composables/useJourney';

export default {
    name: 'SelectableInfiniteScroll',
    components: {
        'v-select': vSelect,
    },
    props: {
        type: {
            type: String,
            default: "select",
        },
        value: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: null,
        },
        successMessage: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        errors: {
            type: Array,
            default: [],
        },
    },
    setup(props, ctx) {

        const {
            listErrors,
            listData,
            setParams,
            getList,
        } = useJourney()
        
        const load = ref(null);
        const observer = ref(null);
        const limit = ref(10);
        const search = ref('');

        const { value } = props

        const inputValue = ref(value)

        watch(
            () => inputValue.value,
            (inputValue, prevInputValue) => {
                console.log('inputValue',inputValue)
            }
        )

        console.log('inputValue',inputValue)
        
        const infiniteScroll = async ([{ isIntersecting, target }]) => {
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
            getList()
            if (hasNextPage) {
                await nextTick()
                observer.value.observe(load.value)
            }
        }

        const onClose = async (e) => {
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

        const onChange = (e) => {
            if(!e?.id){
                console.log('onChange',e)
                const path = e.path
                for (const el of path) {
                    if(el.tagName == 'BUTTON'){
                        if(el.classList.contains('vs__clear')){
                            ctx.emit("update:modelValue", `${0}`);
                            ctx.emit("change");
                        }
                    }
                }
            }else{
                console.log("update:modelValue")
                ctx.emit("update:modelValue", `${e.id}`);
                ctx.emit("change", e);
            }
        };


        const secondsToHHMMSS = (count) => {
            const _second = 1000;
            const _minute = _second * 60;
            const _hour = _minute * 60;
            const _day = _hour * 24;

            const days = Math.floor(count / _day);
            const hours = Math.floor((count % _day) / _hour);
            const minutes = Math.floor((count % _hour) / _minute);
            const seconds = Math.floor((count % _minute) / _second);

            return `
                ${days ? (days>9 ? days : '0'+days)+':' : ''}
                ${hours ? (hours>9 ? hours : '0'+hours)+':' : (days ? '00' : '')}
                ${minutes ? (minutes>9 ? minutes : ':0'+minutes)+':' : (hours ? '00' : '')}
                ${seconds ? (seconds>9 ? seconds : ':0'+seconds) : (minutes ? '00' : '')}
            `.replace(/ /g,'').replace(/(\r\n|\n|\r)/gm,'');
        }

        return {
            onChange,
            load,
            fetch,
            onOpen,
            onClose,
            hasNextPage,
            listData,
            listErrors,
            secondsToHHMMSS,
        };
    },
};
</script>

<style scoped>
    .invalid-feedback-custom-label {
        width: 100%;
        margin-top: .25rem;
        font-size: 80%;
        color: #dc3545;
    }

    .invalid-feedback-custom {
        width: 100%;
        margin-top: .25rem;
        /* font-size: 80%; */
        color: #dc3545;
    }

    label {
        font-weight: bold;
    }
</style>