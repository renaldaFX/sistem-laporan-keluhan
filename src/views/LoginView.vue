<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md backdrop-blur-sm bg-opacity-95">
            <div class="text-center mb-8">
                <div class="flex items-center justify-center gap-2 mb-4">
                    <img src="../assets/pwa-192x192.png" class="w-24" alt="">
                    <h1 class="inline text-3xl font-bold text-gray-800">Login</h1>
                </div>
                <p class="text-gray-500">Jawa Dilarang Login</p>
            </div>
            <div class="text-white text-center font-bold p-4 rounded mb-4" v-if="log_show_alert"
                :class="log_alert_variant">
                {{ log_alert_message }}
            </div>
            <vee-form class="space-y-5" :validation-schema="loginschema" @submit="login">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <vee-field type="email" placeholder="nama@email.com" name="email"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition" />
                    <ErrorMessage class="text-red-600 text-base" name="email" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <vee-field type="password" placeholder="Minimal 8 karakter" name="password"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition" />
                    <ErrorMessage class="text-red-600 text-base" name="password" />
                </div>
                <button type="submit" :disabled="log_in_submission"
                    class="w-full bg-slate-600 hover:bg-black text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-200">
                    Login
                </button>
            </vee-form>
        </div>
    </div>

</template>

<script>

export default {
    name: 'Register',
    data() {
        return {
            loginschema: {
                email: 'required|min:3|max:100|email',
                password: 'required|min:8|max:100|excluded:password',
            },
            log_in_submission: false,
            log_show_alert: false,
            log_alert_variant: 'bg-blue-500',
            log_alert_message: 'Please wait! Your account is being created'
        }
    },
    methods: {
        login(values) {
            this.log_show_alert = true
            this.log_in_submission = true
            this.log_alert_variant = 'bg-blue-500'
            this.log_alert_message = 'Please wait! Your account is being created'

            this.log_alert_variant = 'bg-green-500'
            this.log_alert_message = 'Success! Your account has been created😊'
            console.log(values)
        }
    }
}

</script>