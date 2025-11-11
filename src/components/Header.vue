<template>
    <nav class="relative">
        <div
            class="fixed bg-white w-full h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-lg rounded-xl z-50">
            <!-- Logo -->
            <div>
                <router-link :to="{ name: 'home' }"
                    class="text-lg sm:text-xl font-semibold hover:text-indigo-600 transition-colors">
                    Company
                </router-link>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-8 lg:gap-12">
                <a href="#beranda" class="hover:text-indigo-600 transition-colors text-sm lg:text-base">Beranda</a>
                <a href="#aboutMe" class="hover:text-indigo-600 transition-colors text-sm lg:text-base">Tentang Kami</a>
                <a href="#prosedur" class="hover:text-indigo-600 transition-colors text-sm lg:text-base">Prosedur</a>
            </div>

            <!-- Desktop Auth Section -->
            <div class="hidden md:flex items-center">
                <!-- Desktop Register/Login Button -->
                <router-link v-if="!userStore.userLoggedIn" :to="{ name: 'register' }"
                    class="flex items-center gap-2 lg:gap-3 px-4 py-2 text-slate-600 hover:text-indigo-600 transition-colors text-sm lg:text-base">
                    <span class="hidden lg:inline">Register/Login</span>
                    <span class="lg:hidden">Login</span>
                </router-link>

                <!-- Desktop User Menu (when logged in) -->
                <div v-else class="flex items-center gap-4 lg:gap-6">
                    <router-link :to="{ name: 'manage' }"
                        class="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors text-sm lg:text-base">
                        <span>Manage</span>
                    </router-link>

                    <button @click="handleLogout"
                        class="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm lg:text-base">
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu Button -->
            <button @click="mobileMenuOpen = !mobileMenuOpen"
                class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'" :aria-expanded="mobileMenuOpen">
                <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Mobile Menu Dropdown -->
        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <div v-if="mobileMenuOpen"
                class="md:hidden fixed top-16 sm:top-20 left-0 right-0 bg-white shadow-lg rounded-b-xl z-40 mx-4">
                <div class="px-4 py-6 space-y-4">
                    <a href="#beranda" @click="mobileMenuOpen = false"
                        class="block py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">
                        Beranda
                    </a>
                    <a href="#aboutMe" @click="mobileMenuOpen = false"
                        class="block py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">
                        Tentang Kami
                    </a>
                    <a href="#prosedur" @click="mobileMenuOpen = false"
                        class="block py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">
                        Prosedur
                    </a>

                    <!-- Mobile Auth Section -->
                    <div class="pt-4 border-t border-gray-200">
                        <!-- Mobile Register/Login Button -->
                        <router-link v-if="!userStore.userLoggedIn" to="/register" @click="mobileMenuOpen = false"
                            class="flex items-center justify-center gap-3 py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <span>Register/Login</span>
                        </router-link>

                        <!-- Mobile User Menu (when logged in) -->
                        <div v-else class="space-y-3">
                            <router-link to="/manage" @click="mobileMenuOpen = false"
                                class="flex items-center justify-center gap-2 py-2.5 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>
                                <span>Manage</span>
                            </router-link>

                            <button @click="handleLogout"
                                class="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Overlay untuk mobile menu -->
        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="mobileMenuOpen" @click="mobileMenuOpen = false"
                class="md:hidden fixed inset-0 bg-opacity-25 z-30 top-16 sm:top-20" aria-hidden="true">
            </div>
        </transition>
    </nav>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapStores } from 'pinia';
import { useUserStore } from '../stores/user'

export default {
    data() {
        return {
            mobileMenuOpen: false
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        handleLogout() {
            // Panggil action dari store
            this.userStore.signOut();

            // Opsional: Tutup menu mobile jika terbuka
            this.mobileMenuOpen = false;

            // Opsional: Arahkan kembali ke halaman home
            this.$router.push('/');
        }
    },
    watch: {
        // Tutup menu saat resize ke desktop
        '$route'() {
            this.mobileMenuOpen = false;
        }
    },
    mounted() {
        // Tutup mobile menu saat resize ke ukuran desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                this.mobileMenuOpen = false;
            }
        });
    }
}
</script>