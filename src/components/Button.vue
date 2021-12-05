<template>
    <button 
        @click="clic" 
        :disabled="loading" 
        :type="type" 
        :class="[
            ( btn[classesNames?.btn] || btn[404] ),
            ( classesNames?.btn_custom ),
            'ml-1'
        ]"
    >
        <template v-if="!loading">
            <vue-feather :type="icon"></vue-feather>
            {{ text }}
        </template>
        <div v-else class="d-flex justify-content-center align-items-center">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-if="text">
                &nbsp;
            </span>
        </div>
    </button>
</template>

<script>

import { ref } from "vue";

export default {
    name: 'Button',
    props: {
        text: { 
            type: String,
            default: '',
        },
        type: { 
            type: String,
            default: '',
        },
        icon: { 
            type: String,
            default: 'fas fa-sync-alt',
        },
        classesNames: { 
            type: Object,
            default: {
                btn: 'default',
            },
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    setup: () => {
    
        const btn = ref({
            primary: 'btn btn-primary',
            secondary: 'btn btn-secondary',
            success: 'btn btn-success',
            danger: 'btn btn-danger',
            warning: 'btn btn-warning',
            info: 'btn btn-info',
            default: 'btn btn-default',
            404: 'btn btn-default',
        });

        return {
            btn,
        };
    },
}
</script>
