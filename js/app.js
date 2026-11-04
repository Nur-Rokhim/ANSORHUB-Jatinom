/**
 * SAHABAT JATINOM - Sistem Administrasi Hubungan Anggota Banser, Ansor, & Tradisi Rijalul Ansor
 * Pimpinan Ranting GP Ansor Jatinom, Kec. Kanigoro, Kab. Blitar
 * 
 * Standalone LocalStorage Powered Application
 */

// --- DATA INITIAL SEED (PR GP ANSOR JATINOM) ---
const INITIAL_KADER = [
  {
    id: "KDR-001",
    nama: "Muhammad Zainal Arifin",
    nik: "3505071205930001",
    nia: "11.07.02.001",
    tempatLahir: "Blitar",
    tglLahir: "1993-05-12",
    alamat: "RT 01 / RW 01 Dsn. Jatinom Krajan",
    wa: "081234567890",
    lembaga: ["Ansor", "Rijalul Ansor"],
    kaderisasi: "PKD",
    jabatan: "Ketua PR GP Ansor"
  },
  {
    id: "KDR-002",
    nama: "Ahmad Nur Sholihin",
    nik: "3505072008950002",
    nia: "11.07.02.002",
    tempatLahir: "Blitar",
    tglLahir: "1995-08-20",
    alamat: "RT 02 / RW 01 Dsn. Jatinom Krajan",
    wa: "081398765432",
    lembaga: ["Ansor"],
    kaderisasi: "PKD",
    jabatan: "Sekretaris PR GP Ansor"
  },
  {
    id: "KDR-003",
    nama: "Subhan Mubarok",
    nik: "3505071501910003",
    nia: "11.07.02.003",
    tempatLahir: "Blitar",
    tglLahir: "1991-01-15",
    alamat: "RT 03 / RW 02 Dsn. Wonorejo Jatinom",
    wa: "082155443322",
    lembaga: ["Ansor", "Banser"],
    kaderisasi: "SUSBALAN",
    jabatan: "Kasatkorkel Banser Jatinom"
  },
  {
    id: "KDR-004",
    nama: "Gus M. Fahmi Ilham",
    nik: "3505070904940004",
    nia: "11.07.02.004",
    tempatLahir: "Blitar",
    tglLahir: "1994-04-09",
    alamat: "RT 01 / RW 03 Dsn. Jatinom Kulon",
    wa: "085733221144",
    lembaga: ["Ansor", "Rijalul Ansor"],
    kaderisasi: "PKD",
    jabatan: "Ketua MDS Rijalul Ansor"
  },
  {
    id: "KDR-005",
    nama: "Bambang Tri Sutrisno",
    nik: "3505071811980005",
    nia: "11.07.02.005",
    tempatLahir: "Blitar",
    tglLahir: "1998-11-18",
    alamat: "RT 02 / RW 02 Dsn. Wonorejo",
    wa: "089677889900",
    lembaga: ["Banser"],
    kaderisasi: "DIKLATSAR",
    jabatan: "Anggota Satkorkel Banser"
  },
  {
    id: "KDR-006",
    nama: "Rizky Dwi Kurniawan",
    nik: "3505072512000006",
    nia: "11.07.02.006",
    tempatLahir: "Blitar",
    tglLahir: "2000-12-25",
    alamat: "RT 04 / RW 01 Dsn. Jatinom Krajan",
    wa: "087811223344",
    lembaga: ["Ansor", "Banser"],
    kaderisasi: "DIKLATSAR",
    jabatan: "Unit Provos Banser"
  }
];

const INITIAL_AGENDA = [
  {
    id: "AGD-001",
    judul: "Rutinan Selapanan Malam Ahad Pon MDS Rijalul Ansor",
    kategori: "Rijalul Ansor",
    tanggal: "2026-11-14",
    waktu: "19.30 WIB (Ba'da Isya)",
    tempat: "Musholla Baitur Muttaqin RT 02 / RW 01 Dsn. Krajan Jatinom",
    tuanRumah: "Sahabat Ahmad Nur Sholihin",
    keterangan: "Pembacaan Diba' Al-Barzanji dilanjutkan Kajian Kitab Risalah Ahlussunnah Wal Jama'ah KH. Hasyim Asy'ari.",
    status: "Mendatang"
  },
  {
    id: "AGD-002",
    judul: "Pam Pengamanan Pengajian Akbar Maulid Nabi Muhammad SAW",
    kategori: "Banser",
    tanggal: "2026-11-20",
    waktu: "18.30 WIB - Selesai",
    tempat: "Masjid Jami' Darussalam Jatinom",
    tuanRumah: "Ta'mir Masjid & PR Nahdlatul Ulama Jatinom",
    keterangan: "Pemberangkatan apel koordinasi di Posko Banser jam 18.00 WIB. Seragam PDL Banser Lengkap + Baret.",
    status: "Mendatang"
  },
  {
    id: "AGD-003",
    judul: "Rapat Pleno & Evaluasi Program Kerja Semester Akhir",
    kategori: "Ansor",
    tanggal: "2026-11-28",
    waktu: "20.00 WIB",
    tempat: "Gedung Serbaguna Ranting NU Jatinom",
    tuanRumah: "Pengurus Harian PR GP Ansor",
    keterangan: "Laporan pertanggungjawaban divisi persuratan, kaderisasi, satkorkel Banser, dan kas organisasi.",
    status: "Mendatang"
  }
];

const INITIAL_ARSIP_SURAT = [
  {
    id: "ARS-001",
    nomorSurat: "001/PR-XII-11-07-02/SU-01/XI/2026",
    jenis: "SU",
    sifat: "01",
    tglSurat: "2026-11-04",
    tujuan: "Seluruh Pengurus dan Anggota PR GP Ansor Jatinom",
    perihal: "Undangan Rutinan Selapanan MDS Rijalul Ansor",
    tipe: "Keluar"
  },
  {
    id: "ARS-002",
    nomorSurat: "045/PAC-XII-11-07/SE-01/X/2026",
    jenis: "SE",
    sifat: "01",
    tglSurat: "2026-10-25",
    tujuan: "Ketua PR GP Ansor Jatinom",
    perihal: "Instruksi Apel Hari Santri Nasional Tingkat Kecamatan Kanigoro",
    tipe: "Masuk"
  }
];

const INITIAL_BERITA = [
  {
    id: "NWS-001",
    judul: "Rutinan Selapanan MDS Rijalul Ansor Ranting Jatinom Istiqomah Rawat Tradisi Aswaja",
    kategori: "Rijalul Ansor",
    tanggal: "2026-11-02",
    penulis: "Biro Infokom Ansor Jatinom",
    ringkasan: "Majelis Dzikir dan Sholawat Rijalul Ansor Desa Jatinom sukses menggelar pembacaan Maulid Diba' dan kajian fiqih Aswaja bergiliran di Dusun Krajan.",
    isi: `Pimpinan Ranting Gerakan Pemuda Ansor Desa Jatinom melalui Majelis Dzikir dan Sholawat (MDS) Rijalul Ansor terus konsisten menggemakan syiar shalawat dan tradisi Ahlussunnah Wal Jama'ah An-Nahdliyyah.

Dalam acara yang bertempat di Musholla Baitur Muttaqin RT 02 / RW 01 Dusun Krajan, puluhan pemuda dan kader Ansor-Banser tampak khusyuk melantunkan bait-bait shalawat Diba' karya Syaikh Abdurrahman Ad-Diba'i.

Ketua MDS Rijalul Ansor Jatinom, Gus M. Fahmi Ilham menuturkan, kegiatan ini menjadi benteng spiritual generasi muda dari arus degradasi moral dan sarana mempererat persaudaraan antarwarga Desa Jatinom.`,
    gambar: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "NWS-002",
    judul: "Siaga Satu Komando, Satkorkel BANSER Jatinom Sukseskan Pengamanan Pengajian Akbar",
    kategori: "Banser",
    tanggal: "2026-10-28",
    penulis: "Satkorkel Banser Jatinom",
    ringkasan: "Sebanyak 15 personel Barisan Ansor Serbaguna (BANSER) Satkorkel Jatinom dikerahkan membantu kelancaran dan pengamanan pengajian akbar warga NU.",
    isi: `Menjaga marwah para ulama dan kenyamanan ummat merupakan doktrin utama Banser. Hal ini dibuktikan oleh jajaran Satuan Koordinasi Kelompok (Satkorkel) BANSER Ranting Jatinom, Kecamatan Kanigoro.

Kasatkorkel Banser Jatinom, Sahabat Subhan Mubarok, menegaskan bahwa seluruh personel bertugas dengan penuh keikhlasan di bawah komando Pimpinan Ranting. Pengaturan arus lalu lintas, sterilisasi area pengajian, serta pengawalan para Masyayikh berlangsung aman, tertib, dan kondusif.`,
    gambar: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "NWS-003",
    judul: "Resmi Diluncurkan, Web Portal 'SAHABAT Jatinom' Siap Akselerasi Digitalisasi Ranting",
    kategori: "Ansor",
    tanggal: "2026-11-04",
    penulis: "Badan Siber Ansor Jatinom",
    ringkasan: "PR GP Ansor Jatinom meluncurkan platform terintegrasi untuk persuratan digital, pendataan kader e-Kader, dan manajemen agenda jam'iyyah.",
    isi: `Sebagai langkah strategis menjawab tantangan zaman di era digitalisasi organisasi, Pimpinan Ranting Gerakan Pemuda Ansor Desa Jatinom resmi memperkenalkan portal SAHABAT Jatinom (Sistem Administrasi Hubungan Anggota Banser, Ansor, & Tradisi Rijalul Ansor).

Aplikasi ini memuat generator persuratan standar Peraturan Organisasi, pendataan database kader multi-banom, serta kalender kegiatan terpadu yang memudahkan seluruh kader dan masyarakat mengakses informasi resmi organisasi secara transparan dan akuntabel.`,
    gambar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
  }
];

const INITIAL_USERS = [
  {
    id: "USR-01",
    username: "superadmin",
    nama: "Super Admin Ranting",
    role: "Super Admin",
    pin: "1934",
    email: "admin.jatinom@ansor.id",
    akses: "Akses Penuh Semua Menu & Pengaturan",
    status: "Aktif",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
  },
  {
    id: "USR-02",
    username: "ketua",
    nama: "Muhammad Zainal Arifin",
    role: "Ketua Ansor",
    pin: "1234",
    email: "ketua.jatinom@ansor.id",
    akses: "Pengesahan Surat, E-Kader, Agenda & Profil",
    status: "Aktif",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
  },
  {
    id: "USR-03",
    username: "sekretaris",
    nama: "Ahmad Nur Sholihin",
    role: "Sekretaris",
    pin: "1234",
    email: "sekretaris.jatinom@ansor.id",
    akses: "Manajemen E-Surat, E-Kader & Notulensi",
    status: "Aktif",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
  },
  {
    id: "USR-04",
    username: "kasatkorkel",
    nama: "Subhan Mubarok",
    role: "Kasatkorkel",
    pin: "1234",
    email: "banser.jatinom@ansor.id",
    akses: "Kaderisasi Banser, Surat Tugas PAM & Apel",
    status: "Aktif",
    badgeColor: "bg-red-100 text-red-800 border-red-200"
  },
  {
    id: "USR-05",
    username: "mds",
    nama: "Gus M. Fahmi Ilham",
    role: "Ketua MDS Rijalul Ansor",
    pin: "1234",
    email: "rijalul.jatinom@ansor.id",
    akses: "Jadwal Rutinan Selapanan, Diba'an & Tahlil",
    status: "Aktif",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
  },
  {
    id: "USR-06",
    username: "siber",
    nama: "Fajar Sidiq",
    role: "Ketua Siber Ansor",
    pin: "1234",
    email: "siber.jatinom@ansor.id",
    akses: "Kelola Warta Ansor, Media Publikasi & IT",
    status: "Aktif",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200"
  }
];

// DAFTAR LENGKAP NAMA-NAMA PENGURUS RESMI PR GP ANSOR JATINOM
const INITIAL_PENGURUS = [
  // Penasehat
  { id: 1, lembaga: "Penasehat", jabatan: "Rois Syuriyah PR NU Jatinom", nama: "Kyai Manshur Shodiq", nia: "-", kontak: "081234567800", urutan: 1 },
  { id: 2, lembaga: "Penasehat", jabatan: "Ketua Tanfidziyah PR NU Jatinom", nama: "Ustadz H. Mahfudz", nia: "-", kontak: "081234567801", urutan: 2 },
  // Pimpinan Ranting GP Ansor
  { id: 3, lembaga: "Ansor", jabatan: "Ketua PR GP Ansor Jatinom", nama: "Muhammad Zainal Arifin", nia: "11.07.02.001", kontak: "081234567890", urutan: 3 },
  { id: 4, lembaga: "Ansor", jabatan: "Wakil Ketua GP Ansor", nama: "Imam Baehaqi", nia: "11.07.02.008", kontak: "081233445566", urutan: 4 },
  { id: 5, lembaga: "Ansor", jabatan: "Sekretaris PR GP Ansor", nama: "Ahmad Nur Sholihin", nia: "11.07.02.002", kontak: "081398765432", urutan: 5 },
  { id: 6, lembaga: "Ansor", jabatan: "Wakil Sekretaris GP Ansor", nama: "Choirul Anam", nia: "11.07.02.009", kontak: "081355667788", urutan: 6 },
  { id: 7, lembaga: "Ansor", jabatan: "Bendahara PR GP Ansor", nama: "Abdul Wahid", nia: "11.07.02.007", kontak: "085711223344", urutan: 7 },
  { id: 8, lembaga: "Ansor", jabatan: "Wakil Bendahara GP Ansor", nama: "M. Nur Huda", nia: "11.07.02.010", kontak: "085799887766", urutan: 8 },
  // Satkorkel BANSER
  { id: 9, lembaga: "Banser", jabatan: "Kasatkorkel BANSER Jatinom", nama: "Subhan Mubarok", nia: "11.07.02.003", kontak: "082155443322", urutan: 9 },
  { id: 10, lembaga: "Banser", jabatan: "Wakasatkorkel BANSER", nama: "Bambang Tri Sutrisno", nia: "11.07.02.005", kontak: "089677889900", urutan: 10 },
  { id: 11, lembaga: "Banser", jabatan: "Komandan Unit Provos BANSER", nama: "Rizky Dwi Kurniawan", nia: "11.07.02.006", kontak: "087811223344", urutan: 11 },
  { id: 12, lembaga: "Banser", jabatan: "Komandan Unit Dalmas BANSER", nama: "Agus Setyawan", nia: "11.07.02.011", kontak: "082233445577", urutan: 12 },
  { id: 13, lembaga: "Banser", jabatan: "Komandan Unit Balantas BANSER", nama: "Wahyu Hidayat", nia: "11.07.02.012", kontak: "082255667788", urutan: 13 },
  { id: 14, lembaga: "Banser", jabatan: "Komandan Unit Bagana BANSER", nama: "Danang Prasetyo", nia: "11.07.02.013", kontak: "082288990011", urutan: 14 },
  // MDS Rijalul Ansor
  { id: 15, lembaga: "Rijalul Ansor", jabatan: "Ketua MDS Rijalul Ansor", nama: "Gus M. Fahmi Ilham", nia: "11.07.02.004", kontak: "085733221144", urutan: 15 },
  { id: 16, lembaga: "Rijalul Ansor", jabatan: "Wakil Ketua MDS Rijalul Ansor", nama: "Ustadz M. Imron", nia: "11.07.02.014", kontak: "085766778899", urutan: 16 },
  { id: 17, lembaga: "Rijalul Ansor", jabatan: "Sekretaris MDS Rijalul Ansor", nama: "Lukman Hakim", nia: "11.07.02.015", kontak: "085744556677", urutan: 17 },
  { id: 18, lembaga: "Rijalul Ansor", jabatan: "Bendahara MDS Rijalul Ansor", nama: "Arif Munandar", nia: "11.07.02.016", kontak: "085733445566", urutan: 18 },
  { id: 19, lembaga: "Rijalul Ansor", jabatan: "Koordinator Amaliyah & Sholawat", nama: "Ustadz Saiful Anwar", nia: "11.07.02.017", kontak: "085722334455", urutan: 19 },
  // Biro & Badan
  { id: 20, lembaga: "Biro", jabatan: "Ketua Badan Siber Ansor PR Jatinom", nama: "Fajar Sidiq", nia: "11.07.02.018", kontak: "081299887766", urutan: 20 },
  { id: 21, lembaga: "Biro", jabatan: "Koordinator Biro Pengkaderan (PKD)", nama: "Ahmad Basuki", nia: "11.07.02.019", kontak: "081288776655", urutan: 21 }
];

const INITIAL_SIGNATURES = {
  // Ansor
  ttdKetua: "",
  ttdSekretaris: "",
  stempelAnsor: "",
  // Banser
  ttdKasatkorkel: "",
  stempelBanser: "",
  // MDS Rijalul Ansor
  ttdMds: "",
  stempelRijalul: "",
  // Opsi Tampilkan pada Surat
  tampilkanDiSurat: true
};

const INITIAL_SETTINGS = {
  adminNama: "Sahabat Admin Sekretariat",
  adminEmail: "ansor.jatinom@gmail.com",
  adminJabatan: "Sekretaris Ranting",
  namaRanting: "PIMPINAN RANTING DESA JATINOM",
  ketuaNama: "MUHAMMAD ZAINAL ARIFIN",
  ketuaNia: "11.07.02.001",
  sekretarisNama: "AHMAD NUR SHOLIHIN",
  sekretarisNia: "11.07.02.002",
  kasatkorkelNama: "SUBHAN MUBAROK",
  ketuaMdsNama: "GUS M. FAHMI ILHAM",
  ketuaSiberNama: "FAJAR SIDIQ",
  alamatSekretariat: "Jl. Raya Jatinom, Kec. Kanigoro, Kab. Blitar 66171 | Email: ansor.jatinom@gmail.com",
  waOfficial: "081234567890",
  customLogos: {
    ansor: "",
    banser: "",
    rijalul: "",
    siber: ""
  }
};

const INITIAL_NOTIFIKASI = [
  {
    id: "NTF-001",
    judul: "Pengingat Rutinan Selapanan Malam Ahad Pon",
    pesan: "Agenda MDS Rijalul Ansor terdekat akan dilaksanakan di Musholla Baitur Muttaqin Dsn. Krajan.",
    waktu: "Baru saja",
    dibaca: false,
    kategori: "agenda"
  },
  {
    id: "NTF-002",
    judul: "Arsip Surat Keluar Tercatat",
    pesan: "Surat Undangan No. 001/PR-XII-11-07-02/SU-01/XI/2026 telah tersimpan ke buku arsip.",
    waktu: "1 jam yang lalu",
    dibaca: false,
    kategori: "surat"
  },
  {
    id: "NTF-003",
    judul: "Database Kader Baru Ditambahkan",
    pesan: "Sahabat Rizky Dwi Kurniawan (Unit Provos) telah terverifikasi dalam basis data kader.",
    waktu: "Kemarin",
    dibaca: true,
    kategori: "kader"
  }
];

// Romawi Bulan Helper
const ROMAN_MONTHS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

// Hijri Date Approx Helper (Based on Gregorian estimation for Indonesian Islamic Calendar)
function getHijriDate(dateObj) {
  try {
    // Internationalization Hijri Calendar format (Islamic-umalqura)
    const formatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    return formatter.format(dateObj) + " H";
  } catch (e) {
    return "14 Jumadil Ula 1448 H";
  }
}

function getIndonesianDate(dateObj) {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const d = dateObj.getDate();
  const m = months[dateObj.getMonth()];
  const y = dateObj.getFullYear();
  return `${d} ${m} ${y} M`;
}

// --- STATE MANAGEMENT ---
class AnsorStore {
  static getKader() {
    const data = localStorage.getItem("sahabat_kader");
    return data ? JSON.parse(data) : INITIAL_KADER;
  }
  static saveKader(list) {
    localStorage.setItem("sahabat_kader", JSON.stringify(list));
  }

  static getAgenda() {
    const data = localStorage.getItem("sahabat_agenda");
    return data ? JSON.parse(data) : INITIAL_AGENDA;
  }
  static saveAgenda(list) {
    localStorage.setItem("sahabat_agenda", JSON.stringify(list));
  }

  static getArsip() {
    const data = localStorage.getItem("sahabat_arsip");
    return data ? JSON.parse(data) : INITIAL_ARSIP_SURAT;
  }
  static saveArsip(list) {
    localStorage.setItem("sahabat_arsip", JSON.stringify(list));
  }

  static getNextNomorSurat() {
    const counter = parseInt(localStorage.getItem("sahabat_surat_counter") || "1", 10);
    return counter;
  }
  static incrementNomorSurat() {
    const counter = parseInt(localStorage.getItem("sahabat_surat_counter") || "1", 10);
    localStorage.setItem("sahabat_surat_counter", (counter + 1).toString());
  }

  static getBerita() {
    const data = localStorage.getItem("sahabat_berita");
    return data ? JSON.parse(data) : INITIAL_BERITA;
  }
  static saveBerita(list) {
    localStorage.setItem("sahabat_berita", JSON.stringify(list));
  }

  static getSettings() {
    const data = localStorage.getItem("sahabat_settings");
    return data ? JSON.parse(data) : INITIAL_SETTINGS;
  }
  static saveSettings(obj) {
    localStorage.setItem("sahabat_settings", JSON.stringify(obj));
  }

  static getNotifikasi() {
    const data = localStorage.getItem("sahabat_notifikasi");
    return data ? JSON.parse(data) : INITIAL_NOTIFIKASI;
  }
  static saveNotifikasi(list) {
    localStorage.setItem("sahabat_notifikasi", JSON.stringify(list));
  }

  static getCustomLogo(type) {
    const settings = this.getSettings();
    return settings.customLogos ? settings.customLogos[type] || "" : "";
  }
  static setCustomLogo(type, dataUrl) {
    const settings = this.getSettings();
    if (!settings.customLogos) settings.customLogos = {};
    settings.customLogos[type] = dataUrl;
    this.saveSettings(settings);
  }

  static getUsers() {
    const data = localStorage.getItem("sahabat_users");
    return data ? JSON.parse(data) : INITIAL_USERS;
  }
  static saveUsers(list) {
    localStorage.setItem("sahabat_users", JSON.stringify(list));
  }

  static getCurrentUser() {
    const data = localStorage.getItem("sahabat_current_user");
    return data ? JSON.parse(data) : INITIAL_USERS[0]; // Default Super Admin
  }
  static setCurrentUser(user) {
    localStorage.setItem("sahabat_current_user", JSON.stringify(user));
  }

  static getSignatures() {
    const data = localStorage.getItem("sahabat_signatures");
    return data ? JSON.parse(data) : INITIAL_SIGNATURES;
  }
  static saveSignatures(obj) {
    localStorage.setItem("sahabat_signatures", JSON.stringify(obj));
  }
  static getSignature(key) {
    const sigs = this.getSignatures();
    return sigs ? sigs[key] || "" : "";
  }
  static setSignature(key, dataUrl) {
    const sigs = this.getSignatures();
    sigs[key] = dataUrl;
    this.saveSignatures(sigs);
  }

  // Pengurus Management
  static getPengurus() {
    const data = localStorage.getItem("sahabat_pengurus");
    return data ? JSON.parse(data) : INITIAL_PENGURUS;
  }
  static savePengurus(list) {
    localStorage.setItem("sahabat_pengurus", JSON.stringify(list));
  }

  // Sinkronisasi XAMPP MySQL Check
  static async checkXamppStatus() {
    try {
      const res = await fetch("api.php?action=status");
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (e) {
      // Offline / Static HTML fallback
    }
    return { success: false, db_connected: false, message: "Browser LocalStorage (Offline Mode)" };
  }

  static resetAll() {
    localStorage.setItem("sahabat_kader", JSON.stringify(INITIAL_KADER));
    localStorage.setItem("sahabat_agenda", JSON.stringify(INITIAL_AGENDA));
    localStorage.setItem("sahabat_arsip", JSON.stringify(INITIAL_ARSIP_SURAT));
    localStorage.setItem("sahabat_berita", JSON.stringify(INITIAL_BERITA));
    localStorage.setItem("sahabat_settings", JSON.stringify(INITIAL_SETTINGS));
    localStorage.setItem("sahabat_users", JSON.stringify(INITIAL_USERS));
    localStorage.setItem("sahabat_pengurus", JSON.stringify(INITIAL_PENGURUS));
    localStorage.setItem("sahabat_signatures", JSON.stringify(INITIAL_SIGNATURES));
    localStorage.setItem("sahabat_current_user", JSON.stringify(INITIAL_USERS[0]));
    localStorage.setItem("sahabat_notifikasi", JSON.stringify(INITIAL_NOTIFIKASI));
    localStorage.setItem("sahabat_surat_counter", "2");
  }
}

// --- TEMPLATES CONTENT GENERATOR ---
const TEMPLATES_MAP = {
  SR: {
    nama: "Surat Rutin",
    kode: "SR",
    defaultPerihal: "Pemberitahuan Kegiatan dan Permohonan Izin Tempat",
    generateBody: (d) => `
<p>Salam silaturrahim teriring do'a kami sampaikan, semoga Sahabat senantiasa dalam limpahan taufiq dan hidayah Allah SWT serta sukses dalam menjalankan aktifitas keseharian. Aamiin.</p>
<p>Sehubungan dengan pelaksanaan program kerja Pimpinan Ranting Gerakan Pemuda Ansor Jatinom, melalui surat ini kami bermaksud memberitahukan agenda rutin organisasi yang akan dilaksanakan pada:</p>
<table style="width: 100%; margin: 15px 0 15px 20px; border-collapse: collapse;">
  <tr><td style="width: 140px; vertical-align: top;"><strong>Hari, Tanggal</strong></td><td style="width: 15px; vertical-align: top;">:</td><td>${d.hariTanggal || "Ahad Pon, 15 November 2026"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Waktu</strong></td><td style="vertical-align: top;">:</td><td>${d.waktu || "19.30 WIB s.d Selesai"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Tempat</strong></td><td style="vertical-align: top;">:</td><td>${d.tempat || "Musholla / Lokasi Kegiatan di Desa Jatinom"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Agenda Kegiatan</strong></td><td style="vertical-align: top;">:</td><td>${d.kegiatan || "Rutinan & Silaturrahim Kader GP Ansor Ranting Jatinom"}</td></tr>
</table>
<p>Demikian surat pemberitahuan ini kami sampaikan, atas perhatian dan kerjasamanya kami haturkan terima kasih yang sebesar-besarnya.</p>
`
  },
  SK: {
    nama: "Surat Keputusan",
    kode: "SK",
    defaultPerihal: "Pengesahan Susunan Panitia Pelaksana Kegiatan",
    generateBody: (d) => `
<div style="text-align: center; margin-bottom: 20px;">
  <strong>KEPUTUSAN PIMPINAN RANTING GERAKAN PEMUDA ANSOR JATINOM</strong><br>
  <span>Nomor: ${d.nomorLengkap}</span><br>
  <em>Tentang:</em><br>
  <strong>${d.tentang || "PENGESAHAN SUSUNAN PANITIA PERINGATAN HARLAH GP ANSOR RANTING JATINOM"}</strong>
</div>
<p><strong>BISMILLAHIRRAHMANIRRAHIM</strong><br>
Pimpinan Ranting Gerakan Pemuda Ansor Desa Jatinom, Kecamatan Kanigoro, Kabupaten Blitar setelah:</p>
<table style="width: 100%; margin-bottom: 12px;">
  <tr>
    <td style="width: 110px; vertical-align: top;"><strong>Menimbang</strong></td>
    <td style="width: 15px; vertical-align: top;">:</td>
    <td>a. Bahwa demi kelancaran dan ketertiban roda organisasi, dipandang perlu untuk membentuk Panitia Pelaksana;<br>
        b. Bahwa nama-nama yang tercantum dalam lampiran surat ini dinilai mampu dan memenuhi syarat menjalankan amanah.</td>
  </tr>
  <tr>
    <td style="vertical-align: top;"><strong>Mengingat</strong></td>
    <td style="vertical-align: top;">:</td>
    <td>1. Peraturan Dasar (PD) dan Peraturan Rumah Tangga (PRT) Gerakan Pemuda Ansor;<br>
        2. Hasil Rapat Pengurus Harian PR GP Ansor Jatinom tertanggal ${d.tanggalRapat || "01 November 2026"}.</td>
  </tr>
</table>
<div style="text-align: center; margin: 12px 0;"><strong>MEMUTUSKAN</strong></div>
<table style="width: 100%;">
  <tr>
    <td style="width: 110px; vertical-align: top;"><strong>Menetapkan</strong></td>
    <td style="width: 15px; vertical-align: top;">:</td>
    <td><strong>PERTAMA:</strong> Mengesahkan susunan Panitia Pelaksana sebagaimana terlampir.<br>
        <strong>KEDUA:</strong> Menugaskan panitia terlampir untuk merencanakan dan melaksanakan kegiatan dengan penuh tanggung jawab.<br>
        <strong>KETIGA:</strong> Keputusan ini berlaku sejak tanggal ditetapkan hingga berakhirnya kegiatan.</td>
  </tr>
</table>
`
  },
  SM: {
    nama: "Surat Mandat",
    kode: "SM",
    defaultPerihal: "Mandat Utusan Konferensi Anak Cabang GP Ansor Kanigoro",
    generateBody: (d) => `
<p>Salam silaturrahim teriring do'a kami sampaikan semoga kita senantiasa dalam petunjuk dan lindungan Allah SWT.</p>
<p>Yang bertanda tangan di bawah ini, Pimpinan Ranting Gerakan Pemuda Ansor Desa Jatinom Kec. Kanigoro Kab. Blitar, dengan ini memberikan MANDAT PENUH kepada Sahabat:</p>
<table style="width: 100%; margin: 15px 0 15px 20px; border-collapse: collapse;">
  <tr><td style="width: 130px; vertical-align: top;"><strong>Nama Lengkap</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.namaPenerima || "Sahabat Ahmad Nur Sholihin"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Jabatan</strong></td><td style="vertical-align: top;">:</td><td>${d.jabatanPenerima || "Sekretaris PR GP Ansor Jatinom"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>NIA / NIK</strong></td><td style="vertical-align: top;">:</td><td>${d.niaPenerima || "11.07.02.002"}</td></tr>
</table>
<p>Untuk menjadi Utusan / Delegasi Resmi Pimpinan Ranting GP Ansor Jatinom dalam mengikuti kegiatan:</p>
<table style="width: 100%; margin: 10px 0 10px 20px;">
  <tr><td style="width: 130px; vertical-align: top;"><strong>Acara / Kegiatan</strong></td><td style="width: 15px; vertical-align: top;">:</td><td>${d.namaKegiatan || "Konferensi Anak Cabang (KONFERANCAB) GP Ansor Kanigoro"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Hari, Tanggal</strong></td><td style="vertical-align: top;">:</td><td>${d.hariTanggal || "Ahad, 22 November 2026"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Tempat</strong></td><td style="vertical-align: top;">:</td><td>${d.tempat || "Gedung MWC NU Kecamatan Kanigoro"}</td></tr>
</table>
<p>Demikian Surat Mandat ini dibuat untuk dipergunakan sebagaimana mestinya dengan penuh rasa amanah dan tanggung jawab.</p>
`
  },
  ST: {
    nama: "Surat Tugas",
    kode: "ST",
    defaultPerihal: "Tugas Pengamanan (PAM) Banser Satkorkel Jatinom",
    generateBody: (d) => `
<p>Salam silaturrahim teriring do'a kami sampaikan, semoga ridho dan perlindungan Allah senantiasa menyertai kita semua.</p>
<p>Pimpinan Ranting Gerakan Pemuda Ansor Jatinom bersama Satuan Koordinasi Kelompok (SATKORKEL) BANSER Jatinom dengan ini memberikan TUGAS kepada nama-nama berikut:</p>
<div style="margin: 15px 0 15px 20px;">
  ${d.daftarPetugas || `
  1. <strong>Subhan Mubarok</strong> (Kasatkorkel Banser)<br>
  2. <strong>Bambang Tri Sutrisno</strong> (Anggota Unit Dalmas)<br>
  3. <strong>Rizky Dwi Kurniawan</strong> (Unit Provos)<br>
  4. <strong>Beserta 10 Personel Banser Satkorkel Jatinom</strong>
  `}
</div>
<p>Untuk melaksanakan tugas pengamanan (PAM) dan penertiban kegiatan:</p>
<table style="width: 100%; margin: 10px 0 10px 20px;">
  <tr><td style="width: 130px; vertical-align: top;"><strong>Keperluan Tugas</strong></td><td style="width: 15px; vertical-align: top;">:</td><td>${d.keperluanTugas || "Pengamanan Pengajian Akbar & Peringatan Hari Besar Islam"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Waktu Pelaksanaan</strong></td><td style="vertical-align: top;">:</td><td>${d.waktu || "Ahad malam Senin, Pukul 18.30 WIB - Selesai"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Lokasi</strong></td><td style="vertical-align: top;">:</td><td>${d.tempat || "Halaman Masjid Darussalam Desa Jatinom"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Ketentuan</strong></td><td style="vertical-align: top;">:</td><td>Seragam PDL Banser Lengkap, Sepatu Lars, Baret, dan Menjunjung Tinggi Disiplin 1 Komando.</td></tr>
</table>
<p>Demikian Surat Tugas ini diterbitkan agar dilaksanakan sebaik-baiknya dengan dedikasi tinggi demi marwah organisasi dan ummat.</p>
`
  },
  SU: {
    nama: "Surat Undangan",
    kode: "SU",
    defaultPerihal: "Undangan Rutinan MDS Rijalul Ansor dan Silaturrahim",
    generateBody: (d) => `
<p>Salam silaturrahim teriring do'a kami haturkan, semoga Sahabat senantiasa berada dalam naungan maghfirah dan barakah Allah SWT.</p>
<p>Dalam rangka mempererat ukhuwah islamiyah dan melestarikan tradisi amaliyah Ahlussunnah Wal Jama'ah An-Nahdliyyah, Pimpinan Ranting GP Ansor Jatinom mengundang Sahabat untuk hadir pada:</p>
<table style="width: 100%; margin: 15px 0 15px 20px; border-collapse: collapse;">
  <tr><td style="width: 130px; vertical-align: top;"><strong>Hari, Tanggal</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.hariTanggal || "Sabtu Malam Ahad Pon, 14 November 2026"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Waktu</strong></td><td style="vertical-align: top;">:</td><td>${d.waktu || "19.30 WIB (Ba'da Isya) s.d Selesai"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Tempat</strong></td><td style="vertical-align: top;">:</td><td>${d.tempat || "Musholla Baitur Muttaqin RT 02 / RW 01 Dsn. Krajan Jatinom"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Acara</strong></td><td style="vertical-align: top;">:</td><td>${d.acara || "Pembacaan Maulid Diba', Yasin Tahlil, & Koordinasi Kasat/MDS"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Dresscode</strong></td><td style="vertical-align: top;">:</td><td>Baju Koko Putih / Seragam Ansor / Batik Ansor, Berpeci Hitam.</td></tr>
</table>
<p>Mengingat pentingnya acara ini, kami sangat mengharapkan kehadiran Sahabat tepat waktu. Atas kehadirannya kami ucapkan <em>jazakumullah ahsanal jaza'</em>.</p>
`
  },
  SI: {
    nama: "Surat Instruksi",
    kode: "SI",
    defaultPerihal: "Instruksi Kesiapsiagaan dan Partisipasi Apel Akbar",
    generateBody: (d) => `
<p>Salam silaturrahim kami sampaikan, semoga ridho Allah SWT selalu tercurah kepada seluruh jajaran pengurus dan kader Gerakan Pemuda Ansor Jatinom.</p>
<p>Menindaklanjuti arahan dari Pimpinan Cabang GP Ansor Kabupaten Blitar dan Pimpinan Anak Cabang Kanigoro, Pimpinan Ranting GP Ansor Jatinom dengan ini MENGINSTRUKSIKAN kepada:</p>
<p style="margin-left: 20px; font-weight: bold;">Seluruh Anggota GP Ansor dan Personel BANSER Ranting Jatinom</p>
<p>Untuk melaksanakan hal-hal sebagai berikut:</p>
<ol style="margin-left: 20px; padding-left: 15px; line-height: 1.6;">
  <li>Menghadiri dan mensukseskan <strong>${d.kegiatan || "Apel Akbar Kesetiaan dan Peringatan Harlah"}</strong> yang diselenggarakan pada tanggal <strong>${d.hariTanggal || "25 November 2026"}</strong> bertempat di <strong>${d.tempat || "Lapangan Kanigoro"}</strong>.</li>
  <li>Mematuhi komando satu barisan dan menjaga marwah serta etika Aswaja An-Nahdliyyah.</li>
  <li>Bagi seluruh personel Banser wajib mengenakan pakaian dinas resmi sesuai ketentuan Satkorcab.</li>
</ol>
<p>Instruksi ini bersifat wajib dan mengikat bagi seluruh kader di wilayah Ranting Jatinom.</p>
`
  },
  SE: {
    nama: "Surat Edaran",
    kode: "SE",
    defaultPerihal: "Edaran Bulan Bhakti dan Iuran Koin Mandiri Ansor",
    generateBody: (d) => `
<p>Salam silaturrahim teriring do'a kami sampaikan, semoga seluruh Sahabat senantiasa sehat wal 'afiat dalam lindungan Allah SWT.</p>
<p>Berdasarkan keputusan musyawarah Pimpinan Ranting GP Ansor Jatinom mengenai kemandirian ekonomi jam'iyyah dan keaktifan kader, bersama ini kami sampaikan Edaran sebagai berikut:</p>
<div style="margin: 15px 0 15px 20px; line-height: 1.6;">
  ${d.isiEdaran || `
  1. Pelaksanaan program <strong>Koin Infaq Mandiri Ansor Jatinom</strong> dimulai secara tertib setiap pertemuan rutinan selapanan.<br>
  2. Pengumpulan data mutakhir KTA Kader dan verifikasi nomor keanggotaan Banser melalui sekretariat ranting.<br>
  3. Menggiatkan kembali gotong royong sosial dan kepedulian terhadap lingkungan sekitar Desa Jatinom.
  `}
</div>
<p>Demikian surat edaran ini dibuat untuk diperhatikan dan dilaksanakan dengan penuh keikhlasan demi kemaslahatan bersama.</p>
`
  },
  Not: {
    nama: "Notulensi",
    kode: "Not",
    defaultPerihal: "Notulensi dan Berita Acara Rapat Pengurus Ranting",
    generateBody: (d) => `
<div style="text-align: center; margin-bottom: 20px;">
  <strong>NOTULENSI & BERITA ACARA RAPAT</strong><br>
  <span>PIMPINAN RANTING GP ANSOR DESA JATINOM</span>
</div>
<table style="width: 100%; margin-bottom: 15px; border-collapse: collapse;">
  <tr><td style="width: 140px; vertical-align: top;"><strong>Hari, Tanggal</strong></td><td style="width: 15px; vertical-align: top;">:</td><td>${d.hariTanggal || "Jum'at Malam, 06 November 2026"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Waktu</strong></td><td style="vertical-align: top;">:</td><td>${d.waktu || "20.00 WIB s.d 22.30 WIB"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Tempat</strong></td><td style="vertical-align: top;">:</td><td>${d.tempat || "Sekretariat PR GP Ansor Jatinom"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Pimpinan Rapat</strong></td><td style="vertical-align: top;">:</td><td>${d.pimpinanRapat || "Ketua PR GP Ansor Jatinom (Sahabat M. Zainal Arifin)"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Jumlah Kehadiran</strong></td><td style="vertical-align: top;">:</td><td>${d.kehadiran || "18 Orang (Pengurus Harian, Kasatkorkel, Ketua MDS RA)"}</td></tr>
</table>
<p><strong>POKOK-POKOK PEMBAHASAN & KEPUTUSAN RAPAT:</strong></p>
<div style="margin-left: 20px; line-height: 1.6;">
  ${d.isiNotulensi || `
  1. <strong>Kaderisasi:</strong> Penjaringan calon peserta PKD Ansor dan Diklatsar Banser angkatan tahun 2026/2027 ditargetkan minimal 10 orang dari pemuda Desa Jatinom.<br>
  2. <strong>MDS Rijalul Ansor:</strong> Rutinan selapanan diputuskan bergiliran di 3 dusun (Krajan, Wonorejo, Jatinom Kulon).<br>
  3. <strong>Biro IT / Siber:</strong> Peluncuran portal web "SAHABAT Jatinom" untuk memudahkan rekapitulasi data anggota dan administrasi surat-menyurat ranting.<br>
  4. <strong>Keuangan:</strong> Laporan saldo kas akhir bulan terverifikasi transparan dan disepakati forum rapat.
  `}
</div>
`
  },
  SRU: {
    nama: "Surat Rekomendasi Umum",
    kode: "SRU",
    defaultPerihal: "Rekomendasi Peserta Pelatihan Kepemimpinan Dasar (PKD)",
    generateBody: (d) => `
<p>Salam silaturrahim teriring do'a kami sampaikan, semoga limpahan rahmat dan karunia Allah SWT selalu mengiringi gerak langkah perjuangan kita.</p>
<p>Yang bertanda tangan di bawah ini, Pimpinan Ranting Gerakan Pemuda Ansor Desa Jatinom Kec. Kanigoro Kab. Blitar, setelah menimbang dedikasi dan kesungguhan yang bersangkutan, dengan ini memberikan:</p>
<div style="text-align: center; margin: 15px 0;">
  <span style="font-size: 13pt; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 2px;">REKOMENDASI</span>
</div>
<p>Kepada kader terbaik kami:</p>
<table style="width: 100%; margin: 10px 0 15px 20px; border-collapse: collapse;">
  <tr><td style="width: 140px; vertical-align: top;"><strong>Nama Lengkap</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.namaKader || "Sahabat Rizky Dwi Kurniawan"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Tempat, Tgl Lahir</strong></td><td style="vertical-align: top;">:</td><td>${d.ttlKader || "Blitar, 25 Desember 2000"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Alamat</strong></td><td style="vertical-align: top;">:</td><td>${d.alamatKader || "RT 04 / RW 01 Dsn. Jatinom Krajan"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Utusan</strong></td><td style="vertical-align: top;">:</td><td>Pimpinan Ranting GP Ansor Jatinom</td></tr>
</table>
<p>Untuk mengikuti kegiatan pengkaderan formal:</p>
<table style="width: 100%; margin: 10px 0 10px 20px;">
  <tr><td style="width: 140px; vertical-align: top;"><strong>Nama Kaderisasi</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.kaderisasiTujuan || "Pelatihan Kepemimpinan Dasar (PKD) / Diklatsar Banser"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Penyelenggara</strong></td><td style="vertical-align: top;">:</td><td>${d.penyelenggara || "Pimpinan Anak Cabang GP Ansor Kecamatan Kanigoro"}</td></tr>
</table>
<p>Demikian surat rekomendasi ini kami berikan dengan penuh tanggung jawab moral demi kemajuan dan militansi kader GP Ansor.</p>
`
  }
};

// Expose state and helper functions to global window
window.AnsorStore = AnsorStore;
window.ROMAN_MONTHS = ROMAN_MONTHS;
window.getHijriDate = getHijriDate;
window.getIndonesianDate = getIndonesianDate;
window.TEMPLATES_MAP = TEMPLATES_MAP;

