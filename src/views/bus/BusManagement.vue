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
                                <button type="button" class="btn btn-outline-primary d-flex align-items-center gap-2">
                                    <vue-feather type="plus"></vue-feather> Nuevo
                                </button>
                                <button type="button" class="btn btn-outline-primary d-flex align-items-center gap-2" @click="getList">
                                    <vue-feather type="rotate-cw"></vue-feather> Actualizar
                                </button>
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
                                    :per_page="listParams.perPage"
                                    @update="updateList"
                                >
                                    <template v-slot:actions="props">
                                        <ButtonCustom
                                            :classesNames="{
                                                btn_custom: 'btn-outline-danger',
                                            }" 
                                            type="button" 
                                            text="Eliminar" 
                                            icon="fas fa-save" 
                                            :loading="props.dataFetchingData" 
                                            @click="deleteEvent({id:props.dataId})"
                                        />
                                    </template>
                                </TableCustom>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

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

import useBus from '@/composables/useBus';

export default {
    name: 'BusManagement',
    components:{
        TableCustom,
        ButtonCustom,
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

        const updateList = ({per_page}) => {
            setParams({
                per_page,
            })
            getList()
        }

        return {
            listFetchingData,
            listErrors,
            listData,
            listParams,
            updateList,
            getList,
        }
    },
}
</script>