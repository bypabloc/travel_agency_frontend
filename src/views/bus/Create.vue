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
            <h5 class="modal-title font-weight-bold">Crear bus</h5>
        </template>
        <template v-slot:body>
            <div class="alert alert-danger" role="alert" v-if="createErrors" v-html="createErrors"></div>

            <div class="mb-3">
                <InputText
                    name="plate"
                    type="text"
                    label="Placa"
                    placeholder=""
                    v-model.trim.lazy="formValues.plate"
                    :value="formValues.plate"
                    :errors="formValuesErrors.plate"
                />
            </div>
            <div class="mb-3">
                <InputText
                    name="color"
                    type="color"
                    label="Color"
                    placeholder=""
                    v-model.trim.lazy="formValues.color"
                    :value="formValues.color"
                    :errors="formValuesErrors.color"
                />
            </div>
            <div class="mb-3">
                <InputText
                    name="model"
                    type="text"
                    label="Modelo"
                    placeholder=""
                    v-model.trim.lazy="formValues.model"
                    :value="formValues.model"
                    :errors="formValuesErrors.model"
                />
            </div>
            <div class="mb-3">
                <InputText
                    name="serial"
                    type="text"
                    label="Serial"
                    placeholder=""
                    v-model.trim.lazy="formValues.serial"
                    :value="formValues.serial"
                    :errors="formValuesErrors.serial"
                />
            </div>
            <div class="mb-3">
                <InputText
                    name="year"
                    type="number"
                    label="Año"
                    placeholder=""
                    v-model.trim.lazy="formValues.year"
                    :value="formValues.year"
                    :errors="formValuesErrors.year"
                />
            </div>
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

import Modal from '@/components/Modal.vue'
import ButtonCustom from '@/components/Button.vue'
import InputText from '@/components/InputText.vue'

import useBus from '@/composables/useBus'

import { getErrorsFromYup } from '@/helpers'

export const props = {};

export default {
    emits: ['finish_success'],
    props,
    components:{
        Modal,
        ButtonCustom,
        InputText,
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
        } = useBus()

        const schemaCreate = yup.object().shape({
            plate: yup.string().required().min(3).max(10),
            color: yup.string().required().min(6).max(7),
            brand: yup.string().required().min(3).max(50),
            model: yup.string().required().min(3).max(50),
            serial: yup.string().required().min(3).max(100),
            year: yup.number().required().min(1900).max(new Date().getFullYear()),
            is_active: yup.boolean(),
        });

        let formValues = reactive({
            // plate: makeid(10),
            // color: makeid(6),
            // brand: makeid(30),
            // model: makeid(25),
            // serial: makeid(100),
            // year: `${new Date().getFullYear()}`,
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
