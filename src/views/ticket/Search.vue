<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col">
                            <h4 class="card-title">Buscar viajes</h4>
                        </div>
                        <div class="col">
                            <div class="d-flex justify-content-end gap-2">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-content collapse show">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                                <div class="d-flex align-items-center" :style="{
                                        height: '100%',
                                        width: '100%',
                                    }">
                                    <InputDate
                                        name="range"
                                        type="range"
                                        label="Fecha de salida y fecha de regreso"
                                        placeholder=""
                                        v-model="formValues.range"
                                        :errors="formValuesErrors.date_end"
                                        @change="changeRange"
                                    />
                                </div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3">
                                <div class="d-flex align-items-center" :style="{
                                        height: '100%',
                                        width: '100%',
                                    }">
                                    <LocationSelect
                                        name="location_origin"
                                        label="Origen"
                                        v-model="formValues.location_origin"
                                        :value="formValues.location_origin"
                                        :errors="formValuesErrors.location_origin"
                                        :params="{
                                            available: 1,
                                        }"
                                    />
                                </div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3">
                                <div class="d-flex align-items-center" :style="{
                                        height: '100%',
                                        width: '100%',
                                    }">
                                    <LocationSelect
                                        name="location_destination"
                                        label="Destino"
                                        v-model="formValues.location_destination"
                                        :value="formValues.location_destination"
                                        :errors="formValuesErrors.location_destination"
                                        :params="{
                                            available: 1,
                                        }"
                                    />
                                </div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-1 col-xl-1 col-xxl-1">
                                <div class="d-flex align-items-center" :style="{
                                        height: '100%',
                                    }">
                                    <ButtonCustom
                                        :classesNames="{
                                            btn_custom: 'btn btn-primary d-flex align-items-center gap-2',
                                        }" 
                                        type="button" 
                                        text="Buscar" 
                                        icon="search" 
                                        @click="searchEvent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onBeforeMount, reactive } from "vue";
import { useRouter, useRoute } from 'vue-router'

import * as yup from 'yup';
import moment from 'moment';

import TableCustom from '@/components/Table.vue'
import ButtonCustom from '@/components/Button.vue'
import PaginationCustom from '@/components/Pagination.vue'
import InputDate from '@/components/InputDate.vue'

import useTicket from '@/composables/useTicket';

import { getErrorsFromYup } from '@/helpers'

import LocationSelect from '@/views/location/Select.vue'

export default {
    name: 'BusManagement',
    components:{
        TableCustom,
        ButtonCustom,
        PaginationCustom,
        InputDate,
        LocationSelect,
    },
    setup() {

        const router = useRouter()

        const {
            listFetchingData,
            listErrors,
            listData,
            listParams,
            setParams,
            getList,
            setStateChange,
        } = useTicket()

        onBeforeMount(() => {
            getList()
        })

        const schemaCreate = yup.object().shape({
            location_origin: yup.number().required(),
            location_destination: yup.number().required().notOneOf([yup.ref('location_origin'), null]),
            date_start: yup.date().required(),
            date_end: yup.date().required('The field is required'),
        });

        let formValues = reactive({});

        const formValuesErrors = ref({});

        const updateList = ({per_page, page}) => {
            setParams({
                per_page,
                page,
            })
            getList()
        }

        const state_change = ({id, active}) => {
            setStateChange({id, active}).then(getList)
        }

        const changeRange = ({start, end}) => {
            console.log('changeRange',{start, end})
            formValues['date_start'] = start;
            formValues['date_end'] = end;
        }

        const searchEvent = async () => {
            console.log('searchEvent')

            try {
                await schemaCreate.validate(formValues, { abortEarly: false })
                for (const key in formValuesErrors.value) {
                    formValuesErrors.value[key] = []
                }

                router.push({
                    name: 'JourneysAvailable',
                    query: {
                        sort: 'desc',
                        sort_by: 'created_at',
                        tz_in_minutes: new Date().getTimezoneOffset(),
                        location_origin: formValues.location_origin,
                        location_destination: formValues.location_destination,
                        date_start: moment(formValues['date_start']).format('YYYY-MM-DD'),
                        date_end: moment(formValues['date_end']).format('YYYY-MM-DD'),
                    },
                })


            } catch (err) {
                console.log('createEvent -> catch', err)
                formValuesErrors.value = getErrorsFromYup({arr:formValuesErrors.value, err})
            }
            
        }

        return {
            listFetchingData,
            listErrors,
            listData,
            listParams,
            updateList,
            getList,
            state_change,
            formValues,
            formValuesErrors,
            changeRange,
            searchEvent,
        }
    },
}
</script>