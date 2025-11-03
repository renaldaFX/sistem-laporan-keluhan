<template>
    <div class="min-h-scree flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md backdrop-blur-sm bg-opacity-95 relative">
            <div class="absolute top-4 right-4">
                <router-link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 text-gray-400 hover:text-gray-700 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </router-link>
            </div>

            <div class="text-center mb-8">
                <div class="flex items-center justify-center gap-2 mb-4">
                    <img src="../assets/pwa-192x192.png" class="w-24" alt="">
                    <h1 class="inline text-3xl font-bold text-gray-800">Register</h1>
                </div>
                <p class="text-gray-500">Buat akun baru Anda</p>
            </div>

            <div class="text-white text-center font-bold p-4 rounded mb-4" v-if="reg_show_alert"
                :class="reg_alert_variant">
                {{ reg_alert_message }}
            </div>

            <vee-form class="space-y-5" :validation-schema="schema" @submit="register">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                    <vee-field type="text" placeholder="Masukkan nama lengkap" name="name"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition" />
                    <ErrorMessage class="text-red-600 text-base" name="name" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Handphone</label>
                    <vee-field type="text" placeholder="Masukkan nomor hp" name="nomor"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition" />
                    <ErrorMessage class="text-red-600 text-base" name="nomor" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <vee-field type="email" placeholder="nama@email.com" name="email"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition" />
                    <ErrorMessage class="text-red-600 text-base" name="email" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <vee-field name="password" :bails="false" v-slot="{ field, errors }">
                        <input type="password" placeholder="Minimal 8 karakter" v-bind="field"
                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition" />
                        <div class="text-red-600 text-base" v-for="error in errors" :key="errors">
                            {{ error }}
                        </div>
                    </vee-field>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Password</label>
                    <vee-field type="password" placeholder="Ulangi password" name="confirmPassword"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition" />
                    <ErrorMessage class="text-red-600 text-base" name="confirmPassword" />
                </div>

                <button type="submit" :disabled="reg_in_submission"
                    class="w-full bg-slate-600 hover:bg-black text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-200">
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
import { auth, db } from '../firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore";
import { RouterLink } from 'vue-router';
import { mapWritableState } from 'pinia';
import useUserStores from '../stores/user';

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
            reg_alert_message: 'Please wait! Your account is being created'
        }
    },
    computed: {
        ...mapWritableState(useUserStores, ['userLoggedIn'])
    },
    methods: {
        async register(values) {
            this.reg_show_alert = true
            this.reg_in_submission = true
            this.reg_alert_variant = 'bg-blue-500'
            this.reg_alert_message = 'Please wait! Your account is being created'

            let userCred = null;
            try {
                userCred = await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                )

                await updateProfile(userCred.user, {
                    displayName: values.name,
                });

                // SUKSES
                this.reg_alert_variant = 'bg-green-500'
                this.reg_alert_message = 'Success! Your account has been created😊'

                const user = userCred.user
                const userDocRef = doc(db, 'users', user.uid)

                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    number: values.nomor,
                    displayName: values.name,
                    role: 'user',
                    createdAt: new Date()
                });

            } catch (error) {
                this.reg_alert_variant = 'bg-red-600'

                if (error.code === 'auth/email-already-in-use') {
                    this.reg_alert_message = 'Gagal! Email ini sudah terdaftar.';
                } else {
                    this.reg_alert_message = `Terjadi kesalahan: ${error.message}`;
                }
                return
            }
            this.reg_in_submission = false
            this.userLoggedIn = true
            console.log(userCred)
            console.log(this.userLoggedIn)
        }
    }
}
</script>