<?php
/**
 * SAHABAT Jatinom - Ekspor Laporan Pertanggung Jawaban (LPJ) ke PDF
 * Ukuran Kertas: F4 / Folio (215 mm x 330 mm / 609.45 pt x 935.43 pt)
 */

require_once __DIR__ . '/config.php';

// Pastikan autoloader Composer ada
if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
    die("Pustaka Dompdf belum terpasang. Jalankan 'composer install' di terminal.");
}
require_once __DIR__ . '/vendor/autoload.php';

use Dompdf\Dompdf;
use Dompdf\Options;

// Helper format Rupiah
function formatRp($angka) {
    return 'Rp ' . number_format(floatval($angka), 0, ',', '.');
}

// Helper format tanggal Indonesia
function tglIndo($tanggal) {
    if (!$tanggal || $tanggal === '0000-00-00') return '-';
    $bulan = [
        1 => 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    $pecah = explode('-', $tanggal);
    if (count($pecah) !== 3) return $tanggal;
    return intval($pecah[2]) . ' ' . ($bulan[intval($pecah[1])] ?? '') . ' ' . $pecah[0];
}

// 1. Ambil Parameter Filter & Konfigurasi (GET / POST)
$rawInput = file_get_contents('php://input');
$jsonInput = json_decode($rawInput, true);
if (empty($jsonInput) && !empty($_POST['payload_json'])) {
    $jsonInput = json_decode($_POST['payload_json'], true);
}

$startDate = $_POST['start_date'] ?? $_GET['start_date'] ?? ($jsonInput['start_date'] ?? '');
$endDate   = $_POST['end_date'] ?? $_GET['end_date'] ?? ($jsonInput['end_date'] ?? '');
$periodeLabel = $_POST['periode_label'] ?? $_GET['periode_label'] ?? ($jsonInput['periode_label'] ?? 'Masa Khidmat 2024 - 2026');

$namaPimpinan   = $_POST['nama_pimpinan'] ?? $_GET['nama_pimpinan'] ?? ($jsonInput['nama_pimpinan'] ?? 'Muhammad Zainal Arifin');
$namaSekretaris = $_POST['nama_sekretaris'] ?? $_GET['nama_sekretaris'] ?? ($jsonInput['nama_sekretaris'] ?? 'Ahmad Nur Sholihin');
$namaBendahara  = $_POST['nama_bendahara'] ?? $_GET['nama_bendahara'] ?? ($jsonInput['nama_bendahara'] ?? 'Abdul Wahid');
$penetapanKota  = $_POST['penetapan_kota'] ?? $_GET['penetapan_kota'] ?? ($jsonInput['penetapan_kota'] ?? 'Jatinom');
$penetapanTgl   = $_POST['penetapan_tgl'] ?? $_GET['penetapan_tgl'] ?? ($jsonInput['penetapan_tgl'] ?? date('Y-m-d'));
$mengetahuiOrg  = $_POST['mengetahui_org'] ?? $_GET['mengetahui_org'] ?? ($jsonInput['mengetahui_org'] ?? 'PIMPINAN ANAK CABANG GP ANSOR KANIGORO');
$mengetahuiNama = $_POST['mengetahui_nama'] ?? $_GET['mengetahui_nama'] ?? ($jsonInput['mengetahui_nama'] ?? 'Ketua PAC GP Ansor Kanigoro');

$bab1Text = $_POST['bab1_text'] ?? ($jsonInput['bab1_text'] ?? '');
$bab5Text = $_POST['bab5_text'] ?? ($jsonInput['bab5_text'] ?? '');

// 2. Query Data dari Database MySQL (atau Payload JSON fallback)
global $conn, $db_connected;

// Struktur Pengurus
$struktur = [];
if ($db_connected && $conn) {
    $resPengurus = $conn->query("SELECT * FROM `pengurus` ORDER BY `urutan` ASC, `id` ASC");
    if ($resPengurus) {
        while ($p = $resPengurus->fetch_assoc()) $struktur[] = $p;
    }
}
if (empty($struktur) && !empty($jsonInput['struktur'])) {
    $struktur = $jsonInput['struktur'];
}

// Total Kader
$totalKader = 0;
if ($db_connected && $conn) {
    $resKdr = $conn->query("SELECT COUNT(*) as total FROM `kader`");
    if ($resKdr) $totalKader = intval($resKdr->fetch_assoc()['total']);
}
if ($totalKader === 0 && isset($jsonInput['total_kader'])) {
    $totalKader = intval($jsonInput['total_kader']);
}

// Agenda
$agenda = [];
if ($db_connected && $conn) {
    $whereAgenda = "WHERE 1=1";
    if (!empty($startDate)) $whereAgenda .= " AND `tanggal` >= '" . $conn->real_escape_string($startDate) . "'";
    if (!empty($endDate)) $whereAgenda .= " AND `tanggal` <= '" . $conn->real_escape_string($endDate) . "'";
    $resAgenda = $conn->query("SELECT * FROM `agenda` $whereAgenda ORDER BY `tanggal` ASC, `id` ASC");
    if ($resAgenda) {
        while ($a = $resAgenda->fetch_assoc()) $agenda[] = $a;
    }
}
if (empty($agenda) && !empty($jsonInput['agenda'])) {
    $agenda = $jsonInput['agenda'];
}

// Keuangan
$saldoAwal = 0;
$pemasukan = [];
$totalPemasukan = 0;
$pengeluaran = [];
$totalPengeluaran = 0;

if ($db_connected && $conn) {
    if (!empty($startDate)) {
        $stEsc = $conn->real_escape_string($startDate);
        $resSA = $conn->query("SELECT 
            SUM(CASE WHEN `jenis`='pemasukan' THEN `jumlah` ELSE 0 END) as total_masuk,
            SUM(CASE WHEN `jenis`='pengeluaran' THEN `jumlah` ELSE 0 END) as total_keluar
            FROM `keuangan` WHERE `tanggal` < '$stEsc'");
        if ($resSA) {
            $rowSA = $resSA->fetch_assoc();
            $saldoAwal = floatval($rowSA['total_masuk'] ?? 0) - floatval($rowSA['total_keluar'] ?? 0);
        }
    }

    $whereKeu = "WHERE 1=1";
    if (!empty($startDate)) $whereKeu .= " AND `tanggal` >= '" . $conn->real_escape_string($startDate) . "'";
    if (!empty($endDate)) $whereKeu .= " AND `tanggal` <= '" . $conn->real_escape_string($endDate) . "'";

    $resMasuk = $conn->query("SELECT * FROM `keuangan` $whereKeu AND `jenis`='pemasukan' ORDER BY `tanggal` ASC, `id` ASC");
    if ($resMasuk) {
        while ($m = $resMasuk->fetch_assoc()) {
            $pemasukan[] = $m;
            $totalPemasukan += floatval($m['jumlah']);
        }
    }

    $resKeluar = $conn->query("SELECT * FROM `keuangan` $whereKeu AND `jenis`='pengeluaran' ORDER BY `tanggal` ASC, `id` ASC");
    if ($resKeluar) {
        while ($k = $resKeluar->fetch_assoc()) {
            $pengeluaran[] = $k;
            $totalPengeluaran += floatval($k['jumlah']);
        }
    }
}

// Fallback Keuangan dari JSON payload jika MySQL kosong
if (empty($pemasukan) && empty($pengeluaran) && !empty($jsonInput['keuangan'])) {
    $keu = $jsonInput['keuangan'];
    $saldoAwal = floatval($keu['saldo_awal'] ?? 0);
    $pemasukan = $keu['pemasukan'] ?? [];
    $totalPemasukan = floatval($keu['total_pemasukan'] ?? 0);
    $pengeluaran = $keu['pengeluaran'] ?? [];
    $totalPengeluaran = floatval($keu['total_pengeluaran'] ?? 0);
}

$saldoAkhir = $saldoAwal + $totalPemasukan - $totalPengeluaran;

// Gambar Logo Base64 (Hanya jika ekstensi GD aktif untuk keamanan rendering PDF)
$logoPath = __DIR__ . '/img/logo-ansor.png';
$logoBase64 = '';
if (extension_loaded('gd') && file_exists($logoPath)) {
    $logoBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath));
}

// Tanggal Penetapan
$tglPenetapanFormatted = tglIndo($penetapanTgl);
$periodeTeks = htmlspecialchars($periodeLabel);
if (!empty($startDate) && !empty($endDate)) {
    $periodeTeks .= ' (' . tglIndo($startDate) . ' s/d ' . tglIndo($endDate) . ')';
}

// 3. Bangun Dokumen HTML Standar F4
ob_start();
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Laporan Pertanggung Jawaban - GP Ansor Jatinom</title>
<style>
  @page {
    size: 215mm 330mm portrait; /* F4 / Folio */
    margin: 20mm 15mm 20mm 25mm;
  }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 11.5pt;
    line-height: 1.35;
    color: #111;
    margin: 0;
    padding: 0;
  }
  .text-center { text-align: center; }
  .text-justify { text-align: justify; }
  .text-right { text-align: right; }
  .bold { font-weight: bold; }
  .uppercase { text-transform: uppercase; }

  /* KOP SURAT */
  .kop-container {
    width: 100%;
    margin-bottom: 12px;
  }
  .kop-table {
    width: 100%;
    border-collapse: collapse;
  }
  .kop-logo {
    width: 75px;
    vertical-align: middle;
    text-align: center;
  }
  .kop-logo img {
    width: 70px;
    height: auto;
  }
  .kop-teks {
    text-align: center;
    vertical-align: middle;
  }
  .kop-line-1 { font-size: 13pt; font-weight: bold; letter-spacing: 0.5px; color: #006837; }
  .kop-line-2 { font-size: 15pt; font-weight: bold; letter-spacing: 1px; color: #000; margin: 2px 0; }
  .kop-line-3 { font-size: 11pt; font-weight: bold; color: #333; }
  .kop-line-4 { font-size: 9pt; font-style: italic; color: #444; margin-top: 3px; }
  .kop-divider {
    border-top: 2px solid #000;
    border-bottom: 1px solid #000;
    height: 2px;
    margin-top: 6px;
    margin-bottom: 16px;
  }

  /* JUDUL */
  .judul-dokumen {
    text-align: center;
    margin-bottom: 20px;
  }
  .judul-dokumen h1 {
    font-size: 14pt;
    font-weight: bold;
    text-decoration: underline;
    margin: 0 0 4px 0;
  }
  .judul-dokumen p {
    font-size: 11pt;
    margin: 0;
    font-weight: bold;
  }

  /* BAB & SECTION */
  .bab-title {
    font-size: 12pt;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 18px;
    margin-bottom: 6px;
    border-bottom: 1px solid #555;
    padding-bottom: 3px;
  }
  p {
    margin: 6px 0;
    text-align: justify;
    text-indent: 28px;
  }
  .no-indent { text-indent: 0; }

  /* TABEL DATA */
  table.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 14px 0;
    font-size: 10pt;
  }
  table.data-table thead {
    display: table-header-group;
  }
  table.data-table th, table.data-table td {
    border: 1px solid #222;
    padding: 4px 6px;
    vertical-align: top;
  }
  table.data-table th {
    background-color: #f1f5f9;
    font-weight: bold;
    text-align: center;
  }
  table.data-table tr {
    page-break-inside: avoid;
  }
  .bg-subtotal {
    background-color: #f8fafc;
    font-weight: bold;
  }

  /* RINGKASAN KEUANGAN */
  .rekap-box {
    margin: 10px 0 15px 0;
    padding: 8px 12px;
    border: 1px solid #333;
    background: #fdfdfd;
    font-size: 10.5pt;
    page-break-inside: avoid;
  }
  .rekap-box table { width: 100%; border-collapse: collapse; }
  .rekap-box td { padding: 3px 0; }

  /* TANDA TANGAN */
  .ttd-container {
    width: 100%;
    margin-top: 25px;
    page-break-inside: avoid;
  }
  .ttd-table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    font-size: 10.5pt;
  }
  .ttd-space {
    height: 60px;
  }
  .empty-note {
    font-style: italic;
    color: #666;
    padding: 8px;
    text-align: center;
  }
  .page-break {
    page-break-before: always;
  }
</style>
</head>
<body>

  <!-- KOP SURAT -->
  <div class="kop-container">
    <table class="kop-table">
      <tr>
        <?php if (!empty($logoBase64)): ?>
        <td class="kop-logo">
          <img src="<?php echo $logoBase64; ?>" alt="Logo Ansor">
        </td>
        <?php endif; ?>
        <td class="kop-teks">
          <div class="kop-line-1">PIMPINAN RANTING GERAKAN PEMUDA ANSOR</div>
          <div class="kop-line-2">DESA JATINOM</div>
          <div class="kop-line-3">KECAMATAN KANIGORO KABUPATEN BLITAR</div>
          <div class="kop-line-4">Sekretariat: Jl. Raya Jatinom, Kec. Kanigoro, Kab. Blitar 66171 &bull; Email: ansor.jatinom@gmail.com</div>
        </td>
      </tr>
    </table>
    <div class="kop-divider"></div>
  </div>

  <!-- JUDUL DOKUMEN -->
  <div class="judul-dokumen">
    <h1>LAPORAN PERTANGGUNG JAWABAN (LPJ)</h1>
    <p>GERAKAN PEMUDA ANSOR PIMPINAN RANTING DESA JATINOM</p>
    <p style="font-weight: normal; font-size: 10.5pt; margin-top: 2px;">Periode: <?php echo $periodeTeks; ?></p>
  </div>

  <!-- BAB I: PENDAHULUAN -->
  <div class="bab-title">BAB I &bull; PENDAHULUAN</div>
  <?php if (!empty($bab1Text)): ?>
    <div class="text-justify"><?php echo nl2br(htmlspecialchars($bab1Text)); ?></div>
  <?php else: ?>
    <p>Segala puji dan syukur senantiasa kita panjatkan ke hadirat Allah SWT, atas limpahan rahmat, taufiq, dan hidayah-Nya sehingga seluruh amanah kepengurusan Gerakan Pemuda Ansor Pimpinan Ranting Desa Jatinom dapat terlaksana dalam bingkai khidmah Aswaja An-Nahdliyyah.</p>
    <p>Shalawat dan salam semoga senantiasa tercurahkan kepada junjungan kita Nabi Besar Muhammad SAW, para sahabat, serta para muassis dan alim ulama Nahdlatul Ulama yang telah mewariskan semangat perjuangan menjaga Agama, Bangsa, dan Negeri.</p>
    <p>Laporan Pertanggung Jawaban ini disusun sebagai bentuk transparansi, akuntabilitas, dan evaluasi menyeluruh terhadap amanah organisasi yang diemban selama periode kepengurusan. Laporan ini mencakup rekapitulasi struktur organisasi dan kaderisasi, realisasi program kerja dan kegiatan, serta pembukuan keuangan ranting sebagai bahan telaah dan pijakan perbaikan untuk estafet kepengurusan mendatang.</p>
    <p><strong>Dasar Pelaksanaan:</strong></p>
    <ol style="margin: 4px 0 10px 24px; padding: 0; font-size: 11pt;">
      <li>Peraturan Dasar dan Peraturan Rumah Tangga (PD/PRT) Gerakan Pemuda Ansor.</li>
      <li>Hasil Keputusan Konferensi Ranting GP Ansor Desa Jatinom.</li>
      <li>Program Kerja dan Kebijakan Strategis Ranting GP Ansor Desa Jatinom Periode Berjalan.</li>
    </ol>
  <?php endif; ?>

  <!-- BAB II: STRUKTUR ORGANISASI & KADERISASI -->
  <div class="bab-title">BAB II &bull; STRUKTUR ORGANISASI & KADERISASI</div>
  <p class="no-indent">Susunan pengurus Pimpinan Ranting GP Ansor Desa Jatinom beserta banom dan biro kerja berdasarkan struktur resmi organisasi:</p>

  <?php if (empty($struktur)): ?>
    <div class="empty-note">Tidak ada data struktur pengurus pada periode ini.</div>
  <?php else: ?>
    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 30px;">No</th>
          <th>Nama Pengurus</th>
          <th>Jabatan</th>
          <th>Lembaga / Banom</th>
          <th style="width: 100px;">Kontak</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($struktur as $idx => $p): ?>
        <tr>
          <td class="text-center"><?php echo $idx + 1; ?></td>
          <td class="bold"><?php echo htmlspecialchars($p['nama']); ?></td>
          <td><?php echo htmlspecialchars($p['jabatan']); ?></td>
          <td><?php echo htmlspecialchars($p['lembaga']); ?></td>
          <td class="text-center"><?php echo htmlspecialchars($p['kontak'] ?: '-'); ?></td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>

  <p class="no-indent" style="font-size: 10.5pt; margin-top: 4px;">
    <strong>Rekapitulasi Keanggotaan:</strong> Jumlah Pengurus Terdaftar: <strong><?php echo count($struktur); ?></strong> Personil &bull; Jumlah Anggota / Kader Terdata: <strong><?php echo $totalKader; ?></strong> Kader.
  </p>

  <!-- BAB III: REKAPITULASI AGENDA / KEGIATAN -->
  <div class="bab-title">BAB III &bull; REKAPITULASI AGENDA & KEGIATAN</div>
  <p class="no-indent">Daftar pelaksanaan program kerja, pengawalan, apel, majelis shalawat, dan agenda ranting dalam periode laporan:</p>

  <?php if (empty($agenda)): ?>
    <div class="empty-note">Tidak ada data agenda / kegiatan pada periode ini.</div>
  <?php else: ?>
    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th style="width: 75px;">Tanggal</th>
          <th>Nama Kegiatan / Agenda</th>
          <th>Tempat Pelaksanaan</th>
          <th style="width: 65px;">Peserta</th>
          <th>Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($agenda as $i => $ag): ?>
        <tr>
          <td class="text-center"><?php echo $i + 1; ?></td>
          <td class="text-center"><?php echo tglIndo($ag['tanggal']); ?></td>
          <td class="bold"><?php echo htmlspecialchars($ag['judul']); ?></td>
          <td><?php echo htmlspecialchars($ag['tempat']); ?></td>
          <td class="text-center"><?php echo !empty($ag['jumlah_peserta']) ? intval($ag['jumlah_peserta']) . ' org' : '-'; ?></td>
          <td><?php echo htmlspecialchars($ag['keterangan'] ?: ($ag['kategori'] ?? '-')); ?></td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
    <p class="no-indent" style="font-size: 10.5pt;">
      Total Kegiatan Terlaksana: <strong><?php echo count($agenda); ?></strong> Kegiatan.
    </p>
  <?php endif; ?>

  <!-- BAB IV: LAPORAN KEUANGAN -->
  <div class="bab-title">BAB IV &bull; LAPORAN KEUANGAN & KAS RANTING</div>
  <p class="no-indent">Rekapitulasi sirkulasi arus kas, penerimaan iuran/infaq, dan belanja operasional organisasi:</p>

  <!-- Saldo Awal -->
  <div style="font-size: 11pt; margin: 6px 0;">
    <strong>Saldo Awal Periode:</strong> <span class="bold" style="color: #006837;"><?php echo formatRp($saldoAwal); ?></span>
  </div>

  <!-- Tabel Pemasukan -->
  <div style="font-size: 10.5pt; font-weight: bold; margin-top: 10px;">A. Rincian Pemasukan Kas:</div>
  <?php if (empty($pemasukan)): ?>
    <div class="empty-note">Tidak ada data pemasukan pada periode ini.</div>
  <?php else: ?>
    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 30px;">No</th>
          <th style="width: 80px;">Tanggal</th>
          <th>Uraian / Sumber Pemasukan</th>
          <th>Penanggung Jawab</th>
          <th style="width: 100px;">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($pemasukan as $im => $pm): ?>
        <tr>
          <td class="text-center"><?php echo $im + 1; ?></td>
          <td class="text-center"><?php echo tglIndo($pm['tanggal']); ?></td>
          <td><?php echo htmlspecialchars($pm['kategori'] . (!empty($pm['keterangan']) ? ' - ' . $pm['keterangan'] : '')); ?></td>
          <td><?php echo htmlspecialchars($pm['pj'] ?: '-'); ?></td>
          <td class="text-right"><?php echo formatRp($pm['jumlah']); ?></td>
        </tr>
        <?php endforeach; ?>
        <tr class="bg-subtotal">
          <td colspan="4" class="text-right bold">TOTAL PEMASUKAN:</td>
          <td class="text-right bold" style="color: #006837;"><?php echo formatRp($totalPemasukan); ?></td>
        </tr>
      </tbody>
    </table>
  <?php endif; ?>

  <!-- Tabel Pengeluaran -->
  <div style="font-size: 10.5pt; font-weight: bold; margin-top: 10px;">B. Rincian Pengeluaran Kas:</div>
  <?php if (empty($pengeluaran)): ?>
    <div class="empty-note">Tidak ada data pengeluaran pada periode ini.</div>
  <?php else: ?>
    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 30px;">No</th>
          <th style="width: 80px;">Tanggal</th>
          <th>Uraian / Alokasi Belanja</th>
          <th>Penanggung Jawab</th>
          <th style="width: 100px;">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($pengeluaran as $ik => $pk): ?>
        <tr>
          <td class="text-center"><?php echo $ik + 1; ?></td>
          <td class="text-center"><?php echo tglIndo($pk['tanggal']); ?></td>
          <td><?php echo htmlspecialchars($pk['kategori'] . (!empty($pk['keterangan']) ? ' - ' . $pk['keterangan'] : '')); ?></td>
          <td><?php echo htmlspecialchars($pk['pj'] ?: '-'); ?></td>
          <td class="text-right"><?php echo formatRp($pk['jumlah']); ?></td>
        </tr>
        <?php endforeach; ?>
        <tr class="bg-subtotal">
          <td colspan="4" class="text-right bold">TOTAL PENGELUARAN:</td>
          <td class="text-right bold" style="color: #c02626;"><?php echo formatRp($totalPengeluaran); ?></td>
        </tr>
      </tbody>
    </table>
  <?php endif; ?>

  <!-- Ringkasan Saldo Akhir -->
  <div class="rekap-box">
    <div class="bold" style="border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-bottom: 6px;">
      REKAPITULASI KAS AKHIR PERIODE:
    </div>
    <table>
      <tr>
        <td style="width: 250px;">Saldo Awal Periode</td>
        <td style="width: 15px;">:</td>
        <td class="text-right bold"><?php echo formatRp($saldoAwal); ?></td>
      </tr>
      <tr>
        <td>Total Pemasukan Periode Ini (+)</td>
        <td>:</td>
        <td class="text-right bold" style="color: #006837;"><?php echo formatRp($totalPemasukan); ?></td>
      </tr>
      <tr>
        <td>Total Pengeluaran Periode Ini (-)</td>
        <td>:</td>
        <td class="text-right bold" style="color: #c02626;"><?php echo formatRp($totalPengeluaran); ?></td>
      </tr>
      <tr style="border-top: 1.5px solid #222;">
        <td class="bold" style="padding-top: 4px;">SALDO KAS AKHIR</td>
        <td style="padding-top: 4px;">:</td>
        <td class="text-right bold" style="font-size: 11pt; padding-top: 4px; color: <?php echo $saldoAkhir >= 0 ? '#006837' : '#c02626'; ?>;">
          <?php echo formatRp($saldoAkhir); ?>
        </td>
      </tr>
    </table>
  </div>

  <!-- BAB V: PENUTUP -->
  <div class="bab-title">BAB V &bull; PENUTUP</div>
  <?php if (!empty($bab5Text)): ?>
    <div class="text-justify"><?php echo nl2br(htmlspecialchars($bab5Text)); ?></div>
  <?php else: ?>
    <p>Demikian Laporan Pertanggung Jawaban (LPJ) ini kami susun dengan penuh dedikasi dan kesungguhan hati. Kami menyadari sepenuhnya bahwa dalam mengemban amanah roda organisasi ini masih terdapat kekurangan dan keterbatasan yang perlu terus diperbaiki.</p>
    <p>Kami menyampaikan ucapan terima kasih dan apresiasi setinggi-tingginya kepada segenap jajaran Pengurus Ranting Nahdlatul Ulama Desa Jatinom, PAC GP Ansor Kanigoro, para alim ulama, sesepuh, serta seluruh Sahabat Ansor dan Banser yang telah berkhidmah tanpa pamrih.</p>
    <p>Semoga Allah SWT senantiasa meridhoi setiap derap langkah perjuangan kita dalam mengawal ajaran Ahlussunnah wal Jama'ah An-Nahdliyyah, menjaga marwah ulama, serta mengabdi untuk kemaslahatan umat dan bangsa.</p>
  <?php endif; ?>

  <!-- BLOK PENGESAHAN TANDA TANGAN -->
  <div class="ttd-container">
    <div class="text-center" style="margin-bottom: 8px;">
      Ditetapkan di: <?php echo htmlspecialchars($penetapanKota); ?><br>
      Pada tanggal: <?php echo $tglPenetapanFormatted; ?>
    </div>
    
    <div class="text-center bold" style="margin-bottom: 12px; font-size: 11pt;">
      PIMPINAN RANTING GERAKAN PEMUDA ANSOR<br>
      DESA JATINOM KECAMATAN KANIGORO
    </div>

    <table class="ttd-table">
      <tr>
        <td style="width: 33%;">
          Bendahara,<br>
          <div class="ttd-space"></div>
          <strong><u><?php echo htmlspecialchars($namaBendahara); ?></u></strong><br>
          <span>NIA. 11.07.02.007</span>
        </td>
        <td style="width: 34%;">
          Sekretaris,<br>
          <div class="ttd-space"></div>
          <strong><u><?php echo htmlspecialchars($namaSekretaris); ?></u></strong><br>
          <span>NIA. 11.07.02.002</span>
        </td>
        <td style="width: 33%;">
          Ketua,<br>
          <div class="ttd-space"></div>
          <strong><u><?php echo htmlspecialchars($namaPimpinan); ?></u></strong><br>
          <span>NIA. 11.07.02.001</span>
        </td>
      </tr>
      <tr>
        <td colspan="3" style="padding-top: 25px;">
          Mengetahui,<br>
          <strong><?php echo htmlspecialchars($mengetahuiOrg); ?></strong><br>
          <div class="ttd-space"></div>
          <strong><u><?php echo htmlspecialchars($mengetahuiNama); ?></u></strong>
        </td>
      </tr>
    </table>
  </div>

</body>
</html>
<?php
$htmlContent = ob_get_clean();

// Mode HTML preview jika parameter preview=html
if (isset($_GET['format']) && $_GET['format'] === 'html') {
    header('Content-Type: text/html; charset=utf-8');
    echo $htmlContent;
    exit;
}

// 4. Render ke Dompdf dengan Ukuran Kertas F4 (215 x 330 mm)
$options = new Options();
$options->set('isRemoteEnabled', true);
$options->set('isHtml5ParserEnabled', true);
$options->set('defaultFont', 'Times-Roman');

$dompdf = new Dompdf($options);
$dompdf->loadHtml($htmlContent);

// Ukuran F4 dalam Points: 215mm = 609.45pt, 330mm = 935.43pt
$dompdf->setPaper([0, 0, 609.45, 935.43], 'portrait');
$dompdf->render();

// Nomor Halaman pada Canvas Footer
$canvas = $dompdf->getCanvas();
$canvas->page_text(480, 910, "Halaman {PAGE_NUM} dari {PAGE_COUNT}", null, 9, [0.35, 0.35, 0.35]);

$filename = 'LPJ_GP_Ansor_Jatinom_' . preg_replace('/[^a-zA-Z0-9_\-]/', '_', $periodeLabel) . '_F4.pdf';
$dompdf->stream($filename, ['Attachment' => (isset($_GET['download']) && $_GET['download'] === '1')]);
exit;
