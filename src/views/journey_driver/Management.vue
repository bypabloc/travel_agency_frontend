<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col">
                            <h4 class="card-title">Listado</h4>
                        </div>
                        <div class="col">
                            <div class="d-flex justify-content-end gap-2">
                                <ButtonCustom
                                    :classesNames="{
                                        btn_custom: 'btn btn-outline-primary d-flex align-items-center gap-2',
                                    }" 
                                    type="button" 
                                    text="Filtrar" 
                                    icon="filter" 
                                    @click="modalFilterEvent"
                                />
                                <ButtonCustom
                                    :classesNames="{
                                        btn_custom: 'btn btn-outline-primary d-flex align-items-center gap-2',
                                    }" 
                                    type="button" 
                                    text="Nuevo" 
                                    icon="plus" 
                                    @click="modalEvent"
                                />
                                <ButtonCustom
                                    :classesNames="{
                                        btn_custom: 'btn btn-outline-primary d-flex align-items-center gap-2',
                                    }" 
                                    type="button" 
                                    text="Actualizar" 
                                    icon="rotate-cw" 
                                    :loading="listFetchingData" 
                                    @click="getList"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-content collapse show">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <TableCustom
                                    :columns="[
                                        {
                                            label: 'N°',
                                            field: 'id',
                                        },
                                        {
                                            label: 'Trayecto',
                                            field: 'journey_data',
                                            type: 'custom',
                                        },
                                        {
                                            field: 'datetime_start',
                                            label: 'Hora de Salida',
                                            type: 'datetime',
                                            format: 'DD/MM/YYYY HH:mm:ss',
                                        },
                                        {
                                            label: 'Tiempo estimado de llegada',
                                            field: 'estimated_time',
                                            type: 'custom',
                                        },
                                        {
                                            label: 'Chofer',
                                            field: 'driver_data',
                                            type: 'custom',
                                        },
                                        {
                                            label: '% de capacidad vendida',
                                            field: 'average_capacity_sold',
                                            type: 'text',
                                        },
                                        {
                                            label: 'Estado',
                                            field: 'states',
                                            type: 'custom',
                                        },
                                        {
                                            label: 'Creado en',
                                            field: 'created_at',
                                            type: 'datetime-ago',
                                        },
                                        {
                                            label: 'Actualizado en',
                                            field: 'updated_at',
                                            type: 'datetime-ago',
                                        },
                                    ]"
                                    :list="listData.list"
                                    :per_page="listParams.per_page"
                                    @update="updateList"
                                >
                                    <template v-slot:custom="{ dataRow, dataField, dataFieldExact }">
                                        <div v-if="dataField == 'journey_data'">
                                            {{ dataFieldExact.location_origin.name }} -
                                            {{ dataFieldExact.location_destination.name }}
                                            <br>
                                            Tiempo estimado: 
                                            {{ secondsToHHMMSS(dataFieldExact.duration_in_seconds*1000) }}
                                        </div>
                                        <div v-else-if="dataField == 'estimated_time'">
                                            {{ moment(dataRow.datetime_start+'-00:00').local().add(dataRow.journey_data.duration_in_seconds, 'seconds').format('DD/MM/YYYY HH:mm:ss') }}
                                        </div>
                                        <div v-else-if="dataField == 'driver_data'">
                                            Documento: {{ dataFieldExact.document.substring(0,10) }}
                                            <br>
                                            Nombres: {{ dataFieldExact.names.substring(0,10) }}
                                            <br>
                                            Apellidos: {{ dataFieldExact.lastname.substring(0,10) }}
                                        </div>
                                        <div v-else-if="dataField == 'states'">
                                            <select class="form-select" @change="state_change({
                                                id: dataRow.id,
                                                states: $event.target.value,
                                            })">
                                                <option 
                                                    :value="item.value"
                                                    v-for="(item, index) in states" :key="index"
                                                    :selected="dataFieldExact==item.value"
                                                >
                                                    {{ item.text }}
                                                </option>
                                            </select>
                                        </div>
                                        <div v-else>
                                            {{ dataFieldExact }}
                                        </div> 
                                    </template>
                                </TableCustom>
                                <PaginationCustom
                                    :page="listData.page"
                                    :per_page="listData.per_page"
                                    :last_page="listData.last_page"
                                    :next_page="listData.next_page"
                                    :prev_page="listData.prev_page"
                                    @update="updateList"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Create
        ref="modal_create"
        @finish_success="getList"
    />
    <Filter
        ref="modal_filter"
        @finish_success="getList"
    />
</template>

<script>
import { ref, onBeforeMount } from "vue";

import moment from 'moment';

import TableCustom from '@/components/Table.vue'
import ButtonCustom from '@/components/Button.vue'
import PaginationCustom from '@/components/Pagination.vue'

import Create from './Create.vue'
import Filter from './Filter.vue'

import useJourneyDriver from '@/composables/useJourneyDriver';

export default {
    name: 'BusManagement',
    components:{
        TableCustom,
        ButtonCustom,
        PaginationCustom,
        Create,
        Filter,
    },
    setup() {

        const {
            listFetchingData,
            listErrors,
            listData,
            listParams,
            setParams,
            getList,
            setStateChange,
        } = useJourneyDriver()

        onBeforeMount(() => {
            getList()
        })

        const updateList = ({per_page, page}) => {
            setParams({
                per_page,
                page,
            })
            getList()
        }

        const state_change = ({id, states}) => {
            setStateChange({id, states}).then(getList)
        }
        
        const modal_create = ref(null)
        const modalEvent = () => {
            modal_create.value.open();
        }

        const modal_filter = ref(null)
        const modalFilterEvent = () => {
            console.log('modalFilterEvent',modal_filter.value)
            modal_filter.value.open();
        }

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

        const states = [
            {
                value: 1,
                text: 'Creado',
            },
            {
                value: 2,
                text: 'En proceso',
            },
            {
                value: 3,
                text: 'Finalizado',
            },
            {
                value: 4,
                text: 'Anulado',
            },
        ];

        return {
            listFetchingData,
            listErrors,
            listData,
            listParams,
            updateList,
            getList,
            modalEvent,
            modal_create,
            state_change,
            secondsToHHMMSS,
            moment,
            states,
            modalFilterEvent,
            modal_filter,
        }
    },
}
</script>