<template>
    <div class="" :style="{
            width: '100%',
        }">
        <label :for="name" class="form-label">{{ label || 'Ubicaciones'  }}</label>
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
                    {{ item.name }}
                </template>

                <template v-slot:selected-option="item">
                    <div class="selected d-center">
                        {{ item.name }}
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

import { ref, onMounted, nextTick, computed, onBeforeMount } from 'vue'

import useLocation from '@/composables/useLocation';

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
        params: {
            type: Object,
            default: {},
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
        } = useLocation()
        
        const load = ref(null);
        const observer = ref(null);
        const limit = ref(10);
        const search = ref('');
        
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
                    ...props.params,
                })
                getList()
            }
        }

        onBeforeMount(() => {
            setParams({
                per_page: limit.value,
                page: 1,
                search,
                ...props.params,
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
                ...props.params,
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
                            ctx.emit("update:modelValue", undefined);
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

        return {
            onChange,
            load,
            fetch,
            onOpen,
            onClose,
            hasNextPage,
            listData,
            listErrors,
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