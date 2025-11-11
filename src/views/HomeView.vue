<template>
    <Header />
    <main>
        <!-- Landing Page -->
        <div id="beranda"
            class="container mx-auto min-h-screen px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center gap-6 sm:gap-8 py-12">
            <article class="mb-4">
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 px-4">
                    Layanan Pengaduan Jalanan <span class="block mt-2 sm:mt-3">Rusak Masyarakat</span>
                </h2>
                <p class="text-slate-600 text-center text-sm sm:text-base px-4 max-w-2xl mx-auto">
                    Sampaikan Aspirasi Anda Mudah dan Transparan. Kami Memastikan Setiap Suara Didengar dan
                    Ditindaklanjuti
                </p>
            </article>
            <div>
                <router-link :to="{ name: 'manage' }" href="#"
                    class="py-3 sm:py-4 px-6 sm:px-8 bg-indigo-600 text-white text-center text-sm sm:text-base rounded-xl hover:bg-indigo-700 inline-block">
                    Sampaikan Pengaduan
                </router-link>
            </div>
        </div>
        <!-- end landing page -->

        <!-- tentang layanan -->
        <div id="aboutMe"
            class="container mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-7 rounded-xl my-8">
            <article class="w-full lg:w-2/5 px-4">
                <h3 class="text-xl sm:text-2xl font-bold mb-4 text-center lg:text-left">Apa itu Layanan Pengaduan?</h3>
                <p class="text-sm sm:text-base text-slate-600 text-center lg:text-left">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nam eligendi aperiam
                    laborum, amet in commodi culpa illo natus fugit reiciendis doloremque id aspernatur esse pariatur
                    neque sit
                    temporibus nulla ipsa! Explicabo provident eaque sapiente?
                </p>
            </article>
            <img src="../assets/undraw_news_nz1p.svg" class="w-full max-w-sm lg:max-w-md" alt="">
        </div>
        <!-- end tentang layanan -->

        <!-- data pengaduan -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h1 class="text-center mb-6 sm:mb-8 text-xl sm:text-2xl font-bold">Data Pengaduan</h1>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-4 lg:gap-8">
                <div
                    class="w-full sm:w-64 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform">
                    <div class="text-center">
                        <p class="text-3xl sm:text-4xl font-bold text-indigo-600">1334</p>
                        <p class="mt-2 text-sm sm:text-md text-gray-700 uppercase tracking-wider">Total Laporan Masuk
                        </p>
                    </div>
                </div>
                <div
                    class="w-full sm:w-64 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform">
                    <div class="text-center">
                        <p class="text-3xl sm:text-4xl font-bold text-indigo-600">175</p>
                        <p class="mt-2 text-sm sm:text-md text-gray-700 uppercase tracking-wider">Laporan yang
                            Diselesaikan</p>
                    </div>
                </div>
                <div
                    class="w-full sm:w-64 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform">
                    <div class="text-center">
                        <p class="text-3xl sm:text-4xl font-bold text-indigo-600">175</p>
                        <p class="mt-2 text-sm sm:text-md text-gray-700 uppercase tracking-wider">Tingkat Kepuasan
                            Pelapor</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- end data pengaduan -->

        <!-- prosedur pengaduan -->
        <div id="prosedur" class="container mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
            <h2 class="text-center mb-6 sm:mb-8 text-xl sm:text-2xl font-bold px-4">Prosedur Pengaduan di Website
                Layanan Pengaduan</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div class="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform">
                    <div class="flex flex-col sm:flex-row items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-20 h-20 sm:w-32 sm:h-32">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <div class="text-center sm:text-left">
                            <p class="text-lg sm:text-xl font-bold text-indigo-600">1. Register/Login</p>
                            <p class="mt-2 text-xs sm:text-sm text-gray-700 tracking-wider">Daftar terlebih dahulu
                                sebelum
                                melakukan pengaduan. Setelah mendaftar, login untuk menulis pengaduan.</p>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform">
                    <div class="flex flex-col sm:flex-row items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-20 h-20 sm:w-32 sm:h-32">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <div class="text-center sm:text-left">
                            <p class="text-lg sm:text-xl font-bold text-indigo-600">2. Tulis Pengaduan</p>
                            <p class="mt-2 text-xs sm:text-sm text-gray-700 tracking-wider">Tulis pengaduan yang sesuai
                                dengan
                                masalah yang anda alami atau yang anda temui. Sertakan surat atau foto sebelum melakukan
                                pengaduan.</p>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform">
                    <div class="flex flex-col sm:flex-row items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-20 h-20 sm:w-32 sm:h-32">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
                        <div class="text-center sm:text-left">
                            <p class="text-lg sm:text-xl font-bold text-indigo-600">3. Verifikasi Pengaduan</p>
                            <p class="mt-2 text-xs sm:text-sm text-gray-700 tracking-wider">Jika anda sudah mengirim
                                pengaduan,
                                maka pengaduan anda akan segera diproses dan diverifikasi oleh petugas kami.</p>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform">
                    <div class="flex flex-col sm:flex-row items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-20 h-20 sm:w-32 sm:h-32">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <div class="text-center sm:text-left">
                            <p class="text-lg sm:text-xl font-bold text-indigo-600">4. Proses Tindak Lanjut</p>
                            <p class="mt-2 text-xs sm:text-sm text-gray-700 tracking-wider">Setelah melalui proses
                                verifikasi oleh
                                petugas, selanjutnya kami akan menindak lanjuti terkait pengaduan anda.</p>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform">
                    <div class="flex flex-col sm:flex-row items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-20 h-20 sm:w-32 sm:h-32">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <div class="text-center sm:text-left">
                            <p class="text-lg sm:text-xl font-bold text-indigo-600">5. Beri Tanggapan</p>
                            <p class="mt-2 text-xs sm:text-sm text-gray-700 tracking-wider">Setelah kami tindak lanjuti,
                                maka
                                selanjutnya anda tinggal menunggu tanggapan dari kami.</p>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform">
                    <div class="flex flex-col sm:flex-row items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-20 h-20 sm:w-32 sm:h-32">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                        <div class="text-center sm:text-left">
                            <p class="text-lg sm:text-xl font-bold text-indigo-600">6. Selesai</p>
                            <p class="mt-2 text-xs sm:text-sm text-gray-700 tracking-wider">Anda bisa melihat tanggapan
                                atau status
                                dari pengaduan anda di halaman dashboard anda.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end prosedur pengaduan -->

        <!-- tautan cepat -->
        <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-12">
            <div class="w-full bg-indigo-600 rounded-xl py-8 sm:py-12 px-4 flex flex-col justify-center items-center">
                <h2 class="text-center text-white mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold">Siap Menyampaikan Keluhan
                    Anda?</h2>
                <p class="text-center text-white mb-8 sm:mb-12 text-sm sm:text-base max-w-2xl">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui ipsam optio suscipit alias iure omnis
                    consequuntur ratione dolorum nesciunt hic.
                </p>
                <div>
                    <a href="#"
                        class="py-3 sm:py-4 px-6 sm:px-8 bg-white text-indigo-600 text-center text-sm sm:text-base rounded-2xl hover:bg-indigo-100 inline-block">
                        Sampaikan Pengaduan
                    </a>
                </div>
            </div>
        </div>
        <!-- end tautan cepat -->

        <!-- footer -->
        <footer
            class="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 py-5 px-4 sm:px-8 bg-slate-200 rounded-xl">
            <div class="text-center sm:text-left">
                <p class="text-sm sm:text-base">&copy; 2025 Laporan Layanan Pengaduan</p>
            </div>
            <div class="flex gap-4 sm:gap-8">
                <a href="#" class="text-sm sm:text-base hover:text-indigo-600">Instagram</a>
                <a href="#" class="text-sm sm:text-base hover:text-indigo-600">X</a>
                <a href="#" class="text-sm sm:text-base hover:text-indigo-600">YouTube</a>
            </div>
        </footer>
        <!-- footer -->

    </main>
</template>

<script>
import Header from '../components/Header.vue'
import { RouterLink } from 'vue-router';

export default {
    components: {
        Header,
    },
}
</script>
