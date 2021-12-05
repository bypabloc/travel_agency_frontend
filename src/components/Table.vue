<template>

    <div class="row">
        <div class="col">
            <select v-model="per_page_selected" @change="update({per_page:parseInt($event.target.value)})">
                <option v-for="item in per_pages" :value="item" :key="item">
                    {{ item }}
                </option>
            </select>
        </div>
    </div>

    <table class="table table-hover table-responsive">
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.field">
                    {{ column.label }}
                </th>
            </tr>
        </thead>
        <tbody v-if="list">
            <tr v-for="row of list" :key="row.id">
                <td v-for="column in columns" :key="column.field">
                    <div v-if="column.field === 'actions'">
                        <slot name="actions" :data-id="row.id" :data-fetching-data="row?.fetchingData"></slot>
                    </div>
                    <div v-else>
                        {{ row[column.field] }}
                    </div>
                </td>
                <!-- {{ row }} -->
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th v-for="column in columns" :key="column.field">
                    {{ column.label }}
                </th>
            </tr>
        </tfoot>
    </table>
</template>

<script>

export const props = {
    columns: {
        type: Array,
        required: true,
    },
    list: {
        type: Array,
        default: [],
    },
    per_page: {
        type: [ Number, String ],
        default: 10,
    },
};

export default {
    emits: ['update'],
    props,
    data() {
        return {
            per_pages: [5,10,25,50,100,250,500,1000],
            per_page_selected: 5,
        }
    },
    methods: {
        info({text}){
            this.$swal({
                html: text,
            });
        },
        update(values){
            this.$emit('update',values)
        },
        imgPlaceholder(e){
            e.target.src = "images/not_found.png"
        },
    },
    created() {
        this.per_page_selected = this.per_page
    },
}
</script>