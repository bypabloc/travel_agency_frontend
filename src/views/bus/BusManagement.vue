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
                                            label: 'id',
                                            field: 'id',
                                        },
                                        {
                                            label: 'plate',
                                            field: 'plate',
                                        },
                                        {
                                            label: 'color',
                                            field: 'color',
                                        },
                                        {
                                            label: 'brand',
                                            field: 'brand',
                                        },
                                        {
                                            label: 'model',
                                            field: 'model',
                                        },
                                        {
                                            label: 'serial',
                                            field: 'serial',
                                        },
                                        {
                                            label: 'year',
                                            field: 'year',
                                        },
                                        {
                                            label: 'is_active',
                                            field: 'is_active',
                                        },
                                        {
                                            label: 'created_at',
                                            field: 'created_at',
                                        },
                                        {
                                            label: 'updated_at',
                                            field: 'updated_at',
                                        },
                                        {
                                            label: 'actions',
                                            field: 'actions',
                                        },
                                    ]"
                                    :list="listData.list"
                                    :per_page="listParams.per_page"
                                    @update="updateList"
                                >
                                    <template v-slot:actions="props">
                                        <ButtonCustom
                                            :classesNames="{
                                                btn_custom: 'btn btn-outline-warning d-flex align-items-center gap-2',
                                            }" 
                                            type="button" 
                                            text="Eliminar" 
                                            icon="alert-triangle" 
                                            :loading="props.dataFetchingData" 
                                            @click="deleteEvent({id:props.dataId})"
                                        />
                                        <ButtonCustom
                                            :classesNames="{
                                                btn_custom: 'btn btn-outline-danger d-flex align-items-center gap-2',
                                            }" 
                                            type="button" 
                                            text="Eliminar" 
                                            icon="trash" 
                                            :loading="props.dataFetchingData" 
                                            @click="deleteEvent({id:props.dataId})"
                                        />
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

    <pre>
        <code>
            {{ listData }}
        </code>
    </pre>
</template>

<script>
import { ref, reactive, computed, onBeforeMount, inject } from "vue";

import TableCustom from '@/components/Table.vue'
import ButtonCustom from '@/components/Button.vue'
import PaginationCustom from '@/components/Pagination.vue'
import Create from './Create.vue'

import useBus from '@/composables/useBus';

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
        } = useBus()

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

        const modal_create = ref(null)
        const modalEvent = () => {
            console.log('modal_create',modal_create)
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
        }
    },
}
</script>