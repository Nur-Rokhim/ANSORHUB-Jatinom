<?php
/**
 * SAHABAT Jatinom - REST API Endpoint untuk XAMPP
 * Menangani sinkronisasi basis data MySQL dan LocalStorage
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/config.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

$response = [
    'success' => false,
    'message' => 'Aksi tidak dikenal',
    'db_connected' => $db_connected
];

if (!$db_connected && $action !== 'status') {
    echo json_encode([
        'success' => false,
        'message' => 'Koneksi ke MySQL XAMPP terputus: ' . ($db_error ?: 'Pastikan Apache & MySQL XAMPP berjalan.'),
        'db_connected' => false
    ]);
    exit;
}

switch ($action) {
    case 'status':
        $tables = [];
        if ($db_connected) {
            $res = $conn->query("SHOW TABLES");
            if ($res) {
                while ($row = $res->fetch_array()) {
                    $tables[] = $row[0];
                }
            }
        }
        $response = [
            'success' => true,
            'db_connected' => $db_connected,
            'db_name' => DB_NAME,
            'host' => DB_HOST,
            'tables' => $tables,
            'message' => $db_connected ? 'Terhubung ke MySQL XAMPP (' . DB_NAME . ')' : 'MySQL XAMPP Offline (Menggunakan Penyimpanan Lokal Browser)'
        ];
        break;

    case 'get_pengurus':
        $res = $conn->query("SELECT * FROM `pengurus` ORDER BY `urutan` ASC, `id` ASC");
        $data = [];
        if ($res) {
            while ($row = $res->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $response = ['success' => true, 'data' => $data];
        break;

    case 'save_pengurus':
        $input = json_decode(file_get_contents('php://input'), true);
        if ($input) {
            $lembaga = $conn->real_escape_string($input['lembaga'] ?? 'Ansor');
            $jabatan = $conn->real_escape_string($input['jabatan'] ?? '');
            $nama = $conn->real_escape_string($input['nama'] ?? '');
            $nia = $conn->real_escape_string($input['nia'] ?? '-');
            $kontak = $conn->real_escape_string($input['kontak'] ?? '-');
            $urutan = intval($input['urutan'] ?? 99);

            if (isset($input['id']) && $input['id'] > 0) {
                $id = intval($input['id']);
                $q = "UPDATE `pengurus` SET `lembaga`='$lembaga', `jabatan`='$jabatan', `nama`='$nama', `nia`='$nia', `kontak`='$kontak', `urutan`=$urutan WHERE `id`=$id";
            } else {
                $q = "INSERT INTO `pengurus` (`lembaga`, `jabatan`, `nama`, `nia`, `kontak`, `urutan`) VALUES ('$lembaga', '$jabatan', '$nama', '$nia', '$kontak', $urutan)";
            }
            $conn->query($q);
            $response = ['success' => true, 'message' => 'Data pengurus berhasil disimpan'];
        }
        break;

    case 'get_users':
        $res = $conn->query("SELECT `id`, `user_id`, `username`, `nama`, `role`, `pin`, `email`, `akses`, `status` FROM `users`");
        $data = [];
        if ($res) {
            while ($row = $res->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $response = ['success' => true, 'data' => $data];
        break;

    case 'get_kader':
        $res = $conn->query("SELECT * FROM `kader` ORDER BY `id` DESC");
        $data = [];
        if ($res) {
            while ($row = $res->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $response = ['success' => true, 'data' => $data];
        break;

    case 'get_agenda':
        $res = $conn->query("SELECT * FROM `agenda` ORDER BY `tanggal` ASC");
        $data = [];
        if ($res) {
            while ($row = $res->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $response = ['success' => true, 'data' => $data];
        break;

    case 'get_warta':
        $res = $conn->query("SELECT * FROM `warta` ORDER BY `tanggal` DESC, `id` DESC");
        $data = [];
        if ($res) {
            while ($row = $res->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $response = ['success' => true, 'data' => $data];
        break;

    case 'get_surat':
        $res = $conn->query("SELECT * FROM `surat` ORDER BY `id` DESC");
        $data = [];
        if ($res) {
            while ($row = $res->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $response = ['success' => true, 'data' => $data];
        break;

    case 'update_user_pin':
        $userId = $conn->real_escape_string($input['user_id'] ?? '');
        $newPin = $conn->real_escape_string($input['new_pin'] ?? '');
        $callerRole = $input['caller_role'] ?? '';
        if ($callerRole !== 'Super Admin') {
            $response = ['success' => false, 'message' => 'Hanya Super Admin yang memiliki hak akses untuk mengubah sandi/PIN akun pengguna.'];
            break;
        }
        if (!$userId || !$newPin) {
            $response = ['success' => false, 'message' => 'Data User ID atau Sandi/PIN baru tidak valid.'];
            break;
        }
        $q = "UPDATE `users` SET `pin`='$newPin' WHERE `user_id`='$userId'";
        if ($conn->query($q)) {
            $response = ['success' => true, 'message' => 'Sandi/PIN akun pengguna berhasil diperbarui oleh Super Admin.'];
        } else {
            $response = ['success' => false, 'message' => 'Gagal memperbarui sandi: ' . $conn->error];
        }
        break;

    case 'get_keuangan':
        $res = $conn->query("SELECT * FROM `keuangan` ORDER BY `tanggal` ASC, `id` ASC");
        $data = [];
        if ($res) {
            while ($row = $res->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $response = ['success' => true, 'data' => $data];
        break;

    case 'save_keuangan':
        $trxId = $conn->real_escape_string($input['trx_id'] ?? ('TRX-' . time()));
        $tanggal = $conn->real_escape_string($input['tanggal'] ?? date('Y-m-d'));
        $jenis = ($input['jenis'] ?? '') === 'pengeluaran' ? 'pengeluaran' : 'pemasukan';
        $kategori = $conn->real_escape_string($input['kategori'] ?? 'Kas Ranting');
        $jumlah = floatval($input['jumlah'] ?? 0);
        $keterangan = $conn->real_escape_string($input['keterangan'] ?? '');
        $pj = $conn->real_escape_string($input['pj'] ?? '');

        if (!empty($input['id'])) {
            $id = intval($input['id']);
            $q = "UPDATE `keuangan` SET `tanggal`='$tanggal', `jenis`='$jenis', `kategori`='$kategori', `jumlah`=$jumlah, `keterangan`='$keterangan', `pj`='$pj' WHERE `id`=$id";
        } else {
            $q = "INSERT INTO `keuangan` (`trx_id`, `tanggal`, `jenis`, `kategori`, `jumlah`, `keterangan`, `pj`) VALUES ('$trxId', '$tanggal', '$jenis', '$kategori', $jumlah, '$keterangan', '$pj')";
        }

        if ($conn->query($q)) {
            $response = ['success' => true, 'message' => 'Catatan transaksi keuangan berhasil disimpan'];
        } else {
            $response = ['success' => false, 'message' => 'Gagal menyimpan transaksi: ' . $conn->error];
        }
        break;

    case 'get_lpj_data':
        $startDate = isset($_GET['start_date']) && !empty($_GET['start_date']) ? $conn->real_escape_string($_GET['start_date']) : '';
        $endDate = isset($_GET['end_date']) && !empty($_GET['end_date']) ? $conn->real_escape_string($_GET['end_date']) : '';

        // Struktur Pengurus
        $resPengurus = $conn->query("SELECT * FROM `pengurus` ORDER BY `urutan` ASC, `id` ASC");
        $struktur = [];
        if ($resPengurus) {
            while ($p = $resPengurus->fetch_assoc()) {
                $struktur[] = $p;
            }
        }

        // Hitung total pengurus & kader
        $totalPengurus = count($struktur);
        $resKdr = $conn->query("SELECT COUNT(*) as total FROM `kader`");
        $totalKader = $resKdr ? intval($resKdr->fetch_assoc()['total']) : 0;

        // Agenda dalam periode
        $whereAgenda = "WHERE 1=1";
        if ($startDate) $whereAgenda .= " AND `tanggal` >= '$startDate'";
        if ($endDate) $whereAgenda .= " AND `tanggal` <= '$endDate'";
        $resAgenda = $conn->query("SELECT * FROM `agenda` $whereAgenda ORDER BY `tanggal` ASC, `id` ASC");
        $agenda = [];
        if ($resAgenda) {
            while ($a = $resAgenda->fetch_assoc()) {
                $agenda[] = $a;
            }
        }

        // Keuangan: Saldo Awal (sebelum startDate)
        $saldoAwal = 0;
        if ($startDate) {
            $resSaldoAwal = $conn->query("SELECT 
                SUM(CASE WHEN `jenis`='pemasukan' THEN `jumlah` ELSE 0 END) as total_masuk,
                SUM(CASE WHEN `jenis`='pengeluaran' THEN `jumlah` ELSE 0 END) as total_keluar
                FROM `keuangan` WHERE `tanggal` < '$startDate'");
            if ($resSaldoAwal) {
                $rowSA = $resSaldoAwal->fetch_assoc();
                $saldoAwal = floatval($rowSA['total_masuk'] ?? 0) - floatval($rowSA['total_keluar'] ?? 0);
            }
        }

        // Keuangan dalam periode
        $whereKeu = "WHERE 1=1";
        if ($startDate) $whereKeu .= " AND `tanggal` >= '$startDate'";
        if ($endDate) $whereKeu .= " AND `tanggal` <= '$endDate'";

        $resKeuMasuk = $conn->query("SELECT * FROM `keuangan` $whereKeu AND `jenis`='pemasukan' ORDER BY `tanggal` ASC, `id` ASC");
        $pemasukan = [];
        $totalPemasukan = 0;
        if ($resKeuMasuk) {
            while ($km = $resKeuMasuk->fetch_assoc()) {
                $pemasukan[] = $km;
                $totalPemasukan += floatval($km['jumlah']);
            }
        }

        $resKeuKeluar = $conn->query("SELECT * FROM `keuangan` $whereKeu AND `jenis`='pengeluaran' ORDER BY `tanggal` ASC, `id` ASC");
        $pengeluaran = [];
        $totalPengeluaran = 0;
        if ($resKeuKeluar) {
            while ($kk = $resKeuKeluar->fetch_assoc()) {
                $pengeluaran[] = $kk;
                $totalPengeluaran += floatval($kk['jumlah']);
            }
        }

        $saldoAkhir = $saldoAwal + $totalPemasukan - $totalPengeluaran;

        $response = [
            'success' => true,
            'data' => [
                'periode' => [
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                ],
                'struktur' => $struktur,
                'total_pengurus' => $totalPengurus,
                'total_kader' => $totalKader,
                'agenda' => $agenda,
                'total_agenda' => count($agenda),
                'keuangan' => [
                    'saldo_awal' => $saldoAwal,
                    'pemasukan' => $pemasukan,
                    'total_pemasukan' => $totalPemasukan,
                    'pengeluaran' => $pengeluaran,
                    'total_pengeluaran' => $totalPengeluaran,
                    'saldo_akhir' => $saldoAkhir
                ]
            ]
        ];
        break;

    default:
        $response = ['success' => false, 'message' => 'Aksi ' . htmlspecialchars($action) . ' belum didukung'];
        break;
}

echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
