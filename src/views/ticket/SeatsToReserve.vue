<template>
    <modal
        ref="modal"
        :custom="{
            bg: {
                'header': 'primary',
            },
        }"
        @close="close"
    >
        <template v-slot:title>
            <h5 class="modal-title font-weight-bold">Indica la información del boleto</h5>
        </template>
        <template v-slot:body>
            <div class="alert alert-danger" role="alert" v-if="createErrors" v-html="createErrors"></div>

            <div class="mb-3">
                <InputText
                    name="journey_driver"
                    type="number"
                    placeholder=""
                    label="Conductor"
                    :labelShow="false"
                    :inputShow="false"
                    v-model="formValues.journey_driver"
                    :value="formValues.journey_driver"
                    :errors="formValuesErrors.journey_driver"
                />
            </div>

            <div class="mb-3">
                <PassengerSelect
                    name="passenger"
                    ref="passenger_select"
                    v-model="formValues.passenger"
                    :value="formValues.passenger"
                    :errors="formValuesErrors.passenger"
                />
            </div>

            <div class="mb-3">
                <div>
                    <label for="boleto" class="form-label"
                        style="font-weight: bold;"
                    >
                        Asientos
                    </label>
                    <div class="mb-3">
                        <label for="boleto" class="form-label"
                            style="font-weight: bold;"
                        >
                            <img :src="requireImage('seat.svg')" alt="" class="seat-icon "> = Disponible
                        </label>
                        <label for="boleto" class="form-label"
                            style="font-weight: bold;"
                        >
                            <img :src="requireImage('seat.svg')" alt="" class="seat-icon theme-color-green-500"> = Seleccionado
                        </label>
                        <label for="boleto" class="form-label"
                            style="font-weight: bold;"
                        >
                            <img :src="requireImage('seat.svg')" alt="" class="seat-icon theme-color-red-500"> = Ocupado
                        </label>
                    </div>
                    <div class="input-group mb-3">
                        <table 
                            class="table table-borderless"
                            style="width: auto;"
                            >
                            <thead>
                                <tr>
                                    <th></th>
                                    <th scope="row" v-for="x in seatX" :key="x" class="">
                                        <div class="d-flex justify-content-center">{{ x }}</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(y, yIndex) in seats" :key="yIndex">
                                    <th>{{ az[yIndex] }}</th>
                                    <th v-for="(x, xIndex) in y" :key="xIndex">
                                        <div v-show="x.available" >
                                            <div class="d-flex justify-content-center">
                                                <img 
                                                    :src="requireImage('seat.svg')" alt=""
                                                    class="seat-icon"
                                                    :class="[
                                                        (x.available == 1 ? 'theme-color-red-500' : ''),
                                                        (x.available == 3 ? 'theme-color-green-500' : ''),
                                                    ]"
                                                    @click="x.available != 1 ? setSelect(x) : ''"
                                                >
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div 
                        :class="[
                            (
                            formValuesErrors?.seat?.length ? 'invalid-feedback-custom-label ' : ''
                            ),
                        ]"
                        v-if="formValuesErrors?.seat?.length"
                        >
                        <ul>
                            <li v-for="(item, index) in formValuesErrors.seat" :key="index" :value="item">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>
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

import PassengerSelect from '@/views/passenger/Select.vue'

import useSeat from '@/composables/useSeat'
import useTicket from '@/composables/useTicket'

import { getErrorsFromYup, requireImage } from '@/helpers'

export const props = {};

export default {
    emits: ['finish_success'],
    props,
    components:{
        Modal,
        ButtonCustom,
        InputText,
        PassengerSelect,
    },
    setup(props, { emit, attrs }) {

        const {
            createFetchingData, 
            createErrors,
            create,
        } = useTicket()

        // document = models.CharField(max_length=15, unique=True)
        // names = models.CharField(max_length=50)
        // lastname = models.CharField(max_length=50)
        // date_of_birth = models.DateField()

        const schemaCreate = yup.object().shape({
            journey_driver: yup.number().required(),
            passenger: yup.number().required(),
            seat: yup.number().required(),
        });

        let formValues = reactive({
            is_active: true,
        });

        const formValuesErrors = ref({});

        const passenger_select = ref(null)

        const modal = ref(null)
        const open = () => {
            modal.value.open({});
            passenger_select.value.reset()
        }

        const data = ref(null);
        const seats = ref([]);
        const seatSelected = ref(null);
        const setData = (e) => {
            data.value = e;
            seats.value = [];
            formValues.journey_driver = e.id;
            formValues?.seat ?? delete formValues.seat;
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
                console.log('createEvent -> formValuesErrors.value', formValuesErrors.value)
            }
            
        }

        const seatX = ref(0);
        const seatY = ref(0);

        const az = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

        const getXY = () => {
            console.clear()
            const azMax = data.value.seats.reduce((p, c) => p.y > c.y ? p : c);

            const yMax = az.findIndex((e) => azMax.y == e) + 1

            const xMax = data.value.seats.reduce((p, c) => p.x > c.x ? p : c).x;

            seatY.value = yMax
            seatX.value = xMax

            console.log('yMax',yMax)
            for (let y = 1; y < yMax+1; y++) {
                console.log('y',y)
                const yRow = []

                for (let x = 1; x < xMax+1; x++) {
                    console.log('x',x)
                    const data = getSeat({x,y})
                    console.log('data',data)
                    yRow.push(data)
                }
                console.log('yRow',yRow)
                seats.value.push(yRow)
            }

        }

        const getSeat = ({x,y}) => {
            
            const yLetter = az[y-1]

            let seat = data.value.seats.find( (e) => (e.y==yLetter) && (e.x==x) )

            let available = 0
            if(seat){
                available = seat.available ? 2 : 1
            }else{
                seat = {
                    x,
                    y: yLetter,
                    available,
                }
            }

            return {
                available,
                seat,
            }
        }
        
        const setSelect = (e) => {
            const available = e.available
            seats.value.forEach( (row, y) => {
                row.forEach( (seat, x) => {
                    if(seat.available == 3){
                        seat.available = 2
                    }
                })
            })
            console.log('seat',e)
            if (available == 2) {
                e.available = 3
                formValues['seat'] = e.seat.id
            }else if (available == 3) {
                e.available = 2
                delete formValues['seat']
            }
        }

        return {
            modal,
            passenger_select,
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
            seatY,
            seatX,
            seats,
            getSeat,
            setSelect,
            seatSelected,
            az,
        };
    },
}
</script>

<style scoped>
.seat-icon{
    height: 52px;
}
.invalid-feedback-custom-label {
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
}

.invalid-feedback-custom {
    width: 100%;
    margin-top: .25rem;
    /* font-size: 80%; */
    color: #dc3545;
}

label {
    font-weight: bold;
}
</style>