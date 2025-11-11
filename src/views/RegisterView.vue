<template>
    <div v-if="reg_alert_type === 'success'" role="alert"
        class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md mx-auto alert alert-vertical sm:alert-horizontal shadow-lg bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="stroke-green-600 h-6 w-6 shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
            </svg>
            <div class="flex-1">
                <h3 class="font-bold text-green-800 text-sm sm:text-base">Registrasi Berhasil!</h3>
                <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank"
                    class="text-xs text-gray-600 hover:text-gray-800 hover:underline block mt-1">
                    Email verifikasi telah dikirim. Silakan cek inbox (atau spam).
                </a>
            </div>
        </div>
    </div>

    <div class="min-h-screen flex items-center justify-center p-4">
        <div
            class="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-md backdrop-blur-sm bg-opacity-95 relative">
            <div class="absolute top-4 right-4">
                <router-link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 text-gray-400 hover:text-gray-700 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </router-link>
            </div>

            <div class="text-center mb-6 sm:mb-8">
                <div class="flex items-center justify-center gap-2 mb-4">
                    <img src="../assets/pwa-192x192.png" class="w-20 sm:w-24" alt="">
                    <h1 class="inline text-2xl sm:text-3xl font-bold text-gray-800">Register</h1>
                </div>
                <p class="text-sm sm:text-base text-gray-500">Buat akun baru Anda</p>
            </div>

            <div class="text-white text-center font-bold p-4 rounded mb-4" v-if="reg_show_alert"
                :class="reg_alert_variant">
                {{ reg_alert_message }}
            </div>

            <vee-form class="space-y-4 sm:space-y-5" :validation-schema="schema" @submit="register">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                    <vee-field type="text" placeholder="Masukkan nama lengkap" name="name"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-sm sm:text-base" />
                    <ErrorMessage class="text-red-600 text-xs sm:text-sm mt-1 block" name="name" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Handphone</label>
                    <vee-field type="text" placeholder="Masukkan nomor hp" name="nomor"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-sm sm:text-base" />
                    <ErrorMessage class="text-red-600 text-xs sm:text-sm mt-1 block" name="nomor" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <vee-field type="email" placeholder="nama@email.com" name="email"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-sm sm:text-base" />
                    <ErrorMessage class="text-red-600 text-xs sm:text-sm mt-1 block" name="email" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <vee-field name="password" :bails="false" v-slot="{ field, errors }">
                        <div class="relative">
                            <input :type="showPassword ? 'text' : 'password'" placeholder="Minimal 8 karakter"
                                v-bind="field"
                                class="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-sm sm:text-base" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
                                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            </button>
                        </div>
                        <div class="text-red-600 text-xs sm:text-sm mt-1" v-for="error in errors" :key="error">
                            {{ error }}
                        </div>
                    </vee-field>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Password</label>
                    <vee-field name="confirmPassword" v-slot="{ field }">
                        <div class="relative">
                            <input :type="showConfirmPassword ? 'text' : 'password'" placeholder="Ulangi password"
                                v-bind="field"
                                class="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-sm sm:text-base" />
                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
                                <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            </button>
                        </div>
                    </vee-field>
                    <ErrorMessage class="text-red-600 text-xs sm:text-sm mt-1 block" name="confirmPassword" />
                </div>

                <button type="submit" :disabled="reg_in_submission"
                    class="w-full bg-slate-600 hover:bg-black text-white py-3 rounded-xl font-bold text-base sm:text-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    Daftar
                </button>

                <p class="text-center text-sm text-gray-600 pt-4">
                    Sudah punya akun? <router-link to="/login"
                        class="text-purple-600 font-semibold hover:underline">Login</router-link>
                </p>
            </vee-form>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useUserStore } from '../stores/user';
import { mapActions } from 'pinia';

export default {
    name: 'Register',
    data() {
        return {
            schema: {
                name: 'required|min:3|max:100|alpha_spaces',
                email: 'required|min:3|max:100|email',
                nomor: 'required|numeric|min:12|max:100',
                password: 'required|min:8|max:100|excluded:password',
                confirmPassword: 'password_mismatch:@password'
            },
            reg_in_submission: false,
            reg_show_alert: false,
            reg_alert_variant: 'bg-blue-500',
            reg_alert_message: 'Please wait! Your account is being created',
            reg_alert_type: '',
            showPassword: false,
            showConfirmPassword: false
        }
    },
    methods: {
        ...mapActions(useUserStore, {
            createUser: "register"
        }),
        async register(values) {
            this.reg_show_alert = true
            this.reg_in_submission = true
            this.reg_alert_variant = 'bg-blue-500'
            this.reg_alert_message = 'Please wait! Your account is being created'

            try {
                await this.createUser(values)
                this.reg_alert_variant = 'bg-green-500'
                this.reg_alert_message = 'Success! Your account has been created😊'
                this.reg_alert_type = 'success'
                setTimeout(() => {
                    this.reg_alert_type = ''
                }, 5000)
                // SUKSES

            } catch (error) {
                this.reg_alert_variant = 'bg-red-600'

                if (error.code === 'auth/email-already-in-use') {
                    this.reg_alert_message = 'Gagal! Email ini sudah terdaftar.😭';
                } else {
                    this.reg_alert_message = `Terjadi kesalahan: ${error.message}👿`;
                }
                return
            }
            this.reg_in_submission = false
        }
    }
}
</script>