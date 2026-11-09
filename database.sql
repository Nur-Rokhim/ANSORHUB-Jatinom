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

-- Seed 6 Roles User Resmi
INSERT INTO `users` (`user_id`, `username`, `nama`, `role`, `pin`, `email`, `akses`, `status`) VALUES
('USR-01', 'superadmin', 'Super Admin Ranting', 'Super Admin', '1934', 'admin.jatinom@ansor.id', 'Akses Penuh Semua Menu & Pengaturan', 'Aktif'),
('USR-02', 'ketua', 'Muhammad Zainal Arifin', 'Ketua Ansor', '1234', 'ketua.jatinom@ansor.id', 'Pengesahan Surat, E-Kader, Agenda & Profil', 'Aktif'),
('USR-03', 'sekretaris', 'Ahmad Nur Sholihin', 'Sekretaris', '1234', 'sekretaris.jatinom@ansor.id', 'Manajemen E-Surat, E-Kader & Notulensi', 'Aktif'),
('USR-04', 'kasatkorkel', 'Subhan Mubarok', 'Kasatkorkel', '1234', 'banser.jatinom@ansor.id', 'Kaderisasi Banser, Surat Tugas PAM & Apel', 'Aktif'),
('USR-05', 'mds', 'Gus M. Fahmi Ilham', 'Ketua MDS Rijalul Ansor', '1234', 'rijalul.jatinom@ansor.id', 'Jadwal Rutinan Selapanan, Diba\'an & Tahlil', 'Aktif'),
('USR-06', 'siber', 'Fajar Sidiq', 'Ketua Siber Ansor', '1234', 'siber.jatinom@ansor.id', 'Kelola Warta Ansor, Media Publikasi & IT', 'Aktif')
ON DUPLICATE KEY UPDATE `nama` = VALUES(`nama`);

-- 2. Tabel Struktur Nama-Nama Pengurus Ranting
CREATE TABLE IF NOT EXISTS `pengurus` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `lembaga` ENUM('Ansor', 'Banser', 'Rijalul Ansor', 'Penasehat', 'Biro') NOT NULL,
  `jabatan` VARCHAR(100) NOT NULL,
  `nama` VARCHAR(100) NOT NULL,
  `nia` VARCHAR(50) DEFAULT NULL,
  `kontak` VARCHAR(30) DEFAULT NULL,
  `urutan` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO `pengurus` (`id`, `lembaga`, `jabatan`, `nama`, `nia`, `kontak`, `urutan`) VALUES
-- Penasehat
(1, 'Penasehat', 'Rois Syuriyah PR NU Jatinom', 'Kyai Manshur Shodiq', '-', '081234567800', 1),
(2, 'Penasehat', 'Ketua Tanfidziyah PR NU Jatinom', 'Ustadz H. Mahfudz', '-', '081234567801', 2),
-- Pimpinan Ranting GP Ansor
(3, 'Ansor', 'Ketua PR GP Ansor Jatinom', 'Muhammad Zainal Arifin', '11.07.02.001', '081234567890', 3),
(4, 'Ansor', 'Wakil Ketua GP Ansor', 'Imam Baehaqi', '11.07.02.008', '081233445566', 4),
(5, 'Ansor', 'Sekretaris PR GP Ansor', 'Ahmad Nur Sholihin', '11.07.02.002', '081398765432', 5),
(6, 'Ansor', 'Wakil Sekretaris GP Ansor', 'Choirul Anam', '11.07.02.009', '081355667788', 6),
(7, 'Ansor', 'Bendahara PR GP Ansor', 'Abdul Wahid', '11.07.02.007', '085711223344', 7),
(8, 'Ansor', 'Wakil Bendahara GP Ansor', 'M. Nur Huda', '11.07.02.010', '085799887766', 8),
-- Satkorkel BANSER
(9, 'Banser', 'Kasatkorkel BANSER Jatinom', 'Subhan Mubarok', '11.07.02.003', '082155443322', 9),
(10, 'Banser', 'Wakasatkorkel BANSER', 'Bambang Tri Sutrisno', '11.07.02.005', '089677889900', 10),
(11, 'Banser', 'Komandan Unit Provos BANSER', 'Rizky Dwi Kurniawan', '11.07.02.006', '087811223344', 11),
(12, 'Banser', 'Komandan Unit Dalmas BANSER', 'Agus Setyawan', '11.07.02.011', '082233445577', 12),
(13, 'Banser', 'Komandan Unit Balantas BANSER', 'Wahyu Hidayat', '11.07.02.012', '082255667788', 13),
(14, 'Banser', 'Komandan Unit Bagana BANSER', 'Danang Prasetyo', '11.07.02.013', '082288990011', 14),
-- MDS Rijalul Ansor
(15, 'Rijalul Ansor', 'Ketua MDS Rijalul Ansor', 'Gus M. Fahmi Ilham', '11.07.02.004', '085733221144', 15),
(16, 'Rijalul Ansor', 'Wakil Ketua MDS Rijalul Ansor', 'Ustadz M. Imron', '11.07.02.014', '085766778899', 16),
(17, 'Rijalul Ansor', 'Sekretaris MDS Rijalul Ansor', 'Lukman Hakim', '11.07.02.015', '085744556677', 17),
(18, 'Rijalul Ansor', 'Bendahara MDS Rijalul Ansor', 'Arif Munandar', '11.07.02.016', '085733445566', 18),
(19, 'Rijalul Ansor', 'Koordinator Amaliyah & Sholawat', 'Ustadz Saiful Anwar', '11.07.02.017', '085722334455', 19),
-- Biro & Badan
(20, 'Biro', 'Ketua Badan Siber Ansor PR Jatinom', 'Fajar Sidiq', '11.07.02.018', '081299887766', 20),
(21, 'Biro', 'Koordinator Biro Pengkaderan (PKD)', 'Ahmad Basuki', '11.07.02.019', '081288776655', 21);

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
