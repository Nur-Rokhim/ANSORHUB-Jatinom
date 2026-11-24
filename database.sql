-- ========================================================
-- SAHABAT Jatinom - Database Schema untuk XAMPP (MySQL/MariaDB)
-- Pimpinan Ranting GP Ansor Desa Jatinom, Kec. Kanigoro, Kab. Blitar
-- ========================================================

CREATE DATABASE IF NOT EXISTS `db_sahabat_jatinom` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `db_sahabat_jatinom`;

-- 1. Tabel Users / Pengurus Login
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` VARCHAR(20) NOT NULL UNIQUE,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `nama` VARCHAR(100) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  `pin` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `akses` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('Aktif', 'Nonaktif') DEFAULT 'Aktif',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed 9 Roles User Resmi (Tanpa Nama Pribadi & Termasuk User Anggota)
INSERT INTO `users` (`user_id`, `username`, `nama`, `role`, `pin`, `email`, `akses`, `status`) VALUES
('USR-01', 'superadmin', 'Super Admin Ranting', 'Super Admin', '1934', 'admin.jatinom@ansor.id', 'Akses Penuh Semua Menu & Pengaturan', 'Aktif'),
('USR-02', 'ketua', 'Ketua GP Ansor', 'Ketua Ansor', '1234', 'ketua.jatinom@ansor.id', 'Pengesahan Surat, E-Kader, Agenda & Profil', 'Aktif'),
('USR-03', 'sekretaris', 'Sekretaris GP Ansor', 'Sekretaris Ansor', '1234', 'sekretaris.jatinom@ansor.id', 'Manajemen E-Surat, E-Kader & Notulensi', 'Aktif'),
('USR-04', 'kasatkorkel', 'Kasatkorkel BANSER', 'Kasatkorkel', '1234', 'banser.jatinom@ansor.id', 'Kaderisasi Banser, Surat Tugas PAM & Apel', 'Aktif'),
('USR-05', 'kasetma', 'Kasetma BANSER', 'Kasetma', '1234', 'kasetma.jatinom@ansor.id', 'Administrasi Markas Banser & Logistik Personel', 'Aktif'),
('USR-06', 'ketua_mds', 'Ketua MDS Rijalul Ansor', 'Ketua MDS Rijalul Ansor', '1234', 'rijalul.jatinom@ansor.id', 'Jadwal Rutinan Selapanan, Diba\'an & Tahlil', 'Aktif'),
('USR-07', 'bendahara', 'Bendahara GP Ansor', 'Bendahara Ansor', '1234', 'bendahara.jatinom@ansor.id', 'Manajemen Keuangan, Kas Ranting & Pembukuan', 'Aktif'),
('USR-08', 'siber', 'Ketua Siber GP Ansor', 'Ketua Siber Ansor', '1234', 'siber.jatinom@ansor.id', 'Kelola Warta Ansor, Media Publikasi & IT', 'Aktif'),
('USR-09', 'anggota', 'Anggota / Kader Ranting', 'Anggota', '1234', 'anggota.jatinom@ansor.id', 'Mengisi E-Kader & Melihat Warta Ansor', 'Aktif')
ON DUPLICATE KEY UPDATE `nama` = VALUES(`nama`), `role` = VALUES(`role`), `akses` = VALUES(`akses`);

-- 2. Tabel Struktur Nama-Nama Pengurus Ranting - Siap Diisi Mulai dari Nol
CREATE TABLE IF NOT EXISTS `pengurus` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `lembaga` ENUM('Ansor', 'Banser', 'Rijalul Ansor', 'Penasehat', 'Biro') NOT NULL,
  `jabatan` VARCHAR(100) NOT NULL,
  `nama` VARCHAR(100) NOT NULL,
  `nia` VARCHAR(50) DEFAULT NULL,
  `kontak` VARCHAR(30) DEFAULT NULL,
  `urutan` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabel Basis Data Anggota (E-Kader) - Siap Diisi Mulai dari Nol
CREATE TABLE IF NOT EXISTS `kader` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `kader_id` VARCHAR(20) NOT NULL UNIQUE,
  `nama` VARCHAR(100) NOT NULL,
  `nik` VARCHAR(30) DEFAULT NULL,
  `nia` VARCHAR(50) DEFAULT NULL,
  `tempat_lahir` VARCHAR(50) DEFAULT NULL,
  `tgl_lahir` DATE DEFAULT NULL,
  `alamat` VARCHAR(255) NOT NULL,
  `wa` VARCHAR(30) NOT NULL,
  `lembaga` VARCHAR(100) DEFAULT 'Ansor',
  `kaderisasi` VARCHAR(50) DEFAULT 'Belum Kaderisasi',
  `jabatan` VARCHAR(100) DEFAULT 'Anggota',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabel Agenda Kegiatan & Rutinan - Siap Diisi Mulai dari Nol
CREATE TABLE IF NOT EXISTS `agenda` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `agenda_id` VARCHAR(20) NOT NULL UNIQUE,
  `judul` VARCHAR(200) NOT NULL,
  `kategori` VARCHAR(50) NOT NULL,
  `tanggal` DATE NOT NULL,
  `waktu` VARCHAR(50) NOT NULL,
  `tempat` VARCHAR(200) NOT NULL,
  `jumlah_peserta` INT DEFAULT 0,
  `tuan_rumah` VARCHAR(100) DEFAULT NULL,
  `keterangan` TEXT DEFAULT NULL,
  `status` ENUM('Mendatang', 'Selesai') DEFAULT 'Mendatang',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tabel Warta Ansor (Berita) - Siap Diisi Mulai dari Nol
CREATE TABLE IF NOT EXISTS `warta` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `warta_id` VARCHAR(20) NOT NULL UNIQUE,
  `judul` VARCHAR(255) NOT NULL,
  `kategori` VARCHAR(50) NOT NULL,
  `tanggal` DATE NOT NULL,
  `penulis` VARCHAR(100) NOT NULL,
  `ringkasan` TEXT NOT NULL,
  `isi` LONGTEXT NOT NULL,
  `gambar` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Tabel Arsip Persuratan - Siap Diisi Mulai dari Nol
CREATE TABLE IF NOT EXISTS `surat` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `surat_id` VARCHAR(20) NOT NULL UNIQUE,
  `nomor_surat` VARCHAR(100) NOT NULL,
  `jenis` VARCHAR(20) NOT NULL,
  `sifat` VARCHAR(10) NOT NULL,
  `tgl_surat` DATE NOT NULL,
  `tujuan` VARCHAR(200) NOT NULL,
  `perihal` VARCHAR(255) NOT NULL,
  `tipe` ENUM('Masuk', 'Keluar') NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Tabel Pembukuan Kas & Keuangan Ranting - Siap Diisi Mulai dari Nol
CREATE TABLE IF NOT EXISTS `keuangan` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `trx_id` VARCHAR(30) NOT NULL UNIQUE,
  `tanggal` DATE NOT NULL,
  `jenis` ENUM('pemasukan', 'pengeluaran') NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `jumlah` BIGINT NOT NULL,
  `keterangan` TEXT DEFAULT NULL,
  `pj` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
