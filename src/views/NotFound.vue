<template>
    <!-- Not Found Page HTML -->
    <div class="page-not-found pt-5">
        <div class="bg-light shadow">
            <h2>4<vue-feather type="slash" size="90px"></vue-feather>4</h2>
            <h3 class="mt-4">Opps! Page Not Found</h3>
            <div class="mt-5 gap-3">
                <router-link to="/" class="btn m-2 m-md-0 btn-primary">Inicio</router-link>
                <a class="btn btn-success" href="https://github.com/bypabloc" target="_blank" role="button">Contactame</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .page-not-found{
        display: flex;
        justify-content: center;
        align-content: center;
    }
    .page-not-found h2 {
        font-size: 130px;
    }
    .page-not-found h3 {
        font-size: 42px;
    }
    .page-not-found .bg-light {
        width: 50%;
        padding: 50px;
        text-align: center;
        border-radius: 5px;
        /* position: absolute; */
        /* top: 50%; */
        /* left: 50%; */
        /* transform: translate(-50%, -50%); */
    }

    @media (max-width:  767px) {
        .page-not-found h2 {
            font-size: 100px;
        }
        .page-not-found h3 {
            font-size: 28px;
        }
        .page-not-found .bg-light {
            width: 100%;
        }
    }
</style>