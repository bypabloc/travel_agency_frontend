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
                                <router-link to="/ticket_search" class="btn btn-outline-primary d-flex align-items-center gap-2">
                                    <vue-feather type="search"></vue-feather>Buscar viajes disponibles
                                </router-link>
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
                                            label: 'Asiento',
                                            field: 'seat',
                                            type: 'custom',
                                        },
                                        {
                                            label: 'Cliente',
                                            field: 'passenger',
                                            type: 'custom',
                                        },
                                        {
                                            label: 'Viaje',
                                            field: 'journey_driver',
                                            type: 'custom',
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
                                        <div v-if="dataField == 'seat'">
                                            <strong>Fila: </strong>{{ dataFieldExact.seat_y }}
                                            <br>
                                            <strong>N°: </strong>{{ dataFieldExact.seat_x }}
                                        </div>
                                        <div v-else-if="dataField == 'passenger'">
                                            <strong>Documento: </strong>{{ dataFieldExact.document.substring(0,10) }}
                                            <br>
                                            <strong>Nombres: </strong>{{ dataFieldExact.names.substring(0,10) }}
                                            <br>
                                            <strong>Apellidos: </strong>{{ dataFieldExact.lastname.substring(0,10) }}
                                        </div>
                                        <div v-else-if="dataField == 'journey_driver'">
                                            <strong>Origen: </strong>{{ dataFieldExact.journey.location_origin.name.substring(0,10) }}
                                            <br>
                                            <strong>Destino: </strong>{{ dataFieldExact.journey.location_destination.name.substring(0,10) }}
                                            <br>
                                            <strong>Fecha de salida: </strong>{{ moment(dataFieldExact.datetime_start+'-00:00').local().add(dataFieldExact.journey.duration_in_seconds, 'seconds').format('DD/MM/YYYY HH:mm:ss') }}
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

</template>

<script>
import { ref, onBeforeMount } from "vue";

import moment from 'moment';

import TableCustom from '@/components/Table.vue'
import ButtonCustom from '@/components/Button.vue'
import PaginationCustom from '@/components/Pagination.vue'

import useTicket from '@/composables/useTicket';

export default {
    name: 'TicketManagement',
    components:{
        TableCustom,
        ButtonCustom,
        PaginationCustom,
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
        } = useTicket()

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

        const states = [
            {
                value: 1,
                text: 'Solicitado',
            },
            {
                value: 2,
                text: 'Pagado',
            },
            {
                value: 3,
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
            state_change,
            moment,
            states,
        }
    },
}
</script>