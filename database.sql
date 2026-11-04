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

-- 3. Tabel Basis Data Anggota (E-Kader)
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

INSERT IGNORE INTO `kader` (`kader_id`, `nama`, `nik`, `nia`, `tempat_lahir`, `tgl_lahir`, `alamat`, `wa`, `lembaga`, `kaderisasi`, `jabatan`) VALUES
('KDR-001', 'Muhammad Zainal Arifin', '3505071205930001', '11.07.02.001', 'Blitar', '1993-05-12', 'RT 01 / RW 01 Dsn. Jatinom Krajan', '081234567890', 'Ansor, Rijalul Ansor', 'PKD', 'Ketua PR GP Ansor'),
('KDR-002', 'Ahmad Nur Sholihin', '3505072008950002', '11.07.02.002', 'Blitar', '1995-08-20', 'RT 02 / RW 01 Dsn. Jatinom Krajan', '081398765432', 'Ansor', 'PKD', 'Sekretaris PR GP Ansor'),
('KDR-003', 'Subhan Mubarok', '3505071501910003', '11.07.02.003', 'Blitar', '1991-01-15', 'RT 03 / RW 02 Dsn. Wonorejo Jatinom', '082155443322', 'Ansor, Banser', 'SUSBALAN', 'Kasatkorkel Banser Jatinom'),
('KDR-004', 'Gus M. Fahmi Ilham', '3505070904940004', '11.07.02.004', 'Blitar', '1994-04-09', 'RT 01 / RW 03 Dsn. Jatinom Kulon', '085733221144', 'Ansor, Rijalul Ansor', 'PKD', 'Ketua MDS Rijalul Ansor'),
('KDR-005', 'Bambang Tri Sutrisno', '3505071811980005', '11.07.02.005', 'Blitar', '1998-11-18', 'RT 02 / RW 02 Dsn. Wonorejo', '089677889900', 'Banser', 'DIKLATSAR', 'Anggota Satkorkel Banser'),
('KDR-006', 'Rizky Dwi Kurniawan', '3505072512000006', '11.07.02.006', 'Blitar', '2000-12-25', 'RT 04 / RW 01 Dsn. Jatinom Krajan', '087811223344', 'Ansor, Banser', 'DIKLATSAR', 'Unit Provos Banser');

-- 4. Tabel Agenda Kegiatan & Rutinan
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

INSERT IGNORE INTO `agenda` (`agenda_id`, `judul`, `kategori`, `tanggal`, `waktu`, `tempat`, `tuan_rumah`, `keterangan`, `status`) VALUES
('AGD-001', 'Rutinan Selapanan Malam Ahad Pon MDS Rijalul Ansor', 'Rijalul Ansor', '2026-11-14', '19.30 WIB (Ba\'da Isya)', 'Musholla Baitur Muttaqin RT 02 / RW 01 Dsn. Krajan Jatinom', 'Sahabat Ahmad Nur Sholihin', 'Pembacaan Diba\' Al-Barzanji dilanjutkan Kajian Kitab Risalah Ahlussunnah Wal Jama\'ah KH. Hasyim Asy\'ari.', 'Mendatang'),
('AGD-002', 'Pam Pengamanan Pengajian Akbar Maulid Nabi Muhammad SAW', 'Banser', '2026-11-20', '18.30 WIB - Selesai', 'Masjid Jami\' Darussalam Jatinom', 'Ta\'mir Masjid & PR Nahdlatul Ulama Jatinom', 'Pemberangkatan apel koordinasi di Posko Banser jam 18.00 WIB. Seragam PDL Banser Lengkap + Baret.', 'Mendatang'),
('AGD-003', 'Rapat Pleno & Evaluasi Program Kerja Semester Akhir', 'Ansor', '2026-11-28', '20.00 WIB', 'Gedung Serbaguna Ranting NU Jatinom', 'Pengurus Harian PR GP Ansor', 'Laporan pertanggungjawaban divisi persuratan, kaderisasi, satkorkel Banser, dan kas organisasi.', 'Mendatang');

-- 5. Tabel Warta Ansor (Berita)
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

INSERT IGNORE INTO `warta` (`warta_id`, `judul`, `kategori`, `tanggal`, `penulis`, `ringkasan`, `isi`, `gambar`) VALUES
('NWS-001', 'Rutinan Selapanan MDS Rijalul Ansor Ranting Jatinom Istiqomah Rawat Tradisi Aswaja', 'Rijalul Ansor', '2026-11-02', 'Biro Infokom Ansor Jatinom', 'Majelis Dzikir dan Sholawat Rijalul Ansor Desa Jatinom sukses menggelar pembacaan Maulid Diba\' dan kajian fiqih Aswaja bergiliran di Dusun Krajan.', 'Pimpinan Ranting Gerakan Pemuda Ansor Desa Jatinom melalui Majelis Dzikir dan Sholawat (MDS) Rijalul Ansor terus konsisten menggemakan syiar shalawat dan tradisi Ahlussunnah Wal Jama\'ah An-Nahdliyyah.\n\nDalam acara yang bertempat di Musholla Baitur Muttaqin RT 02 / RW 01 Dusun Krajan, puluhan pemuda dan kader Ansor-Banser tampak khusyuk melantunkan bait-bait shalawat Diba\' karya Syaikh Abdurrahman Ad-Diba\'i.\n\nKetua MDS Rijalul Ansor Jatinom, Gus M. Fahmi Ilham menuturkan, kegiatan ini menjadi benteng spiritual generasi muda dari arus degradasi moral dan sarana mempererat persaudaraan antarwarga Desa Jatinom.', 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80'),
('NWS-002', 'Siaga Satu Komando, Satkorkel BANSER Jatinom Sukseskan Pengamanan Pengajian Akbar', 'Banser', '2026-10-28', 'Satkorkel Banser Jatinom', 'Sebanyak 15 personel Barisan Ansor Serbaguna (BANSER) Satkorkel Jatinom dikerahkan membantu kelancaran dan pengamanan pengajian akbar warga NU.', 'Menjaga marwah para ulama dan kenyamanan ummat merupakan doktrin utama Banser. Hal ini dibuktikan oleh jajaran Satuan Koordinasi Kelompok (Satkorkel) BANSER Ranting Jatinom, Kecamatan Kanigoro.\n\nKasatkorkel Banser Jatinom, Sahabat Subhan Mubarok, menegaskan bahwa seluruh personel bertugas dengan penuh keikhlasan di bawah komando Pimpinan Ranting. Pengaturan arus lalu lintas, sterilisasi area pengajian, serta pengawalan para Masyayikh berlangsung aman, tertib, dan kondusif.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'),
('NWS-003', 'Resmi Diluncurkan, Web Portal \'SAHABAT Jatinom\' Siap Akselerasi Digitalisasi Ranting', 'Ansor', '2026-11-04', 'Badan Siber Ansor Jatinom', 'PR GP Ansor Jatinom meluncurkan platform terintegrasi untuk persuratan digital, pendataan kader e-Kader, dan manajemen agenda jam\'iyyah.', 'Sebagai langkah strategis menjawab tantangan zaman di era digitalisasi organisasi, Pimpinan Ranting Gerakan Pemuda Ansor Desa Jatinom resmi memperkenalkan portal SAHABAT Jatinom (Sistem Administrasi Hubungan Anggota Banser, Ansor, & Tradisi Rijalul Ansor).\n\nAplikasi ini memuat generator persuratan standar Peraturan Organisasi, pendataan database kader multi-banom, serta kalender kegiatan terpadu yang memudahkan seluruh kader dan masyarakat mengakses informasi resmi organisasi secara transparan dan akuntabel.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80');

-- 6. Tabel Arsip Persuratan
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

INSERT IGNORE INTO `surat` (`surat_id`, `nomor_surat`, `jenis`, `sifat`, `tgl_surat`, `tujuan`, `perihal`, `tipe`) VALUES
('ARS-001', '001/PR-XII-11-07-02/SU-01/XI/2026', 'SU', '01', '2026-11-04', 'Seluruh Pengurus dan Anggota PR GP Ansor Jatinom', 'Undangan Rutinan Selapanan MDS Rijalul Ansor', 'Keluar'),
('ARS-002', '045/PAC-XII-11-07/SE-01/X/2026', 'SE', '01', '2026-10-25', 'Ketua PR GP Ansor Jatinom', 'Instruksi Apel Hari Santri Nasional Tingkat Kecamatan Kanigoro', 'Masuk');
