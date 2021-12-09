import { onMounted, onUnmounted, ref } from "vue";

export default function useWindowResize() {
    const height = ref(null);
    const width = ref(null);

    function resize() {
        height.value = window.innerHeight;
        width.value = window.innerWidth;
    }

    onMounted(() => {
        console.log('I\'m first')
        window.addEventListener("resize", resize);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", resize);
    });

    return { height, width };
}
