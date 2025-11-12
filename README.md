# Sistem Laporan Keluhan

Proyek ini adalah sebuah aplikasi web yang dibangun untuk mengelola laporan keluhan. Aplikasi ini memungkinkan pengguna untuk mengirimkan keluhan dan (kemungkinan) admin untuk meninjau dan mengelolanya.

## Fitur Utama

* Formulir pengiriman laporan keluhan.
* Tampilan daftar keluhan yang telah dikirim.
* Antarmuka yang responsif dan modern.
* (Fitur lain dapat ditambahkan sesuai pengembangan, misal: status tracking, autentikasi pengguna, dashboard admin).

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan tumpukan teknologi frontend modern:

* **[Vue 3](https://vuejs.org/)**: Framework JavaScript progresif untuk membangun antarmuka pengguna.
* **[Vite](https://vitejs.dev/)**: Build tool modern yang menyediakan development server super cepat dan build yang dioptimalkan.
* **JavaScript (ES6+)**
* **HTML5 & CSS3**

## Persyaratan Sistem

Untuk menjalankan proyek ini di lingkungan development, Anda memerlukan:

* **[Node.js](https://nodejs.org/)** (disarankan versi LTS, misal: 18.x atau 20.x)
* **npm** (biasanya sudah terinstal bersama Node.js)
* Web browser modern (Chrome, Firefox, Safari, Edge)

## Instalasi dan Penggunaan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

1.  **Clone repository ini:**
    ```sh
    git clone [https://github.com/renaldaFX/sistem-laporan-keluhan.git](https://github.com/renaldaFX/sistem-laporan-keluhan.git)
    ```

2.  **Masuk ke direktori proyek:**
    ```sh
    cd sistem-laporan-keluhan
    ```

3.  **Instal semua dependensi:**
    ```sh
    npm install
    ```

4.  **Jalankan development server:**
    Perintah ini akan menjalankan aplikasi dalam mode development dengan *hot-reload*.
    ```sh
    npm run dev
    ```
    Aplikasi akan tersedia di `http://localhost:5173` (atau port lain yang ditampilkan di terminal).

5.  **Build untuk Produksi:**
    Untuk membuat versi produksi yang teroptimasi, jalankan:
    ```sh
    npm run build
    ```
    Hasil build akan tersedia di dalam direktori `dist/`.

## Susunan Proyek

Struktur folder utama dalam proyek ini adalah sebagai berikut:
