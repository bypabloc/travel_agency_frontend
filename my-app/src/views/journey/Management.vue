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
                                            field: 'location_origin_data',
                                            label: 'Ubicación de salida',
                                            search_object: 'name',
                                            type: 'text',
                                            limit: 10,
                                        },
                                        {
                                            field: 'location_destination_data',
                                            label: 'Ubicación de llegada',
                                            search_object: 'name',
                                            type: 'text',
                                            limit: 10,
                                        },
                                        {
                                            field: 'duration_in_seconds',
                                            label: 'Duración en segundos',
                                            type: 'seconds-to-time',
                                        },
                                        {
                                            field: 'quantity_journey_driver',
                                            label: 'Cantidad de viajes',
                                            type: 'custom',
                                        },
                                        {
                                            field: 'quantity_ticket_sold',
                                            label: 'Cantidad de tickets vendidos',
                                            type: 'custom',
                                        },
                                        {
                                            field: 'average_passengers',
                                            label: 'Promedio de pasajeros',
                                            type: 'custom',
                                        },
                                        {
                                            label: 'Activo',
                                            field: 'is_active',
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
                                        <div v-if="dataField == 'is_active'">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" :checked="dataRow.is_active" @change="state_change({
                                                    active: $event.target.checked,
                                                    id: dataRow.id,
                                                })">
                                            </div>
                                        </div>
                                        <div v-else-if="dataField == 'average_passengers'">
                                            {{ dataFieldExact || '-' }}
                                        </div>
                                        <div v-else-if="dataField == 'quantity_ticket_sold'">
                                            {{ dataFieldExact || '-' }}
                                        </div>
                                        <div v-else-if="dataField == 'quantity_journey_driver'">
                                            {{ dataFieldExact || '-' }}
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
</template>

<script>
import { ref, onBeforeMount } from "vue";

import TableCustom from '@/components/Table.vue'
import ButtonCustom from '@/components/Button.vue'
import PaginationCustom from '@/components/Pagination.vue'
import Create from './Create.vue'

import useJourney from '@/composables/useJourney';

export default {
    name: 'BusManagement',
    components:{
        TableCustom,
        ButtonCustom,
        PaginationCustom,
        Create,
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
        } = useJourney()

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

        const state_change = ({id, active}) => {
            setStateChange({id, active}).then(getList)
            
        }

        const modal_create = ref(null)
        const modalEvent = () => {
            modal_create.value.open();
        }

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
        }
    },
}
</script>