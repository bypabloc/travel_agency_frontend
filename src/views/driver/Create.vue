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
            <h5 class="modal-title font-weight-bold">Crear chofer</h5>
        </template>
        <template v-slot:body>
            <div class="alert alert-danger" role="alert" v-if="createErrors" v-html="createErrors"></div>

            <div class="mb-3">
                <InputText
                    name="document"
                    type="text"
                    label="Documento"
                    placeholder=""
                    v-model.trim.lazy="formValues.document"
                    :value="formValues.document"
                    :errors="formValuesErrors.document"
                />
            </div>
            <div class="mb-3">
                <InputText
                    name="names"
                    type="text"
                    label="Nombres"
                    placeholder=""
                    v-model.trim.lazy="formValues.names"
                    :value="formValues.names"
                    :errors="formValuesErrors.names"
                />
            </div>
            <div class="mb-3">
                <InputText
                    name="lastname"
                    type="text"
                    label="Apellidos"
                    placeholder=""
                    v-model.trim.lazy="formValues.lastname"
                    :value="formValues.lastname"
                    :errors="formValuesErrors.lastname"
                />
            </div>
            <div class="mb-3">
                <InputDate
                    name="date_of_birth"
                    type="date"
                    :max="new Date()"
                    label="Fecha de nacimiento"
                    placeholder=""
                    v-model.trim.lazy="formValues.date_of_birth"
                    :value="formValues.date_of_birth"
                    :errors="formValuesErrors.date_of_birth"
                />
            </div>
            <div class="mb-3">
                <SelectCustom
                    name="bus"
                    type="select"
                    label="Bus"
                    placeholder=""
                    v-model.trim.lazy="formValues.bus"
                    :value="formValues.bus"
                    :errors="formValuesErrors.bus"
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
import InputDate from '@/components/InputDate.vue'
import SelectCustom from '@/views/bus/Select.vue'

import useDriver from '@/composables/useDriver'

import { getErrorsFromYup } from '@/helpers'

export const props = {};

export default {
    emits: ['finish_success'],
    props,
    components:{
        Modal,
        ButtonCustom,
        InputText,
        InputDate,
        SelectCustom,
    },
    setup(props, { emit, attrs }) {

        const makeid = (length) => {
            let result             = '';
            const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const {
            createFetchingData, 
            createErrors,
            create,
        } = useDriver()

        // document = models.CharField(max_length=15, unique=True)
        // names = models.CharField(max_length=50)
        // lastname = models.CharField(max_length=50)
        // date_of_birth = models.DateField()

        const schemaCreate = yup.object().shape({
            document: yup.string().required().min(3).max(15),
            names: yup.string().required().min(3).max(50),
            lastname: yup.string().required().min(3).max(50),
            date_of_birth: yup.date().required().max(new Date()),
            bus: yup.number().required(),
            is_active: yup.boolean(),
        });

        let formValues = reactive({
            // document: makeid(15),
            // names: makeid(50),
            // lastname: makeid(15),
            date_of_birth: moment().format('YYYY-MM-DD'),
            // is_active: true,
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
            formValues['date_of_birth'] = moment().format('YYYY-MM-DD')
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
        };
    },
}
</script>
