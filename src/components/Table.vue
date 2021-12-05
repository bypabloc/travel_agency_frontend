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

    <div class="table-responsive">
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
                        <div v-if="column.type === 'custom'">
                            <slot name="custom" :data-row="row" :data-fetching-data="row?.fetchingData"></slot>
                        </div>
                        <div v-else-if="column.type === 'text'">
                            <template v-if="column?.limit">
                                <div 
                                    v-if="row[column.field].length > column.limit"
                                    
                                >
                                    <span>{{ row[column.field].substring(0,column.limit) }}</span>
                                    <a href="javascript:;" 
                                        :data-is-show="false"
                                        @click="show_hide({
                                            element: $event.target.parentElement,
                                        })"
                                    >
                                        <span 
                                            :style="{
                                                'text-decoration': 'underline',
                                                'color': 'blue',
                                            }"
                                            name='show-more'
                                        >... ver más
                                        </span>
                                        <span 
                                            :style="{
                                                display: 'none',
                                            }"
                                            name='text-hide'
                                        >
                                            {{ row[column.field].substring(column.limit,row[column.field].length) }}
                                        </span>
                                        <span 
                                            :style="{
                                                'text-decoration': 'underline',
                                                'color': 'blue',
                                                display: 'none',
                                            }"
                                            name='show-less'
                                        >
                                            ver menos
                                        </span>
                                    </a>
                                </div>
                                <div v-else>
                                    {{ row[column.field] }}
                                </div>
                            </template>
                            <template>
                                {{ row[column.field] }}
                            </template>
                        </div>
                        <div v-else-if="column.type === 'color'">
                            <span 
                                :style="{
                                    height: '25px',
                                    width: '25px',
                                    'background-color': '#' + row[column.field],
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                }"
                            ></span>
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
    </div>

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
        show_hide({element}){
            console.log('element',element)

            const isShow = element.dataset.isShow
            console.log('isShow',isShow)

            const span_text_hide = element.querySelector('span[name="text-hide"]')
            console.log('span_text_hide',span_text_hide)

            const show_more = element.querySelector('span[name="show-more"]')
            console.log('show_more',show_more)

            const show_less = element.querySelector('span[name="show-less"]')
            console.log('show_less',show_less)

            if(isShow == 'true'){
                span_text_hide.style.display = "none";
                element.dataset.isShow = false

                show_less.style.display = "none";
                show_more.style.display = "";
                
            }else if(isShow == 'false'){
                span_text_hide.style.display = "";
                element.dataset.isShow = true

                show_less.style.display = "";
                show_more.style.display = "none";
            }
        },
    },
    created() {
        this.per_page_selected = this.per_page
    },
}
</script>