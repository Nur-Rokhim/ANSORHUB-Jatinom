# SAHABAT Jatinom (v2.3)
**Sistem Administrasi Hubungan Anggota Banser, Ansor, & Tradisi Rijalul Ansor**  
Pimpinan Ranting Gerakan Pemuda Ansor Desa Jatinom, Kec. Kanigoro, Kab. Blitar

---

## 🌟 Tentang Aplikasi Web
**SAHABAT Jatinom** adalah aplikasi web administrasi terpadu berbasis **PHP & MySQL (XAMPP)** dengan navigasi modern **Sidebar**, dirancang khusus untuk memenuhi standar tata kelola Pimpinan Ranting (PR) GP Ansor Desa Jatinom, Satkorkel Banser, dan Majelis Dzikir dan Sholawat (MDS) Rijalul Ansor.

Aplikasi ini dapat dijalankan dengan 2 cara:
1. **Aplikasi Web Server XAMPP (Direkomendasikan):** Menggunakan Apache + MySQL/MariaDB dengan backend PHP (`index.php`, `config.php`, `api.php`, `database.sql`).
2. **Aplikasi Standalone Offline:** Langsung klik dua kali file `index.html` pada browser Chrome/Edge/Firefox (otomatis menggunakan penyimpanan lokal browser/LocalStorage).

---

## 🚀 Panduan Menjalankan di XAMPP

1. **Pastikan XAMPP Terinstal:**
   - Unduh dan pasang XAMPP dari situs resmi apachefriends.org jika belum terpasang.
2. **Pindahkan Folder Aplikasi:**
   - Salin/pindahkan seluruh folder proyek ini ke dalam direktori `htdocs` XAMPP, contoh:  
     `C:\xampp\htdocs\sahabat-jatinom\`
3. **Jalankan Apache & MySQL di XAMPP Control Panel:**
   - Buka XAMPP Control Panel lalu klik tombol **Start** pada modul **Apache** dan **MySQL**.
4. **Impor Database MySQL (Otomatis / via phpMyAdmin):**
   - Buka browser dan kunjungi `http://localhost/phpmyadmin/`
   - Buat database baru bernama `db_sahabat_jatinom`
   - Klik tab **Import**, pilih berkas `database.sql` dari folder proyek, lalu klik **Go / Impor**.
   *(Catatan: `config.php` juga memiliki fitur otomatisasi inisialisasi tabel dasar saat aplikasi dibuka).*
5. **Buka Aplikasi Web:**
   - Akses via browser: `http://localhost/sahabat-jatinom/` (atau `http://localhost/ansorhub-jatinom/`).

---

## 🧭 Navigasi Modern Sidebar (Urutan 6 Menu Resmi)

Menu aplikasi kini berbentuk **Sidebar (Left-hand Navigation)** yang responsif (tetap di sisi kiri pada layar PC/Laptop, serta laci geser *collapsible drawer* dengan tombol hamburger pada layar ponsel/HP):

1. **1. Warta Ansor**
   - Siaran kabar dan publikasi berita resmi ranting.
   - **Fitur CRUD Penuh:** Warta dapat ditambah, disunting (update), dan dihapus setiap saat melalui tombol *"Tulis / Update Warta"*.
   - Filter kategori warta (Ansor, Banser, MDS RA, Pengumuman, Opini).
   - Fitur baca lengkap dan bagikan langsung ke WhatsApp grup.

2. **2. E-Surat**
   - Generator surat resmi baku sesuai Peraturan Organisasi (PO) GP Ansor.
   - Format penomoran otomatis: `[No]/PR-XII-11-07-02/[Jenis]-[Sifat]/[Bulan Romawi]/[Tahun]`.
   - **9 Template Siap Pakai:** `SR` (Rutin), `SK` (Keputusan), `SM` (Mandat), `ST` (Tugas), `SU` (Undangan), `SI` (Instruksi), `SE` (Edaran), `Not` (Notulensi), `SRU` (Rekomendasi Umum).
   - Pratinjau cetak A4 presisi lengkap dengan **Kop Lembaga, Stempel basah digital, dan Tanda Tangan**.
   - Buku arsip persuratan digital masuk dan keluar.

3. **3. E-Kader**
   - Formulir pendataan anggota (Nama, NIK, NIA, Tempat/Tgl Lahir, Alamat RT/RW Dusun Jatinom, No. WhatsApp).
   - Keanggotaan multi-badan otonom (`[ ] Ansor`, `[ ] Banser`, `[ ] Rijalul Ansor`).
   - Tingkat kaderisasi formal: PKD, PKL, PKN, DIKLATSAR, SUSBALAN, SUBANPIM.
   - Ringkasan statistik kader dan ekspor data ke format CSV/Excel.

4. **4. Agenda**
   - Kalender kegiatan dan rutinan Selapanan Malam Ahad Pon MDS Rijalul Ansor, Diba'an, Apel Banser, dan Rapat Pleno Ranting.
   - Form input agenda baru dan tombol siaran undangan via WhatsApp.

5. **5. Profil Ranting**
   - **Daftar Lengkap Nama-Nama Pengurus Ranting:** Susunan kepengurusan lengkap (Dewan Penasehat NU, Pengurus Harian Ansor, Satkorkel BANSER, Pengurus MDS Rijalul Ansor, serta Biro & Siber) dengan fitur tambah & edit data pengurus secara dinamis.
   - **Upload Tanda Tangan dan Stempel Resmi (3 Pilar):**
     - **GP Ansor:** Upload TTD Ketua, TTD Sekretaris, dan Stempel Resmi Ansor.
     - **BANSER:** Upload TTD Kasatkorkel dan Stempel Satkorkel BANSER Jatinom.
     - **MDS Rijalul Ansor:** Upload TTD Ketua MDS dan Stempel MDS Rijalul Ansor.
     - *Otomatis tersemat secara presisi pada pratinjau dan lembar cetak E-Surat!*
   - Visi, misi, dan galeri filosofi 4 lambang resmi ranting.

6. **6. Pengaturan**
   - **Manajemen 6 User Roles Resmi GP Ansor Jatinom:**
     1. `Super Admin` (PIN: `1934`)
     2. `Ketua Ansor` (PIN: `1234`)
     3. `Sekretaris` (PIN: `1234`)
     4. `Kasatkorkel BANSER` (PIN: `1234`)
     5. `Ketua MDS Rijalul Ansor` (PIN: `1234`)
     6. `Ketua Siber Ansor` (PIN: `1234`)
   - Portal login interaktif dengan tombol pilih peran cepat (1-click login) atau login PIN mandiri.
   - Konfigurasi identitas sekretariat ranting.

---

## 📁 Struktur Berkas

```
├── config.php          # Konfigurasi koneksi MySQL XAMPP & inisialisasi tabel otomatis
├── api.php             # REST API endpoint backend sinkronisasi database MySQL
├── database.sql        # Skema basis data lengkap & data awal pengurus ranting
├── index.php           # Halaman utama aplikasi web untuk server XAMPP (Apache)
├── index.html          # Alternatif standalone HTML offline
├── css/
│   └── style.css       # Tema hijau NU (#006837), emas (#FFC72C), sidebar & print A4
├── js/
│   ├── app.js          # Model data, store, template PO, dan fungsi koneksi XAMPP
│   └── ui.js           # Kontroler antarmuka sidebar, filter pengurus, warta, surat, & dialog
└── README.md           # Dokumentasi dan panduan instalasi
```

---
*Khidmah Aswaja An-Nahdliyyah &bull; GP Ansor Ranting Jatinom, Kec. Kanigoro, Kab. Blitar*
