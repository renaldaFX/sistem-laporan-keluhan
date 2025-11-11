import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VeeValidatePlugin from './includes/validate';
import router from './router/routes';
import './style.css';
import { auth } from './firebase/firebase';
import App from './App.vue';
import { useUserStore } from './stores/user'; // <<< Import Pinia Store

let app;

// Setup Pinia sebelum digunakan
const pinia = createPinia();

// Fungsi untuk menyiapkan dan me-mount aplikasi
async function mountApp() {
    
    // 1. Inisialisasi Pinia
    app.use(pinia);
    
    // 2. Dapatkan instance store dan panggil init()
    const userStore = useUserStore();
    
    // Tunggu inisialisasi sesi Firebase dan pengambilan role
    await userStore.init(); 

    // 3. Tambahkan plugins dan router
    app.use(VeeValidatePlugin);
    app.use(router);

    // 4. Mount Aplikasi
    app.mount('#app');
}

// ----------------------------------------------------
// Menggantikan pola onAuthStateChanged lama dengan pola Pinia init()
// ----------------------------------------------------

// Cek status otentikasi awal sebelum mount
auth.onAuthStateChanged(async () => {
    if (!app) {
        app = createApp(App);
        
        // Panggil fungsi mountApp yang sudah dimodifikasi
        await mountApp();
    }
});