<template>
    <modal
        ref="modal"
        :custom="{
            bg: {
                'header': 'primary',
            },
            size: 'full',
        }"
        @close="close"
    >
        <template v-slot:title>
            <h5 class="modal-title font-weight-bold">Crear viaje</h5>
        </template>
        <template v-slot:body>
            <div class="alert alert-danger" role="alert" v-if="createErrors" v-html="createErrors"></div>

            <div class="mb-3">
                <JourneySelect
                    name="journey"
                    v-model.trim.lazy="formValues.journey"
                    :value="formValues.journey"
                    :errors="formValuesErrors.journey"
                    @change="changeJourney"
                    @unselect="changeJourney"
                />
            </div>

            <div class="mb-3">
                <InputDate
                    name="datetime_start"
                    type="datetime"
                    label="Fecha de salida"
                    :min="new Date()"
                    placeholder=""
                    v-model.trim.lazy="formValues.datetime_start"
                    :value="formValues.datetime_start"
                    :errors="formValuesErrors.datetime_start"
                />
            </div>

            <div class="mb-3">
                <label class="form-label"
                    style="font-weight: bold;"
                    >Tiempo estimado de llegada</label>
                <div class="input-group mb-3" v-if="formValues.datetime_start && formValues.journey_data">
                    {{ moment(formValues.datetime_start, 'YYYY-MM-DD HH:mm').add(formValues.journey_data.duration_in_seconds, 'seconds').format('DD/MM/YYYY HH:mm:ss') }}
                </div>
                <div v-else>
                    Seleccione una fecha de salida para calcular la llegada
                </div>
            </div>

            <div class="mb-3">
                <DriverSelect
                    name="driver"
                    label="Chofer"
                    v-model.trim.lazy="formValues.driver"
                    :value="formValues.driver"
                    :errors="formValuesErrors.driver"
                />
            </div>

            {{ moment(moment().format('DD/MM/YYYY HH:mm:ss'), 'DD/MM/YYYY HH:mm:ss') }}

            {{ formValues }}

        </template>
        <template 
            v-slot:actions
        >
            <ButtonCustom
                :classesNames="{
                    btn_custom: 'btn btn-primary d-flex align-items-center gap-2',
                }" 
                type="button" 
                text="Guardar" 
                icon="save" 
                :loading="createFetchingData" 
                @click="createEvent"
            />
        </template>
        
    </modal>
</template>

<script>

import { ref, reactive } from 'vue'

import * as yup from 'yup';
import moment from 'moment';

import Modal from '@/components/Modal.vue'
import ButtonCustom from '@/components/Button.vue'
import InputDate from '@/components/InputDate.vue'

import DriverSelect from '@/views/driver/Select.vue'
import JourneySelect from '@/views/journey/Select.vue'

import useJourneyDriver from '@/composables/useJourneyDriver'

import { getErrorsFromYup } from '@/helpers'

export const props = {};

export default {
    emits: ['finish_success'],
    props,
    components:{
        Modal,
        ButtonCustom,
        InputDate,
        DriverSelect,
        JourneySelect,
    },
    setup(props, { emit, attrs }) {

        const {
            createFetchingData, 
            createErrors,
            create,
        } = useJourneyDriver()

        const schemaCreate = yup.object().shape({
            datetime_start: yup.date().required(),
            states: yup.number().required(),
            journey: yup.number().required().positive('journey is a required field'),
            driver: yup.number().required().positive('journey is a required field'),
        });

        let formValues = reactive({
            states: 1,
        });

        const formValuesErrors = ref({});

        const modal = ref(null)

        const open = () => {
            modal.value.open({});
        }

        const close = () => {
            for (const key in formValues) {
                delete formValues[key]
            }
            for (const key in formValuesErrors.value) {
                delete formValuesErrors.value[key]
            }
            formValues['states'] = 1
        }

        const createEvent = async () => {
            console.log('createEvent')

            try {
                await schemaCreate.validate(formValues, { abortEarly: false })
                for (const key in formValuesErrors.value) {
                    formValuesErrors.value[key] = []
                }
                try {
                    await create(formValues)
                    modal.value.close();
                    emit('finish_success')
                } catch (err) {
                    if(err?.errors){
                        for (const key in formValuesErrors.value) {
                            formValuesErrors.value[key] = []
                        }

                        const { errors } = err
                        for (const error in errors) {
                            formValuesErrors.value[error] = err.errors[error]
                        }

                    }
                }
            } catch (err) {
                console.log('createEvent -> catch', err)
                formValuesErrors.value = getErrorsFromYup({arr:formValuesErrors.value, err})
            }
            
        }

        const changeJourney = (e) => {
            if(e){
                console.log('changeJourney',e)
                formValues['journey_data'] = e
            }else{
                delete formValues['journey_data']
                console.log('Journey unselect')
            }
        }

        return {
            modal,
            open,
            close,
            formValues,
            formValuesErrors,

            createErrors,
            createFetchingData,

            createEvent,

            changeJourney,
            moment,
        };
    },
}
</script>
