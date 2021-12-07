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
            <h5 class="modal-title font-weight-bold">Indica el asiento</h5>
        </template>
        <template v-slot:body>
            <div class="alert alert-danger" role="alert" v-if="createErrors" v-html="createErrors"></div>

            Modal para reservar

            {{ data }}

            <img :src="requireImage('seat.svg')" alt="" class="seat-icon">

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
                @click="getXY(data.seats)"
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

import useSeat from '@/composables/useSeat'

import { getErrorsFromYup, requireImage } from '@/helpers'

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

        const {
            createFetchingData, 
            createErrors,
            create,
        } = useSeat()

        // document = models.CharField(max_length=15, unique=True)
        // names = models.CharField(max_length=50)
        // lastname = models.CharField(max_length=50)
        // date_of_birth = models.DateField()

        const schemaCreate = yup.object().shape({
            seat_x: yup.string().required().min(1).max(1),
            seat_y: yup.string().required().min(1).max(1),
            is_active: yup.boolean(),
        });

        let formValues = reactive({
            is_active: true,
        });

        const formValuesErrors = ref({});

        const data = ref({});

        const modal = ref(null)

        const open = () => {
            modal.value.open({});
        }

        const setData = (e) => {
            data.value = e;
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

        const getXY = (seats) => {

            console.log('getXY',seats)

            const az = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


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

            data,
            setData,
            requireImage,
            getXY,
        };
    },
}
</script>

<style scoped>
.seat-icon{
    height: 52px;
}
</style>