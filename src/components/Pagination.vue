<template>
    <div class="d-flex justify-content-end">
        <ul class="pagination">
            <li
                class="page-item"
                :class="{
                    active: false,
                    disabled: page == 1,
                }"
                @click="update({
                    page: 1,
                    enabled: page != 1,
                })"
            >
                <a class="page-link first"></a>
            </li>
            <li
                class="page-item"
                :class="{
                    active: false,
                    disabled: page == 1,
                }"
                @click="update({
                    page: page - 1,
                    enabled: page != 1,
                })"
            >
                <a class="page-link prev"></a>
            </li>
            <template v-for="n in last_page" :key="n">
                <li
                    class="page-item"
                    :class="{
                        active: page == n,
                        disabled: page == n,
                    }"
                    @click="update({
                        page: n,
                        enabled: page != n,
                    })"
                >
                    <a class="page-link">{{ n }}</a>
                </li>
            </template>
            <li
                class="page-item"
                :class="{
                    active: false,
                    disabled: last_page == page,
                }"
                @click="update({
                    page: page + 1,
                    enabled: page != last_page,
                })"
            >
                <a class="page-link next"></a>
            </li>
            <li
                class="page-item"
                :class="{
                    active: false,
                    disabled: last_page == page,
                }"
                @click="update({
                    page: last_page,
                    enabled: last_page != page,
                })"
            >
                <a class="page-link last"></a>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    emits: ['update'],
    props: {
        per_page: {
            type: [ Number, String ],
            default: 1,
        },
        page: {
            type: [ Number, String ],
            default: 1,
        },
        last_page: {
            type: [ Number, String ],
            default: 1,
        },
        next_page: {
            type: [ Number, String ],
            default: 1,
        },
        prev_page: {
            type: [ Number, String ],
            default: null,
        },
    },
    setup(props, { emit, attrs }) {

        return {
            update({page, enabled}) {
                if (enabled) {
                    emit('update', {page});
                }
            },
        };
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