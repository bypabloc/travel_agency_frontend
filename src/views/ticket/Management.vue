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
                                            field: 'seat_x',
                                            label: 'X',
                                            type: 'text',
                                            limit: 10,
                                        },
                                        {
                                            field: 'seat_y',
                                            label: 'Y',
                                            type: 'text',
                                            limit: 10,
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
                                    <template v-slot:custom="{ dataRow }">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" :checked="dataRow.is_active" @change="state_change({
                                                active: $event.target.checked,
                                                id: dataRow.id,
                                            })">
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

        const state_change = ({id, active}) => {
            setStateChange({id, active}).then(getList)
            
        }

        return {
            listFetchingData,
            listErrors,
            listData,
            listParams,
            updateList,
            getList,
            state_change,
        }
    },
}
</script>