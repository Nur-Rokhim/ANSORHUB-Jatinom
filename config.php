<?php
/**
 * SAHABAT Jatinom - Konfigurasi Database XAMPP (MySQL)
 * Pimpinan Ranting GP Ansor Desa Jatinom, Kec. Kanigoro, Kab. Blitar
 */

// Konfigurasi Standar XAMPP
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'db_sahabat_jatinom');

$db_connected = false;
$conn = null;
$db_error = null;

try {
    // Coba koneksi ke server MySQL
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS);
    
    if ($conn->connect_error) {
        $db_error = "Gagal terhubung ke MySQL: " . $conn->connect_error;
    } else {
        // Cek apakah database ada, jika belum ada buat otomatis
        $createDbSql = "CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
        $conn->query($createDbSql);
        
        // Pilih database
        if ($conn->select_db(DB_NAME)) {
            $db_connected = true;
            $conn->set_charset("utf8mb4");
            
            // Verifikasi tabel dasar, jika belum ada buat otomatis
            verifyTables($conn);
        } else {
            $db_error = "Database " . DB_NAME . " belum dapat diakses: " . $conn->error;
        }
    }
} catch (Exception $e) {
    $db_connected = false;
    $db_error = $e->getMessage();
}

/**
 * Otomatisasi inisialisasi tabel dasar jika belum di-import dari database.sql
 */
function verifyTables($db) {
    // 1. Cek tabel users
    $check = $db->query("SHOW TABLES LIKE 'users'");
    if ($check && $check->num_rows == 0) {
        // Buat tabel users & seed default
        $db->query("CREATE TABLE IF NOT EXISTS `users` (
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

        $db->query("INSERT IGNORE INTO `users` (`user_id`, `username`, `nama`, `role`, `pin`, `email`, `akses`, `status`) VALUES
            ('USR-01', 'superadmin', 'Super Admin Ranting', 'Super Admin', '1934', 'admin.jatinom@ansor.id', 'Akses Penuh Semua Menu & Pengaturan', 'Aktif'),
            ('USR-02', 'ketua', 'Ketua GP Ansor', 'Ketua Ansor', '1234', 'ketua.jatinom@ansor.id', 'Pengesahan Surat, E-Kader, Agenda & Profil', 'Aktif'),
            ('USR-03', 'sekretaris', 'Sekretaris GP Ansor', 'Sekretaris Ansor', '1234', 'sekretaris.jatinom@ansor.id', 'Manajemen E-Surat, E-Kader & Notulensi', 'Aktif'),
            ('USR-04', 'kasatkorkel', 'Kasatkorkel BANSER', 'Kasatkorkel', '1234', 'banser.jatinom@ansor.id', 'Kaderisasi Banser, Surat Tugas PAM & Apel', 'Aktif'),
            ('USR-05', 'kasetma', 'Kasetma BANSER', 'Kasetma', '1234', 'kasetma.jatinom@ansor.id', 'Administrasi Markas Banser & Logistik Personel', 'Aktif'),
            ('USR-06', 'ketua_mds', 'Ketua MDS Rijalul Ansor', 'Ketua MDS Rijalul Ansor', '1234', 'rijalul.jatinom@ansor.id', 'Jadwal Rutinan Selapanan, Diba\'an & Tahlil', 'Aktif'),
            ('USR-07', 'bendahara', 'Bendahara GP Ansor', 'Bendahara Ansor', '1234', 'bendahara.jatinom@ansor.id', 'Manajemen Keuangan, Kas Ranting & Pembukuan', 'Aktif'),
            ('USR-08', 'siber', 'Ketua Siber GP Ansor', 'Ketua Siber Ansor', '1234', 'siber.jatinom@ansor.id', 'Kelola Warta Ansor, Media Publikasi & IT', 'Aktif'),
            ('USR-09', 'anggota', 'Anggota / Kader Ranting', 'Anggota', '1234', 'anggota.jatinom@ansor.id', 'Mengisi E-Kader & Melihat Warta Ansor', 'Aktif')");
    }

    // 2. Cek tabel pengurus
    $checkPengurus = $db->query("SHOW TABLES LIKE 'pengurus'");
    if ($checkPengurus && $checkPengurus->num_rows == 0) {
        $db->query("CREATE TABLE IF NOT EXISTS `pengurus` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `lembaga` ENUM('Ansor', 'Banser', 'Rijalul Ansor', 'Penasehat', 'Biro') NOT NULL,
            `jabatan` VARCHAR(100) NOT NULL,
            `nama` VARCHAR(100) NOT NULL,
            `nia` VARCHAR(50) DEFAULT NULL,
            `kontak` VARCHAR(30) DEFAULT NULL,
            `urutan` INT DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
        // Tabel baru dibuat kosong — data diisi melalui form admin
    }

    // 3. Cek kolom jumlah_peserta di tabel agenda
    $checkAgenda = $db->query("SHOW TABLES LIKE 'agenda'");
    if ($checkAgenda && $checkAgenda->num_rows > 0) {
        $checkCol = $db->query("SHOW COLUMNS FROM `agenda` LIKE 'jumlah_peserta'");
        if ($checkCol && $checkCol->num_rows == 0) {
            $db->query("ALTER TABLE `agenda` ADD COLUMN `jumlah_peserta` INT DEFAULT 0 AFTER `tempat`");
        }
    }

    // 4. Cek tabel keuangan
    $checkKeu = $db->query("SHOW TABLES LIKE 'keuangan'");
    if ($checkKeu && $checkKeu->num_rows == 0) {
        $db->query("CREATE TABLE IF NOT EXISTS `keuangan` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `trx_id` VARCHAR(30) NOT NULL UNIQUE,
            `tanggal` DATE NOT NULL,
            `jenis` ENUM('pemasukan', 'pengeluaran') NOT NULL,
            `kategori` VARCHAR(100) NOT NULL,
            `jumlah` BIGINT NOT NULL,
            `keterangan` TEXT DEFAULT NULL,
            `pj` VARCHAR(100) DEFAULT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    }
}
?>
