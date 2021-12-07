<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col">
                            <h4 class="card-title">Lista de disponibles</h4>
                        </div>
                        <div class="col">
                            <div class="d-flex justify-content-end gap-2">
                                <ButtonCustom
                                    :classesNames="{
                                        btn_custom: 'btn btn-outline-primary d-flex align-items-center gap-2',
                                    }" 
                                    type="button" 
                                    text="Actualizar" 
                                    icon="rotate-cw" 
                                    :loading="listFetchingDataJourneyDriver" 
                                    @click="getListJourneysAvailables"
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
                                            label: 'Tickets disponibles',
                                            field: 'seats',
                                            type: 'custom',
                                        },
                                    ]"
                                    :list="listDataJourneyDriver.list"
                                    :per_page="listParamsJourneyDriver.per_page"
                                    @update="updateList"
                                >
                                    <template v-slot:custom="{ dataRow, dataField, dataFieldExact }">
                                        <div v-if="dataField == 'journey_data'">
                                            {{ secondsToHHMMSS(dataFieldExact.duration_in_seconds*1000) }}
                                        </div>
                                        <div v-else-if="dataField == 'seats'">
                                            {{ ticketsAvailable(dataFieldExact) }}
                                        </div>
                                        <div v-else-if="dataField == 'estimated_time'">
                                            {{ moment(dataRow.datetime_start+'-00:00').local().add(dataRow.journey_data.duration_in_seconds, 'seconds').format('DD/MM/YYYY HH:mm:ss') }}
                                        </div>
                                        <div v-else>
                                            {{ dataFieldExact }}
                                        </div>
                                    </template>
                                </TableCustom>
                                <PaginationCustom
                                    :page="listDataJourneyDriver.page"
                                    :per_page="listDataJourneyDriver.per_page"
                                    :last_page="listDataJourneyDriver.last_page"
                                    :next_page="listDataJourneyDriver.next_page"
                                    :prev_page="listDataJourneyDriver.prev_page"
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
import { useRouter, useRoute } from 'vue-router'

import moment from 'moment';

import TableCustom from '@/components/Table.vue'
import ButtonCustom from '@/components/Button.vue'
import PaginationCustom from '@/components/Pagination.vue'

import useTicket from '@/composables/useTicket';
import useJourneyDriver from '@/composables/useJourneyDriver';

export default {
    name: 'TicketManagement',
    components:{
        TableCustom,
        ButtonCustom,
        PaginationCustom,
    },
    setup(props) {

        const route = useRoute()

        // https://stackoverflow.com/a/66252205/7100847
        const {
            sort,
            sort_by,
            location_origin,
            location_destination,
            date_start,
            date_end,
        } = route.query

        console.log('route.query',route.query);

        const {
            listFetchingData,
            listErrors,
            listData,
            listParams,
            setParams,
            getList,
            setStateChange,
        } = useTicket()

        const {
            listFetchingData: listFetchingDataJourneyDriver,
            listErrors: listErrorsJourneyDriver,
            listData: listDataJourneyDriver,
            listParams: listParamsJourneyDriver,
            setParams: setParamsJourneyDriver,
            getListJourneysAvailables,
        } = useJourneyDriver()

        onBeforeMount(() => {
            const params = {
                sort,
                sort_by,
                location_origin,
                location_destination,
                date_start,
                date_end,
            }
            console.log('params',params);
            setParamsJourneyDriver(params)
            getListJourneysAvailables()
        })

        const updateList = ({per_page, page}) => {
            setParamsJourneyDriver({
                per_page,
                page,
                sort,
                sort_by,
                location_origin,
                location_destination,
                date_start,
                date_end,
            })
            getListJourneysAvailables()
        }

        const state_change = ({id, active}) => {
            setStateChange({id, active}).then(getListJourneysAvailables)
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

        const ticketsAvailable = (seats) => {
            return 10 - seats.map(seat => !seat.available).reduce((a,b) => a+b, 0)
        }

        return {
            listFetchingData,
            listErrors,
            listData,
            listParams,
            updateList,
            state_change,
            ticketsAvailable,

            listParamsJourneyDriver,
            listFetchingDataJourneyDriver,
            getListJourneysAvailables,
            listDataJourneyDriver,

            moment,
            secondsToHHMMSS,
        }
    },
}
</script>