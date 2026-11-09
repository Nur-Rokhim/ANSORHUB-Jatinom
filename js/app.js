/**
 * SAHABAT JATINOM - Sistem Administrasi Hubungan Anggota Banser, Ansor, & Tradisi Rijalul Ansor
 * Pimpinan Ranting GP Ansor Jatinom, Kec. Kanigoro, Kab. Blitar
 * 
 * Standalone LocalStorage Powered Application
 */

// --- DATA INITIAL SEED (PR GP ANSOR JATINOM) ---
// Kosongkan Data Dummy agar pengguna dapat mengisi ulang mulai dari Nol
const INITIAL_KADER = [];
const INITIAL_AGENDA = [];
const INITIAL_ARSIP_SURAT = [];
const INITIAL_BERITA = [];

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
    role: "Sekretaris Ansor",
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
    username: "kasetma",
    nama: "Bambang Tri Sutrisno",
    role: "Kasetma",
    pin: "1234",
    email: "kasetma.jatinom@ansor.id",
    akses: "Administrasi Markas Banser & Logistik Personel",
    status: "Aktif",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200"
  },
  {
    id: "USR-06",
    username: "ketua_mds",
    nama: "Gus M. Fahmi Ilham",
    role: "Ketua MDS Rijalul Ansor",
    pin: "1234",
    email: "rijalul.jatinom@ansor.id",
    akses: "Jadwal Rutinan Selapanan, Diba'an & Tahlil",
    status: "Aktif",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
  },
  {
    id: "USR-07",
    username: "bendahara",
    nama: "Abdul Wahid",
    role: "Bendahara Ansor",
    pin: "1234",
    email: "bendahara.jatinom@ansor.id",
    akses: "Manajemen Keuangan, Kas Ranting & Pembukuan",
    status: "Aktif",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
  },
  {
    id: "USR-08",
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

// DATA KEUANGAN / PEMBUKUAN KAS RANTING - Siap Diisi Mulai dari Nol
const INITIAL_KEUANGAN = [];

// DATA AWAL PENGURUS - Kosong, siap diisi dari data real
const INITIAL_PENGURUS = [];

const INITIAL_SIGNATURES = {
  // Ansor
  ttdKetua: "",
  ttdSekretaris: "",
  stempelAnsor: "",
  // Banser
  ttdKasatkorkel: "",
  ttdKasetma: "",
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
  kasatkorkelNia: "11.07.02.003",
  kasetmaNama: "BAMBANG TRI SUTRISNO",
  kasetmaNia: "11.07.02.005",
  ketuaMdsNama: "GUS M. FAHMI ILHAM",
  ketuaSiberNama: "FAJAR SIDIQ",
  alamatSekretariat: "Jl. Raya Jatinom, Kec. Kanigoro, Kab. Blitar 66171 | Email: ansor.jatinom@gmail.com",
  waOfficial: "081234567890",
  visi: "Terwujudnya Generasi Muda Nahdlatul Ulama yang bertaqwa, berilmu, berakhlakul karimah, dan berdedikasi tinggi dalam pengembangan masyarakat Desa Jatinom.",
  misi: "1. Meningkatkan kualitas kaderisasi dan pembinaan anggota GP Ansor.\n2. Memperkuat sinergi antara GP Ansor, Satkorkel Banser, dan MDS Rijalul Ansor.\n3. Mengembangkan kegiatan sosial, dakwah, dan ekonomi masyarakat.\n4. Menjaga keutuhan NKRI dan nilai-nilai Aswaja An-Nahdliyyah.\n5. Membangun sistem administrasi yang transparan dan akuntabel.",
  customLogos: {
    ansor: "",
    banser: "",
    rijalul: "",
    siber: ""
  },
  medsos: {
    facebook: "https://facebook.com/ansor.jatinom",
    instagram: "https://instagram.com/ansor_jatinom",
    youtube: "https://youtube.com/@ansorjatinom",
    tiktok: "https://tiktok.com/@ansor_jatinom"
  }
};

// NOTIFIKASI AWAL - Siap Diisi Mulai dari Nol
const INITIAL_NOTIFIKASI = [];

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
  // Method untuk mengosongkan seluruh data dummy (Kader, Agenda, Arsip, Berita, Keuangan, Notifikasi)
  static resetAllDataToZero() {
    localStorage.setItem("sahabat_kader", "[]");
    localStorage.setItem("sahabat_agenda", "[]");
    localStorage.setItem("sahabat_arsip", "[]");
    localStorage.setItem("sahabat_berita", "[]");
    localStorage.setItem("sahabat_keuangan", "[]");
    localStorage.setItem("sahabat_notifikasi", "[]");
    localStorage.setItem("sahabat_pengurus", "[]");
    localStorage.setItem("sahabat_surat_counter", "1");
  }

  static getKader() {
    const data = localStorage.getItem("sahabat_kader");
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  static saveKader(list) {
    localStorage.setItem("sahabat_kader", JSON.stringify(list));
  }

  static getAgenda() {
    const data = localStorage.getItem("sahabat_agenda");
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  static saveAgenda(list) {
    localStorage.setItem("sahabat_agenda", JSON.stringify(list));
  }

  static getArsip() {
    const data = localStorage.getItem("sahabat_arsip");
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
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
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
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
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  static saveNotifikasi(list) {
    localStorage.setItem("sahabat_notifikasi", JSON.stringify(list));
  }

  static getKeuangan() {
    const data = localStorage.getItem("sahabat_keuangan");
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  static saveKeuangan(list) {
    localStorage.setItem("sahabat_keuangan", JSON.stringify(list));
  }

  static getCustomLogo(type) {
    const settings = this.getSettings();
    return settings.customLogos ? settings.customLogos[type] || "" : "";
  }
  static setCustomLogo(type, dataUrl) {
    const settings = this.getSettings();
    if (!settings.customLogos) settings.customLogos = {};
    if (dataUrl === null || dataUrl === undefined) {
      delete settings.customLogos[type];
    } else {
      settings.customLogos[type] = dataUrl;
    }
    this.saveSettings(settings);
  }

  static getUsers() {
    const data = localStorage.getItem("sahabat_users");
    if (!data) return INITIAL_USERS;
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge missing users (e.g. kasetma, bendahara) into stored users
        INITIAL_USERS.forEach((iu) => {
          if (!parsed.some((u) => u.username === iu.username)) {
            parsed.push(iu);
          }
        });
        return parsed;
      }
      return INITIAL_USERS;
    } catch (e) {
      return INITIAL_USERS;
    }
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
    localStorage.setItem("sahabat_keuangan", JSON.stringify(INITIAL_KEUANGAN));
    localStorage.setItem("sahabat_surat_counter", "1");
  }
}

// Auto-migrasi ke data bersih (kosong/mulai dari nol) untuk pengguna lama yang masih menyimpan dummy di localStorage
const DUMMY_RESET_KEY = "sahabat_dummy_cleared_v5";
if (!localStorage.getItem(DUMMY_RESET_KEY)) {
  AnsorStore.resetAllDataToZero();
  localStorage.setItem(DUMMY_RESET_KEY, "true");
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
<p>Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
<p>Salam silaturrahim teriring do'a kami sampaikan, semoga Sahabat senantiasa dalam limpahan taufiq dan hidayah Allah SWT serta sukses dalam menjalankan aktifitas keseharian.</p>
<p>Dengan hormat, bersama surat ini kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam kegiatan:</p>
<table style="width: 100%; margin: 15px 0 15px 20px; border-collapse: collapse;">
  <tr><td style="width: 140px; vertical-align: top;"><strong>Nama Kegiatan</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.acara || d.kegiatan || "Rutinan MDS Rijalul Ansor & Koordinasi Ranting"}</strong></td></tr>
  <tr><td style="width: 140px; vertical-align: top;"><strong>Hari / Tanggal</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.hariTanggal || "Sabtu Malam Ahad Pon, 14 November 2026"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Pukul</strong></td><td style="vertical-align: top;">:</td><td>${d.waktu || "19.30 WIB (Ba'da Isya) s.d Selesai"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Tempat</strong></td><td style="vertical-align: top;">:</td><td>${d.tempat || "Musholla Baitur Muttaqin RT 02 / RW 01 Dsn. Krajan Jatinom"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Agenda</strong></td><td style="vertical-align: top;">:</td><td>${d.acara || "Pembacaan Maulid Diba', Yasin Tahlil, & Koordinasi Kasat/MDS"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Dresscode</strong></td><td style="vertical-align: top;">:</td><td>Baju Koko Putih / Seragam Ansor / Batik Ansor, Berpeci Hitam.</td></tr>
</table>
<p>Mengingat pentingnya kegiatan tersebut, kehadiran Bapak/Ibu/Saudara/i sangat kami harapkan tepat waktu.</p>
<p>Demikian undangan ini kami sampaikan. Atas perhatian dan kehadirannya, kami ucapkan terima kasih <em>jazakumullah ahsanal jaza'</em>.</p>
<p>Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
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

// --- TEMPLATES CONTENT GENERATOR BANSER (SATKORKEL DESA JATINOM) ---
const TEMPLATES_BANSER_MAP = {
  SPH: {
    nama: "Surat Perintah Harian",
    kode: "SPH",
    defaultPerihal: "Perintah Harian dan Undangan Kesiapsiagaan Personel Satkorkel BANSER",
    generateBody: (d) => `
<p>Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
<p>Salam silaturrahim teriring salam komando kami sampaikan, semoga Sahabat jajaran personel BANSER senantiasa dalam lindungan Allah SWT serta istiqomah menjalankan amanah Aswaja An-Nahdliyyah.</p>
<p>Dalam rangka konsolidasi kesiapsiagaan korps dan pengamanan kegiatan, Kepala Satkorkel BANSER Desa Jatinom menginstruksikan kepada seluruh personel untuk hadir pada:</p>
<table style="width: 100%; margin: 4px 0 6px 15px; border-collapse: collapse;">
  <tr><td style="width: 130px; vertical-align: top;"><strong>Nama Kegiatan</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.acara || d.kegiatan || "Apel Kesetiaan & Koordinasi Pengamanan"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Korlap</strong></td><td style="vertical-align: top;">:</td><td><strong>${d.korlap || "Subhan Mubarok (Kasatkorkel BANSER Jatinom)"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Hari, Tanggal</strong></td><td style="vertical-align: top;">:</td><td><strong>${d.hariTanggal || "Jum'at Kliwon, 20 November 2026"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Waktu / Jam</strong></td><td style="vertical-align: top;">:</td><td>${d.waktu || "19.30 WIB s.d Selesai"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Tempat</strong></td><td style="vertical-align: top;">:</td><td>${d.tempat || "Markas Satkorkel BANSER Jatinom"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Pakaian Dinas</strong></td><td style="vertical-align: top;">:</td><td>Seragam PDL / PDH Banser Lengkap + Baret</td></tr>
</table>
<p>Seluruh anggota Banser Desa Jatinom diwajibkan hadir tepat waktu dan menjunjung tinggi doktrin <em>Nawa Prasetya Banser</em>. Demikian Perintah Harian ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.</p>
<p>Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
<p style="text-align: right; margin-top: 4px; font-weight: bold; font-style: italic;">Satu Komando, Satu Barisan! Banser Maju Terus Pantang Mundur!</p>
`
  },
  ST: {
    nama: "Surat Tugas",
    kode: "ST",
    defaultPerihal: "Surat Tugas Pengamanan dan Pengawalan Kegiatan",
    generateBody: (d) => `
<div style="text-align: center; margin-bottom: 8px;">
  <strong style="font-size: 11pt; letter-spacing: 0.5px;">SURAT TUGAS PENGAMANAN</strong><br>
  <span style="font-size: 9pt; font-family: monospace;">Nomor: ${d.nomorLengkap || "001/SKK-XII-11-07-02/ST-01/XI/2026"}</span>
</div>
<p>Kepala Satuan Koordinasi Kelompok (SATKORKEL) Barisan Ansor Serbaguna (BANSER) Desa Jatinom dengan ini MENUGASKAN kepada nama-nama personel Banser:</p>
<div style="margin: 4px 0 6px 15px; line-height: 1.15;">
  ${d.daftarPetugas || `
  1. <strong>Subhan Mubarok</strong> (Kasatkorkel / Koordinator Lapangan)<br>
  2. <strong>Bambang Tri Sutrisno</strong> (Kasetma / Unit Dalmas)<br>
  3. <strong>Rizky Dwi Kurniawan</strong> (Unit Provos) & <strong>M. Nur Huda</strong> (Unit Balantas)<br>
  4. <em>Beserta Anggota Regu Piket Satkorkel Jatinom</em>
  `}
</div>
<p>Untuk melaksanakan tugas pengamanan, pengawalan para Masyayikh, serta ketertiban pada:</p>
<table style="width: 100%; margin: 4px 0 6px 15px; border-collapse: collapse;">
  <tr><td style="width: 130px; vertical-align: top;"><strong>Nama Kegiatan</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.kegiatan || "Pengajian Akbar & Peringatan Maulid Nabi"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Hari, Tanggal</strong></td><td style="vertical-align: top;">:</td><td>${d.hariTanggal || "Ahad Pon, 15 November 2026"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Waktu / Jam</strong></td><td style="vertical-align: top;">:</td><td>${d.waktu || "19.00 WIB s.d Selesai"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Lokasi Tugas</strong></td><td style="vertical-align: top;">:</td><td>${d.tempat || "Halaman Masjid Baitur Muttaqin Desa Jatinom"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Pakaian Dinas</strong></td><td style="vertical-align: top;">:</td><td>Pakaian Dinas Lapangan (PDL Banser) Lengkap / Baret</td></tr>
</table>
<p>Demikian Surat Tugas ini diterbitkan agar dilaksanakan dengan penuh dedikasi dan tanggung jawab.</p>
`
  },
  SU: {
    nama: "Surat Undangan",
    kode: "SU",
    defaultPerihal: "Undangan Apel Kesetiaan dan Koordinasi Markas Satkorkel",
    generateBody: (d) => `
<p>Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
<p>Salam silaturrahim teriring salam komando kami sampaikan, semoga Sahabat seluruh jajaran personel Banser senantiasa dalam limpahan taufiq Allah SWT.</p>
<p>Dalam rangka konsolidasi internal dan evaluasi pengamanan, Kepala SATKORKEL BANSER Desa Jatinom mengundang Sahabat pada:</p>
<table style="width: 100%; margin: 4px 0 6px 15px; border-collapse: collapse;">
  <tr><td style="width: 130px; vertical-align: top;"><strong>Hari, Tanggal</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.hariTanggal || "Jum'at Kliwon, 20 November 2026"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Waktu / Jam</strong></td><td style="vertical-align: top;">:</td><td>${d.waktu || "19.30 WIB s.d Selesai"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Tempat</strong></td><td style="vertical-align: top;">:</td><td>${d.tempat || "Markas Satkorkel BANSER Jatinom / Balai Desa"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Acara</strong></td><td style="vertical-align: top;">:</td><td><strong>${d.kegiatan || "Apel Kesetiaan & Rapat Koordinasi Pengamanan"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Pakaian</strong></td><td style="vertical-align: top;">:</td><td>Seragam PDL / PDH Banser Lengkap + Baret</td></tr>
</table>
<p>Mengingat pentingnya agenda tersebut, seluruh anggota Banser Ranting Jatinom diwajibkan hadir tepat waktu. Atas kehadirannya kami ucapkan terima kasih.</p>
<p>Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
`
  },
  SPR: {
    nama: "Surat Perintah",
    kode: "SPR",
    defaultPerihal: "Perintah Sterilisasi Pengamanan Acara Pengajian Akbar",
    generateBody: (d) => `
<div style="text-align: center; margin-bottom: 12px;">
  <strong style="font-size: 12pt; letter-spacing: 0.5px;">SURAT PERINTAH OPERASIONAL</strong><br>
  <span style="font-size: 9.5pt; font-family: monospace;">Nomor: ${d.nomorLengkap || "001/SKK-XII-11-07-02/SPR-01/XI/2026"}</span>
</div>
<p>Kepala Satuan Koordinasi Kelompok (SATKORKEL) Barisan Ansor Serbaguna (BANSER) Desa Jatinom, memerintahkan kepada:</p>
<p style="margin-left: 15px; font-weight: bold;">Seluruh Anggota Satkorkel BANSER Jatinom dan Unit Khusus (Provos, Balantas, Bagana)</p>
<p>Untuk melaksanakan operasi sterilisasi dan penyiagaan posko pam pada:</p>
<table style="width: 100%; margin: 8px 0 10px 15px; border-collapse: collapse;">
  <tr><td style="width: 130px; vertical-align: top;"><strong>Agenda Tugas</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.kegiatan || "Sterilisasi dan Pengamanan Jalur VIP Masyayikh"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Hari, Tanggal</strong></td><td style="vertical-align: top;">:</td><td>${d.hariTanggal || "Sabtu, 21 November 2026"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Lokasi</strong></td><td style="vertical-align: top;">:</td><td>${d.tempat || "Desa Jatinom, Kec. Kanigoro, Kab. Blitar"}</td></tr>
</table>
<p>Perintah ini wajib dijalankan dengan penuh tanggung jawab, mengutamakan keselamatan jamaah, dan mematuhi arahan komandan lapangan.</p>
`
  },
  SE: {
    nama: "Surat Edaran",
    kode: "SE",
    defaultPerihal: "Edaran Registrasi NABA dan Pembaruan Atribut Dinas Personel",
    generateBody: (d) => `
<p>Salam silaturrahim teriring salam komando kami sampaikan kepada seluruh Sahabat Banser.</p>
<p>Menindaklanjuti arahan Satkorcab BANSER Kabupaten Blitar mengenai pendataan anggota berbasis NABA (Nomor Anggota Banser), dengan ini Kepala Satkorkel BANSER Jatinom menyampaikan edaran:</p>
<div style="margin: 8px 0 10px 15px; line-height: 1.5;">
  1. Seluruh personel Banser Satkorkel Jatinom wajib menyetorkan fotokopi KTP dan pasfoto untuk pembaruan database sistem.<br>
  2. Standarisasi pemakaian seragam PDL/PDH, baret, dan atribut wajib sesuai protokoler resmi Banser.<br>
  3. Pendaftaran anggota baru untuk Diklatsar dibuka melalui koordinasi pengurus ranting.
</div>
<p>Demikian edaran ini dibuat untuk dipedomani bersama demi kerapian dan soliditas barisan Banser Jatinom.</p>
`
  },
  SP: {
    nama: "Surat Peringatan",
    kode: "SP",
    defaultPerihal: "Peringatan Pelanggaran Kedisiplinan Personel Banser",
    generateBody: (d) => `
<div style="text-align: center; margin-bottom: 12px;">
  <strong style="font-size: 12pt; letter-spacing: 0.5px;">SURAT PERINGATAN KEDISIPLINAN</strong><br>
  <span style="font-size: 9.5pt; font-family: monospace;">Nomor: ${d.nomorLengkap || "001/SKK-XII-11-07-02/SP-01/XI/2026"}</span>
</div>
<p>Kepala Satkorkel BANSER Desa Jatinom setelah menerima laporan dari Unit Provos dan sidang kehormatan markas, memberikan PERINGATAN kepada:</p>
<table style="width: 100%; margin: 8px 0 10px 15px; border-collapse: collapse;">
  <tr><td style="width: 130px; vertical-align: top;"><strong>Nama Personel</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.namaKader || "Sahabat Terkait"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>NABA / NIK</strong></td><td style="vertical-align: top;">:</td><td>${d.nikKader || "11.07.02.xxx"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Kesatuan</strong></td><td style="vertical-align: top;">:</td><td>Satkorkel BANSER Desa Jatinom</td></tr>
</table>
<p>Atas tindakan ketidakdisiplinan yang tidak mengindahkan instruksi tugas komando. Yang bersangkutan diwajibkan menghadap Kepala Satkorkel untuk pembinaan lebih lanjut.</p>
`
  },
  SKA: {
    nama: "Surat Keterangan Aktif",
    kode: "SKA",
    defaultPerihal: "Keterangan Keaktifan Anggota BANSER Satkorkel Jatinom",
    generateBody: (d) => `
<div style="text-align: center; margin-bottom: 12px;">
  <strong style="font-size: 12pt; letter-spacing: 0.5px; border-bottom: 2px solid #000; padding-bottom: 2px;">SURAT KETERANGAN AKTIF ANGGOTA</strong><br>
  <span style="font-size: 9.5pt; font-family: monospace; margin-top: 4px; display: inline-block;">Nomor: ${d.nomorLengkap || "001/SKK-XII-11-07-02/SKA-01/XI/2026"}</span>
</div>
<p>Yang bertanda tangan di bawah ini Kepala Satuan Koordinasi Kelompok (SATKORKEL) Barisan Ansor Serbaguna (BANSER) Desa Jatinom menerangkan bahwa:</p>
<table style="width: 100%; margin: 8px 0 10px 15px; border-collapse: collapse;">
  <tr><td style="width: 130px; vertical-align: top;"><strong>Nama Lengkap</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.namaKader || "Sahabat Rizky Dwi Kurniawan"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Tempat, Tgl Lahir</strong></td><td style="vertical-align: top;">:</td><td>${d.ttlKader || "Blitar, 10 Mei 1998"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Alamat</strong></td><td style="vertical-align: top;">:</td><td>${d.alamatKader || "RT 02 / RW 01 Desa Jatinom, Kec. Kanigoro"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Jenjang Kaderisasi</strong></td><td style="vertical-align: top;">:</td><td>DIKLATSAR BANSER (Lulus Berijazah)</td></tr>
  <tr><td style="vertical-align: top;"><strong>Jabatan / Satuan</strong></td><td style="vertical-align: top;">:</td><td>Anggota Aktif Satkorkel BANSER Jatinom</td></tr>
</table>
<p>Adalah benar-benar anggota aktif yang senantiasa berkhidmah dan mentaati komando Satkorkel BANSER Desa Jatinom. Surat keterangan ini diterbitkan untuk dipergunakan sebagaimana mestinya.</p>
`
  },
  Not: {
    nama: "Notulensi Apel / Rapat",
    kode: "Not",
    defaultPerihal: "Notulensi Rapat Evaluasi & Apel Satkorkel Banser",
    generateBody: (d) => `
<div style="text-align: center; margin-bottom: 18px;">
  <strong style="font-size: 13pt; letter-spacing: 0.5px;">NOTULENSI APEL & KOORDINASI MARKAS</strong><br>
  <span>SATUAN KOORDINASI KELOMPOK (SATKORKEL) BANSER JATINOM</span>
</div>
<table style="width: 100%; margin-bottom: 15px; border-collapse: collapse;">
  <tr><td style="width: 140px; vertical-align: top;"><strong>Hari, Tanggal</strong></td><td style="width: 15px; vertical-align: top;">:</td><td>${d.hariTanggal || "Ahad Malam, 15 November 2026"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Waktu</strong></td><td style="vertical-align: top;">:</td><td>${d.waktu || "20.00 WIB s.d 22.00 WIB"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Pimpinan Apel</strong></td><td style="vertical-align: top;">:</td><td>Kasatkorkel BANSER Jatinom (Sahabat Subhan Mubarok)</td></tr>
  <tr><td style="vertical-align: top;"><strong>Peserta Hadir</strong></td><td style="vertical-align: top;">:</td><td>${d.kehadiran || "15 Personel Banser Jatinom"}</td></tr>
</table>
<p><strong>POKOK HASIL RAPAT / INSTRUKSI:</strong></p>
<div style="margin-left: 20px; line-height: 1.6;">
  1. <strong>Pengamanan Giat Rutin:</strong> Jadwal piket pengamanan pengajian selapanan desa dibagi menjadi 3 regu bergilir.<br>
  2. <strong>Logistik & Perlengkapan:</strong> Inventaris rompi lantas, lampu tongkat lalu lintas, dan jas hujan markas telah dicek oleh Kasetma.<br>
  3. <strong>Sosial Tanggap Bencana:</strong> Unit Bagana disiagakan mengantisipasi potensi musim penghujan di wilayah Jatinom.
</div>
`
  },
  SPN: {
    nama: "Surat Pengantar",
    kode: "SPN",
    defaultPerihal: "Surat Pengantar Laporan Kegiatan Pengamanan ke Satkorcab",
    generateBody: (d) => `
<p>Bersama surat ini, Kepala Satuan Koordinasi Kelompok (SATKORKEL) BANSER Desa Jatinom menyampaikan berkas / dokumen laporan kegiatan sebagai berikut:</p>
<table style="width: 100%; margin: 15px 0 15px 20px; border-collapse: collapse; border: 1px solid #94a3b8;">
  <tr style="background: #f1f5f9;"><th style="border: 1px solid #94a3b8; padding: 6px;">No</th><th style="border: 1px solid #94a3b8; padding: 6px;">Uraian Berkas / Dokumen</th><th style="border: 1px solid #94a3b8; padding: 6px;">Banyaknya</th><th style="border: 1px solid #94a3b8; padding: 6px;">Keterangan</th></tr>
  <tr><td style="border: 1px solid #94a3b8; padding: 6px; text-align: center;">1</td><td style="border: 1px solid #94a3b8; padding: 6px;">Laporan Pertanggungjawaban (LPJ) Pengamanan Giat Peringatan Hari Besar Islam di Desa Jatinom</td><td style="border: 1px solid #94a3b8; padding: 6px; text-align: center;">1 Bundel</td><td style="border: 1px solid #94a3b8; padding: 6px;">Disampaikan dengan hormat untuk verifikasi</td></tr>
</table>
<p>Demikian surat pengantar ini kami sampaikan atas perhatiannya diucapkan terima kasih.</p>
`
  },
  STF: {
    nama: "Surat Tugas Fasilitator / Instruktur",
    kode: "STF",
    defaultPerihal: "Penugasan Instruktur / Fasilitator Latihan Lapangan",
    generateBody: (d) => `
<div style="text-align: center; margin-bottom: 18px;">
  <strong style="font-size: 13pt; letter-spacing: 0.5px;">SURAT TUGAS INSTRUKTUR / FASILITATOR</strong><br>
  <span style="font-size: 10pt; font-family: monospace;">Nomor: ${d.nomorLengkap || "001/SKK-XII-11-07-02/STF-01/XI/2026"}</span>
</div>
<p>Kepala Satuan Koordinasi Kelompok (SATKORKEL) BANSER Desa Jatinom memberikan TUGAS INSTRUKTUR / FASILITATOR kepada:</p>
<table style="width: 100%; margin: 10px 0 15px 20px; border-collapse: collapse;">
  <tr><td style="width: 140px; vertical-align: top;"><strong>Nama Instruktur</strong></td><td style="width: 15px; vertical-align: top;">:</td><td><strong>${d.namaKader || "Sahabat Subhan Mubarok"}</strong></td></tr>
  <tr><td style="vertical-align: top;"><strong>Kualifikasi</strong></td><td style="vertical-align: top;">:</td><td>Lulusan SUSBALAN / Suspelat</td></tr>
  <tr><td style="vertical-align: top;"><strong>Materi Pelatihan</strong></td><td style="vertical-align: top;">:</td><td>Peraturan Baris Berbaris (PBB) dan Tata Cara Pengamanan Markas</td></tr>
</table>
<p>Untuk menjadi instruktur pada kegiatan pelatihan kepemudaan / kaderisasi Banser. Demikian surat tugas ini dibuat untuk dilaksanakan sebaik-baiknya.</p>
`
  },
  BA: {
    nama: "Berita Acara",
    kode: "BA",
    defaultPerihal: "Berita Acara Serah Terima Pengamanan dan Logistik Banser",
    generateBody: (d) => `
<div style="text-align: center; margin-bottom: 18px;">
  <strong style="font-size: 13pt; letter-spacing: 0.5px;">BERITA ACARA SERAH TERIMA PENGAMANAN</strong><br>
  <span style="font-size: 10pt; font-family: monospace;">Nomor: ${d.nomorLengkap || "001/SKK-XII-11-07-02/BA-01/XI/2026"}</span>
</div>
<p>Pada hari ini <strong>${d.hariTanggal || "Ahad, 15 November 2026"}</strong> bertempat di <strong>${d.tempat || "Sekretariat Ranting Jatinom"}</strong> telah dilaksanakan serah terima tugas pengamanan dan logistik dari regu jaga kepada regu piket berikutnya dalam kondisi aman, tertib, dan lengkap.</p>
`
  },
  SPRI: {
    nama: "Surat Rekomendasi Izin",
    kode: "SPRI",
    defaultPerihal: "Rekomendasi Izin Pengawalan Jalur dan Keramaian Banser",
    generateBody: (d) => `
<p>Salam silaturrahim teriring salam komando kami haturkan.</p>
<p>Sehubungan dengan pelaksanaan agenda syi'ar Aswaja An-Nahdliyyah di Desa Jatinom, Kepala Satkorkel BANSER Jatinom dengan ini memberikan REKOMENDASI PENGAMANAN dan IZIN LALU LINTAS untuk:</p>
<table style="width: 100%; margin: 10px 0 15px 20px; border-collapse: collapse;">
  <tr><td style="width: 140px; vertical-align: top;"><strong>Nama Agenda</strong></td><td style="width: 15px; vertical-align: top;">:</td><td>${d.kegiatan || "Pawai Ta'aruf & Pengajian Akbar Desa Jatinom"}</td></tr>
  <tr><td style="vertical-align: top;"><strong>Jalur / Rute</strong></td><td style="vertical-align: top;">:</td><td>Rute Jalan Utama Desa Jatinom Menuju Lapangan</td></tr>
  <tr><td style="vertical-align: top;"><strong>Penanggung Jawab</strong></td><td style="vertical-align: top;">:</td><td>Kasatkorkel & Unit Balantas Satkorkel Jatinom</td></tr>
</table>
<p>Demikian rekomendasi ini dibuat untuk digunakan dalam permohonan koordinasi bersama pihak keamanan terkait.</p>
`
  }
};

// Expose state and helper functions to global window
window.AnsorStore = AnsorStore;
window.ROMAN_MONTHS = ROMAN_MONTHS;
window.getHijriDate = getHijriDate;
window.getIndonesianDate = getIndonesianDate;
window.TEMPLATES_MAP = TEMPLATES_MAP;
window.TEMPLATES_BANSER_MAP = TEMPLATES_BANSER_MAP;
window.INITIAL_KEUANGAN = INITIAL_KEUANGAN;

