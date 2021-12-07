<template>
    <modal
        ref="modal"
        :custom="{
            bg: {
                'header': 'primary',
            },
            size: '',
        }"
        @close="close"
    >
        <template v-slot:title>
            <h5 class="modal-title font-weight-bold">Filtrar viajes</h5>
        </template>
        <template v-slot:body>
            <div class="mb-3">
                <JourneySelect
                    name="journey"
                    v-model="formValues.journey"
                    :value="formValues.journey"
                    :errors="formValuesErrors.journey"
                    @change="changeJourney"
                    @unselect="changeJourney"
                />
            </div>

            <div class="mb-3">
                <BusSelect
                    name="bus"
                    v-model="formValues.bus"
                    :value="formValues.bus"
                    :errors="formValuesErrors.bus"
                    :unique_in_drivers="false"
                    @change="changeBus"
                    @unselect="changeBus"
                />
            </div>

            <div class="mb-3">
                <InputText
                    name="average_capacity_sold"
                    type="number"
                    label="N % de su capacidad vendida"
                    placeholder=""
                    v-model.trim.lazy="formValues.average_capacity_sold"
                    :value="formValues.average_capacity_sold"
                    :errors="formValuesErrors.average_capacity_sold"
                />
            </div>

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
                @click="searchEvent"
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
import InputText from '@/components/InputText.vue'

import BusSelect from '@/views/bus/Select.vue'
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
        InputText,
        BusSelect,
        JourneySelect,
    },
    setup(props, { emit, attrs }) {

        const {
            setParams,
        } = useJourneyDriver()

        const schemaCreate = yup.object().shape({
            journey: yup.number().positive('journey is a required field'),
            bus: yup.number().positive('bus is a required field'),
            average_capacity_sold: yup.number().positive('average capacity sold must be positive'),
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

        const searchEvent = async () => {
            console.log('searchEvent')

            try {
                await schemaCreate.validate(formValues, { abortEarly: false })
                for (const key in formValuesErrors.value) {
                    formValuesErrors.value[key] = []
                }
                try {

                    await setParams({
                        journey: formValues?.journey,
                        bus: formValues?.bus,
                        average_capacity_sold: formValues?.average_capacity_sold,
                    })
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
                console.log('searchEvent -> catch', err)
                formValuesErrors.value = getErrorsFromYup({arr:formValuesErrors.value, err})
            }
            
        }

        const changeJourney = (e) => {
            if(e){
                console.log('changeJourney',e)
                formValues['journey_data'] = e
            }else{
                delete formValues['journey_data']
                console.log('journey unselect')
            }
        }
        const changeBus = (e) => {
            if(e){
                console.log('changeBus',e)
                formValues['bus_data'] = e
            }else{
                delete formValues['bus_data']
                console.log('bus unselect')
            }
        }

        return {
            modal,
            open,
            close,
            formValues,
            formValuesErrors,

            searchEvent,

            changeJourney,
            changeBus,
            moment,
        };
    },
}
</script>
