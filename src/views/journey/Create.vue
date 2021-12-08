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
            <h5 class="modal-title font-weight-bold">Crear trayecto</h5>
        </template>
        <template v-slot:body>
            <div class="alert alert-danger" role="alert" v-if="createErrors" v-html="createErrors"></div>

            <div class="mb-3">
                <LocationOriginSelect
                    name="location_origin"
                    ref="location_origin_select"
                    type="select"
                    label="Salida"
                    placeholder="Salida"
                    v-model="formValues.location_origin"
                    :value="formValues.location_origin"
                    :errors="formValuesErrors.location_origin"
                />
            </div>
            <div class="mb-3">
                <LocationDestinationSelect
                    name="location_destination"
                    ref="location_destination_select"
                    type="select"
                    label="Llegada"
                    placeholder="Llegada"
                    v-model="formValues.location_destination"
                    :value="formValues.location_destination"
                    :errors="formValuesErrors.location_destination"
                />
            </div>

            <div class="mb-3">
                <InputText
                    name="duration_in_seconds"
                    type="number"
                    label="Duración (en segundos)"
                    placeholder=""
                    v-model.trim.lazy="formValues.duration_in_seconds"
                    :value="formValues.duration_in_seconds"
                    :errors="formValuesErrors.duration_in_seconds"
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
import InputText from '@/components/InputText.vue'

import LocationSelect from '@/views/location/Select.vue'

import useJourney from '@/composables/useJourney'

import { getErrorsFromYup } from '@/helpers'

export const props = {};

export default {
    emits: ['finish_success'],
    props,
    components:{
        Modal,
        ButtonCustom,
        InputText,
        LocationOriginSelect: LocationSelect,
        LocationDestinationSelect: LocationSelect,
    },
    setup(props, { emit, attrs }) {

        const {
            createFetchingData, 
            createErrors,
            create,
        } = useJourney()

        // document = models.CharField(max_length=15, unique=True)
        // names = models.CharField(max_length=50)
        // lastname = models.CharField(max_length=50)
        // date_of_birth = models.DateField()

        const schemaCreate = yup.object().shape({
            location_origin: yup.number().required(),
            location_destination: yup.number().required(),
            duration_in_seconds: yup.number().required(),
            is_active: yup.boolean(),
        });

        let formValues = reactive({});

        const formValuesErrors = ref({});

        const location_origin_select = ref(null)
        const location_destination_select = ref(null)

        const modal = ref(null)

        const open = () => {
            modal.value.open({});
            location_origin_select.value.reset()
            location_destination_select.value.reset()
        }

        const close = () => {
            for (const key in formValues) {
                delete formValues[key]
            }
            for (const key in formValuesErrors.value) {
                delete formValuesErrors.value[key]
            }
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

        return {
            modal,
            open,
            close,
            formValues,
            formValuesErrors,

            createErrors,
            createFetchingData,

            createEvent,

            location_origin_select,
            location_destination_select,
        };
    },
}
</script>
