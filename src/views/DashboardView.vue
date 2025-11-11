<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center space-x-3">
                        <div
                            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span class="text-white text-xl">🚧</span>
                        </div>
                        <h1 class="text-xl font-bold text-gray-800">Pengaduan Jalan Rusak</h1>
                    </div>

                    <nav class="flex space-x-1">
                        <button @click="handleLogout"
                            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-white hover:bg-red-600 transition">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                </path>
                            </svg>
                            <span class="hidden sm:inline">Logout</span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div class="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                    <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                    <p class="text-gray-600 mt-1">Kelola laporan pengaduan dari masyarakat</p>
                </div>

                <div v-if="reports.length === 0" class="p-10 text-center text-gray-500">
                    <p>Belum ada laporan pengaduan yang masuk.</p>
                </div>

                <div v-else class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b">
                            <tr>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    No</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Nama Laporan</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Alamat</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Deskripsi</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Tanggal</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Gambar</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Rating</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="(report, index) in reports" :key="report.id" class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4 text-sm text-gray-900">{{ index + 1 }}</td>
                                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ report.title }}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">{{ report.address }}</td>
                                <td class="px-6 py-4 text-sm text-gray-600 max-w-xs">
                                    <p class="">{{ report.description }}</p>
                                </td>

                                <td class="px-6 py-4 text-sm text-gray-600">
                                    {{ formatTanggal(report.createdAt) }}
                                </td>

                                <td class="px-6 py-4">
                                    <img v-for="(url, index) in report.image_urls" :key="index" :src="url"
                                        alt="Gambar Laporan"
                                        class="w-full h-24 object-cover rounded shadow-md cursor-pointer"
                                        @click="showImage(url)" />
                                </td>

                                <td class="px-6 py-4">
                                    <span :class="getStatusClass(report.status)">
                                        {{ labels[report.status] || report.status }}
                                    </span>
                                </td>

                                <!-- Rating Column -->
                                <td class="px-6 py-4">
                                    <div v-if="report.rating" class="space-y-1">
                                        <div class="flex items-center gap-1">
                                            <svg v-for="star in 5" :key="star" class="w-4 h-4"
                                                :class="star <= report.rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        </div>
                                        <span class="text-xs font-semibold text-gray-700">{{ report.rating.rating
                                            }}/5</span>
                                        <button v-if="report.rating.comment" @click="showRatingDetail(report)"
                                            class="text-xs text-blue-600 hover:text-blue-800 underline">
                                            Lihat Detail
                                        </button>
                                        <p v-else class="text-xs text-gray-500 italic">Tanpa komentar</p>
                                    </div>
                                    <span v-else class="text-xs text-gray-400 italic">Belum ada rating</span>
                                </td>

                                <td class="px-6 py-4">
                                    <div class="flex flex-col space-y-1 w-24">
                                        <button v-if="report.status === 'pending'"
                                            @click="ubahStatus(report.id, 'proses')"
                                            class="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                            Proses
                                        </button>
                                        <button v-if="report.status === 'proses'"
                                            @click="ubahStatus(report.id, 'selesai')"
                                            class="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition">
                                            Selesai
                                        </button>
                                        <button v-if="report.status === 'pending' || report.status === 'proses'"
                                            @click="ubahStatus(report.id, 'ditolak')"
                                            class="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition">
                                            Tolak
                                        </button>
                                        <span v-if="report.status === 'selesai' || report.status === 'ditolak'"
                                            class="text-xs text-gray-500 italic">
                                            Final
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

        <!-- Image Modal -->
        <div v-if="showModal" @click="closeImage"
            class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div class="relative max-w-4xl max-h-screen">
                <button @click="closeModal"
                    class="absolute -top-10 right-0 text-white text-4xl hover:text-gray-300 cursor-pointer">
                    &times;
                </button>
                <img :src="selectedImage" alt="Preview" class="max-w-full max-h-screen rounded-lg shadow-2xl">
            </div>
        </div>

        <!-- Rating Detail Modal -->
        <div v-if="showRatingModal" @click="closeRatingModal"
            class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div @click.stop class="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-500 to-sky-500 px-6 py-4">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-bold text-white">Detail Rating</h3>
                        <button @click="closeRatingModal" class="text-white hover:text-gray-200 transition">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Body -->
                <div class="p-6 space-y-4">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Laporan:</p>
                        <p class="font-bold text-gray-800 text-lg">{{ selectedRatingReport?.title }}</p>
                    </div>

                    <div class="border-t pt-4">
                        <p class="text-sm text-gray-600 mb-2">Rating:</p>
                        <div class="flex items-center gap-2">
                            <div class="flex gap-1">
                                <svg v-for="star in 5" :key="star" class="w-6 h-6"
                                    :class="star <= selectedRatingReport?.rating?.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                            <span class="text-lg font-bold text-gray-800">
                                {{ selectedRatingReport?.rating?.rating }}/5
                            </span>
                            <span class="text-sm font-medium text-gray-600">
                                ({{ getRatingLabel(selectedRatingReport?.rating?.rating) }})
                            </span>
                        </div>
                    </div>

                    <div v-if="selectedRatingReport?.rating?.comment" class="border-t pt-4">
                        <p class="text-sm text-gray-600 mb-2">Komentar:</p>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <p class="text-gray-800 leading-relaxed">{{ selectedRatingReport.rating.comment }}</p>
                        </div>
                    </div>

                    <div class="border-t pt-4">
                        <p class="text-xs text-gray-500">
                            Rating diberikan pada: {{ selectedRatingReport?.rating?.createdAt ?
                                new Date(selectedRatingReport.rating.createdAt).toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'N/A' }}
                        </p>
                    </div>
                </div>

                <!-- Footer -->
                <div class="bg-gray-50 px-6 py-4">
                    <button @click="closeRatingModal"
                        class="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition font-medium">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useReportStore } from '../stores/reportStore';
import { useUserStore } from '../stores/user';
import { mapStores, mapState, mapActions } from 'pinia';

export default {
    async created() {
        await this.fetchAllReports();
    },
    data() {
        return {
            showModal: false,
            selectedImage: null,
            showRatingModal: false,
            selectedRatingReport: null,
            // Data untuk 'getStatusClass'
            classes: {
                pending: "bg-yellow-100 text-yellow-800",
                proses: "bg-blue-100 text-blue-800",
                selesai: "bg-green-100 text-green-800",
                ditolak: "bg-red-100 text-red-800"
            },
            // Data untuk 'label' status
            labels: {
                pending: "Menunggu",
                proses: "Diproses",
                selesai: "Selesai",
                ditolak: "Ditolak"
            }
        }
    },
    computed: {
        ...mapStores(useUserStore),
        ...mapState(useReportStore, ['reports', 'reportsLoading', 'reportsError']),
    },
    methods: {
        // Gabungkan semua mapActions agar lebih rapi
        ...mapActions(useReportStore, ['fetchAllReports', 'updateReportStatus']),
        ...mapActions(useUserStore, ['signOut']),

        // Perbaikan Status
        getStatusClass(status) {
            const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";
            const statusClass = this.classes[status] || "bg-gray-100 text-gray-800";
            return `${baseClasses} ${statusClass}`;
        },

        handleLogout() {
            this.signOut();
            this.$router.push('/');
        },

        showImage(image) {
            this.selectedImage = image;
            this.showModal = true;
        },

        closeImage() {
            this.showModal = false;
            this.selectedImage = null;
        },

        closeModal() {
            this.showModal = false;
            this.selectedImage = null;
        },

        formatTanggal(tanggal) {
            if (!tanggal || typeof tanggal.toLocaleDateString !== 'function') {
                return "N/A";
            }
            return tanggal.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            });
        },

        async ubahStatus(id, status) {
            try {
                await this.updateReportStatus(id, status);
                console.log(`Status berhasil diubah menjadi ${status}`);
            } catch (error) {
                console.error('Gagal mengubah status:', error);
                alert('Gagal mengubah status');
            }
        },

        // Rating Methods
        showRatingDetail(report) {
            this.selectedRatingReport = report;
            this.showRatingModal = true;
        },

        closeRatingModal() {
            this.showRatingModal = false;
            this.selectedRatingReport = null;
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
            T
        }
    },
}
</script>