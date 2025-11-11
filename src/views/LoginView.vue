<template>
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
                    <h1 class="inline text-2xl sm:text-3xl font-bold text-gray-800">Login</h1>
                </div>
                <p class="text-sm sm:text-base text-gray-500">Jawa Dilarang Login</p>
            </div>

            <div class="text-white text-center font-bold p-4 rounded mb-4" v-if="log_show_alert"
                :class="log_alert_variant">
                {{ log_alert_message }}
            </div>

            <vee-form class="space-y-4 sm:space-y-5" :validation-schema="loginschema" @submit="login">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <vee-field type="email" placeholder="nama@email.com" name="email"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-sm sm:text-base" />
                    <ErrorMessage class="text-red-600 text-xs sm:text-sm mt-1 block" name="email" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <vee-field name="password" v-slot="{ field }">
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
                    </vee-field>
                    <ErrorMessage class="text-red-600 text-xs sm:text-sm mt-1 block" name="password" />
                </div>

                <button type="submit" :disabled="log_in_submission"
                    class="w-full bg-slate-600 hover:bg-black text-white py-3 rounded-xl font-bold text-base sm:text-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    Login
                </button>

                <p class="text-center text-sm text-gray-600 pt-4">
                    Belum punya akun? <router-link to="/register"
                        class="text-purple-600 font-semibold hover:underline">Register</router-link>
                </p>
            </vee-form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../stores/user'

export default {
    name: 'Login',
    data() {
        return {
            loginschema: {
                email: 'required|min:3|max:100|email',
                password: 'required|min:8|max:100|excluded:password',
            },
            log_in_submission: false,
            log_show_alert: false,
            log_alert_variant: 'bg-blue-500',
            log_alert_message: 'Please wait! Your account is being processed',
            showPassword: false
        }
    },
    methods: {
        ...mapActions(useUserStore, ['authenticate']),
        async login(values) {
            this.log_show_alert = true
            this.log_in_submission = true
            this.log_alert_variant = 'bg-blue-500'
            this.log_alert_message = 'Please wait! Your account is being logged'

            try {
                const role = await this.authenticate(values)
                this.log_alert_variant = 'bg-green-500'
                this.log_alert_message = 'Success! Your account has been logging😊'
                if (role === 'admin') {
                    this.$router.push('/admin');
                } else {
                    this.$router.push('/manage');
                }

            } catch (error) {
                this.log_in_submission = false
                this.log_alert_variant = 'bg-red-600'
                this.log_alert_message = `Terjadi kesalahan: ${error.message}👿`;
                return
            }
            console.log(values)
        }
    }
}
</script>