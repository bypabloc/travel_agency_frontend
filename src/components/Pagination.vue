<template>
    <div class="d-flex justify-content-end">
        <ul class="pagination">
            <li
                class="page-item"
                :class="{
                    active: false,
                    disabled: params.current_page == 1,
                }"
                @click="click({
                    page: 1,
                    enabled: params.current_page != 1,
                })"
            >
                <a class="page-link first"></a>
            </li>
            <li
                class="page-item"
                :class="{
                    active: false,
                    disabled: params.current_page == 1,
                }"
                @click="click({
                    page: params.current_page - 1,
                    enabled: params.current_page != 1,
                })"
            >
                <a class="page-link prev"></a>
            </li>
            <template
                v-for="(item,index) of params.links"
                :key="item.label"
                >
                <li
                    v-if="index != 0 && index != params.links.length-1"
                    @click="click({
                        page: index,
                        enabled: params.current_page != index,
                    })"
                    class="page-item"
                    :class="{
                        active: item.active,
                        disabled: !item.url,
                    }"
                >
                    <a class="page-link" v-html="index"></a>
                </li>
            </template>
            <li
                class="page-item"
                :class="{
                    active: false,
                    disabled: params.last_page == params.current_page,
                }"
                @click="click({
                    page: params.current_page + 1,
                    enabled: params.current_page != params.last_page,
                })"
            >
                <a class="page-link next"></a>
            </li>
            <li
                class="page-item"
                :class="{
                    active: false,
                    disabled: params.last_page == params.current_page,
                }"
                @click="click({
                    page: params.last_page,
                    enabled: params.last_page != params.current_page,
                })"
            >
                <a class="page-link last"></a>
            </li>
        </ul>
    </div>
</template>

<script>

export const props = {
    params: {
        type: Object,
        required: true,
    },
};

export default {
    emits: ['update'],
    props,
    methods: {
        click({page,enabled}){
            console.log('params',this.params)
            console.log('{page,enabled}',{page,enabled})
            if(enabled) this.$emit('update',{page})
        },
    },
}
</script>

<style scoped>

.first:before {
    content: '\007C\2329';
}
.prev:before {
    content: '\2329';
}

.next:before {
    content: '\232a';
}
.last:before {
    content: '\232a\007C';
}

.page-item{
    cursor: pointer;
}
li.page-item.disabled {
    cursor: default;
}
li.page-item.active {
    cursor: default;
}
</style>