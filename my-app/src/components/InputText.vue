<template>
    <div>
        <label 
            :for="name" 
            class="form-label"
            :class="{
                'd-none': !inputShow,
            }"
        >
            {{ label }}
        </label>
        <div class="input-group mb-3">
            <input
                :name="name"
                :type="type"
                v-model="value"
                :placeholder="placeholder"
                @change="onChange"
                @keyup="onChange"
                class="form-control"
                :class="{
                    'd-none': !inputShow,
                }"
                >
                <slot name="buttons"></slot>
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
            type: [ String, Number ],
            default: "",
        },
        labelShow: {
            type: Boolean,
            default: true,
        },
        inputShow: {
            type: Boolean,
            default: true,
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