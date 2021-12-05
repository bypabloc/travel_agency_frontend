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
                                <button type="button" class="btn btn-outline-primary d-flex align-items-center gap-2">
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
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Bus Name</th>
                                                <th>Bus Number</th>
                                                <th>Bus Type</th>
                                                <th>Bus Capacity</th>
                                                <th>Bus Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- <tr v-for="bus in buses">
                                                <td>{{ bus.bus_name }}</td>
                                                <td>{{ bus.bus_number }}</td>
                                                <td>{{ bus.bus_type }}</td>
                                                <td>{{ bus.bus_capacity }}</td>
                                                <td>{{ bus.bus_status }}</td>
                                                <td>
                                                    <button class="btn btn-primary" @click="editBus(bus)">Edit</button>
                                                    <button class="btn btn-danger" @click="deleteBus(bus)">Delete</button>
                                                </td>
                                            </tr> -->
                                        </tbody>
                                    </table>
                                </div>
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

import useBus from '@/composables/useBus';

export default {
    name: 'BusManagement',
    setup() {

        const {
            listFetchingData,
            listErrors,
            listData,
            getList,
        } = useBus()

        getList({
            page: '',
            per_page:'',
        })

        return {
            listFetchingData,
            listErrors,
            listData,
            getList,
        }
    },
}
</script>