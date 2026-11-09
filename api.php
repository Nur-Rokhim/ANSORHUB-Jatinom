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

    default:
        $response = ['success' => false, 'message' => 'Aksi ' . htmlspecialchars($action) . ' belum didukung'];
        break;
}

echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
