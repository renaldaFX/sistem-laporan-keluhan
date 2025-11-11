import { defineStore } from "pinia";
import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const storageStore = defineStore('report', {
    state: () => ({
        uploads: [],
    }),

    actions: {
        upload(files) {
            // this.uploads = []
            files.forEach((file) => {
                const uploadItem = {
                    name: file.name,
                    progress: 0,
                    error: null,
                    url: null, // Untuk menyimpan Download URL
                    id: Date.now() + '_' + file.name, // ID unik untuk identifikasi
                    status: 'uploading'
                };
                if (file.type !== 'image/jpeg') {
                    console.error('Only JPEG file is allowed!')
                    return
                }
                this.uploads.push(uploadItem)
                const uniqueFileName = `${Date.now()}_${file.name}`;
                const fileRef = ref(storage, `laporan_gambar/${uniqueFileName}`)
                const uploadTask = uploadBytesResumable(fileRef, file)
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    const item = this.uploads.find(item => item.id === uploadItem.id);
                    if (item) {
                        item.progress = progress;
                    }
                }, (error) => {
                        console.error(`Gagal mengunggah ${file.name}:`, error)
                        uploadItem.error = error.message;
                        uploadItem.status = 'error';
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    const item = this.uploads.find(item => item.id === uploadItem.id);
                        if (item) {
                            item.url = downloadURL;
                            item.status = 'success'; // <-- Ini akan memicu computed property
                        }
                }).catch((error) => {
                    // Tangani kegagalan pengambilan URL
                            uploadItem.error = 'Failed to get download URL';
                            uploadItem.status = 'error';
                })
            })
        })
    },
    clearUploads() {
            this.uploads = [];
        }
    }   
})