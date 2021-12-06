<template>
    <div class="">
        <label :for="name" class="form-label">{{ label }}</label>
        <div class="input-group mb-3">
            <template v-if="type=='date'">
                <v-date-picker 
                    v-model="inputValue" 
                    mode="date" 
                    is24hr 
                    :max-date='new Date()' 
                    :masks="{
                        input: 'DD-MM-YYYY',
                    }"
                >
                    <template v-slot="{ inputValue, inputEvents }">
                        <input
                            class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                            :value="inputValue"
                            v-on="inputEvents"
                            readonly
                        />
                    </template>
                </v-date-picker>
            </template>
            <template v-else>
                <input
                    :name="name"
                    :type="type"
                    v-model="value"
                    :placeholder="placeholder"
                    @change="onChange"
                    @keyup="onChange"
                    class="form-control"
                    >
                    <slot name="buttons"></slot>
            </template>
            <div 
                :class="[
                    (
                    errors.length ? 'invalid-feedback-custom-label ' : ''
                    ),
                ]"
                v-if="errors.length"
                >
                <ul>
                    <li v-for="(item, index) in errors" :key="index" :value="item">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { watch, ref } from 'vue'
import moment from 'moment';

export default {
    props: {
        type: {
            type: String,
            default: "text",
        },
        value: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        successMessage: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        errors: {
            type: Array,
            default: [],
        },
    },
    setup(props, ctx) {

        const { value } = props

        const inputValue = ref(value)

        watch(
            () => inputValue.value,
            (inputValue, prevInputValue) => {
                ctx.emit("update:modelValue", moment(inputValue).format('YYYY-MM-DD'));
            }
        )

        const onChange = (event) => {
            const val = event.target.value;
            ctx.emit("update:modelValue", val);
        };

        return {
            onChange,
            inputValue,
        };
    },
};
</script>

<style scoped>
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