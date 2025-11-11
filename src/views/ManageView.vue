<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b sticky top-0 z-40">
            <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <router-link to="/" class="flex items-center gap-3 text-gray-800 hover:text-blue-600 transition">
                        <img src="/PNUP (1).png" width="40" alt="pnup" class="rounded-lg">
                        <span class="font-bold text-lg hidden sm:inline">Pengaduan Jalan</span>
                    </router-link>
                    <button @click="handleLogout"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                            </path>
                        </svg>
                        <span class="font-medium">Logout</span>
                    </button>
                </div>
            </nav>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- Upload Form -->
                <div class="lg:col-span-1">
                    <app-upload />
                </div>

                <!-- Reports List -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <!-- Header -->
                        <div class="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                            <h2 class="text-2xl font-bold text-gray-800">Dashboard Saya</h2>
                            <p class="text-gray-600 mt-1">Kelola laporan pengaduan Anda</p>
                        </div>

                        <!-- Content -->
                        <div class="p-6">
                            <!-- Loading State -->
                            <div v-if="reportsLoading" class="flex flex-col items-center justify-center py-16">
                                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                <p class="mt-4 text-gray-600">Memuat laporan...</p>
                            </div>

                            <!-- Error State -->
                            <div v-else-if="reportsError" class="text-center py-16">
                                <div class="text-red-600 bg-red-50 rounded-lg p-6">
                                    <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <p class="font-semibold">{{ reportsError }}</p>
                                </div>
                            </div>

                            <!-- Reports List -->
                            <div v-else-if="reports.length > 0" class="space-y-4">
                                <div v-for="report in reports" :key="report.id"
                                    class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">

                                    <!-- Report Header -->
                                    <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 cursor-pointer"
                                        @click="toggleReport(report.id)">
                                        <div class="flex justify-between items-start">
                                            <div class="flex-1">
                                                <h3 class="text-lg font-bold text-gray-800">{{ report.title }}</h3>
                                                <p class="text-sm text-gray-600 mt-1">
                                                    <svg class="w-4 h-4 inline-block mr-1" fill="none"
                                                        stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                                        </path>
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z">
                                                        </path>
                                                    </svg>
                                                    {{ report.address }}
                                                </p>
                                            </div>
                                            <div class="flex items-center gap-3">
                                                <span :class="getStatusClass(report.status)">
                                                    {{ labels[report.status] || report.status }}
                                                </span>
                                                <svg class="w-5 h-5 text-gray-400 transition-transform"
                                                    :class="{ 'rotate-180': expandedReports.includes(report.id) }"
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Report Body (Collapsible) -->
                                    <div v-show="expandedReports.includes(report.id)" class="px-6 py-4 bg-white">
                                        <!-- View Mode -->
                                        <div v-if="editId !== report.id" class="space-y-4">
                                            <div class="flex items-center gap-2 text-sm text-gray-500">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                                    </path>
                                                </svg>
                                                <span>Dilaporkan: {{ report.createdAt ?
                                                    report.createdAt.toLocaleDateString('id-ID') : 'N/A' }}</span>
                                            </div>

                                            <div class="prose max-w-none">
                                                <p class="text-gray-700 leading-relaxed">{{ report.description }}</p>
                                            </div>

                                            <!-- Images -->
                                            <div v-if="report.image_urls && report.image_urls.length" class="mt-4">
                                                <h5 class="font-semibold text-gray-800 mb-3">Lampiran Gambar:</h5>
                                                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    <img v-for="(url, index) in report.image_urls" :key="index"
                                                        :src="url" alt="Gambar Laporan"
                                                        class="w-full h-32 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition"
                                                        @click="showImage(url)" />
                                                </div>
                                            </div>

                                            <!-- Rating Display (if exists) -->
                                            <div v-if="report.rating"
                                                class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <div class="flex items-center gap-2 mb-2">
                                                    <span class="text-sm font-semibold text-gray-700">Rating
                                                        Anda:</span>
                                                    <div class="flex gap-1">
                                                        <svg v-for="star in 5" :key="star" class="w-5 h-5"
                                                            :class="star <= report.rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                        </svg>
                                                    </div>
                                                    <span class="text-sm font-medium text-gray-600">({{
                                                        report.rating.rating }}/5)</span>
                                                </div>
                                                <p v-if="report.rating.comment" class="text-sm text-gray-600 italic">
                                                    "{{ report.rating.comment }}"
                                                </p>
                                                <p class="text-xs text-gray-500 mt-2">
                                                    Diberikan pada: {{ report.rating.createdAt ? new
                                                        Date(report.rating.createdAt).toLocaleDateString('id-ID') : 'N/A' }}
                                                </p>
                                            </div>

                                            <!-- Action Buttons -->
                                            <div class="flex justify-between pt-4 border-t">
                                                <div class="flex gap-2">
                                                    <button @click="startEdit(report)"
                                                        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                                            </path>
                                                        </svg>
                                                        Edit
                                                    </button>
                                                    <button @click="confirmDelete(report.id)"
                                                        :disabled="isDeleting === report.id"
                                                        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-50">
                                                        <svg v-if="isDeleting === report.id"
                                                            class="w-4 h-4 animate-spin" fill="none"
                                                            viewBox="0 0 24 24">
                                                            <circle class="opacity-25" cx="12" cy="12" r="10"
                                                                stroke="currentColor" stroke-width="4"></circle>
                                                            <path class="opacity-75" fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                                            </path>
                                                        </svg>
                                                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                            </path>
                                                        </svg>
                                                        {{ isDeleting === report.id ? 'Menghapus...' : 'Hapus' }}
                                                    </button>
                                                </div>

                                                <!-- Rating Button - Only show if status is 'selesai' -->
                                                <button v-if="report.status === 'selesai'"
                                                    @click="openRatingModal(report)"
                                                    :disabled="report.rating !== null && report.rating !== undefined"
                                                    class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition"
                                                    :class="report.rating ? 'bg-gray-400 cursor-not-allowed' : 'btn btn-primary'">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                    {{ report.rating ? 'Sudah Diberi Rating' : 'Beri Rating' }}
                                                </button>
                                            </div>
                                        </div>

                                        <!-- Edit Mode -->
                                        <div v-else>
                                            <div class="space-y-4">
                                                <div>
                                                    <label class="block text-sm font-semibold text-gray-700 mb-2">Judul
                                                        Laporan</label>
                                                    <input type="text" v-model="editTitle" required
                                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                        placeholder="Masukkan judul laporan" />
                                                </div>
                                                <div>
                                                    <label
                                                        class="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                                                    <textarea v-model="editDescription" required rows="4"
                                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                        placeholder="Masukkan deskripsi laporan"></textarea>
                                                </div>
                                                <div class="flex gap-2 pt-2">
                                                    <button @click="saveEdit(report.id)"
                                                        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                        Simpan
                                                    </button>
                                                    <button @click="cancelEdit"
                                                        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                        </svg>
                                                        Batal
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Empty State -->
                            <div v-else class="text-center py-16">
                                <svg class="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                    </path>
                                </svg>
                                <p class="text-gray-500 text-lg">Anda belum memiliki laporan</p>
                                <p class="text-gray-400 text-sm mt-2">Buat laporan baru di form sebelah kiri</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Image Modal -->
        <div v-if="selectedImage" @click="closeImage"
            class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div class="relative max-w-4xl max-h-screen">
                <button @click="closeImage"
                    class="absolute -top-10 right-0 text-white text-4xl hover:text-gray-300 transition">
                    &times;
                </button>
                <img :src="selectedImage" alt="Preview" class="max-w-full max-h-screen rounded-lg shadow-2xl">
            </div>
        </div>

        <!-- Rating Modal -->
        <div v-if="showRatingModal" @click="closeRatingModal"
            class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div @click.stop class="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-bold text-white">Berikan Rating</h3>
                        <button @click="closeRatingModal" class="text-white hover:text-gray-200 transition">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Body -->
                <div class="p-6">
                    <div class="mb-4">
                        <p class="text-sm text-gray-600 mb-2">Laporan:</p>
                        <p class="font-semibold text-gray-800">{{ currentRatingReport?.title }}</p>
                    </div>

                    <!-- Star Rating -->
                    <div class="mb-6">
                        <label class="block text-sm font-semibold text-gray-700 mb-3">
                            Rating Layanan <span class="text-red-500">*</span>
                        </label>
                        <div class="flex gap-2 justify-center">
                            <button v-for="star in 5" :key="star" @click="setRating(star)"
                                @mouseenter="hoveredRating = star" @mouseleave="hoveredRating = 0"
                                class="transition-transform hover:scale-110">
                                <svg class="w-12 h-12"
                                    :class="star <= (hoveredRating || ratingValue) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </button>
                        </div>
                        <p v-if="ratingValue > 0" class="text-center mt-2 text-sm font-medium text-gray-700">
                            {{ getRatingLabel(ratingValue) }}
                        </p>
                    </div>

                    <!-- Comment -->
                    <div class="mb-6">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Komentar (Opsional)
                        </label>
                        <textarea v-model="ratingComment" rows="4"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Berikan komentar atau saran untuk kami..."></textarea>
                    </div>

                    <!-- Buttons -->
                    <div class="flex gap-3">
                        <button @click="closeRatingModal"
                            class="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium">
                            Batal
                        </button>
                        <button @click="submitRating" :disabled="isSubmittingRating || ratingValue === 0"
                            class="flex-1 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ isSubmittingRating ? 'Mengirim...' : 'Kirim Rating' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import Header from '../components/Header.vue';
import { useUserStore } from '../stores/user';
import { useReportStore } from '../stores/reportStore';
import { mapStores, mapState, mapActions } from 'pinia';
import AppUpload from '../components/Upload.vue';

export default {
    name: 'Manage',
    beforeRouteEnter: (to, from, next) => {
        const store = useUserStore()
        if (store.userLoggedIn) {
            next()
        } else {
            next({ name: 'home' })
        }
    },
    async created() {
        await this.fetchUserReports();
    },
    data() {
        return {
            editId: null,
            editTitle: '',
            editDescription: '',
            isDeleting: null,
            selectedImage: null,
            expandedReports: [],
            classes: {
                pending: "bg-yellow-100 text-yellow-800",
                proses: "bg-blue-100 text-blue-800",
                selesai: "bg-green-100 text-green-800",
                ditolak: "bg-red-100 text-red-800"
            },
            labels: {
                pending: "Menunggu",
                proses: "Diproses",
                selesai: "Selesai",
                ditolak: "Ditolak"
            },
            // Rating Modal State
            showRatingModal: false,
            currentRatingReport: null,
            ratingValue: 0,
            hoveredRating: 0,
            ratingComment: '',
            isSubmittingRating: false
        }
    },
    components: {
        Header,
        AppUpload,
    },
    computed: {
        ...mapStores(useUserStore),
        ...mapState(useReportStore, ['reports', 'reportsLoading', 'reportsError']),
    },
    methods: {
        ...mapActions(useReportStore, ['fetchUserReports', 'deleteReport', 'updateReport', 'addRating']),

        handleLogout() {
            this.userStore.signOut();
            this.$router.push('/');
        },

        toggleReport(reportId) {
            const index = this.expandedReports.indexOf(reportId);
            if (index > -1) {
                this.expandedReports.splice(index, 1);
            } else {
                this.expandedReports.push(reportId);
            }
        },

        async confirmDelete(reportId) {
            if (window.confirm("Apakah Anda yakin ingin menghapus laporan ini secara permanen?")) {
                this.isDeleting = reportId;
                try {
                    await this.deleteReport(reportId);
                    alert("Laporan berhasil dihapus.");
                } catch (e) {
                    alert("Gagal menghapus laporan.");
                } finally {
                    this.isDeleting = null;
                }
            }
        },

        startEdit(report) {
            this.editId = report.id;
            this.editTitle = report.title;
            this.editDescription = report.description;
        },

        cancelEdit() {
            this.editId = null;
            this.editTitle = '';
            this.editDescription = '';
        },

        async saveEdit(reportId) {
            try {
                await this.updateReport(reportId, this.editTitle, this.editDescription);
                alert("Laporan berhasil diperbarui.");
                this.cancelEdit();
            } catch (e) {
                alert("Gagal menyimpan perubahan.");
            }
        },

        showImage(url) {
            this.selectedImage = url;
        },

        closeImage() {
            this.selectedImage = null;
        },

        getStatusClass(status) {
            const statusClass = this.classes[status] || "bg-gray-100 text-gray-800";
            return `px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusClass}`;
        },

        // Rating Methods
        openRatingModal(report) {
            if (report.rating) {
                alert('Anda sudah memberikan rating untuk laporan ini');
                return;
            }
            this.currentRatingReport = report;
            this.showRatingModal = true;
            this.ratingValue = 0;
            this.ratingComment = '';
        },

        closeRatingModal() {
            this.showRatingModal = false;
            this.currentRatingReport = null;
            this.ratingValue = 0;
            this.hoveredRating = 0;
            this.ratingComment = '';
        },

        setRating(value) {
            this.ratingValue = value;
        },

        getRatingLabel(rating) {
            const labels = {
                1: 'Sangat Buruk',
                2: 'Buruk',
                3: 'Cukup',
                4: 'Baik',
                5: 'Sangat Baik'
            };
            return labels[rating] || '';
        },

        async submitRating() {
            if (this.ratingValue === 0) {
                alert('Silakan pilih rating bintang terlebih dahulu');
                return;
            }

            this.isSubmittingRating = true;
            try {
                await this.addRating(this.currentRatingReport.id, {
                    rating: this.ratingValue,
                    comment: this.ratingComment
                });

                alert('Terima kasih atas rating Anda!');
                this.closeRatingModal();
            } catch (error) {
                console.error('Error submitting rating:', error);
                alert('Gagal mengirim rating. Silakan coba lagi.');
            } finally {
                this.isSubmittingRating = false;
            }
        }
    }
}
</script>