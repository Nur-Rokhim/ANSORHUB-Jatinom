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
            ('USR-02', 'ketua', 'Muhammad Zainal Arifin', 'Ketua Ansor', '1234', 'ketua.jatinom@ansor.id', 'Pengesahan Surat, E-Kader, Agenda & Profil', 'Aktif'),
            ('USR-03', 'sekretaris', 'Ahmad Nur Sholihin', 'Sekretaris', '1234', 'sekretaris.jatinom@ansor.id', 'Manajemen E-Surat, E-Kader & Notulensi', 'Aktif'),
            ('USR-04', 'kasatkorkel', 'Subhan Mubarok', 'Kasatkorkel', '1234', 'banser.jatinom@ansor.id', 'Kaderisasi Banser, Surat Tugas PAM & Apel', 'Aktif'),
            ('USR-05', 'mds', 'Gus M. Fahmi Ilham', 'Ketua MDS Rijalul Ansor', '1234', 'rijalul.jatinom@ansor.id', 'Jadwal Rutinan Selapanan, Diba\'an & Tahlil', 'Aktif'),
            ('USR-06', 'siber', 'Fajar Sidiq', 'Ketua Siber Ansor', '1234', 'siber.jatinom@ansor.id', 'Kelola Warta Ansor, Media Publikasi & IT', 'Aktif')");
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

        $db->query("INSERT IGNORE INTO `pengurus` (`lembaga`, `jabatan`, `nama`, `nia`, `kontak`, `urutan`) VALUES
            ('Penasehat', 'Rois Syuriyah PR NU Jatinom', 'Kyai Manshur Shodiq', '-', '081234567800', 1),
            ('Penasehat', 'Ketua Tanfidziyah PR NU Jatinom', 'Ustadz H. Mahfudz', '-', '081234567801', 2),
            ('Ansor', 'Ketua PR GP Ansor Jatinom', 'Muhammad Zainal Arifin', '11.07.02.001', '081234567890', 3),
            ('Ansor', 'Wakil Ketua GP Ansor', 'Imam Baehaqi', '11.07.02.008', '081233445566', 4),
            ('Ansor', 'Sekretaris PR GP Ansor', 'Ahmad Nur Sholihin', '11.07.02.002', '081398765432', 5),
            ('Ansor', 'Wakil Sekretaris GP Ansor', 'Choirul Anam', '11.07.02.009', '081355667788', 6),
            ('Ansor', 'Bendahara PR GP Ansor', 'Abdul Wahid', '11.07.02.007', '085711223344', 7),
            ('Ansor', 'Wakil Bendahara GP Ansor', 'M. Nur Huda', '11.07.02.010', '085799887766', 8),
            ('Banser', 'Kasatkorkel BANSER Jatinom', 'Subhan Mubarok', '11.07.02.003', '082155443322', 9),
            ('Banser', 'Wakasatkorkel BANSER', 'Bambang Tri Sutrisno', '11.07.02.005', '089677889900', 10),
            ('Banser', 'Komandan Unit Provos BANSER', 'Rizky Dwi Kurniawan', '11.07.02.006', '087811223344', 11),
            ('Banser', 'Komandan Unit Dalmas BANSER', 'Agus Setyawan', '11.07.02.011', '082233445577', 12),
            ('Banser', 'Komandan Unit Balantas BANSER', 'Wahyu Hidayat', '11.07.02.012', '082255667788', 13),
            ('Banser', 'Komandan Unit Bagana BANSER', 'Danang Prasetyo', '11.07.02.013', '082288990011', 14),
            ('Rijalul Ansor', 'Ketua MDS Rijalul Ansor', 'Gus M. Fahmi Ilham', '11.07.02.004', '085733221144', 15),
            ('Rijalul Ansor', 'Wakil Ketua MDS Rijalul Ansor', 'Ustadz M. Imron', '11.07.02.014', '085766778899', 16),
            ('Rijalul Ansor', 'Sekretaris MDS Rijalul Ansor', 'Lukman Hakim', '11.07.02.015', '085744556677', 17),
            ('Rijalul Ansor', 'Bendahara MDS Rijalul Ansor', 'Arif Munandar', '11.07.02.016', '085733445566', 18),
            ('Rijalul Ansor', 'Koordinator Amaliyah & Sholawat', 'Ustadz Saiful Anwar', '11.07.02.017', '085722334455', 19),
            ('Biro', 'Ketua Badan Siber Ansor PR Jatinom', 'Fajar Sidiq', '11.07.02.018', '081299887766', 20),
            ('Biro', 'Koordinator Biro Pengkaderan (PKD)', 'Ahmad Basuki', '11.07.02.019', '081288776655', 21)");
    }
}
?>
