import { defineStore } from "pinia";
import { auth, db } from '../firebase/firebase';
import { 
    signOut, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    sendEmailVerification, 
    signInWithEmailAndPassword,
    onAuthStateChanged, // Untuk inisialisasi sesi saat refresh
    getIdToken // Untuk refresh token
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

export const useUserStore = defineStore('user', {
    state: () => ({
        userLoggedIn: false,
        userRole: null, // 'admin', 'user', atau null
    }),

    actions: {
        // --- A. FUNGSI UTAMA AUTH & FIRESTORE ---

        async register(values) {
            // 1. Buat user di Firebase Authentication
            const userCred = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            // 2. Update Display Name
            await updateProfile(userCred.user, {
                displayName: values.name,
            });

            const user = userCred.user;
            
            // 3. Kirim Email Verifikasi
            await sendEmailVerification(user);

            // 4. Simpan Data User di Firestore
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                number: values.nomor,
                displayName: values.name,
                role: 'user', // Default role adalah 'user'
                createdAt: new Date()
            });

            this.userLoggedIn = true;
            this.userRole = 'user';
        },
        
        async authenticate(values) {
            // 1. Login ke Firebase Auth
            const userCred = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCred.user;

            // 2. Ambil Role dari Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                 await signOut(auth);
                 throw new Error("Login gagal: Data pengguna tidak ditemukan.");
            }

            const role = userDoc.data().role;

            if (role === 'admin') {
                // PENTING: Refresh token untuk mendapatkan Custom Claims admin
                await this.refreshAdminToken(); 
                
                this.userLoggedIn = true;
                this.userRole = 'admin';
                return this.userRole; // Mengembalikan 'admin'
                
            } else {
                // Untuk User Biasa: Wajib verifikasi email
                if (user.emailVerified) {
                    this.userLoggedIn = true;
                    this.userRole = role;
                    return role; // Mengembalikan 'user'
                } else {
                    await signOut(auth);
                    throw new Error("Login gagal: Email Anda belum diverifikasi.👿");
                }
            }
        },

        async signOut() {
            await signOut(auth);
            this.userLoggedIn = false;
            this.userRole = null;
        },

        // --- B. FUNGSI OTORISASI & SESI ---

        async refreshAdminToken() {
            const user = auth.currentUser;
            if (user) {
                // Memaksa token di-refresh ('true') agar token membawa klaim 'role: admin' terbaru
                await user.getIdToken(true); 
                console.log("Token ID admin diperbarui.");
            }
        },

        async getCurrentUserRole(user) {
            // Fungsi pembantu untuk mengambil role dari Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            return userDoc.exists() ? userDoc.data().role : null;
        },
        
        init() {
            // Mengelola sesi saat aplikasi dimuat atau direfresh
            return new Promise((resolve) => {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const role = await this.getCurrentUserRole(user);
                        
                        this.userLoggedIn = true;
                        this.userRole = role;
                        
                        // Penting: Refresh token jika dia admin untuk mempertahankan izin
                        if (role === 'admin') {
                            await this.refreshAdminToken();
                        }

                    } else {
                        this.userLoggedIn = false;
                        this.userRole = null;
                    }
                    resolve(); // Selesaikan Promise
                });
            });
        }
    }
});