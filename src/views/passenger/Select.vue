<template>
    <div class="">
        <label :for="name" class="form-label">Pasajero</label>
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
                v-model="inputValue"
            >
                <template v-slot:list-footer>
                    <li v-show="hasNextPage" ref="load" class="loader">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Cargando items...
                    </li>
                    <li role="option" class="vs__dropdown-option">
                        <ButtonCustom
                            :classesNames="{
                                btn_custom: 'btn btn-outline-primary d-flex align-items-center gap-2',
                            }" 
                            type="button" 
                            text="Agregar" 
                            icon="plus" 
                            @click="createModalOpen"
                        />
                    </li>
                </template>

                <template v-slot:no-options>
                    No hay items
                </template>

                <template v-slot:option="item">
                    Documento: {{ item.document }}
                    <br>
                    Nombres: {{ item.names }}
                    <br>
                    Apellidos: {{ item.lastname }}
                    <br>
                    Fecha de nacimiento: {{ item.date_of_birth }}
                    <br>
                    <br>
                </template>

                <template v-slot:selected-option="item">
                    <div class="selected d-center">
                        Documento: {{ item.document.substring(0,10) }}
                        <br>
                        Nombres: {{ item.names.substring(0,10) }}
                        <br>
                        Apellidos: {{ item.lastname.substring(0,10) }}
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
    
    <CreatePassengerModal
        ref="create_modal"
        @finish_success="reset"
    />
</template>

<script>
import vSelect from 'vue-select'

import { ref, onMounted, nextTick, computed, onBeforeMount, watch } from 'vue'

import CreatePassengerModal from '@/views/passenger/Create.vue'

import ButtonCustom from '@/components/Button.vue'

import usePassenger from '@/composables/usePassenger';

export default {
    name: 'SelectableInfiniteScroll',
    components: {
        'v-select': vSelect,
        CreatePassengerModal,
        ButtonCustom,
    },
    props: {
        type: {
            type: String,
            default: "select",
        },
        value: {
            type: [String, Number],
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

        const { value } = props;

        const {
            listErrors,
            listData,
            setParams,
            getList,
        } = usePassenger()
        
        const load = ref(null);
        const observer = ref(null);
        const limit = ref(10);
        const search = ref('');

        const inputValue = ref(value)

        watch(
            () => inputValue.value,
            (inputValue, prevInputValue) => {
                console.log('inputValue',inputValue)
            }
        )
        
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

        const onClose = async () => {
            observer.value.disconnect()
        }

        const reset = () => {
            inputValue.value = ''
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
                            ctx.emit("update:modelValue", undefined);
                            ctx.emit("change");
                        }
                    }
                }
            }else{
                console.log("update:modelValue")
                ctx.emit("update:modelValue", e.id);
                ctx.emit("change", e);
            }
        };

        const create_modal = ref(null);
        const createModalOpen = () => {
            create_modal.value.open();
        }

        return {
            onChange,
            load,
            reset,
            fetch,
            onOpen,
            onClose,
            hasNextPage,
            listData,
            listErrors,
            inputValue,

            create_modal,
            createModalOpen,
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