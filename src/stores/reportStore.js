// stores/report.js

import { defineStore } from "pinia";
import { db, auth } from "../firebase/firebase";
import { 
    collection, 
    getDocs, 
    query, 
    orderBy, 
    deleteDoc,
    doc,        
    updateDoc,
    where,
    addDoc,
    getDoc,
    serverTimestamp
} from "firebase/firestore";
import { useUserStore } from './user';

export const useReportStore = defineStore('reportStorage', {
    state: () => ({
        reports: [], // Array untuk menampung laporan dari Firestore
        reportsLoading: false,
        reportsError: null,
    }),
    actions: {
        async fetchAllReports() {
        this.reportsLoading = true;
        this.reportsError = null;
        this.reports = [];

        try {
            const reportsCollectionRef = collection(db, "reports");
            
            // Query TANPA filter 'where uid'
            const q = query(
                reportsCollectionRef, 
                orderBy("createdAt", "desc")
            );
            
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const data = doc.data(); 
                this.reports.push({
                    id: doc.id,
                    ...data, 
                    createdAt: data.createdAt ? data.createdAt.toDate() : null,
                    status: data.status || 'pending' 
                });
            });

        } catch (error) {
            console.error("Gagal mengambil semua laporan:", error);
            this.reportsError = "Gagal memuat laporan: " + error.message;
        } finally {
            this.reportsLoading = false;
        }
    },
    async fetchUserReports() {
            const user = auth.currentUser;
            if (!user) {
                this.reports = [];
                return;
            }

            this.reportsLoading = true;
            this.reportsError = null;
            this.reports = [];

            try {
                const reportsCollectionRef = collection(db, "reports");
                
                // Query DENGAN filter 'where uid'
                const q = query(
                    reportsCollectionRef, 
                    where("uid", "==", user.uid), // <-- Filter penting
                    orderBy("createdAt", "desc")
                );
                
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    const data = doc.data(); 
                    this.reports.push({
                        id: doc.id,
                        ...data, 
                        createdAt: data.createdAt ? data.createdAt.toDate() : null,
                        status: data.status || 'pending' 
                    });
                });
            } catch (error) {
                console.error("Gagal mengambil laporan user:", error);
                this.reportsError = "Gagal memuat laporan: " + error.message;
            } finally {
                this.reportsLoading = false;
            }
        },
        async deleteReport(reportId) {
            try {
                // 1. Hapus dokumen di Firestore
                await deleteDoc(doc(db, "reports", reportId));

                // 2. Hapus dokumen dari state lokal
                this.reports = this.reports.filter(report => report.id !== reportId);

                // 3. (Opsional) Hapus juga file di Storage jika URL gambar disimpan
                // *Logika ini akan lebih kompleks dan membutuhkan referensi ke Storage*

                console.log(`Laporan ID ${reportId} berhasil dihapus.`);
                return true;
            } catch (error) {
                console.error("Gagal menghapus laporan:", error);
                throw error;
            }
        },
        async updateReport(reportId, newTitle, newDescription) {
            try {
                const reportRef = doc(db, "reports", reportId);

                // Perbarui dokumen di Firestore
                await updateDoc(reportRef, {
                    title: newTitle,
                    description: newDescription,
                    updatedAt: new Date()
                });

                // Perbarui state lokal
                const index = this.reports.findIndex(report => report.id === reportId);
                if (index !== -1) {
                    this.reports[index].title = newTitle;
                    this.reports[index].description = newDescription;
                }

                console.log(`Laporan ID ${reportId} berhasil diperbarui.`);
                return true;
            } catch (error) {
                console.error("Gagal memperbarui laporan:", error);
                throw error;
            }
        },
        async updateReportStatus(reportId, newStatus) {
            try {
                const reportRef = doc(db, "reports", reportId);

                // 1. Perbarui dokumen di Firestore
                await updateDoc(reportRef, {
                status: newStatus,
                updatedAt: new Date() // Selalu update 'updatedAt' saat ada perubahan
                });

                // 2. Perbarui state lokal di Pinia
                const index = this.reports.findIndex(report => report.id === reportId);
                if (index !== -1) {
                    this.reports[index].status = newStatus;
                }
                    console.log(`Status laporan ${reportId} berhasil diubah menjadi ${newStatus}.`);
                    return true;
                } 
                catch (error) {
                    console.error("Gagal memperbarui status laporan:", error);
                    throw error;
            }
        },
        async addRating(reportId, ratingData) {
            try {
                const user = auth.currentUser;
                if (!user) {
                    throw new Error('User not authenticated');
                }

                const reportRef = doc(db, 'reports', reportId);
                const reportDoc = await getDoc(reportRef); // <-- PERBAIKAN 1 (sekarang berfungsi)
                
                if (!reportDoc.exists()) {
                    throw new Error('Report not found');
                }

                const reportData = reportDoc.data();
                
                // PERBAIKAN 3: Ganti 'userId' menjadi 'uid'
                if (reportData.uid !== user.uid) { 
                    throw new Error('Unauthorized: You can only rate your own reports');
                }

                if (reportData.status !== 'selesai') {
                    throw new Error('Can only rate completed reports');
                }

                if (reportData.rating) {
                    throw new Error('Rating already exists for this report');
                }

                const newRating = {
                    rating: ratingData.rating,
                    comment: ratingData.comment || '',
                    userId: user.uid,
                    createdAt: serverTimestamp(), // <-- PERBAIKAN 2 (sekarang berfungsi)
                };

                await updateDoc(reportRef, {
                    rating: newRating
                });

                // Update local state
                const reportIndex = this.reports.findIndex(r => r.id === reportId);
                if (reportIndex !== -1) {
                    this.reports[reportIndex].rating = {
                        ...newRating,
                        createdAt: new Date(), // Gunakan 'new Date()' untuk local state
                    };
                }
            } catch (error) {
                console.error('Error adding rating:', error);
                throw error;
            }
        },
        async submitReport(formData) {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("User not authenticated");
            }
            try {
                const newReportData = {
                    ...formData, // title, description, address, image_urls
                    uid: user.uid,
                    createdAt: new Date(),
                    status: 'pending' // Status awal
                    };
                    const docRef = await addDoc(collection(db, "reports"), newReportData);

                    this.reports.unshift({
                    id: docRef.id,
                    ...newReportData,
                    createdAt: newReportData.createdAt // Pastikan timestamp-nya objek Date
                    });
                    return docRef.id;

                } catch (error) {
                    console.error("Gagal submit laporan:", error);
                    throw error;
                }
            },

        // Get average rating (optional utility method)
        getAverageRating() {
            const reportsWithRating = this.reports.filter(r => r.rating && r.rating.rating);
            if (reportsWithRating.length === 0) return 0;
            
            const sum = reportsWithRating.reduce((acc, report) => acc + report.rating.rating, 0);
            return (sum / reportsWithRating.length).toFixed(1);
        },

        // Get rating statistics (optional utility method)
        getRatingStatistics() {
            const stats = {
                total: 0,
                byRating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
                average: 0,
                withComments: 0
            };

            this.reports.forEach(report => {
                if (report.rating && report.rating.rating) {
                    stats.total++;
                    stats.byRating[report.rating.rating]++;
                    if (report.rating.comment && report.rating.comment.trim() !== '') {
                        stats.withComments++;
                    }
                }
            });

            if (stats.total > 0) {
                const sum = Object.entries(stats.byRating).reduce(
                    (acc, [rating, count]) => acc + (parseInt(rating) * count), 
                    0
                );
                stats.average = (sum / stats.total).toFixed(1);
            }

            return stats;
        }
    }
});