<template>

    <!-- Overlay -->
    <div
        ref="overlay" 
        style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100vh; background-color: rgba(0, 0, 0, 0.5);"
        :style="[
            show ? 'display:block;' : 'display:none;',
            `z-index:${zIndex+1};`,
        ]"
    >
    </div>

    <!-- Modal -->
    <div 
        class="modal fade" 
        tabindex="-1" 
        aria-hidden="true"
        ref="modal"
        :class="[
            ( size[custom?.size] || '' ),
        ]"
        :style="[
            show ? 'display:block;' : 'display:none;',
            `z-index:${zIndex+2};`,
        ]"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div
                    class="modal-header"
                    :class="[
                        ( (custom?.bg?.header ? ('bg-'+custom?.bg?.header) : '') ),
                        ( backgroundColor[( (custom?.bg?.header ? ('bg-'+custom?.bg?.header) : '') )] || 'text-dark' ),
                    ]"
                >
                    <slot name="title">
                        <h5 class="modal-title">Título</h5>
                    </slot>
                    <slot name="header"></slot>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click.stop="close"></button>
                </div>
                <div
                    class="modal-body"
                    :class="[
                        ( (custom?.bg?.body ? ('bg-'+custom?.bg?.body) : '') ),
                        ( backgroundColor[( (custom?.bg?.body ? ('bg-'+custom?.bg?.body) : '') )] || 'text-dark' ),
                    ]"
                >
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="action-close">
                        <button type="button" class="btn btn-default" @click.stop="close">
                            <i class="fas fa-times"></i>
                            Cerrar
                        </button>
                    </slot>
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import { Modal } from 'bootstrap'

console.log(Modal)

export const props = {
    custom: {
        type: Object,
        default: {
            bg: {
                header: '',
                body: '',
                footer: '',
            },
            size: '',
        },
    },
};

export default {
    props,
    emits: ['close'],
    data() {
        return {
            show: false,
            backgroundColor: {
                'bg-primary': 'text-white',
                'bg-secondary': 'text-white',
                'bg-success': 'text-white',
                'bg-danger': 'text-white',
                'bg-warning': 'text-dark',
                'bg-info': 'text-white',
                'bg-light': 'text-dark',
                'bg-dark': 'text-white',
                'bg-white': 'text-dark',
            },
            size: {
                full: 'modal-dialog-full',
            },
            zIndex: 'auto',
            modal: null,
        }
    },
    components:{
    },
    methods: {
        open({backdrop, keyboard}) {
            this.show = true;
            this.zIndex = this.highZ();

            this.modal.show()
        },
        close() {
            this.$emit('close');
            this.show = false;
            this.modal.hide();
        },
        destroy() {
            this.show = false;
            this.modal.hide();
        },
        highZ(parent, limit) {
            limit = limit || Infinity;
            parent = parent || document.body;
            let who, temp, max= 1, opacity, i= 0;
            let children = parent.childNodes, length = children.length;
            while(i<length){
                who = children[i++];
                if (who.nodeType != 1) continue; // element nodes only
                opacity = this.deepCss(who,"opacity");
                if (this.deepCss(who,"position") !== "static") {
                    temp = this.deepCss(who,"z-index");
                    if (temp == "auto") { // positioned and z-index is auto, a new stacking context for opacity < 0. Further When zindex is auto ,it shall be treated as zindex = 0 within stacking context.
                        (opacity < 1)? temp=0:temp = this.highZ(who);
                    } else {
                        temp = parseInt(temp, 10) || 0;
                    }
                } else { // non-positioned element, a new stacking context for opacity < 1 and zindex shall be treated as if 0
                    (opacity < 1)? temp=0:temp = this.highZ(who);
                }
                if (temp > max && temp <= limit) max = temp;                
            }
            return max;
        },
        deepCss(who, css) {
            let sty, val, dv= document.defaultView || window;
            if (who.nodeType == 1) {
                sty = css.replace(/\-([a-z])/g, function(a, b){
                    return b.toUpperCase();
                });
                val = who.style[sty];
                if (!val) {
                    if(who.currentStyle) val= who.currentStyle[sty];
                    else if (dv.getComputedStyle) {
                        val= dv.getComputedStyle(who,"").getPropertyValue(css);
                    }
                }
            }
            return val || "";
        },
    },
    mounted() {
        const element = this.$refs.modal
        
        this.modal = new Modal(element, {})
        element.addEventListener('hidden.bs.modal', (event) => {
            // const overlay = this.$refs.overlay
            // overlay.style.display = 'none'
            this.destroy()
            this.$emit('close');
        })
        element.addEventListener('shown.bs.modal', function (event) {
            // myInput.focus()
        })
    },
    
}
</script>