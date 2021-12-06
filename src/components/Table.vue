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
                            <slot name="custom" :data-row="row" :data-field="column.field" :data-field-exact="row[column.field]"></slot>
                        </div>
                        <div v-else-if="column.type === 'text'">
                            <template v-if="column?.limit">
                                <div 
                                    v-if="propFromString(column, row[column.field]).length > column.limit"
                                    
                                >
                                    <span>{{ propFromString(column, row[column.field]).substring(0,column.limit) }}</span>
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
                                            {{ propFromString(column, row[column.field]).substring(column.limit,propFromString(column, row[column.field]).length) }}
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
                                    {{ propFromString(column, row[column.field]) }}
                                </div>
                            </template>
                            <template v-else>
                                {{ propFromString(column, row[column.field]) }}
                            </template>
                        </div>
                        <div v-else-if="column.type === 'color'">
                            <span 
                                :style="{
                                    height: '25px',
                                    width: '25px',
                                    'background-color': propFromString(column, row[column.field]),
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                }"
                            ></span>
                        </div>
                        <div v-else-if="column.type === 'date'">
                            {{ dateFormat(propFromString(column, row[column.field])) }} ( {{ dateAge(propFromString(column, row[column.field])) }} años )
                        </div>
                        <div v-else-if="column.type === 'datetime-ago'">
                            {{ dateTimeAgo(propFromString(column, row[column.field])) }}
                        </div>
                        <div v-else-if="column.type === 'datetime'">
                            {{ dateTime(propFromString(column, row[column.field])) }}
                        </div>
                        <div v-else-if="column.type === 'seconds-to-time'">
                            {{ secondsToHHMMSS( row[column.field] * 1000 ) }}
                        </div>
                        <div v-else>
                            {{ propFromString(column, row[column.field]) }}
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

import moment from 'moment';
moment.locale('es');


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
        dateFormat(value) {
            return moment(value).format('DD-MM-YYYY');
        },
        dateAge(value) {
            return moment().diff(value, 'years');
        },
        dateTime(value) {
            return value ? moment(value+'-00:00').format('DD/MM/YYYY HH:mm:ss') : '';
        },
        dateTimeAgo(value) {
            return value ? moment(value+'-00:00').local().fromNow(true) : '';
        },
        propFromString(column, data) {
            let result = '';
            if(typeof data === 'object'){
                if(column?.search_object){
                    result = data[column?.search_object]
                }
            }else if((typeof data === 'string') || (typeof data === 'number')){
                result = data
            }
            return result
        },
        secondsToHHMMSS(count) {
            const _second = 1000;
            const _minute = _second * 60;
            const _hour = _minute * 60;
            const _day = _hour * 24;

            const days = Math.floor(count / _day);
            const hours = Math.floor((count % _day) / _hour);
            const minutes = Math.floor((count % _hour) / _minute);
            const seconds = Math.floor((count % _minute) / _second);

            return `
                ${days ? (days>9 ? days : '0'+days)+':' : ''}
                ${hours ? (hours>9 ? hours : '0'+hours)+':' : (days ? '00' : '')}
                ${minutes ? (minutes>9 ? minutes : ':0'+minutes)+':' : (hours ? '00' : '')}
                ${seconds ? (seconds>9 ? seconds : ':0'+seconds) : (minutes ? '00' : '')}
            `.replace(/ /g,'').replace(/(\r\n|\n|\r)/gm,'');
        },
    },
    created() {
        this.per_page_selected = this.per_page
    },
}
</script>