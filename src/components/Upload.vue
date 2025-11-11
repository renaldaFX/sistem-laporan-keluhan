<template>
    <div class="col-span-1">

        <!-- Alert Success -->
        <Alert v-if="showAlert" :variant="alertVariant" :message="alertMessage" @close="hideAlert" />

        <div class="p-6 bg-white border border-gray-200 mb-4 rounded">
            <!-- Input file tersembunyi -->
            <input type="file" ref="fileInput" @change="upload($event)" accept="image/jpeg,image/jpg,image/png" multiple
                class="hidden" />

            <!-- Area drag and drop / klik -->
            <div class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-indigo-400 hover:border-indigo-400 hover:border-solid"
                :class="{ 'bg-indigo-400 border-indigo-400 border-solid': is_dragover }" @drag.prevent.stop=""
                @dragstart.prevent.stop="" @dragend.prevent.stop="is_dragover = false"
                @dragover.prevent.stop="is_dragover = true" @dragenter.prevent.stop="is_dragover = true"
                @dragleave.prevent.stop="is_dragover = false" @drop.prevent.stop="upload($event)"
                @click="$refs.fileInput.click()">
                <i class="fas fa-cloud-upload-alt text-4xl mb-3"></i>
                <h5 class="font-semibold">Drop your pictures here or click to browse</h5>
                <p class="text-sm mt-2">Support: JPG, JPEG</p>
            </div>

            <div class="mt-4">
                <div v-for="upload in uploads" :key="upload.id" class="mb-4 border rounded overflow-hidden" :class="{
                    'border-blue-400': upload.status === 'uploading',
                    'border-green-400': upload.status === 'success',
                    'border-red-400': upload.status === 'error',
                }">
                    <!-- Preview Gambar -->
                    <div v-if="upload.preview || upload.url"
                        class="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img :src="upload.url || upload.preview" :alt="upload.name"
                            class="max-h-full max-w-full object-contain" />
                    </div>

                    <!-- Info Upload -->
                    <div class="p-4 text-sm" :class="{
                        'bg-blue-50': upload.status === 'uploading',
                        'bg-green-50': upload.status === 'success',
                        'bg-red-50': upload.status === 'error',
                    }">
                        <div class="font-bold text-sm">{{ upload.name }}</div>

                        <div class="flex items-center mt-1">
                            <i v-if="upload.status === 'uploading'" class="fas fa-spinner fa-spin mr-2"></i>
                            <i v-else-if="upload.status === 'success'"
                                class="fas fa-check-circle text-green-600 mr-2"></i>
                            <i v-else-if="upload.status === 'error'" class="fas fa-times-circle text-red-600 mr-2"></i>

                            <div v-if="upload.status === 'uploading'">
                                {{ Math.round(upload.progress) }}%
                            </div>
                            <div v-else-if="upload.status === 'success'" class="font-semibold text-green-600">
                                Unggahan Berhasil!
                            </div>
                            <div v-else-if="upload.status === 'error'" class="font-semibold text-red-600">
                                Unggahan Gagal.
                            </div>
                        </div>

                        <div v-if="upload.status !== 'success' && upload.status !== 'error'"
                            class="h-2 bg-gray-300 rounded mt-2">
                            <div class="h-full rounded transition-all bg-blue-600"
                                :style="{ width: upload.progress + '%' }">
                            </div>
                        </div>
                        <p v-if="upload.error" class="text-xs text-red-500 mt-1">
                            Detail: {{ upload.error }}
                        </p>
                    </div>
                </div>
            </div>
            <hr class="my-6" />

            <div class="border border-gray-200 p-3 mb-4 rounded">
                <div>
                    <h4 class="inline-block text-2xl font-bold">Laporkan🚨</h4>
                </div>
                <div>
                    <form class="mt-4" @submit.prevent="submitReport">
                        <div class="mb-3">
                            <label class="inline-block mb-2">Judul Laporan</label>
                            <input type="text"
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                placeholder="Enter report Title" v-model="report_data.title" required />
                        </div>
                        <div class="mb-3">
                            <label class="inline-block mb-2">Alamat</label>
                            <input type="text"
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                placeholder="Address" v-model="report_data.address" required />
                        </div>
                        <div class="mb-3">
                            <label class="inline-block mb-2">Deskripsikan Kejadian</label>
                            <textarea
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                placeholder="Deskripsi" v-model="report_data.description" required />
                        </div>

                        <button type="submit" class="w-full py-1.5 px-3 rounded text-white bg-green-600"
                            :disabled="is_submitting || uploaded_urls.length === 0 || !allUploadsComplete"><i
                                v-if="is_submitting" class="fas fa-spinner fa-spin mr-1"></i>
                            {{ is_submitting ? 'Mengirim...' : 'Submit Laporan' }}
                        </button>

                        <p v-if="uploaded_urls.length === 0" class="text-sm text-red-500 mt-2">
                            *Unggah minimal satu gambar (JPEG) sebelum Submit.
                        </p>
                        <p v-else-if="!allUploadsComplete" class="text-sm text-yellow-500 mt-2">
                            *Mohon tunggu, proses unggahan gambar belum selesai.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { storageStore } from '../stores/storage';
import { useReportStore } from '../stores/reportStore';
import { auth } from '../firebase/firebase'
import Alert from './Alert.vue';

export default {
    name: 'Upload',
    data() {
        return {
            is_dragover: false,
            showAlert: false,
            alertMessage: '',
            selectedFile: null,
            isUploading: false,
            report_data: {
                title: '',
                address: '',
                description: '',
            },
            is_submitting: false
        }
    },
    components: {
        Alert
    },
    computed: {
        ...mapState(storageStore, ['uploads']),
        uploaded_urls() {
            return this.uploads.filter(u => u.status === 'success' && u.url).map(u => u.url);
        },
        allUploadsComplete() {
            if (this.uploads.length === 0) { return true };
            return this.uploads.every(u => u.status === 'success' || u.status === 'error');
        }
    },
    methods: {
        ...mapActions(storageStore, ['clearUploads']),
        ...mapActions(useReportStore, {
            sendReportToStore: 'submitReport', // <-- Mengganti nama: store.submitReport -> this.sendReportToStore
            fetchUserReports: 'fetchUserReports' // Ini tetap sama
        }),
        upload($event) {
            this.is_dragover = false
            const files = $event.dataTransfer ? [...$event.dataTransfer.files] : $event.target ? [...$event.target.files] : [];
            if (files.length > 0) {
                const store = storageStore();

                // Buat preview untuk setiap file
                files.forEach(file => {
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            // Cari upload yang sesuai dan tambahkan preview
                            const uploadItem = store.uploads.find(u => u.name === file.name);
                            if (uploadItem) {
                                uploadItem.preview = e.target.result;
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                });

                store.upload(files);
            }

            // Reset input file agar bisa upload file yang sama lagi
            if ($event.target) {
                $event.target.value = '';
            }
        },
        async submitReport() {
            this.is_submitting = true
            this.hideAlert();
            console.log("hello")
            if (this.uploaded_urls.length === 0 || !this.allUploadsComplete) {
                this.showError('Harap unggah minimal satu gambar (JPEG) yang berhasil.');
                this.is_submitting = false;
                return;
            }

            const user = auth.currentUser;
            if (!user) {
                this.showError('Anda tidak login. Gagal mengirim laporan.');
                this.is_submitting = false
                return;
            }

            if (!this.report_data.title || !this.report_data.address || !this.report_data.description) {
                this.showError('Mohon lengkapi semua field yang diperlukan.');
                this.is_submitting = false;
                return;
            }

            console.log("Validasi berhasil. Mengirim data...");

            const finalReportData = {
                ...this.report_data,
                image_urls: this.uploaded_urls,
            };

            console.log('Final Data to Firestore:', finalReportData);

            try {
                await this.sendReportToStore(finalReportData);
                this.showSuccess('Laporan berhasil dikirim!');

                // ... (reset form) ...

                // __________________________________
                // 
                // KODE YANG BENAR:
                // Panggil actions yang sudah dipetakan ke 'this'
                // 
                this.clearUploads();
                await this.fetchUserReports();
                // __________________________________
            } catch (e) {
                console.error("Error adding document: ", e);
                this.showError('Gagal mengirim laporan. Silakan coba lagi.');
            } finally {
                this.is_submitting = false;
            }
        },
        showSuccess(message) {
            this.alertVariant = 'alert-success';
            this.alertMessage = message;
            this.showAlert = true;
            this.isUploading = false;

            setTimeout(() => {
                this.hideAlert();
            }, 5000);
        },
        showError(message) {
            this.alertVariant = 'alert-error';
            this.alertMessage = message;
            this.showAlert = true;
            this.isUploading = false;

            setTimeout(() => {
                this.hideAlert();
            }, 5000);
        },
        hideAlert() {
            this.showAlert = false;
        },
    },
    watch: {
        uploads: {
            handler(newUploads) {
                if (newUploads.length === 0) return;

                if (this.allUploadsComplete) {
                    const hasError = newUploads.some(u => u.status === 'error');
                    const successCount = newUploads.filter(u => u.status === 'success').length;

                    if (hasError && successCount === 0) {
                        this.showError('Upload gagal! Semua file gagal diupload.');
                    } else if (hasError && successCount > 0) {
                        this.showError(`Beberapa file gagal diupload. ${successCount} file berhasil.`);
                    } else {
                        this.showSuccess(`${successCount} file berhasil diupload!`);
                    }
                }
            },
            deep: true
        }
    }
}
</script>