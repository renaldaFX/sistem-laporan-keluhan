<template>
    <nav class="relative">
        <div class="fixed bg-white w-full h-20 flex items-center justify-around shadow-lg rounded-xl">
            <div class="">
                <a href="" class="text-xl">Company</a>
            </div>
            <div class="flex around gap-12">
                <a href="#beranda" class="hover:underline hover:transition">Beranda</a>
                <a href="#aboutMe" class="hover:underline">Tentang Kami</a>
                <a href="#prosedur" class="hover:underline">Prosedur</a>
            </div>
            <router-link to="/register"
                class="cursor-pointer flex gap-3 text-slate-600 hover:text-black hover:stroke-black hover:transition hover:duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6 stroke-slate-600">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                Register
            </router-link>
        </div>
    </nav>
    <!-- <login /> -->

</template>

<script>
import { RouterLink } from 'vue-router';

// import { mapStores } from 'pinia';
// import userModalStores from '../stores/modal'

export default {
    name: 'Header',
    // computed: {
    //     ...mapStores(userModalStores)
    // },
    methods: {
        // toggleAuthModal() {
        //     this.modalStore.isOpen = !this.modalStore.isOpen
        //     console.log(this.modalStore.isOpen)
        // }
    }
}
</script>