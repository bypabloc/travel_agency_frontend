import { inject } from "vue";
import Swal from "sweetalert2";

// https://codesandbox.io/s/sweetalert2-vue3-jdrjc?file=/src/components/HelloWorld.vue:585-637

const SwalSymbol = Symbol();

export function useSwal() {
    return inject(SwalSymbol);
}

export default {
    install: (app) => {
        app.config.globalProperties.$Swal = Swal;
        app.provide(SwalSymbol, Swal);
    }
};
