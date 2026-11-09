/**
 * SAHABAT Jatinom - UI Controller & Event Handlers
 * Pimpinan Ranting GP Ansor Desa Jatinom, Kec. Kanigoro, Kab. Blitar
 * Versi 2.2 - Portal Login, Warta Ansor CRUD, 6 Roles User, Digital Signatures & Stamps
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- APPLICATION STATE ---
  let state = {
    activeTab: "tab-dashboard", // Tab Pertama Default: Dashboard
    currentTemplate: "SU", // Default: Surat Undangan
    kaderList: AnsorStore.getKader(),
    agendaList: AnsorStore.getAgenda(),
    arsipList: AnsorStore.getArsip(),
    beritaList: AnsorStore.getBerita(),
    settings: AnsorStore.getSettings(),
    usersList: AnsorStore.getUsers(),
    currentUser: AnsorStore.getCurrentUser(),
    signatures: AnsorStore.getSignatures(),
    notifikasiList: AnsorStore.getNotifikasi(),
    keuanganList: AnsorStore.getKeuangan(),
    pengurusList: AnsorStore.getPengurus(),
    currentPengurusFilter: "semua",
    currentReadingBerita: null
  };

  // --- HIGH FIDELITY AUTHENTIC SVGS ---
  const LOGOS = {
    ansor: `
      <svg viewBox="0 0 100 110" class="w-full h-full drop-shadow-md">
        <polygon points="50,4 96,96 4,96" fill="#006837" stroke="#ffc72c" stroke-width="3" />
        <polygon points="50,9 91,92 9,92" fill="#00875a" stroke="#ffffff" stroke-width="1.5" />
        <polygon points="50,14 86,88 14,88" fill="#006837" />
        <line x1="50" y1="44" x2="50" y2="18" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
        <line x1="48" y1="42" x2="38" y2="28" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" />
        <line x1="52" y1="42" x2="62" y2="28" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" />
        <line x1="46" y1="46" x2="32" y2="38" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" />
        <line x1="54" y1="46" x2="68" y2="38" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" />
        <polygon points="50,38 52,44 58,44 53,48 55,54 50,50 45,54 47,48 42,44 48,44" fill="#ffffff" />
        <path d="M38,62 A15,15 0 0,0 62,62 A12,12 0 0,1 38,62 Z" fill="#ffffff" />
        <circle cx="50" cy="24" r="2.2" fill="#ffffff" />
        <circle cx="36" cy="33" r="1.8" fill="#ffffff" />
        <circle cx="64" cy="33" r="1.8" fill="#ffffff" />
        <circle cx="28" cy="48" r="1.8" fill="#ffffff" />
        <circle cx="72" cy="48" r="1.8" fill="#ffffff" />
        <circle cx="32" cy="62" r="1.8" fill="#ffffff" />
        <circle cx="68" cy="62" r="1.8" fill="#ffffff" />
        <circle cx="42" cy="72" r="1.8" fill="#ffffff" />
        <circle cx="58" cy="72" r="1.8" fill="#ffffff" />
        <rect x="22" y="78" width="56" height="8" rx="2" fill="#ffffff" />
        <text x="50" y="84.5" font-size="7.5" font-weight="900" text-anchor="middle" fill="#006837" font-family="'Arial Black', Impact, sans-serif" letter-spacing="1">ANSOR</text>
      </svg>`,
    banser: `
      <svg viewBox="0 0 100 110" class="w-full h-full drop-shadow-md">
        <polygon points="50,4 94,22 86,84 50,104 14,84 6,22" fill="#c02626" stroke="#ffc72c" stroke-width="3" />
        <polygon points="50,8 90,24 83,81 50,100 17,81 10,24" fill="#991b1b" stroke="#ffffff" stroke-width="1" />
        <polygon points="50,14 47,32 50,35 53,32" fill="#e2e8f0" stroke="#475569" stroke-width="0.8" />
        <rect x="48" y="32" width="4" height="6" fill="#ffc72c" rx="1" />
        <path d="M43,24 Q24,32 28,52 Q34,60 44,58 Q34,44 43,24 Z" fill="#ffc72c" stroke="#b45309" stroke-width="0.8" />
        <path d="M57,24 Q76,32 72,52 Q66,60 56,58 Q66,44 57,24 Z" fill="#ffc72c" stroke="#b45309" stroke-width="0.8" />
        <polygon points="50,44 68,70 32,70" fill="#006837" stroke="#ffc72c" stroke-width="1.2" />
        <polygon points="50,48 52,53 57,53 53,56 55,61 50,58 45,61 47,56 43,53 48,53" fill="#ffffff" />
        <text x="50" y="68" font-size="4.2" font-weight="900" text-anchor="middle" fill="#ffffff">ANSOR</text>
        <path d="M22,66 Q50,78 78,66 Q72,78 50,82 Q28,78 22,66 Z" fill="#ffc72c" stroke="#d97706" stroke-width="0.8" />
        <path d="M24,84 Q50,94 76,84 L74,90 Q50,100 26,90 Z" fill="#ffc72c" stroke="#b45309" stroke-width="0.8" />
        <text x="50" y="89" font-size="4.5" font-weight="bold" text-anchor="middle" fill="#1e293b" font-family="'Amiri', serif">نحن أنصار الله</text>
      </svg>`,
    rijalul: `
      <svg viewBox="0 0 100 110" class="w-full h-full drop-shadow-md">
        <polygon points="50,4 96,96 4,96" fill="#006837" stroke="#ffc72c" stroke-width="3" />
        <polygon points="50,9 91,92 9,92" fill="#00875a" stroke="#ffffff" stroke-width="1.5" />
        <circle cx="50" cy="20" r="2.8" fill="#ffc72c" />
        <circle cx="40" cy="28" r="2.2" fill="#ffc72c" />
        <circle cx="60" cy="28" r="2.2" fill="#ffc72c" />
        <circle cx="34" cy="38" r="2" fill="#ffc72c" />
        <circle cx="66" cy="38" r="2" fill="#ffc72c" />
        <polygon points="20,50 80,44 80,50 20,56" fill="#c02626" />
        <polygon points="20,56 80,50 80,55 20,61" fill="#ffffff" />
        <polygon points="50,46 53,55 62,55 55,61 58,70 50,65 42,70 45,61 38,55 47,55" fill="#ffc72c" stroke="#b45309" stroke-width="0.8" />
        <circle cx="28" cy="66" r="2" fill="#ffc72c" />
        <circle cx="72" cy="66" r="2" fill="#ffc72c" />
        <text x="50" y="84" font-size="7.5" font-weight="bold" text-anchor="middle" fill="#ffc72c" font-family="'Amiri', serif">رجال الأنصار</text>
        <text x="50" y="90" font-size="4" font-weight="extrabold" text-anchor="middle" fill="#ffffff" letter-spacing="1">RIJALUL ANSOR</text>
      </svg>`,
    siber: `
      <svg viewBox="0 0 100 110" class="w-full h-full drop-shadow-md">
        <polygon points="50,4 92,20 86,84 50,102 14,84 8,20" fill="#ffffff" stroke="#006837" stroke-width="3" />
        <polygon points="50,8 88,22 83,81 50,98 17,81 12,22" fill="#f0fdf4" stroke="#00875a" stroke-width="1" />
        <circle cx="28" cy="32" r="3" fill="#006837" />
        <path d="M28,32 L40,32 L46,40" stroke="#00875a" stroke-width="2" fill="none" />
        <circle cx="72" cy="32" r="3" fill="#006837" />
        <path d="M72,32 L60,32 L54,40" stroke="#00875a" stroke-width="2" fill="none" />
        <circle cx="24" cy="56" r="3" fill="#006837" />
        <path d="M24,56 L36,56 L42,50" stroke="#00875a" stroke-width="2" fill="none" />
        <circle cx="76" cy="56" r="3" fill="#006837" />
        <path d="M76,56 L64,56 L58,50" stroke="#00875a" stroke-width="2" fill="none" />
        <polygon points="50,30 70,64 30,64" fill="#006837" stroke="#ffc72c" stroke-width="1.5" />
        <polygon points="50,38 52,43 57,43 53,46 55,51 50,48 45,51 47,46 43,43 48,43" fill="#ffffff" />
        <text x="50" y="60" font-size="4" font-weight="900" text-anchor="middle" fill="#ffffff">ANSOR</text>
        <path d="M12,82 Q50,98 88,82 L86,88 Q50,104 14,88 Z" fill="#006837" stroke="#ffc72c" stroke-width="1" />
        <text x="50" y="85" font-size="3.8" font-weight="900" text-anchor="middle" fill="#ffffff" letter-spacing="0.5">BADAN SIBER ANSOR</text>
        <text x="50" y="93" font-size="4.2" font-weight="900" text-anchor="middle" fill="#ffc72c" letter-spacing="1">PR. JATINOM</text>
      </svg>`
  };

  // DEFAULT VECTOR STEMPEL & TANDA TANGAN JIKA BELUM ADA UPLOAD
  const DEFAULT_STAMPS = {
    stempelAnsor: `
      <svg viewBox="0 0 100 100" class="w-full h-full" style="color: #006837;">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="2,2"/>
        <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <path id="curveTop" d="M 18,50 A 32,32 0 0,1 82,50" fill="none"/>
        <text font-size="6" font-weight="bold" fill="currentColor">
          <textPath href="#curveTop" startOffset="50%" text-anchor="middle">GP ANSOR JATINOM</textPath>
        </text>
        <path id="curveBot" d="M 82,50 A 32,32 0 0,1 18,50" fill="none"/>
        <text font-size="5" font-weight="bold" fill="currentColor">
          <textPath href="#curveBot" startOffset="50%" text-anchor="middle">KEC. KANIGORO BLITAR</textPath>
        </text>
        <text x="50" y="48" font-size="6.5" font-weight="900" text-anchor="middle" fill="currentColor">PR</text>
        <polygon points="50,52 52,56 57,56 53,59 55,64 50,61 45,64 47,59 43,56 48,56" fill="currentColor"/>
      </svg>`,
    stempelBanser: `
      <svg viewBox="0 0 100 100" class="w-full h-full" style="color: #c02626;">
        <polygon points="50,6 92,24 84,78 50,94 16,78 8,24" fill="none" stroke="currentColor" stroke-width="2.5"/>
        <polygon points="50,12 86,28 79,74 50,88 21,74 14,28" fill="none" stroke="currentColor" stroke-width="1.2"/>
        <text x="50" y="44" font-size="6.5" font-weight="900" text-anchor="middle" fill="currentColor">SATKORKEL</text>
        <text x="50" y="55" font-size="9" font-weight="900" text-anchor="middle" fill="currentColor">BANSER</text>
        <text x="50" y="67" font-size="5" font-weight="bold" text-anchor="middle" fill="currentColor">DESA JATINOM</text>
        <line x1="25" y1="72" x2="75" y2="72" stroke="currentColor" stroke-width="1"/>
        <text x="50" y="78" font-size="4.5" font-weight="bold" text-anchor="middle" fill="currentColor">KANIGORO</text>
      </svg>`,
    stempelRijalul: `
      <svg viewBox="0 0 100 100" class="w-full h-full" style="color: #1e3a8a;">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2.5"/>
        <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <text x="50" y="38" font-size="5" font-weight="bold" text-anchor="middle" fill="currentColor">MAJELIS DZIKIR & SHOLAWAT</text>
        <text x="50" y="52" font-size="7.5" font-weight="900" text-anchor="middle" fill="currentColor">RIJALUL ANSOR</text>
        <text x="50" y="63" font-size="5.5" font-weight="bold" text-anchor="middle" fill="currentColor">RANTING JATINOM</text>
        <circle cx="50" cy="72" r="2" fill="currentColor"/>
      </svg>`,
    ttdKetua: `
      <svg viewBox="0 0 120 70" class="w-full h-full" style="color: #003a1e;">
        <path d="M 15,55 Q 35,10 45,35 Q 55,60 70,25 T 90,40 Q 105,45 110,30" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 30,30 L 75,55" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`,
    ttdSekretaris: `
      <svg viewBox="0 0 120 70" class="w-full h-full" style="color: #003a1e;">
        <path d="M 10,45 Q 30,15 40,40 Q 50,65 60,30 Q 75,10 85,50 Q 95,55 105,35" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="20" y1="58" x2="95" y2="48" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`,
    ttdKasatkorkel: `
      <svg viewBox="0 0 120 70" class="w-full h-full" style="color: #1a2e05;">
        <path d="M 15,50 Q 30,10 42,32 Q 52,55 65,20 Q 78,45 92,30 Q 102,40 110,25" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M 22,25 L 80,58" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="98" cy="48" r="2.5" fill="currentColor"/>
      </svg>`,
    ttdKasetma: `
      <svg viewBox="0 0 120 70" class="w-full h-full" style="color: #1a2e05;">
        <path d="M 12,42 Q 28,12 38,36 Q 48,58 58,26 Q 70,8 80,44 Q 90,48 102,30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
        <line x1="18" y1="52" x2="92" y2="44" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M 68,48 Q 82,56 95,50" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`
  };

  // Helper untuk merender Logo: Prioritas Custom (Data URL localStorage), Fallback ke SVG yang tajam
  function getLogoHTML(type, customClass = "w-full h-full object-contain") {
    const custom = AnsorStore.getCustomLogo(type);
    if (custom && custom.startsWith("data:")) {
      return `<img src="${custom}" alt="Logo ${type}" class="${customClass}" />`;
    }
    if (type === "sahabat") {
      return `<img src="img/logo-sahabat.png" alt="Logo SAHABAT Jatinom" class="${customClass} filter drop-shadow-sm" />`;
    }
    return LOGOS[type] || LOGOS.ansor;
  }

  // Helper untuk merender Stempel / TTD: Prioritas Custom Upload, Fallback ke SVG Basah
  function getSignatureOrStampHTML(key, fallbackKey) {
    const custom = AnsorStore.getSignature(key);
    if (custom && custom.startsWith("data:")) {
      return `<img src="${custom}" alt="${key}" class="w-full h-full object-contain" />`;
    }
    return DEFAULT_STAMPS[fallbackKey] || `<span class="text-[10px] text-slate-300 italic">Belum diunggah</span>`;
  }

  // Render semua logo di antarmuka
  function renderAllLogos() {
    const headerLogoEl = document.getElementById("header-logo-container");
    if (headerLogoEl) headerLogoEl.innerHTML = getLogoHTML("sahabat");

    const sidebarLogoEl = document.getElementById("sidebar-logo-container");
    if (sidebarLogoEl) sidebarLogoEl.innerHTML = getLogoHTML("sahabat");

    const loginLogoEl = document.getElementById("login-logo-container");
    if (loginLogoEl) loginLogoEl.innerHTML = getLogoHTML("sahabat");

    const printKopLogoKiri = document.getElementById("print-kop-logo-left");
    if (printKopLogoKiri) printKopLogoKiri.innerHTML = getLogoHTML("ansor");
    const printKopLogoKanan = document.getElementById("print-kop-logo-right");
    if (printKopLogoKanan) {
      printKopLogoKanan.innerHTML = "";
      printKopLogoKanan.classList.add("hidden");
    }
    const printKopDivider = document.getElementById("print-kop-divider");
    if (printKopDivider) printKopDivider.classList.add("hidden");
    const printKopKodeWil = document.getElementById("print-kop-kode-wilayah");
    if (printKopKodeWil) printKopKodeWil.textContent = "XII-11-07-02";

    updateKopLogos();

    const profilBigLogo = document.getElementById("profil-big-logo");
    if (profilBigLogo) profilBigLogo.innerHTML = getLogoHTML("sahabat");

    const gSahabat = document.getElementById("galeri-logo-sahabat");
    if (gSahabat) gSahabat.innerHTML = getLogoHTML("sahabat");

    const gAnsor = document.getElementById("galeri-logo-ansor");
    if (gAnsor) gAnsor.innerHTML = getLogoHTML("ansor");

    const gBanser = document.getElementById("galeri-logo-banser");
    if (gBanser) gBanser.innerHTML = getLogoHTML("banser");

    const gRijalul = document.getElementById("galeri-logo-rijalul");
    if (gRijalul) gRijalul.innerHTML = getLogoHTML("rijalul");

    const gSiber = document.getElementById("galeri-logo-siber");
    if (gSiber) gSiber.innerHTML = getLogoHTML("siber");

    renderSignaturesPreview();
  }

  function renderSignaturesPreview() {
    // Ansor
    const bTtdKetua = document.getElementById("box-preview-ttd-ketua");
    if (bTtdKetua) bTtdKetua.innerHTML = getSignatureOrStampHTML("ttdKetua", "ttdKetua");

    const bTtdSek = document.getElementById("box-preview-ttd-sekretaris");
    if (bTtdSek) bTtdSek.innerHTML = getSignatureOrStampHTML("ttdSekretaris", "ttdSekretaris");

    const bStempelAnsor = document.getElementById("box-preview-stempel-ansor");
    if (bStempelAnsor) bStempelAnsor.innerHTML = getSignatureOrStampHTML("stempelAnsor", "stempelAnsor");

    // Banser
    const bTtdKasat = document.getElementById("box-preview-ttd-kasatkorkel");
    if (bTtdKasat) bTtdKasat.innerHTML = getSignatureOrStampHTML("ttdKasatkorkel", "ttdKetua");

    const bTtdKasetma = document.getElementById("box-preview-ttd-kasetma");
    if (bTtdKasetma) bTtdKasetma.innerHTML = getSignatureOrStampHTML("ttdKasetma", "ttdKasetma");

    const bStempelBanser = document.getElementById("box-preview-stempel-banser");
    if (bStempelBanser) bStempelBanser.innerHTML = getSignatureOrStampHTML("stempelBanser", "stempelBanser");

    // MDS
    const bTtdMds = document.getElementById("box-preview-ttd-mds");
    if (bTtdMds) bTtdMds.innerHTML = getSignatureOrStampHTML("ttdMds", "ttdSekretaris");

    const bTtdSekMds = document.getElementById("box-preview-ttd-sekretaris-mds");
    if (bTtdSekMds) bTtdSekMds.innerHTML = getSignatureOrStampHTML("ttdSekretarisMds", "ttdSekretaris");

    const bStempelMds = document.getElementById("box-preview-stempel-mds");
    if (bStempelMds) bStempelMds.innerHTML = getSignatureOrStampHTML("stempelMds", "stempelRijalul");
  }

  // --- KOP SURAT LOGO SWITCHER ---
  const selectKopLogo = document.getElementById("select-kop-logo");
  function updateKopLogos() {
    const choice = selectKopLogo?.value || "ansor";
    const kiri = document.getElementById("preview-logo-kiri");
    const kanan = document.getElementById("preview-logo-kanan");

    if (!kiri || !kanan) return;
    kiri.innerHTML = getLogoHTML("ansor");

    if (choice === "ansor") {
      kanan.innerHTML = "";
    } else if (choice === "ansor-banser") {
      kanan.innerHTML = getLogoHTML("banser");
    } else if (choice === "ansor-rijalul") {
      kanan.innerHTML = getLogoHTML("rijalul");
    } else if (choice === "ansor-siber") {
      kanan.innerHTML = getLogoHTML("siber");
    }
  }
  if (selectKopLogo) selectKopLogo.addEventListener("change", updateKopLogos);

  // --- HALAMAN LOGIN PORTAL (ROLE SELECTOR DROPDOWN + PASSWORD) ---
  const modalLoginPortal = document.getElementById("modal-login-portal");

  function renderLoginRoleButtons() {
    // Populate Dropdown Username
    const selectEl = document.getElementById("login-username");
    if (!selectEl) return;
    
    // Simpan pilihan yang sedang terpilih bila ada
    const currentVal = selectEl.value;
    selectEl.innerHTML = `<option value="" disabled selected>-- Pilih Akun Pengurus --</option>`;

    state.usersList.forEach((u) => {
      const opt = document.createElement("option");
      opt.value = u.username;
      opt.textContent = `${u.role} — ${u.nama}`;
      opt.setAttribute("data-role", u.role);
      opt.setAttribute("data-nama", u.nama);
      opt.setAttribute("data-akses", u.akses || "");
      selectEl.appendChild(opt);
    });

    if (currentVal) {
      selectEl.value = currentVal;
    }

    // Trigger update info deskripsi role saat dropdown dipilih
    selectEl.onchange = () => {
      document.getElementById("login-error-msg")?.classList.add("hidden");
      const selectedOpt = selectEl.options[selectEl.selectedIndex];
      const descBox = document.getElementById("login-selected-role-desc");
      const roleText = document.getElementById("role-desc-text");
      const badgeText = document.getElementById("role-badge-text");

      if (selectedOpt && selectedOpt.value) {
        const role = selectedOpt.getAttribute("data-role");
        const nama = selectedOpt.getAttribute("data-nama");
        const akses = selectedOpt.getAttribute("data-akses");
        
        if (descBox) descBox.classList.remove("hidden");
        if (roleText) roleText.textContent = `${nama} (${akses || "Akses Pengurus"})`;
        if (badgeText) badgeText.textContent = role;
      } else {
        if (descBox) descBox.classList.add("hidden");
      }
    };

    // Bersihkan error saat mengetik PIN
    document.getElementById("login-pin")?.addEventListener("input", () => {
      document.getElementById("login-error-msg")?.classList.add("hidden");
    });
  }

  function applyLoginSession(user) {
    state.currentUser = user;
    AnsorStore.setCurrentUser(user);
    sessionStorage.setItem("sahabat_session_active", "true");
    updateHeaderUserBadge();
    modalLoginPortal.classList.add("hidden");
    switchToAppMode();
    addNotification("Sesi Masuk Berhasil", `Anda masuk sebagai ${user.role} (${user.nama}).`, "info");
    if (typeof renderKeuangan === "function") renderKeuangan();
  }

  function updateHeaderUserBadge() {
    const u = state.currentUser || state.usersList[0];
    const roleEl = document.getElementById("header-user-role");
    const namaEl = document.getElementById("header-user-nama");
    if (roleEl) roleEl.textContent = u.role;
    if (namaEl) namaEl.textContent = u.nama;

    const sRole = document.getElementById("sidebar-user-role");
    const sNama = document.getElementById("sidebar-user-nama");
    if (sRole) sRole.textContent = u.role;
    if (sNama) sNama.textContent = u.nama;
  }

  // Tombol buka login modal dari header & sidebar (Ganti Akun)
  document.getElementById("btn-buka-login")?.addEventListener("click", () => {
    openLoginModal();
  });
  document.getElementById("badge-active-user-container")?.addEventListener("click", () => {
    openLoginModal();
  });
  document.getElementById("sidebar-user-card")?.addEventListener("click", () => {
    openLoginModal();
    closeSidebar();
  });
  document.getElementById("sidebar-btn-login")?.addEventListener("click", () => {
    openLoginModal();
    closeSidebar();
  });
  document.getElementById("sidebar-btn-backup")?.addEventListener("click", () => {
    document.getElementById("modal-backup")?.classList.remove("hidden");
    closeSidebar();
  });

  // --- UPLOAD LOGO MODAL ---
  const modalUploadLogo = document.getElementById("modal-upload-logo");
  document.getElementById("sidebar-btn-upload-logo")?.addEventListener("click", () => {
    openUploadLogoModal();
    closeSidebar();
  });
  document.getElementById("btn-close-upload-logo")?.addEventListener("click", () => modalUploadLogo?.classList.add("hidden"));
  document.getElementById("btn-close-upload-logo-2")?.addEventListener("click", () => modalUploadLogo?.classList.add("hidden"));

  function openUploadLogoModal() {
    modalUploadLogo?.classList.remove("hidden");
    // Show current logos in preview boxes
    ["ansor", "banser", "rijalul", "siber"].forEach(type => {
      const prevEl = document.getElementById(`preview-upload-${type}`);
      if (prevEl) prevEl.innerHTML = getLogoHTML(type);
    });
  }

  // Handle file input for each logo type
  ["ansor", "banser", "rijalul", "siber"].forEach(type => {
    const inp = document.getElementById(`upload-logo-${type}`);
    if (!inp) return;
    inp.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file terlalu besar. Maksimal 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        AnsorStore.setCustomLogo(type, dataUrl);
        // Update preview
        const prevEl = document.getElementById(`preview-upload-${type}`);
        if (prevEl) prevEl.innerHTML = `<img src="${dataUrl}" alt="Logo ${type}" class="w-full h-full object-contain">`;
        // Re-render all logos
        renderAllLogos();
        addNotification("Logo Diperbarui", `Logo ${type} berhasil diubah.`, "success");
      };
      reader.readAsDataURL(file);
    });
  });

  // Reset semua logo ke SVG default
  document.getElementById("btn-reset-logo-semua")?.addEventListener("click", () => {
    if (!confirm("Reset semua logo ke tampilan SVG default Jatinom?")) return;
    ["ansor", "banser", "rijalul", "siber"].forEach(type => {
      AnsorStore.setCustomLogo(type, null);
      const prevEl = document.getElementById(`preview-upload-${type}`);
      if (prevEl) prevEl.innerHTML = getLogoHTML(type);
    });
    renderAllLogos();
    addNotification("Logo Direset", "Semua logo kembali ke SVG default.", "info");
  });

  // Mode Tamu Dinonaktifkan (Wajib Login Sandi/PIN Valid)

  // Toggle Password / PIN Visibility
  const btnTogglePin = document.getElementById("btn-toggle-pin-visibility");
  const inputPin = document.getElementById("login-pin");
  const iconPinEye = document.getElementById("icon-pin-eye");

  btnTogglePin?.addEventListener("click", () => {
    if (!inputPin) return;
    if (inputPin.type === "password") {
      inputPin.type = "text";
      if (iconPinEye) iconPinEye.className = "fa-solid fa-eye-slash mr-0.5";
      btnTogglePin.innerHTML = `<i class="fa-solid fa-eye-slash mr-0.5"></i> Sembunyikan`;
    } else {
      inputPin.type = "password";
      if (iconPinEye) iconPinEye.className = "fa-solid fa-eye mr-0.5";
      btnTogglePin.innerHTML = `<i class="fa-solid fa-eye mr-0.5"></i> Tampilkan`;
    }
  });

  // Form Login Manual Username Dropdown & Password / PIN — SECURE (no bypass, no alert)
  document.getElementById("form-login-manual")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const uname = document.getElementById("login-username")?.value.trim().toLowerCase() || "";
    const pin   = document.getElementById("login-pin")?.value.trim() || "";
    const errDiv  = document.getElementById("login-error-msg");
    const errText = document.getElementById("login-error-text");

    const showErr = (msg) => {
      if (errDiv)  errDiv.classList.remove("hidden");
      if (errText) errText.textContent = msg;
      document.getElementById("login-pin")?.focus();
    };
    const hideErr = () => errDiv?.classList.add("hidden");

    if (!uname) { showErr("Silakan pilih akun pengurus ranting terlebih dahulu!"); return; }
    if (!pin)   { showErr("Kata sandi / PIN wajib diisi!"); return; }

    const found = state.usersList.find((u) => u.username.toLowerCase() === uname && u.pin === pin);
    if (found) {
      hideErr();
      document.getElementById("login-pin").value = "";
      applyLoginSession(found);
    } else {
      showErr("❌ Kata sandi / PIN salah! Akses ditolak. Silakan coba lagi.");
      document.getElementById("login-pin").value = "";
    }
  });

  // --- INITIALIZE DATES ---
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const inputTglMasehi = document.getElementById("input-tgl-surat") || document.getElementById("input-tgl-masehi");
  const inputBulanRomawi = document.getElementById("input-bulan-romawi");
  const inputTahunSurat = document.getElementById("input-tahun-surat");
  const inputTglHijriyah = document.getElementById("input-tgl-hijriah") || document.getElementById("input-tgl-hijriyah");

  if (inputTglMasehi) {
    inputTglMasehi.value = todayStr;
    updateDatesAndNomorSurat();
  }

  // --- MOBILE SIDEBAR DRAWER CONTROLLER ---
  const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
  const btnCloseSidebar = document.getElementById("btn-close-sidebar");
  const sidebarBackdrop = document.getElementById("sidebar-backdrop");
  const appSidebar = document.getElementById("app-sidebar");

  function openSidebar() {
    appSidebar?.classList.add("sidebar-open");
    sidebarBackdrop?.classList.remove("hidden");
  }

  function closeSidebar() {
    appSidebar?.classList.remove("sidebar-open");
    sidebarBackdrop?.classList.add("hidden");
  }

  btnToggleSidebar?.addEventListener("click", openSidebar);
  btnCloseSidebar?.addEventListener("click", closeSidebar);
  sidebarBackdrop?.addEventListener("click", closeSidebar);

  // --- DESKTOP SIDEBAR TOGGLE (HIDE/SHOW) ---
  const btnDesktopToggle = document.getElementById("btn-desktop-toggle-sidebar");
  let sidebarHidden = localStorage.getItem("sahabat-sidebar-hidden") === "true";

  function applySidebarDesktopState() {
    if (sidebarHidden) {
      document.body.classList.add("sidebar-collapsed");
      btnDesktopToggle?.setAttribute("title", "Tampilkan Sidebar");
    } else {
      document.body.classList.remove("sidebar-collapsed");
      btnDesktopToggle?.setAttribute("title", "Sembunyikan Sidebar");
    }
  }
  applySidebarDesktopState();

  btnDesktopToggle?.addEventListener("click", () => {
    sidebarHidden = !sidebarHidden;
    localStorage.setItem("sahabat-sidebar-hidden", sidebarHidden);
    applySidebarDesktopState();
  });

  // --- TAB SWITCHER (6 TABS TERSTRUKTUR & SIDEBAR HARMONIZED) ---
  const TAB_TITLES = {
    "tab-dashboard": "Dashboard Ranting",
    "tab-warta": "1. Warta Ansor",
    "tab-surat": "2. E-Surat",
    "tab-kader": "3. E-Kader",
    "tab-agenda": "4. Agenda",
    "tab-keuangan": "Keuangan Ranting",
    "tab-lpj": "Laporan LPJ",
    "tab-profil": "5. Profil Ranting",
    "tab-pengaturan": "6. Pengaturan"
  };

  // Click handler untuk Nav Buttons (Top / Legacy)
  const navButtons = document.querySelectorAll(".nav-tab-btn");
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      switchTab(targetTab);
    });
  });

  // Click handler untuk Sidebar Nav Items
  const sidebarNavItems = document.querySelectorAll("#sidebar-nav .sidebar-nav-item");
  sidebarNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetTab = item.getAttribute("data-tab");
      switchTab(targetTab);
      closeSidebar();
    });
  });

  function switchTab(tabId) {
    state.activeTab = tabId;

    // Update Judul Halaman di Top Header
    const pageTitleEl = document.getElementById("page-active-title");
    if (pageTitleEl) pageTitleEl.textContent = TAB_TITLES[tabId] || "SAHABAT Jatinom";

    // Update Active State di Sidebar
    document.querySelectorAll("#sidebar-nav .sidebar-nav-item").forEach((item) => {
      if (item.getAttribute("data-tab") === tabId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update Active State di Top Tab (jika ada)
    navButtons.forEach((btn) => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("active");
        btn.classList.remove("text-emerald-100");
      } else {
        btn.classList.remove("active");
        btn.classList.add("text-emerald-100");
      }
    });

    // Tampilkan Panel Tab yang Sesuai
    document.querySelectorAll(".tab-pane").forEach((pane) => {
      if (pane.id === tabId) {
        pane.classList.remove("hidden");
      } else {
        pane.classList.add("hidden");
      }
    });

    // Render Konten Tab yang Dipilih
    if (tabId === "tab-dashboard") {
      renderDashboard();
    } else if (tabId === "tab-warta") {
      renderBeritaGrid();
    } else if (tabId === "tab-surat") {
      renderArsipTable();
    } else if (tabId === "tab-kader") {
      renderKaderTable();
      updateKaderStats();
    } else if (tabId === "tab-agenda") {
      renderAgendaCards();
    } else if (tabId === "tab-keuangan") {
      renderKeuangan();
    } else if (tabId === "tab-lpj") {
      renderLpjDocument();
    } else if (tabId === "tab-profil") {
      renderProfilDetails();
      renderPengurusTable();
      renderAllLogos();
    } else if (tabId === "tab-pengaturan") {
      renderUserCards();
    }
  }

  // Global helper untuk tombol akses cepat di Dashboard
  window.switchTabPublic = function(tabId) { switchTab(tabId); };

  // --- DASHBOARD RENDER ---
  function renderDashboard() {
    const kaderList = AnsorStore.getKader();
    const agendaList = AnsorStore.getAgenda();
    const beritaList = AnsorStore.getBerita();

    // Stat Numbers
    const totalAnsor = kaderList.filter(k => k.lembaga !== "Banser").length;
    const totalBanser = kaderList.filter(k => k.lembaga === "Banser").length;
    const totalAgenda = agendaList.filter(a => a.status === "Aktif" || !a.status).length;
    const totalWarta = beritaList.length;

    const el = id => document.getElementById(id);
    if (el("dash-total-ansor")) el("dash-total-ansor").textContent = totalAnsor;
    if (el("dash-total-banser")) el("dash-total-banser").textContent = totalBanser;
    if (el("dash-total-agenda")) el("dash-total-agenda").textContent = totalAgenda;
    if (el("dash-total-warta")) el("dash-total-warta").textContent = totalWarta;

    // Greeting & user info
    const u = state.currentUser || state.usersList[0];
    const hour = new Date().getHours();
    const greet = hour < 11 ? "Selamat Pagi" : hour < 15 ? "Selamat Siang" : hour < 18 ? "Selamat Sore" : "Selamat Malam";
    if (el("dash-greeting")) el("dash-greeting").textContent = `${greet}, Sahabat ${u?.nama || "Pengurus"}! 👋`;

    // DateTime
    if (el("dash-datetime")) {
      const now = new Date();
      el("dash-datetime").textContent = now.toLocaleDateString("id-ID", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      }) + " — " + now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    }

    // Dashboard Logo
    const dashLogo = el("dash-logo-container");
    if (dashLogo) dashLogo.innerHTML = getLogoHTML("sahabat");

    // Warta Terbaru (3 terakhir)
    const wartaEl = el("dash-warta-list");
    if (wartaEl) {
      const latest = [...beritaList].reverse().slice(0, 4);
      if (latest.length === 0) {
        wartaEl.innerHTML = `<p class="text-slate-400 italic text-xs">Belum ada warta diterbitkan.</p>`;
      } else {
        wartaEl.innerHTML = latest.map(b => `
          <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition cursor-pointer border border-slate-100" onclick="switchTabPublic('tab-warta')">
            <div class="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <i class="fa-solid fa-newspaper text-ansor text-sm"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-bold text-slate-800 text-xs truncate">${b.judul}</p>
              <p class="text-slate-500 text-[11px] mt-0.5 truncate">${b.ringkasan || b.isi?.substring(0, 60) || ""}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[10px] bg-emerald-100 text-ansor-dark px-1.5 py-0.5 rounded-full font-semibold">${b.kategori || "Ansor"}</span>
                <span class="text-[10px] text-slate-400">${b.tanggal || ""}</span>
              </div>
            </div>
          </div>
        `).join("");
      }
    }

    // Agenda Terdekat (3 teratas)
    const agendaEl = el("dash-agenda-list");
    if (agendaEl) {
      const upcoming = agendaList.slice(0, 3);
      if (upcoming.length === 0) {
        agendaEl.innerHTML = `<p class="text-slate-400 italic text-xs">Belum ada agenda terjadwal.</p>`;
      } else {
        agendaEl.innerHTML = upcoming.map(a => `
          <div class="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
            <div class="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <i class="fa-solid fa-calendar-check text-gold text-xs"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-slate-800 truncate">${a.judul || a.nama}</p>
              <p class="text-[10px] text-slate-500">${a.tanggal || ""} ${a.tempat ? "• " + a.tempat : ""}</p>
            </div>
          </div>
        `).join("");
      }
    }
  }

  // --- TAB 1: WARTA ANSOR (CRUD: DAPAT DITAMBAH & DI-UPDATE SETIAP SAAT) ---
  const containerFormBerita = document.getElementById("container-form-berita");
  const formBerita = document.getElementById("form-berita");

  document.getElementById("btn-buka-form-berita")?.addEventListener("click", () => {
    resetFormBerita();
    containerFormBerita?.classList.remove("hidden");
    document.getElementById("berita-tanggal").value = todayStr;
    containerFormBerita?.scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("btn-tutup-form-berita")?.addEventListener("click", () => containerFormBerita?.classList.add("hidden"));
  document.getElementById("btn-batal-berita")?.addEventListener("click", () => {
    resetFormBerita();
    containerFormBerita?.classList.add("hidden");
  });

  function resetFormBerita() {
    formBerita.reset();
    document.getElementById("berita-id").value = "";
    document.getElementById("form-berita-title").textContent = "Formulir Tulis Warta Ranting Baru";
    document.getElementById("btn-submit-berita").innerHTML = `<i class="fa-solid fa-paper-plane text-gold"></i> Publikasikan Warta`;
  }

  if (formBerita) {
    formBerita.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("berita-id").value;
      const judul = document.getElementById("berita-judul").value.trim();
      const kategori = document.getElementById("berita-kategori").value;
      const tanggal = document.getElementById("berita-tanggal").value;
      const penulis = document.getElementById("berita-penulis").value.trim();
      const ringkasan = document.getElementById("berita-ringkasan").value.trim();
      const isi = document.getElementById("berita-isi").value.trim();
      let gambar = document.getElementById("berita-gambar").value.trim();

      if (!gambar) {
        gambar = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80";
      }

      if (id) {
        // Mode Update / Edit
        const idx = state.beritaList.findIndex((b) => b.id === id);
        if (idx !== -1) {
          state.beritaList[idx] = {
            ...state.beritaList[idx],
            judul, kategori, tanggal, penulis, ringkasan, isi, gambar
          };
          addNotification("Warta Diperbarui", `Warta "${judul}" berhasil diupdate.`, "warta");
          alert("Warta Ansor berhasil diperbarui!");
        }
      } else {
        // Mode Tambah Baru
        const baru = {
          id: "NWS-" + Date.now().toString().slice(-4),
          judul, kategori, tanggal, penulis, ringkasan, isi, gambar
        };
        state.beritaList.unshift(baru);
        addNotification("Warta Baru Ranting", judul, "warta");
        alert("Warta Ansor baru berhasil dipublikasikan!");
      }

      AnsorStore.saveBerita(state.beritaList);
      renderBeritaGrid();
      if (typeof renderLandingWarta === "function") renderLandingWarta();
      if (typeof renderLandingStats === "function") renderLandingStats();
      resetFormBerita();
      containerFormBerita?.classList.add("hidden");
    });
  }

  function editBerita(id) {
    const b = state.beritaList.find((x) => x.id === id);
    if (!b) return;

    document.getElementById("berita-id").value = b.id;
    document.getElementById("berita-judul").value = b.judul;
    document.getElementById("berita-kategori").value = b.kategori;
    document.getElementById("berita-tanggal").value = b.tanggal;
    document.getElementById("berita-penulis").value = b.penulis;
    document.getElementById("berita-ringkasan").value = b.ringkasan;
    document.getElementById("berita-isi").value = b.isi || b.ringkasan;
    document.getElementById("berita-gambar").value = b.gambar.startsWith("http") ? b.gambar : "";

    document.getElementById("form-berita-title").textContent = "Edit Warta: " + b.judul;
    document.getElementById("btn-submit-berita").innerHTML = `<i class="fa-solid fa-check"></i> Simpan Perubahan Warta`;

    containerFormBerita?.classList.remove("hidden");
    containerFormBerita?.scrollIntoView({ behavior: "smooth" });
  }

  let filterBeritaKategori = "semua";
  document.querySelectorAll(".btn-filter-berita").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-filter-berita").forEach((b) => {
        b.classList.remove("active", "bg-emerald-100", "text-ansor-dark", "border", "border-emerald-200", "font-bold");
        b.classList.add("bg-slate-100", "text-slate-700", "font-medium");
      });
      btn.classList.add("active", "bg-emerald-100", "text-ansor-dark", "border", "border-emerald-200", "font-bold");
      btn.classList.remove("bg-slate-100", "text-slate-700");
      filterBeritaKategori = btn.getAttribute("data-cat");
      renderBeritaGrid();
    });
  });

  document.getElementById("search-berita")?.addEventListener("input", renderBeritaGrid);

  function renderBeritaGrid() {
    const container = document.getElementById("container-berita-grid");
    if (!container) return;
    container.innerHTML = "";

    const searchVal = document.getElementById("search-berita")?.value.toLowerCase().trim() || "";

    const filtered = state.beritaList.filter((b) => {
      const matchCat = filterBeritaKategori === "semua" || b.kategori === filterBeritaKategori;
      const matchSearch = b.judul.toLowerCase().includes(searchVal) || b.ringkasan.toLowerCase().includes(searchVal);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="col-span-full py-8 text-center text-slate-400 italic">Belum ada warta informasi pada kategori ini.</div>`;
      return;
    }

    filtered.forEach((b) => {
      let badgeClass = "bg-emerald-100 text-emerald-800";
      if (b.kategori === "Banser") badgeClass = "bg-red-100 text-red-800";
      if (b.kategori === "Rijalul Ansor") badgeClass = "bg-blue-100 text-blue-800";

      const card = document.createElement("div");
      card.className = "bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-md transition group";
      card.innerHTML = `
        <div>
          <div class="h-44 bg-slate-200 relative overflow-hidden">
            <img src="${b.gambar}" alt="${b.judul}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80'">
            <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${badgeClass} shadow-sm backdrop-blur-md">
              ${b.kategori}
            </span>
          </div>

          <div class="p-4 space-y-2">
            <div class="flex items-center gap-2 text-[11px] text-slate-400">
              <span><i class="fa-regular fa-calendar-days mr-1"></i>${b.tanggal}</span>
              <span>&bull;</span>
              <span><i class="fa-solid fa-pen-nib mr-1"></i>${b.penulis}</span>
            </div>

            <h4 class="font-bold text-slate-800 text-sm leading-snug line-clamp-2">${b.judul}</h4>
            <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">${b.ringkasan}</p>
          </div>
        </div>

        <div class="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
          <button data-id="${b.id}" class="btn-baca-berita text-xs font-bold text-ansor hover:text-ansor-dark flex items-center gap-1">
            <span>Baca Selengkapnya</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
          
          <div class="flex items-center gap-1.5">
            <button data-id="${b.id}" class="btn-edit-berita px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-semibold" title="Edit Warta">
              <i class="fa-solid fa-pen text-[10px]"></i>
            </button>
            <button data-id="${b.id}" class="btn-hapus-berita px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold" title="Hapus Warta">
              <i class="fa-solid fa-trash-can text-[10px]"></i>
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".btn-baca-berita").forEach((btn) => {
      btn.addEventListener("click", () => openBacaBerita(btn.getAttribute("data-id")));
    });

    document.querySelectorAll(".btn-edit-berita").forEach((btn) => {
      btn.addEventListener("click", () => editBerita(btn.getAttribute("data-id")));
    });

    document.querySelectorAll(".btn-hapus-berita").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Hapus artikel warta ini?")) {
          state.beritaList = state.beritaList.filter((x) => x.id !== id);
          AnsorStore.saveBerita(state.beritaList);
          renderBeritaGrid();
          if (typeof renderLandingWarta === "function") renderLandingWarta();
          if (typeof renderLandingStats === "function") renderLandingStats();
        }
      });
    });
  }

  const modalBacaBerita = document.getElementById("modal-baca-berita");
  function openBacaBerita(id) {
    const b = state.beritaList.find((x) => x.id === id);
    if (!b) return;
    state.currentReadingBerita = b;

    const imgEl = document.getElementById("baca-berita-gambar") || document.getElementById("detail-berita-img");
    const imgContainer = document.getElementById("baca-berita-gambar-container");
    if (imgEl) {
      imgEl.src = b.gambar || "";
      if (imgContainer) {
        if (b.gambar) imgContainer.classList.remove("hidden");
        else imgContainer.classList.add("hidden");
      }
    }

    const badgeEl = document.getElementById("baca-berita-kategori") || document.getElementById("detail-berita-badge");
    if (badgeEl) badgeEl.textContent = b.kategori || "Warta";

    const judulEl = document.getElementById("baca-berita-judul") || document.getElementById("detail-berita-judul");
    if (judulEl) judulEl.textContent = b.judul || "";

    const tglEl = document.getElementById("baca-berita-tanggal") || document.getElementById("detail-berita-tanggal");
    if (tglEl) tglEl.innerHTML = `<i class="fa-regular fa-calendar-days text-gold mr-1"></i> ${b.tanggal || ""}`;

    const penulisEl = document.getElementById("baca-berita-penulis") || document.getElementById("detail-berita-penulis");
    if (penulisEl) penulisEl.innerHTML = `<i class="fa-solid fa-user-pen text-ansor mr-1"></i> ${b.penulis || "Admin"}`;

    const isiEl = document.getElementById("baca-berita-isi") || document.getElementById("detail-berita-isi");
    if (isiEl) isiEl.textContent = b.isi || b.ringkasan || "";

    modalBacaBerita?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  window.openBacaBerita = openBacaBerita;

  function closeBacaBerita() {
    modalBacaBerita?.classList.add("hidden");
    document.body.style.overflow = "";
  }

  document.getElementById("btn-close-baca-berita")?.addEventListener("click", closeBacaBerita);
  document.getElementById("btn-tutup-baca-berita-bottom")?.addEventListener("click", closeBacaBerita);
  document.getElementById("btn-tutup-baca-berita")?.addEventListener("click", closeBacaBerita);

  document.getElementById("btn-share-berita-wa")?.addEventListener("click", () => {
    if (!state.currentReadingBerita) return;
    const b = state.currentReadingBerita;
    const msg = `*WARTA RESMI GP ANSOR RANTING JATINOM*\n\n*${b.judul}*\n_${b.tanggal} | Oleh: ${b.penulis}_\n\n${b.ringkasan}\n\nSelengkapnya dapat disimak pada portal resmi SAHABAT Jatinom (Kec. Kanigoro, Kab. Blitar).\n\n_Wallahul Muwaffiq Ila Aqwamith Thorieq_`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, "_blank");
  });

  // --- TAB 2: PERSURATAN (E-SURAT) ---
  function updateDatesAndNomorSurat() {
    const val = inputTglMasehi?.value ? new Date(inputTglMasehi.value) : new Date();
    const monthIdx = val.getMonth();
    const year = val.getFullYear();
    const roman = ROMAN_MONTHS[monthIdx] || "XI";

    if (inputBulanRomawi) inputBulanRomawi.value = roman;
    if (inputTahunSurat) inputTahunSurat.value = year;
    if (inputTglHijriyah && !inputTglHijriyah.dataset.userEdited) {
      inputTglHijriyah.value = getHijriDate(val);
    }
    refreshNomorSuratDisplay();
  }

  if (inputTglMasehi) inputTglMasehi.addEventListener("change", updateDatesAndNomorSurat);

  function getGeneratedNomorSurat() {
    const noUrut = document.getElementById("input-no-urut")?.value.trim() || "001";
    const jenisSurat = state.currentTemplate || "SU";
    const bulanRomawi = document.getElementById("input-bulan-romawi")?.value || "XI";
    const tahun = document.getElementById("input-tahun-surat")?.value || "2026";
    const isBanser = state.activeSubSurat === "banser";

    if (isBanser) {
      // Format Banser: No/SKK-(JenisSurat)/Bulan(Romawi)/Tahun
      return `${noUrut}/SKK-${jenisSurat}/${bulanRomawi}/${tahun}`;
    } else {
      // Format Ansor: No/PR-XII-11-07-02/JenisSurat-Sifat/Bulan/Tahun
      const kodeWilayah = document.getElementById("input-kode-wilayah")?.value.trim() || "PR-XII-11-07-02";
      const sifatSurat = document.getElementById("input-sifat-surat")?.value || "01";
      return `${noUrut}/${kodeWilayah}/${jenisSurat}-${sifatSurat}/${bulanRomawi}/${tahun}`;
    }
  }

  function refreshNomorSuratDisplay() {
    const nomor = getGeneratedNomorSurat();
    const display = document.getElementById("display-nomor-surat");
    if (display) display.textContent = nomor;
  }

  // --- SUB-MENU E-SURAT: ANSOR VS BANSER ---
  state.activeSubSurat = "ansor";

  function setSubSurat(subType) {
    state.activeSubSurat = subType;
    const btnAnsor = document.getElementById("subtab-surat-ansor");
    const btnBanser = document.getElementById("subtab-surat-banser");
    const sBtnAnsor = document.getElementById("sidebar-btn-surat-ansor");
    const sBtnBanser = document.getElementById("sidebar-btn-surat-banser");

    const bannerTitle = document.getElementById("surat-banner-title");
    const bannerFormat = document.getElementById("surat-banner-format");
    const bannerIcon = document.getElementById("surat-banner-icon");
    const tplLabel = document.getElementById("template-selector-label");
    const kodeWilInput = document.getElementById("input-kode-wilayah");
    const kopLembagaSelect = document.getElementById("setting-kop-lembaga");

    const labelPihak1 = document.getElementById("label-penandatangan-pihak1");
    const labelPihak2 = document.getElementById("label-penandatangan-pihak2");
    const ttd1Nama = document.getElementById("setting-ttd1-nama");
    const ttd1Jab = document.getElementById("setting-ttd1-jabatan");
    const ttd1Nia = document.getElementById("setting-ttd1-nia");
    const ttd2Nama = document.getElementById("setting-ttd2-nama");
    const ttd2Jab = document.getElementById("setting-ttd2-jabatan");
    const ttd2Nia = document.getElementById("setting-ttd2-nia");

    if (subType === "banser") {
      // Styling Subtabs
      if (btnAnsor) {
        btnAnsor.className = "subtab-surat-btn flex-1 w-full sm:w-auto py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition border border-slate-200 bg-white hover:bg-slate-50 text-slate-600";
      }
      if (btnBanser) {
        btnBanser.className = "subtab-surat-btn active flex-1 w-full sm:w-auto py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition border-2 border-red-700 bg-red-50 text-red-800 shadow-xs";
      }
      // Sidebar Submenu
      if (sBtnAnsor) sBtnAnsor.className = "w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between text-slate-300 hover:text-white hover:bg-emerald-800/40 transition";
      if (sBtnBanser) sBtnBanser.className = "w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between text-white bg-red-900/70 border border-red-600/40 transition";

      // Form & Banner Setup Banser
      if (bannerTitle) bannerTitle.textContent = "Generator Surat Resmi Satuan Koordinasi Kelompok (SATKORKEL) BANSER Desa Jatinom";
      if (bannerFormat) bannerFormat.textContent = "[No]/SKK-XII-11-07-02/[Jenis]-[Sifat]/[Bulan]/[Tahun]";
      if (bannerIcon) bannerIcon.className = "fa-solid fa-shield-halved text-red-600";
      if (tplLabel) tplLabel.textContent = "1. Pilih Jenis Surat Resmi Satkorkel BANSER (12 Kode Satuan):";
      if (kodeWilInput) kodeWilInput.value = "SKK-XII-11-07-02";
      if (kopLembagaSelect) kopLembagaSelect.value = "banser";

      // Penandatangan Banser (Kasatkorkel di kiri, Kasetma di kanan)
      if (labelPihak1) labelPihak1.textContent = "Pihak 1 (Kiri - Kasatkorkel):";
      if (ttd1Nama) ttd1Nama.value = state.settings.kasatkorkelNama || "SUBHAN MUBAROK";
      if (ttd1Jab) ttd1Jab.value = "Kepala Satkorkel (Kasatkorkel)";
      if (ttd1Nia) ttd1Nia.value = "NIA: " + (state.settings.kasatkorkelNia || "11.07.02.003");

      if (labelPihak2) labelPihak2.textContent = "Pihak 2 (Kanan - Kasetma):";
      if (ttd2Nama) ttd2Nama.value = state.settings.kasetmaNama || "BAMBANG TRI SUTRISNO";
      if (ttd2Jab) ttd2Jab.value = "Kepala Sekretariat Markas (Kasetma)";
      if (ttd2Nia) ttd2Nia.value = "NIA: " + (state.settings.kasetmaNia || "11.07.02.005");

      renderTemplateButtons();
      applyTemplate("SPH"); // Default Banser: SPH

      // --- KOP Banser ---
      // Sembunyikan Sifat Surat (tidak dipakai Banser)
      const sifatContainer = document.getElementById("container-sifat-surat");
      if (sifatContainer) sifatContainer.classList.add("hidden");
      // Update banner format yang benar
      if (bannerFormat) bannerFormat.textContent = "[No]/SKK-[JenisSurat]/[Bulan(Romawi)]/[Tahun]";
      // Toggle class banser-mode pada teks KOP
      const kopTeksEl = document.getElementById("print-kop-teks");
      if (kopTeksEl) { kopTeksEl.classList.add("banser-mode"); kopTeksEl.classList.remove("text-right"); }
      const kopContainerEl = document.getElementById("print-kop-container");
      if (kopContainerEl) kopContainerEl.classList.add("banser-mode");
      // Logo Perisai di kanan (ukuran disamakan logo banser kiri)
      const logoKananEl = document.getElementById("print-kop-logo-right");
      if (logoKananEl) {
        logoKananEl.classList.remove("hidden");
        logoKananEl.innerHTML = `<div class="kop-logo"><img src="img/logo-perisai-banser.png" alt="Logo Perisai Banser" class="w-full h-full object-contain" /></div><div class="kop-kode-wilayah text-[11px] font-bold text-transparent tracking-wider text-center mt-1 select-none">&nbsp;</div>`;
      }
      // Tampilkan garis divider Banser
      const dividerEl = document.getElementById("print-kop-divider");
      if (dividerEl) dividerEl.classList.remove("hidden");
    } else {
      // Styling Subtabs
      if (btnAnsor) {
        btnAnsor.className = "subtab-surat-btn active flex-1 w-full sm:w-auto py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition border-2 border-ansor bg-emerald-50 text-ansor shadow-xs";
      }
      if (btnBanser) {
        btnBanser.className = "subtab-surat-btn flex-1 w-full sm:w-auto py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition border border-slate-200 bg-white hover:bg-slate-50 text-slate-600";
      }
      // Sidebar Submenu
      if (sBtnAnsor) sBtnAnsor.className = "w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between text-white bg-emerald-800/70 border border-emerald-600/40 transition";
      if (sBtnBanser) sBtnBanser.className = "w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between text-slate-300 hover:text-white hover:bg-red-900/40 transition";

      // Form & Banner Setup Ansor
      if (bannerTitle) bannerTitle.textContent = "Generator Surat Resmi GP Ansor Ranting Jatinom";
      if (bannerFormat) bannerFormat.textContent = "[No]/PR-XII-11-07-02/[Jenis]-[Sifat]/[Bulan]/[Tahun]";
      if (bannerIcon) bannerIcon.className = "fa-solid fa-file-pen text-ansor";
      if (tplLabel) tplLabel.textContent = "1. Pilih Jenis Surat Resmi (9 Kode Peraturan Organisasi GP Ansor):";
      if (kodeWilInput) kodeWilInput.value = "PR-XII-11-07-02";
      if (kopLembagaSelect) kopLembagaSelect.value = "ansor";

      // Penandatangan Ansor (Ketua di kiri, Sekretaris di kanan)
      if (labelPihak1) labelPihak1.textContent = "Pihak 1 (Kiri - Ketua):";
      if (ttd1Nama) ttd1Nama.value = state.settings.ketuaNama || "MUHAMMAD ZAINAL ARIFIN";
      if (ttd1Jab) ttd1Jab.value = "Ketua Pimpinan Ranting";
      if (ttd1Nia) ttd1Nia.value = "NIA: " + (state.settings.ketuaNia || "11.07.02.001");

      if (labelPihak2) labelPihak2.textContent = "Pihak 2 (Kanan - Sekretaris):";
      if (ttd2Nama) ttd2Nama.value = state.settings.sekretarisNama || "AHMAD NUR SHOLIHIN";
      if (ttd2Jab) ttd2Jab.value = "Sekretaris";
      if (ttd2Nia) ttd2Nia.value = "NIA: " + (state.settings.sekretarisNia || "11.07.02.002");

      renderTemplateButtons();
      applyTemplate("SU"); // Default Ansor: SU

      // --- KOP Ansor: kembalikan ke default ---
      const sifatContainer = document.getElementById("container-sifat-surat");
      if (sifatContainer) sifatContainer.classList.remove("hidden");
      const kopTeksEl = document.getElementById("print-kop-teks");
      if (kopTeksEl) { kopTeksEl.classList.remove("banser-mode"); kopTeksEl.classList.add("text-right"); }
      const kopContainerEl = document.getElementById("print-kop-container");
      if (kopContainerEl) kopContainerEl.classList.remove("banser-mode");
      const logoKananEl = document.getElementById("print-kop-logo-right");
      if (logoKananEl) { logoKananEl.classList.add("hidden"); logoKananEl.innerHTML = ""; }
      const dividerEl = document.getElementById("print-kop-divider");
      if (dividerEl) dividerEl.classList.add("hidden");
    }

    refreshNomorSuratDisplay();
  }

  function renderTemplateButtons() {
    const container = document.getElementById("template-selector-container");
    if (!container) return;
    container.innerHTML = "";

    const isBanser = state.activeSubSurat === "banser";
    const templates = isBanser ? [
      { code: "SPH", label: "Perintah Harian", badge: "Utama" },
      { code: "ST",  label: "Surat Tugas", badge: "Utama" },
      { code: "SU",  label: "Undangan", badge: "Utama" },
      { code: "SPR", label: "Perintah", badge: "Ops" },
      { code: "SE",  label: "Edaran", badge: "Biro" },
      { code: "SP",  label: "Peringatan", badge: "Disiplin" },
      { code: "SKA", label: "Ket. Aktif", badge: "Anggota" },
      { code: "Not", label: "Notulensi", badge: "Rapat" },
      { code: "SPN", label: "Pengantar", badge: "Satkorcab" },
      { code: "STF", label: "Fasilitator", badge: "Pelatih" },
      { code: "BA",  label: "Berita Acara", badge: "Pam" },
      { code: "SPRI", label: "Rekom. Izin", badge: "Jalur" }
    ] : [
      { code: "SU",  label: "Undangan" },
      { code: "SR",  label: "Rutin" },
      { code: "SK",  label: "Keputusan" },
      { code: "SM",  label: "Mandat" },
      { code: "ST",  label: "Tugas" },
      { code: "SI",  label: "Instruksi" },
      { code: "SE",  label: "Edaran" },
      { code: "Not", label: "Notulensi" },
      { code: "SRU", label: "Rekomendasi" }
    ];

    templates.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-tpl", item.code);
      btn.className = `tpl-btn px-2.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex flex-col items-center justify-center transition shadow-2xs relative`;
      
      const badgeHTML = item.badge ? `<span class="text-[8px] bg-red-100 text-red-700 px-1 rounded absolute -top-1 -right-1 font-mono">${item.badge}</span>` : "";
      btn.innerHTML = `
        ${badgeHTML}
        <span class="text-sm font-extrabold ${isBanser ? 'text-red-700' : 'text-emerald-800'}">${item.code}</span>
        <span class="text-[10px] font-medium truncate w-full text-center">${item.label}</span>
      `;

      btn.addEventListener("click", () => {
        applyTemplate(item.code);
      });

      container.appendChild(btn);
    });
  }

  function applyTemplate(tplCode) {
    state.currentTemplate = tplCode;
    const isBanser = state.activeSubSurat === "banser";
    const activeMap = isBanser ? (window.TEMPLATES_BANSER_MAP || TEMPLATES_BANSER_MAP) : (window.TEMPLATES_MAP || TEMPLATES_MAP);
    const tpl = activeMap[tplCode] || (window.TEMPLATES_BANSER_MAP && window.TEMPLATES_BANSER_MAP[tplCode]) || (window.TEMPLATES_MAP && window.TEMPLATES_MAP[tplCode]);
    if (!tpl) return;

    // Highlight button aktif
    const container = document.getElementById("template-selector-container");
    if (container) {
      container.querySelectorAll(".tpl-btn").forEach((b) => {
        if (b.getAttribute("data-tpl") === tplCode) {
          const activeBorder = isBanser ? "border-red-700" : "border-ansor";
          const activeBg = isBanser ? "bg-red-50" : "bg-emerald-50";
          const activeText = isBanser ? "text-red-800" : "text-ansor";
          b.className = `tpl-btn active px-2.5 py-2 rounded-xl border-2 ${activeBorder} ${activeBg} ${activeText} font-bold text-xs flex flex-col items-center justify-center transition shadow-sm relative`;
        } else {
          b.className = `tpl-btn px-2.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex flex-col items-center justify-center transition shadow-2xs relative`;
        }
      });
    }

    const inputPerihal = document.getElementById("input-perihal");
    if (inputPerihal) inputPerihal.value = tpl.defaultPerihal;

    refreshNomorSuratDisplay();
    renderDynamicFields(tplCode);
    renderEditorBody();
  }

  // Event Listener Sub Menu Switchers
  document.getElementById("subtab-surat-ansor")?.addEventListener("click", () => setSubSurat("ansor"));
  document.getElementById("subtab-surat-banser")?.addEventListener("click", () => setSubSurat("banser"));
  document.getElementById("sidebar-btn-surat-ansor")?.addEventListener("click", () => {
    switchTab("tab-surat");
    setSubSurat("ansor");
    closeSidebar();
  });
  document.getElementById("sidebar-btn-surat-banser")?.addEventListener("click", () => {
    switchTab("tab-surat");
    setSubSurat("banser");
    closeSidebar();
  });

  function renderDynamicFields(tplCode) {
    const container = document.getElementById("dynamic-inputs");
    if (!container) return;
    container.innerHTML = "";

    let fields = [];
    if (tplCode === "SU" || tplCode === "SR") {
      fields = [
        { id: "dyn-hari-tgl", label: "Hari & Tanggal Pelaksanaan", placeholder: "Sabtu Malam Ahad Pon, 14 November 2026", default: "Sabtu Malam Ahad Pon, 14 November 2026" },
        { id: "dyn-waktu", label: "Waktu Kegiatan", placeholder: "19.30 WIB (Ba'da Isya) s.d Selesai", default: "19.30 WIB (Ba'da Isya) s.d Selesai" },
        { id: "dyn-tempat", label: "Tempat / Lokasi", placeholder: "Musholla Baitur Muttaqin RT 02 / RW 01 Krajan", default: "Musholla Baitur Muttaqin RT 02 / RW 01 Krajan" },
        { id: "dyn-acara", label: "Rangkaian Acara", placeholder: "Pembacaan Maulid Diba', Yasin Tahlil, & Pleno", default: "Pembacaan Maulid Diba', Yasin Tahlil, & Pleno" }
      ];
    } else if (tplCode === "SPH") {
      fields = [
        { id: "dyn-acara", label: "Nama Kegiatan / Acara", placeholder: "Apel Kesetiaan Personel, Refreshing PBB, dan Koordinasi Pengamanan", default: "Apel Kesetiaan Personel, Refreshing PBB, dan Koordinasi Pengamanan" },
        { id: "dyn-korlap", label: "Korlap (Koordinator Lapangan)", placeholder: "Subhan Mubarok (Kasatkorkel BANSER Jatinom)", default: "Subhan Mubarok (Kasatkorkel BANSER Jatinom)" },
        { id: "dyn-hari-tgl", label: "Hari & Tanggal", placeholder: "Jum'at Kliwon, 20 November 2026", default: "Jum'at Kliwon, 20 November 2026" },
        { id: "dyn-waktu", label: "Pukul / Waktu", placeholder: "19.30 WIB (Ba'da Isya) s.d Selesai", default: "19.30 WIB (Ba'da Isya) s.d Selesai" },
        { id: "dyn-tempat", label: "Tempat / Lokasi", placeholder: "Markas Satkorkel BANSER Jatinom / Balai Desa Jatinom", default: "Markas Satkorkel BANSER Jatinom / Balai Desa Jatinom" }
      ];
    } else if (tplCode === "SK") {
      fields = [
        { id: "dyn-tentang", label: "Tentang Surat Keputusan", placeholder: "PENGESAHAN SUSUNAN PANITIA HARLAH", default: "PENGESAHAN SUSUNAN PANITIA HARLAH GP ANSOR RANTING JATINOM" },
        { id: "dyn-tgl-rapat", label: "Tanggal Keputusan Rapat Harian", placeholder: "01 November 2026", default: "01 November 2026" }
      ];
    } else if (tplCode === "SM") {
      fields = [
        { id: "dyn-nama-penerima", label: "Nama Penerima Mandat", placeholder: "Sahabat Ahmad Nur Sholihin", default: "Sahabat Ahmad Nur Sholihin" },
        { id: "dyn-jabatan-penerima", label: "Jabatan Penerima", placeholder: "Sekretaris PR GP Ansor Jatinom", default: "Sekretaris PR GP Ansor Jatinom" },
        { id: "dyn-kegiatan", label: "Nama Kegiatan / Mandat", placeholder: "Konferensi Anak Cabang GP Ansor Kanigoro", default: "Konferensi Anak Cabang GP Ansor Kanigoro" },
        { id: "dyn-tempat", label: "Tempat Kegiatan", placeholder: "Gedung MWC NU Kanigoro", default: "Gedung MWC NU Kanigoro" }
      ];
    } else if (tplCode === "ST") {
      fields = [
        { id: "dyn-keperluan", label: "Keperluan Tugas Banser/Kader", placeholder: "Pengamanan Pengajian Akbar Maulid Nabi", default: "Pengamanan Pengajian Akbar Maulid Nabi" },
        { id: "dyn-waktu", label: "Waktu Tugas", placeholder: "Ahad Malam Senin, 18.30 WIB - Selesai", default: "Ahad Malam Senin, 18.30 WIB - Selesai" },
        { id: "dyn-tempat", label: "Lokasi Tugas", placeholder: "Halaman Masjid Darussalam Jatinom", default: "Halaman Masjid Darussalam Jatinom" }
      ];
    } else if (tplCode === "SI") {
      fields = [
        { id: "dyn-kegiatan", label: "Perihal Instruksi Komando", placeholder: "Apel Akbar Kesetiaan dan Peringatan Harlah", default: "Apel Akbar Kesetiaan dan Peringatan Harlah" },
        { id: "dyn-hari-tgl", label: "Hari, Tanggal", placeholder: "25 November 2026", default: "25 November 2026" },
        { id: "dyn-tempat", label: "Tempat / Titik Kumpul", placeholder: "Lapangan Kanigoro", default: "Lapangan Kanigoro" }
      ];
    } else if (tplCode === "Not") {
      fields = [
        { id: "dyn-pimpinan", label: "Pimpinan Rapat", placeholder: "Ketua PR GP Ansor Jatinom", default: "Ketua PR GP Ansor Jatinom" },
        { id: "dyn-kehadiran", label: "Jumlah Peserta Hadir", placeholder: "18 Orang Pengurus & Kasatkorkel", default: "18 Orang Pengurus & Kasatkorkel" },
        { id: "dyn-tempat", label: "Tempat Rapat", placeholder: "Sekretariat PR GP Ansor Jatinom", default: "Sekretariat PR GP Ansor Jatinom" }
      ];
    } else if (tplCode === "SRU") {
      fields = [
        { id: "dyn-nama-kader", label: "Nama Kader Direkomendasikan", placeholder: "Sahabat Rizky Dwi Kurniawan", default: "Sahabat Rizky Dwi Kurniawan" },
        { id: "dyn-ttl", label: "Tempat, Tanggal Lahir", placeholder: "Blitar, 25 Desember 2000", default: "Blitar, 25 Desember 2000" },
        { id: "dyn-tujuan-kaderisasi", label: "Kaderisasi Dituju", placeholder: "Pelatihan Kepemimpinan Dasar (PKD) / Diklatsar Banser", default: "Pelatihan Kepemimpinan Dasar (PKD) / Diklatsar Banser" }
      ];
    }

    fields.forEach((f) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <label class="block text-slate-700 font-medium mb-1">${f.label}:</label>
        <input type="text" id="${f.id}" class="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-ansor font-medium" value="${f.default}">
      `;
      container.appendChild(div);
      div.querySelector("input").addEventListener("input", renderEditorBody);
    });
  }

  function getDynamicValues() {
    return {
      nomorLengkap: getGeneratedNomorSurat(),
      hariTanggal: document.getElementById("dyn-hari-tgl")?.value || "Sabtu Malam Ahad Pon, 14 November 2026",
      waktu: document.getElementById("dyn-waktu")?.value || "19.30 WIB (Ba'da Isya) s.d Selesai",
      tempat: document.getElementById("dyn-tempat")?.value || "Musholla Baitur Muttaqin RT 02 / RW 01 Krajan Jatinom",
      acara: document.getElementById("dyn-acara")?.value || "Pembacaan Maulid Diba', Yasin Tahlil, & Pleno",
      korlap: document.getElementById("dyn-korlap")?.value || "Subhan Mubarok (Kasatkorkel BANSER Jatinom)",
      kegiatan: document.getElementById("dyn-kegiatan")?.value || "Kegiatan Organisasi PR GP Ansor Jatinom",
      tentang: document.getElementById("dyn-tentang")?.value,
      tanggalRapat: document.getElementById("dyn-tgl-rapat")?.value,
      namaPenerima: document.getElementById("dyn-nama-penerima")?.value,
      jabatanPenerima: document.getElementById("dyn-jabatan-penerima")?.value,
      keperluanTugas: document.getElementById("dyn-keperluan")?.value,
      pimpinanRapat: document.getElementById("dyn-pimpinan")?.value,
      kehadiran: document.getElementById("dyn-kehadiran")?.value,
      namaKader: document.getElementById("dyn-nama-kader")?.value,
      ttlKader: document.getElementById("dyn-ttl")?.value,
      kaderisasiTujuan: document.getElementById("dyn-tujuan-kaderisasi")?.value
    };
  }

  function renderEditorBody() {
    const isBanser = state.activeSubSurat === "banser";
    const activeMap = isBanser ? (window.TEMPLATES_BANSER_MAP || TEMPLATES_BANSER_MAP) : (window.TEMPLATES_MAP || TEMPLATES_MAP);
    const tpl = activeMap[state.currentTemplate] || (window.TEMPLATES_BANSER_MAP && window.TEMPLATES_BANSER_MAP[state.currentTemplate]) || (window.TEMPLATES_MAP && window.TEMPLATES_MAP[state.currentTemplate]);
    if (!tpl) return;
    const editor = document.getElementById("editor-isi-surat");
    const inputIsi = document.getElementById("input-isi-surat");

    const data = getDynamicValues();
    const htmlBody = tpl.generateBody(data);
    if (editor) editor.innerHTML = htmlBody;
    if (inputIsi) inputIsi.value = htmlBody;
  }

  ["input-no-urut", "input-sifat-surat", "input-bulan-romawi", "input-tahun-surat", "input-kode-wilayah"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", refreshNomorSuratDisplay);
    if (el) el.addEventListener("change", refreshNomorSuratDisplay);
  });

  document.getElementById("btn-reset-isi")?.addEventListener("click", renderEditorBody);
  document.getElementById("btn-load-template-content")?.addEventListener("click", renderEditorBody);
  document.getElementById("btn-scroll-arsip")?.addEventListener("click", () => {
    document.getElementById("section-arsip")?.scrollIntoView({ behavior: "smooth" });
  });

  // --- PREVIEW & CETAK SURAT (PDF) DENGAN STEMPEL & TANDA TANGAN ---
  const modalPreview = document.getElementById("modal-preview-surat");
  const btnClosePreview = document.getElementById("btn-close-preview");

  function openPreviewSurat() {
    const nomor = getGeneratedNomorSurat();
    const lampiran = document.getElementById("input-lampiran")?.value || "-";
    const perihal = document.getElementById("input-perihal")?.value || "Perihal Surat";
    
    const tglMasehiInput = document.getElementById("input-tgl-surat")?.value || inputTglMasehi?.value;
    const tglMasehi = tglMasehiInput ? getIndonesianDate(new Date(tglMasehiInput)) : getIndonesianDate(new Date());
    const tglHijri = document.getElementById("input-tgl-hijriah")?.value || document.getElementById("input-tgl-hijriyah")?.value || "14 Jumadil Ula 1448 H";
    const tujuan = document.getElementById("input-tujuan")?.value || "Seluruh Sahabat Pengurus & Anggota";
    
    const isiHTML = document.getElementById("input-isi-surat")?.value || document.getElementById("editor-isi-surat")?.innerHTML || "";
    
    const isBanserMode = state.activeSubSurat === "banser";
    const defaultTtd1Nama = isBanserMode ? (state.settings.kasatkorkelNama || "SUBHAN MUBAROK") : (state.settings.ketuaNama || "MUHAMMAD ZAINAL ARIFIN");
    const defaultTtd1Jabatan = isBanserMode ? "Kepala Satkorkel (Kasatkorkel)" : "Ketua Pimpinan Ranting";
    const defaultTtd1Nia = "NIA: " + (isBanserMode ? (state.settings.kasatkorkelNia || "11.07.02.003") : (state.settings.ketuaNia || "11.07.02.001"));

    const defaultTtd2Nama = isBanserMode ? (state.settings.kasetmaNama || "BAMBANG TRI SUTRISNO") : (state.settings.sekretarisNama || "AHMAD NUR SHOLIHIN");
    const defaultTtd2Jabatan = isBanserMode ? "Kepala Sekretariat Markas (Kasetma)" : "Sekretaris";
    const defaultTtd2Nia = "NIA: " + (isBanserMode ? (state.settings.kasetmaNia || "11.07.02.005") : (state.settings.sekretarisNia || "11.07.02.002"));

    const ttd1Nama = document.getElementById("setting-ttd1-nama")?.value || defaultTtd1Nama;
    const ttd1Jabatan = document.getElementById("setting-ttd1-jabatan")?.value || defaultTtd1Jabatan;
    const ttd1Nia = document.getElementById("setting-ttd1-nia")?.value || defaultTtd1Nia;
    
    const ttd2Nama = document.getElementById("setting-ttd2-nama")?.value || defaultTtd2Nama;
    const ttd2Jabatan = document.getElementById("setting-ttd2-jabatan")?.value || defaultTtd2Jabatan;
    const ttd2Nia = document.getElementById("setting-ttd2-nia")?.value || defaultTtd2Nia;

    const kopLembaga = document.getElementById("setting-kop-lembaga")?.value || "ansor";
    const alamatKop = document.getElementById("setting-alamat-kop")?.value || state.settings.alamatSekretariat;

    // Set Data di Print Area Modal Preview
    const elPrintNomor = document.getElementById("print-nomor-surat");
    if (elPrintNomor) elPrintNomor.textContent = nomor;

    const elPrintLamp = document.getElementById("print-lampiran");
    if (elPrintLamp) elPrintLamp.textContent = lampiran;

    const elPrintPerihal = document.getElementById("print-perihal");
    if (elPrintPerihal) elPrintPerihal.textContent = perihal;

    const elPrintTglM = document.getElementById("print-tgl-masehi");
    if (elPrintTglM) elPrintTglM.textContent = tglMasehi;

    const elPrintTglH = document.getElementById("print-tgl-hijriah");
    if (elPrintTglH) elPrintTglH.textContent = tglHijri;

    const elPrintTujuan = document.getElementById("print-tujuan-surat");
    if (elPrintTujuan) elPrintTujuan.textContent = tujuan;

    const elPrintIsi = document.getElementById("print-isi-surat");
    if (elPrintIsi) elPrintIsi.innerHTML = isiHTML;

    const elPrintAlamat = document.getElementById("print-kop-alamat");
    if (elPrintAlamat) elPrintAlamat.textContent = alamatKop;

    const elPrintTtd1Nama = document.getElementById("print-ttd1-nama");
    if (elPrintTtd1Nama) elPrintTtd1Nama.textContent = ttd1Nama;

    const elPrintTtd1Jab = document.getElementById("print-ttd1-jabatan");
    if (elPrintTtd1Jab) elPrintTtd1Jab.textContent = ttd1Jabatan;

    const elPrintTtd1Nia = document.getElementById("print-ttd1-nia");
    if (elPrintTtd1Nia) elPrintTtd1Nia.textContent = ttd1Nia;

    const elPrintTtd2Nama = document.getElementById("print-ttd2-nama");
    if (elPrintTtd2Nama) elPrintTtd2Nama.textContent = ttd2Nama;

    const elPrintTtd2Jab = document.getElementById("print-ttd2-jabatan");
    if (elPrintTtd2Jab) elPrintTtd2Jab.textContent = ttd2Jabatan;

    const elPrintTtd2Nia = document.getElementById("print-ttd2-nia");
    if (elPrintTtd2Nia) elPrintTtd2Nia.textContent = ttd2Nia;

    // Kop Logos & Heading — Logo di Kiri, Rata Kanan, Kanan Kosong
    const logoKiri = document.getElementById("print-kop-logo-left");
    const logoKanan = document.getElementById("print-kop-logo-right");
    const kopSubhead = document.getElementById("print-kop-subheading");
    const kopTitle = document.getElementById("print-kop-title");
    const kopUnit = document.getElementById("print-kop-unit");
    const ttdHeading = document.getElementById("print-ttd-heading");
    const kopTeksEl = document.getElementById("print-kop-teks");
    const dividerEl = document.getElementById("print-kop-divider");
    const kopContainerEl = document.getElementById("print-kop-container");

    // Reset default KOP (Ansor: Rata Kanan, tanpa logo kanan, tanpa divider)
    if (logoKanan) {
      logoKanan.innerHTML = "";
      logoKanan.classList.add("hidden");
    }
    if (kopTeksEl) {
      kopTeksEl.classList.remove("banser-mode");
      kopTeksEl.classList.add("text-right");
    }
    if (kopContainerEl) {
      kopContainerEl.classList.remove("banser-mode");
    }
    if (dividerEl) {
      dividerEl.classList.add("hidden");
    }

    // Kode Wilayah tepat di bawah Logo
    const elPrintKodeWil = document.getElementById("print-kop-kode-wilayah");
    if (elPrintKodeWil) {
      const rawKode = document.getElementById("input-kode-wilayah")?.value.trim() || "PR-XII-11-07-02";
      elPrintKodeWil.textContent = rawKode.replace(/^(PR|SKK)-/, "") || "XII-11-07-02";
    }

    const isBanser = state.activeSubSurat === "banser" || kopLembaga === "banser";

    if (isBanser) {
      if (logoKiri) logoKiri.innerHTML = getLogoHTML("banser");
      // Logo Perisai di kanan KOP (ukuran disamakan dengan logo banser kiri)
      if (logoKanan) {
        logoKanan.classList.remove("hidden");
        logoKanan.innerHTML = `<div class="kop-logo"><img src="img/logo-perisai-banser.png" alt="Logo Perisai Banser" class="w-full h-full object-contain" /></div><div class="kop-kode-wilayah text-[11px] font-bold text-transparent tracking-wider text-center mt-1 select-none">&nbsp;</div>`;
      }
      // Teks KOP Banser — rata tengah (banser-mode)
      if (kopTeksEl) { kopTeksEl.classList.add("banser-mode"); kopTeksEl.classList.remove("text-right"); }
      if (kopContainerEl) kopContainerEl.classList.add("banser-mode");
      // 3 Baris header KOP Banser
      if (kopSubhead) kopSubhead.textContent = "SATUAN KOORDINASI KELOMPOK";
      if (kopTitle) {
        kopTitle.textContent = "BARISAN ANSOR SERBAGUNA";
        kopTitle.style.color = "#c02626";
      }
      if (kopUnit) kopUnit.textContent = "(SATKORKEL BANSER)";
      // Tulisan di atas Tanda Tangan (3 baris rata tengah)
      if (ttdHeading) {
        ttdHeading.className = "text-center font-bold mb-4 tracking-wider text-slate-800 leading-snug";
        ttdHeading.innerHTML = `<div>SATUAN KOORDINASI KELOMPOK</div><div>BARISAN ANSOR SERBAGUNA</div><div>DESA JATINOM</div>`;
      }
      // Alamat Sekretariat Banser
      if (elPrintAlamat) {
        const prefix = alamatKop.toLowerCase().includes("sekretariat") ? "" : "Sekretariat: ";
        elPrintAlamat.textContent = prefix + alamatKop;
      }
      // Tampilkan garis divider Banser
      if (dividerEl) dividerEl.classList.remove("hidden");
    } else if (kopLembaga === "rijalul") {
      if (kopTitle) kopTitle.style.color = "";
      if (logoKiri) logoKiri.innerHTML = getLogoHTML("rijalul");
      if (kopSubhead) kopSubhead.textContent = "PIMPINAN RANTING";
      if (kopTitle) kopTitle.textContent = "MDS RIJALUL ANSOR JATINOM";
      if (kopUnit) kopUnit.textContent = "DESA JATINOM KECAMATAN KANIGORO";
      if (ttdHeading) {
        ttdHeading.className = "text-center font-bold mb-4 uppercase tracking-wider text-slate-800";
        ttdHeading.innerHTML = "MAJELIS DZIKIR DAN SHOLAWAT RIJALUL ANSOR";
      }
    } else if (kopLembaga === "siber") {
      if (kopTitle) kopTitle.style.color = "";
      if (logoKiri) logoKiri.innerHTML = getLogoHTML("siber");
      if (kopSubhead) kopSubhead.textContent = "PIMPINAN RANTING";
      if (kopTitle) kopTitle.textContent = "BADAN SIBER ANSOR JATINOM";
      if (kopUnit) kopUnit.textContent = "DESA JATINOM KECAMATAN KANIGORO";
      if (ttdHeading) {
        ttdHeading.className = "text-center font-bold mb-4 uppercase tracking-wider text-slate-800";
        ttdHeading.innerHTML = "BADAN SIBER ANSOR PR JATINOM";
      }
    } else {
      if (kopTitle) kopTitle.style.color = "";
      if (logoKiri) logoKiri.innerHTML = getLogoHTML("ansor");
      if (kopSubhead) kopSubhead.textContent = "PIMPINAN RANTING";
      if (kopTitle) kopTitle.textContent = "GERAKAN PEMUDA ANSOR";
      if (kopUnit) kopUnit.textContent = "DESA JATINOM KECAMATAN KANIGORO";
      if (ttdHeading) {
        ttdHeading.className = "text-center font-bold mb-4 tracking-wider text-slate-800 leading-snug";
        ttdHeading.innerHTML = `<div>PIMPINAN RANTING</div><div>GERAKAN PEMUDA ANSOR</div><div>DESA JATINOM</div>`;
      }
    }

    // Injeksi TTD & Stempel
    const isSematkan = document.getElementById("check-tampilkan-stempel")?.checked ?? document.getElementById("check-sematkan-stempel-surat")?.checked ?? true;
    const imgTtd1 = document.getElementById("print-img-ttd-sekretaris");
    const imgTtd2 = document.getElementById("print-img-ttd-ketua");
    const imgStempel = document.getElementById("print-img-stempel");

    if (isSematkan) {
      if (isBanser) {
        // Kasatkorkel di sebelah kiri, Kasetma & Stempel di sebelah kanan
        if (imgTtd1) imgTtd1.innerHTML = getSignatureOrStampHTML("ttdKasatkorkel", "ttdKasatkorkel");
        if (imgTtd2) imgTtd2.innerHTML = getSignatureOrStampHTML("ttdKasetma", "ttdKasetma");
        if (imgStempel) imgStempel.innerHTML = getSignatureOrStampHTML("stempelBanser", "stempelBanser");
      } else if (kopLembaga === "rijalul") {
        if (imgTtd1) imgTtd1.innerHTML = getSignatureOrStampHTML("ttdMds", "ttdKetua");
        if (imgTtd2) imgTtd2.innerHTML = getSignatureOrStampHTML("ttdSekretarisMds", "ttdSekretaris");
        if (imgStempel) imgStempel.innerHTML = getSignatureOrStampHTML("stempelMds", "stempelRijalul");
      } else {
        // Ketua di sebelah kiri, Sekretaris & Stempel di sebelah kanan
        if (imgTtd1) imgTtd1.innerHTML = getSignatureOrStampHTML("ttdKetua", "ttdKetua");
        if (imgTtd2) imgTtd2.innerHTML = getSignatureOrStampHTML("ttdSekretaris", "ttdSekretaris");
        if (imgStempel) imgStempel.innerHTML = getSignatureOrStampHTML("stempelAnsor", "stempelAnsor");
      }
    } else {
      if (imgTtd1) imgTtd1.innerHTML = "";
      if (imgTtd2) imgTtd2.innerHTML = "";
      if (imgStempel) imgStempel.innerHTML = "";
    }

    modalPreview?.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Mode Cetak: Atur kelas single-page A4 vs multi-page SK
    const printArea = document.getElementById("print-area-surat");
    const currentTpl = (state.currentTemplate || "").toUpperCase();
    if (printArea) {
      if (currentTpl === "SK" && !isBanser) {
        // Surat Keputusan (SK) Ansor: Multi-page / dinamis disesuaikan dengan isinya
        printArea.classList.remove("print-exact-single-page");
        printArea.classList.add("print-multi-page");
        document.body.classList.remove("mode-print-single-page");
        document.body.classList.add("mode-print-multi-page");
      } else {
        // Selain SK (Semua jenis E-Surat Banser dan E-Surat Ansor non-SK): Pas 1 Lembar A4
        printArea.classList.add("print-exact-single-page");
        printArea.classList.remove("print-multi-page");
        document.body.classList.add("mode-print-single-page");
        document.body.classList.remove("mode-print-multi-page");
      }
    }
  }

  function closePreviewSurat() {
    modalPreview?.classList.add("hidden");
    document.body.style.overflow = "";
    document.body.classList.remove("mode-print-single-page", "mode-print-multi-page");
  }

  function applyPrintModeClasses() {
    const isBanser = state.activeSubSurat === "banser";
    const currentTpl = (state.currentTemplate || "").toUpperCase();
    const printArea = document.getElementById("print-area-surat");

    if (currentTpl === "SK" && !isBanser) {
      document.body.classList.remove("mode-print-single-page");
      document.body.classList.add("mode-print-multi-page");
      if (printArea) {
        printArea.classList.remove("print-exact-single-page");
        printArea.classList.add("print-multi-page");
      }
    } else {
      document.body.classList.add("mode-print-single-page");
      document.body.classList.remove("mode-print-multi-page");
      if (printArea) {
        printArea.classList.add("print-exact-single-page");
        printArea.classList.remove("print-multi-page");
      }
    }
  }

  window.addEventListener("beforeprint", applyPrintModeClasses);

  function triggerPrintSurat() {
    applyPrintModeClasses();
    window.print();
  }

  document.getElementById("btn-preview-surat")?.addEventListener("click", openPreviewSurat);
  document.getElementById("btn-preview-cetak")?.addEventListener("click", openPreviewSurat);
  document.getElementById("btn-close-preview")?.addEventListener("click", closePreviewSurat);
  document.getElementById("btn-print-surat")?.addEventListener("click", triggerPrintSurat);
  document.getElementById("btn-do-print")?.addEventListener("click", triggerPrintSurat);

  // Simpan Surat ke Arsip
  function simpanSuratKeArsip() {
    const nomor = getGeneratedNomorSurat();
    const perihal = document.getElementById("input-perihal")?.value || "Perihal";
    const tujuan = document.getElementById("input-tujuan")?.value || "Tujuan";
    const tgl = document.getElementById("input-tgl-surat")?.value || inputTglMasehi?.value || todayStr;
    const jenis = state.currentTemplate || "SU";
    const sifat = document.getElementById("input-sifat-surat")?.value || "01";

    const baru = {
      id: "ARS-" + Date.now().toString().slice(-4),
      nomorSurat: nomor,
      jenis: jenis,
      sifat: sifat,
      tglSurat: tgl,
      tujuan: tujuan,
      perihal: perihal,
      tipe: "Keluar"
    };

    state.arsipList.unshift(baru);
    AnsorStore.saveArsip(state.arsipList);
    AnsorStore.incrementNomorSurat();

    addNotification("Arsip Surat Keluar", `Nomor ${nomor} perihal "${perihal}" berhasil disimpan.`, "surat");
    renderArsipTable();

    const nextNum = AnsorStore.getNextNomorSurat();
    const inputNoUrut = document.getElementById("input-no-urut");
    if (inputNoUrut) {
      inputNoUrut.value = String(nextNum).padStart(3, "0");
      refreshNomorSuratDisplay();
    }
    alert(`Surat Nomor: ${nomor} berhasil dicatat ke buku arsip!`);
  }

  document.getElementById("btn-simpan-arsip")?.addEventListener("click", simpanSuratKeArsip);

  // Form Buat Surat: Simpan Arsip fallback
  const formBuatSurat = document.getElementById("form-buat-surat");
  if (formBuatSurat) {
    formBuatSurat.addEventListener("submit", (e) => {
      e.preventDefault();
      simpanSuratKeArsip();
    });
  }

  // --- ARSIP PERSURATAN TABLE ---
  function renderArsipTable() {
    const tbody = document.getElementById("tbody-arsip-surat");
    if (!tbody) return;
    tbody.innerHTML = "";

    const filterTipe = document.getElementById("filter-tipe-arsip")?.value || "semua";
    const filtered = state.arsipList.filter((item) => {
      if (filterTipe === "semua") return true;
      return item.tipe === filterTipe;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-slate-400 italic">Belum ada catatan surat pada kategori ini.</td></tr>`;
      return;
    }

    filtered.forEach((item) => {
      const isKeluar = item.tipe === "Keluar";
      const badgeTipe = isKeluar
        ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">Keluar</span>`
        : `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Masuk</span>`;

      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50 border-b border-slate-100";
      tr.innerHTML = `
        <td class="py-2.5 px-3">${badgeTipe}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-slate-800">${item.nomorSurat}</td>
        <td class="py-2.5 px-3 text-slate-500">${item.tglSurat}</td>
        <td class="py-2.5 px-3 font-medium text-slate-800">${item.perihal}</td>
        <td class="py-2.5 px-3 text-slate-600">${item.tujuan}</td>
        <td class="py-2.5 px-3 text-center">
          <div class="flex items-center justify-center gap-1.5">
            ${isKeluar ? `<button data-id="${item.id}" class="btn-cetak-arsip px-2 py-1 bg-ansor text-white rounded hover:bg-ansor-dark text-[11px] font-semibold" title="Preview / Cetak"><i class="fa-solid fa-print"></i></button>` : ""}
            <button data-id="${item.id}" class="btn-hapus-arsip px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-[11px] font-semibold" title="Hapus"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll(".btn-hapus-arsip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Hapus catatan surat ini dari arsip?")) {
          state.arsipList = state.arsipList.filter((a) => a.id !== id);
          AnsorStore.saveArsip(state.arsipList);
          renderArsipTable();
        }
      });
    });

    document.querySelectorAll(".btn-cetak-arsip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const found = state.arsipList.find((a) => a.id === id);
        if (found) {
          document.getElementById("input-perihal").value = found.perihal;
          document.getElementById("input-tujuan").value = found.tujuan;
          openPreviewSurat();
        }
      });
    });
  }

  document.getElementById("filter-tipe-arsip")?.addEventListener("change", renderArsipTable);

  const modalSuratMasuk = document.getElementById("modal-surat-masuk");
  const openSuratMasukModal = () => {
    modalSuratMasuk?.classList.remove("hidden");
    const tglEl = document.getElementById("masuk-tanggal");
    if (tglEl) tglEl.value = todayStr;
  };
  document.getElementById("btn-tambah-surat-masuk")?.addEventListener("click", openSuratMasukModal);
  document.getElementById("btn-tambah-arsip-manual")?.addEventListener("click", openSuratMasukModal);
  document.getElementById("btn-close-surat-masuk")?.addEventListener("click", () => modalSuratMasuk?.classList.add("hidden"));
  document.getElementById("btn-batal-surat-masuk")?.addEventListener("click", () => modalSuratMasuk?.classList.add("hidden"));

  document.getElementById("form-surat-masuk")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nomor = document.getElementById("masuk-nomor").value.trim();
    const pengirim = document.getElementById("masuk-pengirim").value.trim();
    const perihal = document.getElementById("masuk-perihal").value.trim();
    const tgl = document.getElementById("masuk-tanggal").value;
    const jenis = document.getElementById("masuk-jenis").value;

    const baru = {
      id: "ARS-" + Date.now().toString().slice(-4),
      nomorSurat: nomor,
      jenis: jenis,
      sifat: "01",
      tglSurat: tgl,
      tujuan: "Dari: " + pengirim,
      perihal: perihal,
      tipe: "Masuk"
    };

    state.arsipList.unshift(baru);
    AnsorStore.saveArsip(state.arsipList);
    addNotification("Surat Masuk Baru", `Dari ${pengirim}: "${perihal}"`, "surat");
    renderArsipTable();
    modalSuratMasuk?.classList.add("hidden");
    e.target.reset();
  });

  // --- TAB 3: PENDATAAN KADER (E-KADER) ---
  function updateKaderStats() {
    const total = state.kaderList.length;
    let ansorCount = 0;
    let banserCount = 0;
    let rijalulCount = 0;
    let kaderisasiCount = 0;

    state.kaderList.forEach((k) => {
      if (k.lembaga && k.lembaga.includes("Ansor")) ansorCount++;
      if (k.lembaga && k.lembaga.includes("Banser")) banserCount++;
      if (k.lembaga && k.lembaga.includes("Rijalul Ansor")) rijalulCount++;
      if (k.kaderisasi && k.kaderisasi !== "Belum Kaderisasi") kaderisasiCount++;
    });

    const persen = total > 0 ? Math.round((kaderisasiCount / total) * 100) : 0;

    const elTotal = document.getElementById("stat-total-kader");
    if (elTotal) elTotal.textContent = total;
    const elAnsor = document.getElementById("stat-total-ansor");
    if (elAnsor) elAnsor.textContent = ansorCount;
    const elBanser = document.getElementById("stat-total-banser");
    if (elBanser) elBanser.textContent = banserCount;
    const elRijalul = document.getElementById("stat-total-rijalul");
    if (elRijalul) elRijalul.textContent = rijalulCount;
    const elPersen = document.getElementById("stat-persen-kaderisasi");
    if (elPersen) elPersen.textContent = persen + "%";
  }

  function renderKaderTable() {
    const tbody = document.getElementById("tbody-kader");
    if (!tbody) return;
    tbody.innerHTML = "";

    const searchVal = document.getElementById("search-kader")?.value.toLowerCase().trim() || "";
    const filterLembaga = document.getElementById("filter-kader-lembaga")?.value || document.getElementById("filter-lembaga")?.value || "semua";
    const filterKaderisasi = document.getElementById("filter-kader-kaderisasi")?.value || "semua";

    const filtered = state.kaderList.filter((k) => {
      const matchSearch =
        k.nama.toLowerCase().includes(searchVal) ||
        (k.nia && k.nia.toLowerCase().includes(searchVal)) ||
        (k.alamat && k.alamat.toLowerCase().includes(searchVal)) ||
        (k.pekerjaan && k.pekerjaan.toLowerCase().includes(searchVal)) ||
        (k.kaderisasiKhusus && k.kaderisasiKhusus.toLowerCase().includes(searchVal)) ||
        (k.nik && k.nik.includes(searchVal));

      const matchLembaga =
        filterLembaga === "semua" || (k.lembaga && k.lembaga.includes(filterLembaga));

      const matchKaderisasi =
        filterKaderisasi === "semua" || (k.kaderisasi && k.kaderisasi.includes(filterKaderisasi));

      return matchSearch && matchLembaga && matchKaderisasi;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400 italic">Data kader tidak ditemukan.</td></tr>`;
      return;
    }

    filtered.forEach((k, idx) => {
      const badges = (k.lembaga || [])
        .map((lem) => {
          if (lem === "Ansor") return `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold badge-ansor">Ansor</span>`;
          if (lem === "Banser") return `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold badge-banser">Banser</span>`;
          if (lem === "Rijalul Ansor") return `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold badge-rijalul">MDS RA</span>`;
          return "";
        })
        .join(" ");

      let waClean = (k.wa || "").replace(/[^0-9]/g, "");
      if (waClean.startsWith("0")) waClean = "62" + waClean.substring(1);

      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50 border-b border-slate-100";
      tr.innerHTML = `
        <td class="py-2.5 px-3 text-slate-400 text-center font-mono">${idx + 1}</td>
        <td class="py-2.5 px-3">
          <div class="font-bold text-slate-800">${k.nama}</div>
          <div class="text-[10px] font-mono text-slate-400">NIA: ${k.nia || "-"} | NIK: ${k.nik || "-"}</div>
          <div class="flex items-center gap-2 mt-0.5">
            ${k.jabatan ? `<span class="text-[10px] text-emerald-700 font-semibold">${k.jabatan}</span>` : ""}
            ${k.pekerjaan ? `<span class="text-[9.5px] text-slate-400">&bull; ${k.pekerjaan}</span>` : ""}
          </div>
          ${k.email ? `<div class="text-[9.5px] text-slate-400"><i class="fa-solid fa-envelope text-[8px] mr-1"></i>${k.email}</div>` : ""}
        </td>
        <td class="py-2.5 px-3"><div class="flex flex-wrap gap-1">${badges}</div></td>
        <td class="py-2.5 px-3">
          <div class="space-y-1">
            <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold ${k.kaderisasi === "Belum Kaderisasi" ? "bg-slate-100 text-slate-600" : "bg-amber-100 text-amber-900"}">
              ${k.kaderisasi || "-"}
            </span>
            ${k.kaderisasiKhusus && k.kaderisasiKhusus !== "Belum Ada" ? `<div><span class="inline-block px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-red-100 text-red-800 border border-red-200"><i class="fa-solid fa-medal text-[8px] mr-0.5 text-red-600"></i>${k.kaderisasiKhusus}</span></div>` : ""}
          </div>
        </td>
        <td class="py-2.5 px-3 text-slate-600 text-[11px] leading-tight">
          <div>${k.alamat}</div>
          ${k.tempatLahir ? `<div class="text-[10px] text-slate-400">${k.tempatLahir}, ${k.tglLahir || "-"}</div>` : ""}
        </td>
        <td class="py-2.5 px-3">
          <a href="https://wa.me/${waClean}?text=Assalamu'alaikum%20Sahabat%20${encodeURIComponent(k.nama)}" target="_blank" class="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-[11px] font-bold transition">
            <i class="fa-brands fa-whatsapp text-emerald-600"></i>
            <span>${k.wa}</span>
          </a>
        </td>
        <td class="py-2.5 px-3 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <button data-id="${k.id}" class="btn-edit-kader px-2 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 text-[11px] font-semibold" title="Edit Data"><i class="fa-solid fa-pen"></i></button>
            <button data-id="${k.id}" class="btn-hapus-kader px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-[11px] font-semibold" title="Hapus"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll(".btn-edit-kader").forEach((b) => {
      b.addEventListener("click", () => editKader(b.getAttribute("data-id")));
    });

    document.querySelectorAll(".btn-hapus-kader").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-id");
        if (confirm("Yakin ingin menghapus data sahabat ini?")) {
          state.kaderList = state.kaderList.filter((k) => k.id !== id);
          AnsorStore.saveKader(state.kaderList);
          renderKaderTable();
          updateKaderStats();
        }
      });
    });
  }

  document.getElementById("search-kader")?.addEventListener("input", renderKaderTable);
  document.getElementById("filter-kader-lembaga")?.addEventListener("change", renderKaderTable);
  document.getElementById("filter-kader-kaderisasi")?.addEventListener("change", renderKaderTable);
  document.getElementById("filter-lembaga")?.addEventListener("change", renderKaderTable);

  const btnToggleFormKader = document.getElementById("btn-toggle-form-kader");
  const containerFormKader = document.getElementById("container-form-kader");
  const textToggleKader = document.getElementById("text-toggle-kader");
  const iconToggleKader = document.getElementById("icon-toggle-kader");
  btnToggleFormKader?.addEventListener("click", () => {
    if (containerFormKader) {
      containerFormKader.classList.toggle("hidden");
      const isHidden = containerFormKader.classList.contains("hidden");
      if (textToggleKader) textToggleKader.textContent = isHidden ? "Buka Form" : "Tutup";
      if (iconToggleKader) iconToggleKader.className = isHidden ? "fa-solid fa-chevron-down text-xs" : "fa-solid fa-chevron-up text-xs";
    }
  });

  const formKader = document.getElementById("form-kader");
  if (formKader) {
    formKader.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("kader-id").value;
      const nama = document.getElementById("kader-nama").value.trim();
      const nik = document.getElementById("kader-nik").value.trim();
      const nia = document.getElementById("kader-nia").value.trim();
      const tempatLahir = document.getElementById("kader-tempat-lahir").value.trim();
      const tglLahir = document.getElementById("kader-tgl-lahir").value;
      const alamat = document.getElementById("kader-alamat").value.trim();
      const wa = document.getElementById("kader-wa").value.trim();
      const email = document.getElementById("kader-email")?.value.trim() || "";
      const pekerjaan = document.getElementById("kader-pekerjaan")?.value || "Lainnya";

      // Pengkaderan Khusus (Multi-Select Checkboxes)
      const khususChecked = [];
      document.querySelectorAll("input[name='kader-kaderisasi-khusus']:checked").forEach((cb) => {
        khususChecked.push(cb.value);
      });
      const kaderisasiKhusus = khususChecked.length > 0 ? khususChecked.join(", ") : "Belum Ada";

      // Jenjang Kaderisasi Formal (Multi-Select Checkboxes)
      const formalChecked = [];
      document.querySelectorAll("input[name='kader-kaderisasi']:checked").forEach((cb) => {
        formalChecked.push(cb.value);
      });
      const kaderisasi = formalChecked.length > 0 ? formalChecked.join(", ") : "Belum Kaderisasi";

      const jabatan = document.getElementById("kader-jabatan").value.trim();

      const lembagaChecked = [];
      document.querySelectorAll("input[name='kader-lembaga']:checked").forEach((cb) => {
        lembagaChecked.push(cb.value);
      });

      if (id) {
        const idx = state.kaderList.findIndex((k) => k.id === id);
        if (idx !== -1) {
          state.kaderList[idx] = {
            ...state.kaderList[idx],
            nama, nik, nia, tempatLahir, tglLahir, alamat, wa, email,
            pekerjaan, kaderisasiKhusus,
            lembaga: lembagaChecked,
            kaderisasi, jabatan
          };
        }
      } else {
        const newKader = {
          id: "KDR-" + Date.now().toString().slice(-4),
          nama, nik, nia, tempatLahir, tglLahir, alamat, wa, email,
          pekerjaan, kaderisasiKhusus,
          lembaga: lembagaChecked,
          kaderisasi, jabatan
        };
        state.kaderList.unshift(newKader);
        addNotification("Anggota Baru Terdaftar", `Sahabat ${nama} telah masuk dalam basis data.`, "kader");
      }

      AnsorStore.saveKader(state.kaderList);
      renderKaderTable();
      updateKaderStats();
      resetFormKader();
    });
  }

  function editKader(id) {
    const k = state.kaderList.find((x) => x.id === id);
    if (!k) return;

    if (containerFormKader && containerFormKader.classList.contains("hidden")) {
      containerFormKader.classList.remove("hidden");
      if (textToggleKader) textToggleKader.textContent = "Tutup";
      if (iconToggleKader) iconToggleKader.className = "fa-solid fa-chevron-up text-xs";
    }

    document.getElementById("kader-id").value = k.id;
    document.getElementById("kader-nama").value = k.nama;
    document.getElementById("kader-nik").value = k.nik || "";
    document.getElementById("kader-nia").value = k.nia || "";
    document.getElementById("kader-tempat-lahir").value = k.tempatLahir || "Blitar";
    document.getElementById("kader-tgl-lahir").value = k.tglLahir || "";
    document.getElementById("kader-alamat").value = k.alamat;
    document.getElementById("kader-wa").value = k.wa;
    if (document.getElementById("kader-email")) document.getElementById("kader-email").value = k.email || "";
    if (document.getElementById("kader-pekerjaan")) document.getElementById("kader-pekerjaan").value = k.pekerjaan || "Lainnya";

    // Populate Checkbox Kaderisasi Khusus
    const listKhusus = (k.kaderisasiKhusus || "").split(",").map(s => s.trim());
    document.querySelectorAll("input[name='kader-kaderisasi-khusus']").forEach((cb) => {
      cb.checked = listKhusus.includes(cb.value);
    });

    // Populate Checkbox Kaderisasi Formal
    const listFormal = (k.kaderisasi || "").split(",").map(s => s.trim());
    document.querySelectorAll("input[name='kader-kaderisasi']").forEach((cb) => {
      cb.checked = listFormal.includes(cb.value);
    });

    const selJabatan = document.getElementById("kader-jabatan");
    if (selJabatan) {
      selJabatan.value = k.jabatan || "Anggota";
      if (!selJabatan.value && k.jabatan) {
        const customOpt = document.createElement("option");
        customOpt.value = k.jabatan;
        customOpt.textContent = k.jabatan;
        selJabatan.appendChild(customOpt);
        selJabatan.value = k.jabatan;
      }
    }

    document.querySelectorAll("input[name='kader-lembaga']").forEach((cb) => {
      cb.checked = k.lembaga ? k.lembaga.includes(cb.value) : false;
    });

    const titleEl = document.getElementById("form-kader-title");
    if (titleEl) titleEl.textContent = "Edit Data: " + k.nama;
    const submitBtn = document.getElementById("btn-submit-kader");
    if (submitBtn) submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Simpan Perubahan`;
    const cancelBtn = document.getElementById("btn-cancel-edit-kader");
    if (cancelBtn) cancelBtn.classList.remove("hidden");

    formKader?.scrollIntoView({ behavior: "smooth" });
  }

  function resetFormKader() {
    formKader?.reset();
    const idEl = document.getElementById("kader-id");
    if (idEl) idEl.value = "";
    const titleEl = document.getElementById("form-kader-title");
    if (titleEl) titleEl.textContent = "Form Anggota Baru";
    const submitBtn = document.getElementById("btn-submit-kader");
    if (submitBtn) submitBtn.innerHTML = `<i class="fa-solid fa-floppy-disk text-gold"></i> Simpan Data Anggota`;
    const cancelBtn = document.getElementById("btn-cancel-edit-kader");
    if (cancelBtn) cancelBtn.classList.add("hidden");
  }

  document.getElementById("btn-cancel-edit-kader")?.addEventListener("click", resetFormKader);
  document.getElementById("btn-reset-form-kader")?.addEventListener("click", resetFormKader);

  // Export CSV
  document.getElementById("btn-export-kader-csv")?.addEventListener("click", () => {
    if (state.kaderList.length === 0) {
      alert("Belum ada data anggota untuk diekspor.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Nama Lengkap,NIK,NIA,Tempat Lahir,Tanggal Lahir,Alamat,No WhatsApp,Lembaga,Jenjang Kaderisasi,Jabatan\n";

    state.kaderList.forEach((k) => {
      const row = [
        k.id,
        `"${k.nama}"`,
        `'${k.nik || ""}`,
        `'${k.nia || ""}`,
        `"${k.tempatLahir || ""}"`,
        k.tglLahir || "",
        `"${k.alamat || ""}"`,
        `'${k.wa || ""}`,
        `"${(k.lembaga || []).join("; ")}"`,
        `"${k.kaderisasi || ""}"`,
        `"${k.jabatan || ""}"`
      ];
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data_Kader_Ansor_Banser_Jatinom_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // --- TAB 4: AGENDA ---
  const containerFormAgenda = document.getElementById("container-form-agenda");
  const btnBukaFormAgenda = document.getElementById("btn-tambah-agenda-baru") || document.getElementById("btn-buka-form-agenda");
  btnBukaFormAgenda?.addEventListener("click", () => {
    containerFormAgenda?.classList.remove("hidden");
    containerFormAgenda?.scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("btn-tutup-form-agenda")?.addEventListener("click", () => containerFormAgenda?.classList.add("hidden"));
  document.getElementById("btn-batal-agenda")?.addEventListener("click", () => containerFormAgenda?.classList.add("hidden"));

  const formAgenda = document.getElementById("form-agenda");
  if (formAgenda) {
    formAgenda.addEventListener("submit", (e) => {
      e.preventDefault();
      const judul = document.getElementById("agenda-judul").value.trim();
      const kategori = document.getElementById("agenda-kategori").value;
      const tanggal = document.getElementById("agenda-tanggal").value;
      const waktu = document.getElementById("agenda-waktu").value.trim();
      const tempat = document.getElementById("agenda-tempat").value.trim();
      const tuanRumah = document.getElementById("agenda-tuan-rumah").value.trim();
      const keterangan = document.getElementById("agenda-keterangan").value.trim();

      const baru = {
        id: "AGD-" + Date.now().toString().slice(-4),
        judul, kategori, tanggal, waktu, tempat, tuanRumah, keterangan,
        status: "Mendatang"
      };

      state.agendaList.unshift(baru);
      AnsorStore.saveAgenda(state.agendaList);
      addNotification("Agenda Baru Dibuat", `${judul} pada ${tanggal}`, "agenda");
      renderAgendaCards();
      formAgenda.reset();
      containerFormAgenda?.classList.add("hidden");
      alert("Jadwal agenda berhasil ditambahkan!");
    });
  }

  let filterAgendaKategori = "semua";
  document.querySelectorAll(".btn-filter-agenda").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-filter-agenda").forEach((b) => {
        b.classList.remove("active", "bg-emerald-100", "text-ansor-dark", "border-emerald-200", "font-bold");
        b.classList.add("bg-slate-100", "text-slate-700", "font-medium");
      });
      btn.classList.add("active", "bg-emerald-100", "text-ansor-dark", "border-emerald-200", "font-bold");
      btn.classList.remove("bg-slate-100", "text-slate-700", "font-medium");
      filterAgendaKategori = btn.getAttribute("data-cat") || "semua";
      renderAgendaCards();
    });
  });

  document.getElementById("search-agenda")?.addEventListener("input", renderAgendaCards);
  document.getElementById("filter-kategori-agenda")?.addEventListener("change", renderAgendaCards);

  function renderAgendaCards() {
    const container = document.getElementById("container-agenda-grid") || document.getElementById("container-agenda-cards");
    if (!container) return;
    container.innerHTML = "";

    const searchVal = document.getElementById("search-agenda")?.value.toLowerCase().trim() || "";
    const filterSelect = document.getElementById("filter-kategori-agenda")?.value || "";
    const catChoice = filterSelect || filterAgendaKategori;

    const filtered = state.agendaList.filter((a) => {
      const matchCat = catChoice === "semua" || a.kategori === catChoice;
      const matchSearch =
        a.judul.toLowerCase().includes(searchVal) ||
        (a.tempat && a.tempat.toLowerCase().includes(searchVal)) ||
        (a.tuanRumah && a.tuanRumah.toLowerCase().includes(searchVal)) ||
        (a.keterangan && a.keterangan.toLowerCase().includes(searchVal));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="col-span-full py-8 text-center text-slate-400 italic">Belum ada agenda kegiatan pada kategori ini.</div>`;
      return;
    }

    filtered.forEach((a) => {
      let badgeKategori = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">GP Ansor</span>`;
      if (a.kategori === "Rijalul Ansor") {
        badgeKategori = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">MDS Rijalul Ansor</span>`;
      } else if (a.kategori === "Banser") {
        badgeKategori = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">BANSER</span>`;
      }

      const card = document.createElement("div");
      card.className = "bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 flex flex-col justify-between hover:shadow-md transition relative overflow-hidden";
      card.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-2">
            <div>${badgeKategori}</div>
            <span class="text-[11px] font-bold ${a.status === "Selesai" ? "text-slate-400 bg-slate-100" : "text-emerald-700 bg-emerald-50 border border-emerald-200"} px-2.5 py-0.5 rounded-full">
              ${a.status}
            </span>
          </div>

          <div>
            <h4 class="font-bold text-slate-800 text-sm leading-snug">${a.judul}</h4>
            <div class="mt-2 space-y-1 text-xs text-slate-600">
              <div class="flex items-center gap-2">
                <i class="fa-regular fa-calendar-days text-slate-400 w-4"></i>
                <span>${a.tanggal} &bull; ${a.waktu}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-location-dot text-slate-400 w-4"></i>
                <span class="font-medium">${a.tempat}</span>
              </div>
              ${a.tuanRumah ? `
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-house-user text-slate-400 w-4"></i>
                <span>Tuan Rumah: ${a.tuanRumah}</span>
              </div>` : ""}
            </div>
          </div>

          ${a.keterangan ? `
          <div class="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 border border-slate-100">
            ${a.keterangan}
          </div>` : ""}
        </div>

        <div class="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
          <button data-id="${a.id}" class="btn-share-wa px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition">
            <i class="fa-brands fa-whatsapp text-emerald-600"></i>
            <span>Share WA</span>
          </button>

          <div class="flex items-center gap-1">
            <button data-id="${a.id}" class="btn-toggle-status-agenda px-2 py-1 text-xs font-semibold rounded ${a.status === "Selesai" ? "text-amber-700 hover:bg-amber-50" : "text-emerald-700 hover:bg-emerald-50"}" title="Ganti Status">
              <i class="fa-solid fa-rotate"></i>
            </button>
            <button data-id="${a.id}" class="btn-hapus-agenda px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded" title="Hapus Agenda">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".btn-share-wa").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-id");
        const a = state.agendaList.find((x) => x.id === id);
        if (!a) return;

        const waText = 
`*PEMBERITAHUAN AGENDA / RUTINAN GP ANSOR JATINOM*
_Kec. Kanigoro, Kab. Blitar_

Assalamu'alaikum Warahmatullahi Wabarakaatuh,

Mengundang seluruh Sahabat Pengurus & Anggota Gerakan Pemuda Ansor, Banser, dan MDS Rijalul Ansor Desa Jatinom untuk hadir pada:

📌 *Kegiatan:* ${a.judul}
📅 *Tanggal:* ${a.tanggal}
⏰ *Waktu:* ${a.waktu}
📍 *Tempat:* ${a.tempat}
${a.tuanRumah ? `👤 *Tuan Rumah:* ${a.tuanRumah}\n` : ""}
📝 *Keterangan / Amaliyah:*
${a.keterangan || "Diharapkan hadir tepat waktu demi kelestarian tradisi amaliyah Ahlussunnah Wal Jama'ah."}

Mengingat pentingnya acara ini, dimohon kehadiran seluruh Sahabat Satu Komando.

_Wallahul Muwaffiq Ila Aqwamith Thorieq_
_Wassalamu'alaikum Wr. Wb._

*Pimpinan Ranting GP Ansor Jatinom*`;

        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`, "_blank");
      });
    });

    document.querySelectorAll(".btn-toggle-status-agenda").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-id");
        const a = state.agendaList.find((x) => x.id === id);
        if (a) {
          a.status = a.status === "Mendatang" ? "Selesai" : "Mendatang";
          AnsorStore.saveAgenda(state.agendaList);
          renderAgendaCards();
        }
      });
    });

    document.querySelectorAll(".btn-hapus-agenda").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-id");
        if (confirm("Hapus jadwal agenda kegiatan ini?")) {
          state.agendaList = state.agendaList.filter((x) => x.id !== id);
          AnsorStore.saveAgenda(state.agendaList);
          renderAgendaCards();
        }
      });
    });
  }

  document.getElementById("filter-kategori-agenda")?.addEventListener("change", renderAgendaCards);

  // --- TAB 4.5: KEUANGAN RANTING (PEMBUKUAN KAS) ---
  const containerFormTransaksi = document.getElementById("container-form-transaksi");
  const formTransaksi = document.getElementById("form-transaksi");

  document.getElementById("btn-buka-form-transaksi")?.addEventListener("click", () => {
    resetFormTransaksi();
    containerFormTransaksi?.classList.remove("hidden");
    document.getElementById("transaksi-tanggal").value = todayStr;
    containerFormTransaksi?.scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("btn-tutup-form-transaksi")?.addEventListener("click", () => {
    containerFormTransaksi?.classList.add("hidden");
  });

  document.getElementById("btn-batal-transaksi")?.addEventListener("click", () => {
    resetFormTransaksi();
    containerFormTransaksi?.classList.add("hidden");
  });

  function resetFormTransaksi() {
    formTransaksi?.reset();
    const idEl = document.getElementById("transaksi-id");
    if (idEl) idEl.value = "";
    const titleEl = document.getElementById("form-transaksi-title");
    if (titleEl) titleEl.textContent = "Pencatatan Transaksi Kas Baru";
    const u = state.currentUser || state.usersList[0];
    const pjEl = document.getElementById("transaksi-pj");
    if (pjEl) pjEl.value = `${u.nama} (${u.role})`;
  }

  function formatRupiah(num) {
    const n = parseInt(num) || 0;
    return "Rp " + n.toLocaleString("id-ID");
  }

  function renderKeuangan() {
    const list = state.keuanganList || [];
    const filterJenis = document.getElementById("filter-jenis-kas")?.value || "semua";
    const searchVal = document.getElementById("search-keuangan")?.value.toLowerCase().trim() || "";

    // Hitung ringkasan total pemasukan, pengeluaran & saldo
    let totalMasuk = 0;
    let totalKeluar = 0;

    list.forEach((t) => {
      const jml = parseInt(t.jumlah) || 0;
      if (t.jenis === "pemasukan") totalMasuk += jml;
      else if (t.jenis === "pengeluaran") totalKeluar += jml;
    });

    const saldo = totalMasuk - totalKeluar;

    const elMasuk = document.getElementById("stat-total-pemasukan");
    const elKeluar = document.getElementById("stat-total-pengeluaran");
    const elSaldo = document.getElementById("stat-saldo-kas");

    if (elMasuk) elMasuk.textContent = formatRupiah(totalMasuk);
    if (elKeluar) elKeluar.textContent = formatRupiah(totalKeluar);
    if (elSaldo) {
      elSaldo.textContent = formatRupiah(saldo);
      elSaldo.className = `text-xl sm:text-2xl font-black ${saldo >= 0 ? "text-emerald-800" : "text-red-600"}`;
    }

    // Role check warning & button state
    const u = state.currentUser || state.usersList[0];
    const isBendaharaOrAdmin = u.role === "Bendahara Ansor" || u.role === "Super Admin" || u.role === "Ketua Ansor";
    const warnEl = document.getElementById("transaksi-role-warning");
    const submitBtn = document.getElementById("btn-submit-transaksi");
    if (warnEl && submitBtn) {
      if (isBendaharaOrAdmin) {
        warnEl.classList.add("hidden");
        submitBtn.removeAttribute("disabled");
        submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
      } else {
        warnEl.classList.remove("hidden");
      }
    }

    // Filter daftar transaksi
    const filtered = list.filter((t) => {
      const matchJenis = filterJenis === "semua" || t.jenis === filterJenis;
      const matchSearch =
        (t.keterangan && t.keterangan.toLowerCase().includes(searchVal)) ||
        (t.kategori && t.kategori.toLowerCase().includes(searchVal)) ||
        (t.pj && t.pj.toLowerCase().includes(searchVal));
      return matchJenis && matchSearch;
    });

    const tbody = document.getElementById("tbody-keuangan");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" class="text-center py-6 text-slate-400 italic">Belum ada catatan transaksi kas.</td></tr>`;
      return;
    }

    // Hitung running balance urut waktu
    let runningSaldo = 0;
    const itemsWithSaldo = list.map((item) => {
      const jml = parseInt(item.jumlah) || 0;
      if (item.jenis === "pemasukan") runningSaldo += jml;
      else runningSaldo -= jml;
      return { ...item, saldoSetelahnya: runningSaldo };
    });

    filtered.forEach((t, idx) => {
      const matchedWithSaldo = itemsWithSaldo.find((x) => x.id === t.id);
      const saldoRow = matchedWithSaldo ? matchedWithSaldo.saldoSetelahnya : 0;
      const jml = parseInt(t.jumlah) || 0;

      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50 border-b border-slate-100";
      tr.innerHTML = `
        <td class="py-2.5 px-3 text-slate-400 font-mono text-center">${idx + 1}</td>
        <td class="py-2.5 px-3 font-medium text-slate-700 whitespace-nowrap">
          <div>${t.tanggal}</div>
          <span class="text-[9.5px] uppercase font-bold px-1.5 py-0.2 rounded ${t.jenis === "pemasukan" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}">${t.jenis}</span>
        </td>
        <td class="py-2.5 px-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            ${t.kategori || "Umum"}
          </span>
        </td>
        <td class="py-2.5 px-3 text-slate-800 max-w-xs font-medium">
          <div>${t.keterangan}</div>
        </td>
        <td class="py-2.5 px-3 text-slate-500 text-[11px] whitespace-nowrap">${t.pj || "-"}</td>
        <td class="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
          ${t.jenis === "pemasukan" ? "+ " + formatRupiah(jml) : "-"}
        </td>
        <td class="py-2.5 px-3 text-right font-mono font-bold text-red-600 whitespace-nowrap">
          ${t.jenis === "pengeluaran" ? "- " + formatRupiah(jml) : "-"}
        </td>
        <td class="py-2.5 px-3 text-right font-mono font-black text-slate-900 whitespace-nowrap">
          ${formatRupiah(saldoRow)}
        </td>
        <td class="py-2.5 px-3 text-center whitespace-nowrap">
          <div class="flex items-center justify-center gap-1">
            <button data-id="${t.id}" class="btn-edit-transaksi px-2 py-1 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded text-[11px]" title="Edit Transaksi"><i class="fa-solid fa-pen"></i></button>
            <button data-id="${t.id}" class="btn-hapus-transaksi px-2 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded text-[11px]" title="Hapus Transaksi"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Wire edit & hapus buttons
    document.querySelectorAll(".btn-edit-transaksi").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-id");
        const t = state.keuanganList.find((x) => x.id === id);
        if (!t) return;
        containerFormTransaksi?.classList.remove("hidden");
        document.getElementById("transaksi-id").value = t.id;
        document.getElementById("transaksi-tanggal").value = t.tanggal;
        document.getElementById("transaksi-jenis").value = t.jenis;
        document.getElementById("transaksi-kategori").value = t.kategori || "Lainnya";
        document.getElementById("transaksi-jumlah").value = t.jumlah;
        document.getElementById("transaksi-keterangan").value = t.keterangan;
        document.getElementById("transaksi-pj").value = t.pj || "";
        document.getElementById("form-transaksi-title").textContent = "Edit Transaksi Kas: " + t.keterangan;
        containerFormTransaksi?.scrollIntoView({ behavior: "smooth" });
      });
    });

    document.querySelectorAll(".btn-hapus-transaksi").forEach((b) => {
      b.addEventListener("click", () => {
        const u = state.currentUser || state.usersList[0];
        if (u.role !== "Bendahara Ansor" && u.role !== "Super Admin") {
          alert("Akses Ditolak: Hanya Bendahara Ansor dan Super Admin yang dapat menghapus transaksi kas.");
          return;
        }
        const id = b.getAttribute("data-id");
        if (confirm("Hapus catatan transaksi kas ini dari pembukuan?")) {
          state.keuanganList = state.keuanganList.filter((x) => x.id !== id);
          AnsorStore.saveKeuangan(state.keuanganList);
          renderKeuangan();
          addNotification("Transaksi Dihapus", "Satu catatan transaksi kas berhasil dihapus dari buku pembukuan.", "info");
        }
      });
    });
  }

  // Submit form transaksi kas
  formTransaksi?.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = state.currentUser || state.usersList[0];
    if (u.role !== "Bendahara Ansor" && u.role !== "Super Admin" && u.role !== "Ketua Ansor") {
      alert("Akses Terbatas: Hanya Bendahara Ansor, Ketua, atau Super Admin yang berwenang mencatat kas.");
      return;
    }

    const id = document.getElementById("transaksi-id").value;
    const tanggal = document.getElementById("transaksi-tanggal").value;
    const jenis = document.getElementById("transaksi-jenis").value;
    const kategori = document.getElementById("transaksi-kategori").value;
    const jumlah = parseInt(document.getElementById("transaksi-jumlah").value) || 0;
    const keterangan = document.getElementById("transaksi-keterangan").value.trim();
    const pj = document.getElementById("transaksi-pj").value.trim();

    if (jumlah <= 0) {
      alert("Nominal transaksi harus lebih dari 0!");
      return;
    }

    if (id) {
      const idx = state.keuanganList.findIndex((x) => x.id === id);
      if (idx !== -1) {
        state.keuanganList[idx] = {
          ...state.keuanganList[idx],
          tanggal, jenis, kategori, jumlah, keterangan, pj
        };
        addNotification("Transaksi Kas Diperbarui", `${kategori} sejumlah ${formatRupiah(jumlah)} telah diperbarui.`, "keuangan");
      }
    } else {
      const newTrx = {
        id: "TRX-" + Date.now().toString().slice(-4),
        tanggal, jenis, kategori, jumlah, keterangan, pj
      };
      state.keuanganList.unshift(newTrx);
      addNotification("Kas Baru Dicatat", `${jenis === "pemasukan" ? "Pemasukan" : "Pengeluaran"} ${kategori} ${formatRupiah(jumlah)} dicatat oleh ${pj}.`, "keuangan");
    }

    AnsorStore.saveKeuangan(state.keuanganList);
    renderKeuangan();
    resetFormTransaksi();
    containerFormTransaksi?.classList.add("hidden");
    alert("Catatan transaksi kas berhasil disimpan!");
  });

  document.getElementById("filter-jenis-kas")?.addEventListener("change", renderKeuangan);
  document.getElementById("search-keuangan")?.addEventListener("input", renderKeuangan);

  // --- TAB: LAPORAN PERTANGGUNG JAWABAN (LPJ KERTAS F4) ---
  function renderLpjDocument() {
    const paperEl = document.getElementById("lpj-paper");
    if (!paperEl) return;

    // 1. Ambil Parameter Filter & Pengesahan
    const startDate = document.getElementById("lpj-filter-start")?.value || "";
    const endDate = document.getElementById("lpj-filter-end")?.value || "";
    const periodeLabel = document.getElementById("lpj-filter-label")?.value.trim() || "Masa Khidmat 2024 - 2026";

    const pimpinanNama = document.getElementById("lpj-nama-pimpinan")?.value.trim() || "Muhammad Zainal Arifin";
    const sekretarisNama = document.getElementById("lpj-nama-sekretaris")?.value.trim() || "Ahmad Nur Sholihin";
    const bendaharaNama = document.getElementById("lpj-nama-bendahara")?.value.trim() || "Abdul Wahid";
    const penetapanTgl = document.getElementById("lpj-penetapan-tgl")?.value.trim() || ("Jatinom, " + getIndonesianDate(todayStr));
    const mengetahuiOrg = document.getElementById("lpj-mengetahui-org")?.value.trim() || "PIMPINAN ANAK CABANG GP ANSOR KANIGORO";
    const mengetahuiNama = document.getElementById("lpj-mengetahui-nama")?.value.trim() || "Sahabat Ahmad Fauzi, S.Pd.I";

    const bab1Custom = document.getElementById("lpj-text-bab1")?.value.trim() || "";
    const bab5Custom = document.getElementById("lpj-text-bab5")?.value.trim() || "";

    // 2. Olah Data Struktur Pengurus & Kader
    const pengurusList = (state.pengurusList && state.pengurusList.length > 0) ? [...state.pengurusList] : AnsorStore.getPengurus();
    pengurusList.sort((a, b) => (parseInt(a.urutan) || 99) - (parseInt(b.urutan) || 99));

    const kaderList = state.kaderList || AnsorStore.getKader();
    const totalPengurus = pengurusList.length;
    const totalKader = kaderList.length;

    // 3. Olah Data Agenda Kegiatan
    let agendaList = [...(state.agendaList || AnsorStore.getAgenda())];
    if (startDate) agendaList = agendaList.filter(a => a.tanggal >= startDate);
    if (endDate) agendaList = agendaList.filter(a => a.tanggal <= endDate);
    agendaList.sort((a, b) => (a.tanggal || "").localeCompare(b.tanggal || ""));
    const totalAgenda = agendaList.length;

    // 4. Olah Data Keuangan Kas Ranting
    const allKeuangan = state.keuanganList || AnsorStore.getKeuangan();
    let saldoAwal = 0;
    if (startDate) {
      allKeuangan.forEach(k => {
        if (k.tanggal < startDate) {
          const jml = parseInt(k.jumlah) || 0;
          if (k.jenis === "pemasukan") saldoAwal += jml;
          else if (k.jenis === "pengeluaran") saldoAwal -= jml;
        }
      });
    }

    let filteredKeu = allKeuangan;
    if (startDate) filteredKeu = filteredKeu.filter(k => k.tanggal >= startDate);
    if (endDate) filteredKeu = filteredKeu.filter(k => k.tanggal <= endDate);
    filteredKeu.sort((a, b) => (a.tanggal || "").localeCompare(b.tanggal || ""));

    const pemasukan = filteredKeu.filter(k => k.jenis === "pemasukan");
    const pengeluaran = filteredKeu.filter(k => k.jenis === "pengeluaran");

    let totalPemasukan = 0;
    pemasukan.forEach(m => totalPemasukan += (parseInt(m.jumlah) || 0));

    let totalPengeluaran = 0;
    pengeluaran.forEach(k => totalPengeluaran += (parseInt(k.jumlah) || 0));

    const saldoAkhir = saldoAwal + totalPemasukan - totalPengeluaran;

    // Format label periode
    let periodeDisplay = periodeLabel;
    if (startDate && endDate) {
      periodeDisplay += ` (${getIndonesianDate(startDate)} s/d ${getIndonesianDate(endDate)})`;
    }

    // Logo Ansor
    const logoAnsorHTML = getLogoHTML("ansor", "w-16 h-16 object-contain");

    // Bangun HTML Lembar Dokumen
    let html = `
      <!-- KOP SURAT RESMI GP ANSOR -->
      <div class="border-b-2 border-slate-900 pb-2 mb-4">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 4px;">
          <tr>
            <td style="width: 75px; vertical-align: middle; text-align: center;">
              <div class="w-16 h-16 flex items-center justify-center">
                ${logoAnsorHTML}
              </div>
            </td>
            <td style="text-align: center; vertical-align: middle; padding: 0 10px;">
              <div style="font-size: 13pt; font-weight: bold; color: #006837; letter-spacing: 0.5px;">PIMPINAN RANTING GERAKAN PEMUDA ANSOR</div>
              <div style="font-size: 16pt; font-weight: 900; color: #000; letter-spacing: 1px; margin: 1px 0;">DESA JATINOM</div>
              <div style="font-size: 11pt; font-weight: bold; color: #1e293b;">KECAMATAN KANIGORO KABUPATEN BLITAR</div>
              <div style="font-size: 9pt; font-style: italic; color: #475569; margin-top: 2px;">
                Sekretariat: Jl. Raya Jatinom, Kec. Kanigoro, Kab. Blitar 66171 &bull; Email: ansor.jatinom@gmail.com
              </div>
            </td>
          </tr>
        </table>
        <div style="border-top: 2px solid #000; border-bottom: 1px solid #000; height: 2px; margin-top: 4px;"></div>
      </div>

      <!-- JUDUL DOKUMEN -->
      <div style="text-align: center; margin-bottom: 22px;">
        <h1 style="font-size: 14pt; font-weight: bold; text-decoration: underline; margin: 0 0 4px 0; letter-spacing: 0.5px;">
          LAPORAN PERTANGGUNG JAWABAN (LPJ)
        </h1>
        <div style="font-size: 11pt; font-weight: bold; margin: 0;">PIMPINAN RANTING GERAKAN PEMUDA ANSOR DESA JATINOM</div>
        <div style="font-size: 10.5pt; color: #334155; margin-top: 2px;">Periode: <strong>${periodeDisplay}</strong></div>
      </div>

      <!-- BAB I: PENDAHULUAN -->
      <div style="margin-bottom: 18px;">
        <div style="font-size: 11.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #64748b; padding-bottom: 3px; margin-bottom: 8px;">
          BAB I &bull; PENDAHULUAN
        </div>
        ${bab1Custom ? `
        <div style="text-align: justify; text-indent: 28px; line-height: 1.45;">
          ${bab1Custom.replace(/\n/g, "<br>")}
        </div>
        ` : `
        <p style="text-align: justify; text-indent: 28px; margin: 6px 0; line-height: 1.45;">
          Segala puji dan syukur senantiasa kita panjatkan ke hadirat Allah SWT atas segala limpahan rahmat, hidayah, dan inayah-Nya sehingga seluruh amanah kepengurusan Gerakan Pemuda Ansor Pimpinan Ranting Desa Jatinom dapat terlaksana dengan baik, tertib, dan berkesinambungan dalam bingkai khidmah Aswaja An-Nahdliyyah.
        </p>
        <p style="text-align: justify; text-indent: 28px; margin: 6px 0; line-height: 1.45;">
          Shalawat teriring salam semoga senantiasa tercurahkan kepada junjungan kita Baginda Nabi Besar Muhammad SAW, keluarga, sahabat, serta alim ulama muassis Nahdlatul Ulama yang telah mewariskan semangat luhur menjaga marwah Agama, Ulama, dan Keutuhan Bangsa.
        </p>
        <p style="text-align: justify; text-indent: 28px; margin: 6px 0; line-height: 1.45;">
          Laporan Pertanggung Jawaban ini disusun sebagai perwujudan transparansi, akuntabilitas, serta evaluasi menyeluruh atas amanah roda organisasi yang telah dijalankan. Melalui dokumen ini disajikan ringkasan susunan organisasi, data keanggotaan kader, rekapitulasi realisasi program kerja, dan pembukuan kas keuangan sebagai dasar pijakan evaluatif demi kemajuan khidmah pada masa khidmat berikutnya.
        </p>
        <div style="margin-top: 8px; font-weight: bold;">Dasar Pelaksanaan:</div>
        <ol style="margin: 4px 0 10px 24px; padding: 0; font-size: 11pt; line-height: 1.4;">
          <li>Peraturan Dasar dan Peraturan Rumah Tangga (PD/PRT) Gerakan Pemuda Ansor.</li>
          <li>Hasil Keputusan Konferensi Ranting Gerakan Pemuda Ansor Desa Jatinom.</li>
          <li>Rencana Strategis dan Program Kerja Ranting GP Ansor Desa Jatinom Periode Berjalan.</li>
        </ol>
        `}
      </div>

      <!-- BAB II: STRUKTUR ORGANISASI & KADERISASI -->
      <div style="margin-bottom: 18px;">
        <div style="font-size: 11.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #64748b; padding-bottom: 3px; margin-bottom: 8px;">
          BAB II &bull; STRUKTUR ORGANISASI & KADERISASI
        </div>
        <p style="margin: 4px 0 8px 0;">Susunan pengurus Pimpinan Ranting GP Ansor Desa Jatinom beserta banom dan biro kerja berdasarkan hierarki jabatan resmi:</p>

        ${pengurusList.length === 0 ? `
        <div style="text-align: center; padding: 12px; color: #64748b; font-style: italic; border: 1px dashed #cbd5e1; border-radius: 6px;">
          Tidak ada data pengurus pada periode ini.
        </div>
        ` : `
        <table class="lpj-table">
          <thead>
            <tr>
              <th style="width: 32px;">No</th>
              <th>Nama Pengurus</th>
              <th>Jabatan</th>
              <th>Lembaga / Banom</th>
              <th style="width: 110px;">Kontak</th>
            </tr>
          </thead>
          <tbody>
            ${pengurusList.map((p, idx) => `
            <tr>
              <td style="text-align: center;">${idx + 1}</td>
              <td style="font-weight: bold;">${p.nama}</td>
              <td>${p.jabatan}</td>
              <td>${p.lembaga}</td>
              <td style="text-align: center;">${p.kontak || "-"}</td>
            </tr>
            `).join("")}
          </tbody>
        </table>
        `}

        <div style="font-size: 10.5pt; margin-top: 6px; padding: 6px 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
          <strong>Rekapitulasi Keanggotaan:</strong> Jumlah Pengurus Terdaftar: <strong>${totalPengurus}</strong> Personil &bull; Jumlah Anggota / Kader Terdata: <strong>${totalKader}</strong> Kader.
        </div>
      </div>

      <!-- BAB III: REKAPITULASI AGENDA & KEGIATAN -->
      <div style="margin-bottom: 18px;">
        <div style="font-size: 11.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #64748b; padding-bottom: 3px; margin-bottom: 8px;">
          BAB III &bull; REKAPITULASI AGENDA & KEGIATAN
        </div>
        <p style="margin: 4px 0 8px 0;">Daftar realisasi program kerja, kegiatan apel, pengamanan, rutinan shalawat, dan konsolidasi organisasi selama periode laporan:</p>

        ${agendaList.length === 0 ? `
        <div style="text-align: center; padding: 12px; color: #64748b; font-style: italic; border: 1px dashed #cbd5e1; border-radius: 6px;">
          Tidak ada data agenda / kegiatan pada periode ini.
        </div>
        ` : `
        <table class="lpj-table">
          <thead>
            <tr>
              <th style="width: 28px;">No</th>
              <th style="width: 80px;">Tanggal</th>
              <th>Nama Agenda / Kegiatan</th>
              <th>Tempat Pelaksanaan</th>
              <th style="width: 75px;">Peserta</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            ${agendaList.map((ag, i) => `
            <tr>
              <td style="text-align: center;">${i + 1}</td>
              <td style="text-align: center;">${getIndonesianDate(ag.tanggal)}</td>
              <td style="font-weight: bold;">${ag.judul}</td>
              <td>${ag.tempat}</td>
              <td style="text-align: center;">${ag.jumlah_peserta ? ag.jumlah_peserta + ' org' : '-'}</td>
              <td>${ag.keterangan || (ag.kategori || "-")}</td>
            </tr>
            `).join("")}
          </tbody>
        </table>
        <div style="font-size: 10.5pt; margin-top: 4px;">
          Total Agenda Kegiatan Terlaksana: <strong>${totalAgenda}</strong> Kegiatan.
        </div>
        `}
      </div>

      <!-- BAB IV: LAPORAN KEUANGAN & PEMBUKUAN KAS -->
      <div style="margin-bottom: 18px;">
        <div style="font-size: 11.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #64748b; padding-bottom: 3px; margin-bottom: 8px;">
          BAB IV &bull; LAPORAN KEUANGAN & PEMBUKUAN KAS
        </div>
        <p style="margin: 4px 0 8px 0;">Sirkulasi arus kas, realisasi penerimaan iuran/infaq, serta alokasi belanja operasional kepengurusan:</p>

        <!-- Saldo Awal -->
        <div style="font-size: 11pt; margin-bottom: 8px;">
          <strong>Saldo Awal Periode:</strong> <span style="font-weight: bold; color: #006837;">${formatRupiah(saldoAwal)}</span>
        </div>

        <!-- Rincian Pemasukan -->
        <div style="font-weight: bold; font-size: 10.5pt; margin-top: 10px;">A. Rincian Pemasukan Kas:</div>
        ${pemasukan.length === 0 ? `
        <div style="text-align: center; padding: 8px; color: #64748b; font-style: italic; border: 1px dashed #cbd5e1; border-radius: 6px; margin: 4px 0 10px 0;">
          Tidak ada data pemasukan pada periode ini.
        </div>
        ` : `
        <table class="lpj-table">
          <thead>
            <tr>
              <th style="width: 30px;">No</th>
              <th style="width: 80px;">Tanggal</th>
              <th>Uraian / Sumber Pemasukan</th>
              <th>Penanggung Jawab</th>
              <th style="width: 110px;">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            ${pemasukan.map((pm, im) => `
            <tr>
              <td style="text-align: center;">${im + 1}</td>
              <td style="text-align: center;">${getIndonesianDate(pm.tanggal)}</td>
              <td>${pm.kategori}${pm.keterangan ? ' - ' + pm.keterangan : ''}</td>
              <td>${pm.pj || "-"}</td>
              <td style="text-align: right;">${formatRupiah(pm.jumlah)}</td>
            </tr>
            `).join("")}
            <tr style="background: #f8fafc; font-weight: bold;">
              <td colspan="4" style="text-align: right;">TOTAL PEMASUKAN:</td>
              <td style="text-align: right; color: #006837;">${formatRupiah(totalPemasukan)}</td>
            </tr>
          </tbody>
        </table>
        `}

        <!-- Rincian Pengeluaran -->
        <div style="font-weight: bold; font-size: 10.5pt; margin-top: 10px;">B. Rincian Pengeluaran Kas:</div>
        ${pengeluaran.length === 0 ? `
        <div style="text-align: center; padding: 8px; color: #64748b; font-style: italic; border: 1px dashed #cbd5e1; border-radius: 6px; margin: 4px 0 10px 0;">
          Tidak ada data pengeluaran pada periode ini.
        </div>
        ` : `
        <table class="lpj-table">
          <thead>
            <tr>
              <th style="width: 30px;">No</th>
              <th style="width: 80px;">Tanggal</th>
              <th>Uraian / Alokasi Belanja</th>
              <th>Penanggung Jawab</th>
              <th style="width: 110px;">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            ${pengeluaran.map((pk, ik) => `
            <tr>
              <td style="text-align: center;">${ik + 1}</td>
              <td style="text-align: center;">${getIndonesianDate(pk.tanggal)}</td>
              <td>${pk.kategori}${pk.keterangan ? ' - ' + pk.keterangan : ''}</td>
              <td>${pk.pj || "-"}</td>
              <td style="text-align: right;">${formatRupiah(pk.jumlah)}</td>
            </tr>
            `).join("")}
            <tr style="background: #f8fafc; font-weight: bold;">
              <td colspan="4" style="text-align: right;">TOTAL PENGELUARAN:</td>
              <td style="text-align: right; color: #c02626;">${formatRupiah(totalPengeluaran)}</td>
            </tr>
          </tbody>
        </table>
        `}

        <!-- Rekapitulasi Kas Akhir -->
        <div style="border: 1px solid #334155; background: #fdfdfd; padding: 10px 14px; border-radius: 6px; margin-top: 10px; page-break-inside: avoid;">
          <div style="font-weight: bold; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 6px;">
            REKAPITULASI KAS AKHIR PERIODE:
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 10.5pt;">
            <tr>
              <td style="width: 250px;">Saldo Awal Periode</td>
              <td style="width: 15px;">:</td>
              <td style="text-align: right; font-weight: bold;">${formatRupiah(saldoAwal)}</td>
            </tr>
            <tr>
              <td>Total Pemasukan Kas (+)</td>
              <td>:</td>
              <td style="text-align: right; font-weight: bold; color: #006837;">${formatRupiah(totalPemasukan)}</td>
            </tr>
            <tr>
              <td>Total Pengeluaran Kas (-)</td>
              <td>:</td>
              <td style="text-align: right; font-weight: bold; color: #c02626;">${formatRupiah(totalPengeluaran)}</td>
            </tr>
            <tr style="border-top: 1.5px solid #000;">
              <td style="font-weight: bold; padding-top: 4px;">SALDO KAS AKHIR PERIODE</td>
              <td style="padding-top: 4px;">:</td>
              <td style="text-align: right; font-weight: bold; font-size: 11.5pt; padding-top: 4px; color: ${saldoAkhir >= 0 ? '#006837' : '#c02626'};">
                ${formatRupiah(saldoAkhir)}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- BAB V: PENUTUP -->
      <div style="margin-bottom: 22px;">
        <div style="font-size: 11.5pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #64748b; padding-bottom: 3px; margin-bottom: 8px;">
          BAB V &bull; PENUTUP
        </div>
        ${bab5Custom ? `
        <div style="text-align: justify; text-indent: 28px; line-height: 1.45;">
          ${bab5Custom.replace(/\n/g, "<br>")}
        </div>
        ` : `
        <p style="text-align: justify; text-indent: 28px; margin: 6px 0; line-height: 1.45;">
          Demikian Laporan Pertanggung Jawaban (LPJ) ini kami susun dengan penuh tanggung jawab, keterbukaan, dan niat tulus berkhidmah kepada Nahdlatul Ulama, Agama, dan Bangsa. Kami menyadari sepenuhnya bahwa dalam perjalanan kepengurusan ini tentu masih terdapat kekurangan yang membutuhkan penyempurnaan di masa mendatang.
        </p>
        <p style="text-align: justify; text-indent: 28px; margin: 6px 0; line-height: 1.45;">
          Ucapan terima kasih dan penghargaan yang tulus kami haturkan kepada segenap jajaran Pengurus Ranting NU Desa Jatinom, PAC GP Ansor Kanigoro, para alim ulama, sesepuh, donatur, serta seluruh Sahabat Ansor dan Banser yang telah bahu-membahu menyukseskan setiap agenda keumatan.
        </p>
        <p style="text-align: justify; text-indent: 28px; margin: 6px 0; line-height: 1.45;">
          Semoga Allah Subhanahu Wa Ta'ala senantiasa melimpahkan taufiq, ridha, dan perlindungan-Nya atas seluruh ikhtiar perjuangan kita. Aamiin Yaa Rabbal 'Aalamiin.
        </p>
        `}
      </div>

      <!-- LEMBAR PENGESAHAN TANDA TANGAN -->
      <div style="margin-top: 25px; page-break-inside: avoid;">
        <div style="text-align: center; margin-bottom: 8px; font-size: 10.5pt;">
          Ditetapkan di: <strong>${penetapanTgl.split(",")[0] || "Jatinom"}</strong><br>
          Pada tanggal: <strong>${penetapanTgl.includes(",") ? penetapanTgl.split(",")[1].trim() : penetapanTgl}</strong>
        </div>

        <div style="text-align: center; font-weight: bold; font-size: 11pt; margin-bottom: 14px;">
          PIMPINAN RANTING GERAKAN PEMUDA ANSOR<br>
          DESA JATINOM KECAMATAN KANIGORO
        </div>

        <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 10.5pt;">
          <tr>
            <td style="width: 33%;">
              Bendahara,<br>
              <div style="height: 65px;"></div>
              <strong><u>${bendaharaNama}</u></strong><br>
              <span>NIA. 11.07.02.007</span>
            </td>
            <td style="width: 34%;">
              Sekretaris,<br>
              <div style="height: 65px;"></div>
              <strong><u>${sekretarisNama}</u></strong><br>
              <span>NIA. 11.07.02.002</span>
            </td>
            <td style="width: 33%;">
              Ketua,<br>
              <div style="height: 65px;"></div>
              <strong><u>${pimpinanNama}</u></strong><br>
              <span>NIA. 11.07.02.001</span>
            </td>
          </tr>
          <tr>
            <td colspan="3" style="padding-top: 28px;">
              Mengetahui,<br>
              <strong>${mengetahuiOrg}</strong><br>
              <div style="height: 65px;"></div>
              <strong><u>${mengetahuiNama}</u></strong>
            </td>
          </tr>
        </table>
      </div>
    `;

    paperEl.innerHTML = html;
  }

  // Preset Periode LPJ
  document.getElementById("lpj-filter-preset")?.addEventListener("change", (e) => {
    const val = e.target.value;
    const startEl = document.getElementById("lpj-filter-start");
    const endEl = document.getElementById("lpj-filter-end");
    const now = new Date();
    const currYear = now.getFullYear();

    if (val === "semua") {
      if (startEl) startEl.value = "";
      if (endEl) endEl.value = "";
    } else if (val === "bulan_ini") {
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, "0");
      if (startEl) startEl.value = `${y}-${m}-01`;
      const lastDay = new Date(y, now.getMonth() + 1, 0).getDate();
      if (endEl) endEl.value = `${y}-${m}-${lastDay}`;
    } else if (val === "triwulan") {
      const qStartMonth = Math.floor(now.getMonth() / 3) * 3;
      const startD = new Date(currYear, qStartMonth, 1);
      const endD = new Date(currYear, qStartMonth + 3, 0);
      if (startEl) startEl.value = startD.toISOString().split("T")[0];
      if (endEl) endEl.value = endD.toISOString().split("T")[0];
    } else if (val === "semester") {
      const sStartMonth = now.getMonth() < 6 ? 0 : 6;
      const startD = new Date(currYear, sStartMonth, 1);
      const endD = new Date(currYear, sStartMonth + 6, 0);
      if (startEl) startEl.value = startD.toISOString().split("T")[0];
      if (endEl) endEl.value = endD.toISOString().split("T")[0];
    } else if (val === "tahun_2026") {
      if (startEl) startEl.value = "2026-01-01";
      if (endEl) endEl.value = "2026-12-31";
    }

    renderLpjDocument();
  });

  // Tombol Refresh Pratinjau
  document.getElementById("btn-preview-lpj")?.addEventListener("click", () => {
    renderLpjDocument();
    alert("Pratinjau Dokumen LPJ Kertas F4 berhasil diperbarui!");
  });

  // Toggle Box Redaksi Khusus
  document.getElementById("btn-toggle-redaksi-lpj")?.addEventListener("click", () => {
    const box = document.getElementById("box-kustom-redaksi-lpj");
    const label = document.getElementById("label-toggle-redaksi");
    if (!box) return;
    if (box.classList.contains("hidden")) {
      box.classList.remove("hidden");
      if (label) label.textContent = "Tutup Kustomisasi Redaksi Pendahuluan & Penutup";
    } else {
      box.classList.add("hidden");
      if (label) label.textContent = "Kustomisasi Redaksi Pendahuluan & Penutup (Klik untuk Membuka)";
    }
  });

  // Tombol Cetak Dokumen F4 via Browser
  document.getElementById("btn-print-lpj")?.addEventListener("click", () => {
    renderLpjDocument();

    // Pasang @page khusus F4 secara dinamis
    let printStyle = document.getElementById("dynamic-lpj-page-style");
    if (!printStyle) {
      printStyle = document.createElement("style");
      printStyle.id = "dynamic-lpj-page-style";
      document.head.appendChild(printStyle);
    }
    printStyle.innerHTML = `
      @page {
        size: 215mm 330mm portrait !important;
        margin: 20mm 15mm 20mm 25mm !important;
      }
    `;

    document.body.classList.add("printing-lpj");
    window.print();
  });

  // Bersihkan kelas cetak setelah proses print selesai
  window.addEventListener("afterprint", () => {
    document.body.classList.remove("printing-lpj");
    const printStyle = document.getElementById("dynamic-lpj-page-style");
    if (printStyle) printStyle.remove();
  });

  // Tombol Unduh PDF Resmi (F4) via Dompdf Backend
  document.getElementById("btn-export-pdf-lpj")?.addEventListener("click", () => {
    const startDate = document.getElementById("lpj-filter-start")?.value || "";
    const endDate = document.getElementById("lpj-filter-end")?.value || "";
    const periodeLabel = document.getElementById("lpj-filter-label")?.value.trim() || "Masa Khidmat 2024 - 2026";
    const namaPimpinan = document.getElementById("lpj-nama-pimpinan")?.value.trim() || "Muhammad Zainal Arifin";
    const namaSekretaris = document.getElementById("lpj-nama-sekretaris")?.value.trim() || "Ahmad Nur Sholihin";
    const namaBendahara = document.getElementById("lpj-nama-bendahara")?.value.trim() || "Abdul Wahid";
    const penetapanTgl = document.getElementById("lpj-penetapan-tgl")?.value.trim() || "Jatinom, " + todayStr;
    const mengetahuiOrg = document.getElementById("lpj-mengetahui-org")?.value.trim() || "PIMPINAN ANAK CABANG GP ANSOR KANIGORO";
    const mengetahuiNama = document.getElementById("lpj-mengetahui-nama")?.value.trim() || "Sahabat Ahmad Fauzi, S.Pd.I";
    const bab1Text = document.getElementById("lpj-text-bab1")?.value.trim() || "";
    const bab5Text = document.getElementById("lpj-text-bab5")?.value.trim() || "";

    // Data in-memory (fallback bila MySQL offline)
    const payload = {
      start_date: startDate,
      end_date: endDate,
      periode_label: periodeLabel,
      nama_pimpinan: namaPimpinan,
      nama_sekretaris: namaSekretaris,
      nama_bendahara: namaBendahara,
      penetapan_kota: penetapanTgl.split(",")[0] || "Jatinom",
      penetapan_tgl: penetapanTgl.includes(",") ? penetapanTgl.split(",")[1].trim() : todayStr,
      mengetahui_org: mengetahuiOrg,
      mengetahui_nama: mengetahuiNama,
      bab1_text: bab1Text,
      bab5_text: bab5Text,
      struktur: state.pengurusList || AnsorStore.getPengurus(),
      total_kader: (state.kaderList || AnsorStore.getKader()).length,
      agenda: state.agendaList || AnsorStore.getAgenda(),
      keuangan: {
        saldo_awal: 0,
        pemasukan: (state.keuanganList || AnsorStore.getKeuangan()).filter(x => x.jenis === "pemasukan"),
        total_pemasukan: (state.keuanganList || AnsorStore.getKeuangan()).filter(x => x.jenis === "pemasukan").reduce((acc, curr) => acc + (parseInt(curr.jumlah) || 0), 0),
        pengeluaran: (state.keuanganList || AnsorStore.getKeuangan()).filter(x => x.jenis === "pengeluaran"),
        total_pengeluaran: (state.keuanganList || AnsorStore.getKeuangan()).filter(x => x.jenis === "pengeluaran").reduce((acc, curr) => acc + (parseInt(curr.jumlah) || 0), 0)
      }
    };

    // Buat form submission sementara untuk memicu download PDF
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "export_lpj_pdf.php?download=1";
    form.target = "_blank";

    const inputData = document.createElement("input");
    inputData.type = "hidden";
    inputData.name = "payload_json";
    inputData.value = JSON.stringify(payload);
    form.appendChild(inputData);

    // Kirim juga parameter POST individual
    for (const [key, val] of Object.entries(payload)) {
      if (typeof val !== "object") {
        const inp = document.createElement("input");
        inp.type = "hidden";
        inp.name = key;
        inp.value = val;
        form.appendChild(inp);
      }
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  });

  // --- TAB 5: PROFIL RANTING & UPLOAD TTD / STEMPEL ---
  function renderProfilDetails() {
    const s = state.settings;
    const pk = document.getElementById("profil-nama-ketua");
    if (pk) pk.textContent = s.ketuaNama;

    const pnk = document.getElementById("profil-nia-ketua");
    if (pnk) pnk.textContent = "NIA: " + s.ketuaNia;

    const ps = document.getElementById("profil-nama-sekretaris");
    if (ps) ps.textContent = s.sekretarisNama;

    const pns = document.getElementById("profil-nia-sekretaris");
    if (pns) pns.textContent = "NIA: " + s.sekretarisNia;

    const pkasat = document.getElementById("profil-nama-kasatkorkel");
    if (pkasat) pkasat.textContent = s.kasatkorkelNama;

    const pmds = document.getElementById("profil-nama-mds");
    if (pmds) pmds.textContent = s.ketuaMdsNama;

    const psiber = document.getElementById("profil-nama-siber");
    if (psiber) psiber.textContent = s.ketuaSiberNama || "FAJAR SIDIQ";

    loadVisiMisi();
  }

  // --- VISI & MISI HANDLER (DAPAT DIEDIT DAN DISIMPAN) ---
  function loadVisiMisi() {
    const s = state.settings;
    const visi = s.visi || "Terwujudnya pemuda Desa Jatinom yang berkarakter islami Ahlussunnah Wal Jama'ah An-Nahdliyyah, berdaya guna secara intelektual dan ekonomi, militan dalam membentengi Ulama, serta teguh mengawal keutuhan Negara Kesatuan Republik Indonesia.";
    const misi = s.misi || "1. Pengkaderan Terstruktur: Melaksanakan kaderisasi formal (PKD Ansor & Diklatsar Banser) secara berkesinambungan bagi pemuda desa.\n2. Tradisi & Amaliyah: Mengistiqomahkan majelis dzikir, shalawat Diba', dan tahlil melalui MDS Rijalul Ansor di seluruh dusun Desa Jatinom.\n3. Satu Komando: Meningkatkan disiplin dan kesiapsiagaan Satkorkel Banser dalam tanggap sosial, bencana, dan marwah ulama.\n4. Digitalisasi & Kemandirian: Menerapkan administrasi modern dan menumbuhkan kemandirian ekonomi kader ranting.";

    const textVisi = document.getElementById("text-visi");
    const textMisi = document.getElementById("text-misi");
    if (textVisi) textVisi.textContent = `"${visi}"`;
    if (textMisi) textMisi.textContent = misi;

    const inputVisi = document.getElementById("input-visi");
    const inputMisi = document.getElementById("input-misi");
    if (inputVisi) inputVisi.value = visi;
    if (inputMisi) inputMisi.value = misi;
  }

  document.getElementById("btn-edit-visi-misi")?.addEventListener("click", () => {
    document.getElementById("display-visi-misi")?.classList.add("hidden");
    document.getElementById("form-visi-misi")?.classList.remove("hidden");
  });

  document.getElementById("btn-batal-visi-misi")?.addEventListener("click", () => {
    document.getElementById("display-visi-misi")?.classList.remove("hidden");
    document.getElementById("form-visi-misi")?.classList.add("hidden");
  });

  document.getElementById("btn-simpan-visi-misi")?.addEventListener("click", () => {
    const visi = document.getElementById("input-visi")?.value.trim();
    const misi = document.getElementById("input-misi")?.value.trim();
    if (!visi || !misi) {
      alert("Visi dan Misi tidak boleh kosong!");
      return;
    }
    state.settings.visi = visi;
    state.settings.misi = misi;
    AnsorStore.saveSettings(state.settings);
    loadVisiMisi();
    document.getElementById("display-visi-misi")?.classList.remove("hidden");
    document.getElementById("form-visi-misi")?.classList.add("hidden");
    addNotification("Visi Misi Disimpan", "Visi dan Misi Ranting berhasil diperbarui dan disimpan.", "info");
    alert("Visi dan Misi Ranting Jatinom berhasil disimpan!");
  });

  // Setup Upload Signature & Stamp
  function setupUploadSignatureInput(inputId, storageKey) {
    document.getElementById(inputId)?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const base64 = evt.target.result;
        AnsorStore.setSignature(storageKey, base64);
        renderSignaturesPreview();
        alert(`Berkas digital ${storageKey} berhasil diunggah!`);
      };
      reader.readAsDataURL(file);
    });
  }

  setupUploadSignatureInput("upload-ttd-ketua", "ttdKetua");
  setupUploadSignatureInput("upload-ttd-sekretaris", "ttdSekretaris");
  setupUploadSignatureInput("upload-stempel-ansor", "stempelAnsor");
  setupUploadSignatureInput("upload-ttd-kasatkorkel", "ttdKasatkorkel");
  setupUploadSignatureInput("upload-ttd-kasetma", "ttdKasetma");
  setupUploadSignatureInput("upload-stempel-banser", "stempelBanser");
  setupUploadSignatureInput("upload-ttd-mds", "ttdMds");
  setupUploadSignatureInput("upload-ttd-sekretaris-mds", "ttdSekretarisMds");
  setupUploadSignatureInput("upload-stempel-mds", "stempelMds");

  // --- NAMA-NAMA PENGURUS RANTING JATINOM (TAB 5) ---
  function renderPengurusTable() {
    const tbody = document.getElementById("tbody-pengurus");
    if (!tbody) return;
    tbody.innerHTML = "";

    const filterBanom = state.currentPengurusFilter || "semua";
    const searchVal = (document.getElementById("search-pengurus")?.value || "").toLowerCase();

    const filtered = (state.pengurusList || []).filter((p) => {
      const matchBanom = filterBanom === "semua" || p.lembaga === filterBanom;
      const matchSearch = p.nama.toLowerCase().includes(searchVal) || p.jabatan.toLowerCase().includes(searchVal);
      return matchBanom && matchSearch;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-slate-400 italic">Tidak ada nama pengurus yang sesuai filter</td></tr>`;
      return;
    }

    filtered.forEach((p, idx) => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-50 transition border-b border-slate-100 text-xs";

      let badgeClass = "badge-ansor";
      if (p.lembaga === "Banser") badgeClass = "badge-banser";
      else if (p.lembaga === "Rijalul Ansor") badgeClass = "badge-rijalul";
      else if (p.lembaga === "Penasehat") badgeClass = "bg-amber-100 text-amber-800 border border-amber-200";
      else if (p.lembaga === "Biro") badgeClass = "bg-cyan-100 text-cyan-800 border border-cyan-200";

      tr.innerHTML = `
        <td class="py-2.5 px-3 font-semibold text-slate-500">${idx + 1}</td>
        <td class="py-2.5 px-3 font-bold text-slate-800">${p.jabatan}</td>
        <td class="py-2.5 px-3 font-bold text-ansor-dark">${p.nama}</td>
        <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${badgeClass}">${p.lembaga}</span></td>
        <td class="py-2.5 px-3 font-mono text-slate-600">${p.nia || "-"}</td>
        <td class="py-2.5 px-3">
          ${p.kontak && p.kontak !== "-" ? `<a href="https://wa.me/62${p.kontak.replace(/^0/, '')}" target="_blank" class="text-emerald-700 font-semibold hover:underline flex items-center gap-1"><i class="fa-brands fa-whatsapp text-emerald-600"></i> ${p.kontak}</a>` : `<span class="text-slate-400">-</span>`}
        </td>
        <td class="py-2.5 px-3 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <button data-id="${p.id}" class="btn-edit-pengurus px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded border border-amber-200 font-semibold text-[10px] flex items-center gap-1" title="Edit Pengurus">
              <i class="fa-solid fa-pen-to-square"></i>
              <span>Edit</span>
            </button>
            <button data-id="${p.id}" class="btn-hapus-pengurus px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded border border-red-200 font-semibold text-[10px]" title="Hapus">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Event listener edit & hapus
    document.querySelectorAll(".btn-edit-pengurus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        openModalPengurus(id);
      });
    });

    document.querySelectorAll(".btn-hapus-pengurus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        if (confirm("Hapus nama pengurus ini dari susunan pengurus ranting?")) {
          state.pengurusList = state.pengurusList.filter((p) => p.id !== id);
          AnsorStore.savePengurus(state.pengurusList);
          renderPengurusTable();
          renderLandingStats();
          fetch("api.php?action=delete_pengurus", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
          }).catch(() => {});
        }
      });
    });
  }

  // Modal Pengurus Add / Edit
  const modalPengurus = document.getElementById("modal-pengurus");
  const formModalPengurus = document.getElementById("form-modal-pengurus");

  function openModalPengurus(id = null) {
    if (!modalPengurus) return;
    formModalPengurus?.reset();

    if (id) {
      const p = (state.pengurusList || []).find((x) => x.id === id);
      if (p) {
        document.getElementById("edit-pengurus-id").value = p.id;
        document.getElementById("edit-pengurus-lembaga").value = p.lembaga;
        document.getElementById("edit-pengurus-jabatan").value = p.jabatan;
        document.getElementById("edit-pengurus-nama").value = p.nama;
        document.getElementById("edit-pengurus-nia").value = p.nia || "";
        document.getElementById("edit-pengurus-kontak").value = p.kontak || "";
        document.getElementById("edit-pengurus-urutan").value = p.urutan || 10;
        document.getElementById("modal-pengurus-title").textContent = "Edit Data Pengurus: " + p.nama;
      }
    } else {
      document.getElementById("edit-pengurus-id").value = "";
      document.getElementById("edit-pengurus-urutan").value = (state.pengurusList.length + 1);
      document.getElementById("modal-pengurus-title").textContent = "Tambah Pengurus Ranting Baru";
    }

    modalPengurus.classList.remove("hidden");
  }

  document.getElementById("btn-tambah-pengurus")?.addEventListener("click", () => openModalPengurus());
  document.getElementById("btn-close-modal-pengurus")?.addEventListener("click", () => modalPengurus?.classList.add("hidden"));
  document.getElementById("btn-batal-modal-pengurus")?.addEventListener("click", () => modalPengurus?.classList.add("hidden"));

  formModalPengurus?.addEventListener("submit", (e) => {
    e.preventDefault();
    const idVal = document.getElementById("edit-pengurus-id").value;
    const lembaga = document.getElementById("edit-pengurus-lembaga").value;
    const jabatan = document.getElementById("edit-pengurus-jabatan").value.trim();
    const nama = document.getElementById("edit-pengurus-nama").value.trim();
    const nia = document.getElementById("edit-pengurus-nia").value.trim() || "-";
    const kontak = document.getElementById("edit-pengurus-kontak").value.trim() || "-";
    const urutan = parseInt(document.getElementById("edit-pengurus-urutan").value) || 10;

    let savedItem = null;
    if (idVal) {
      const id = parseInt(idVal);
      const idx = state.pengurusList.findIndex((p) => p.id === id);
      savedItem = { id, lembaga, jabatan, nama, nia, kontak, urutan };
      if (idx !== -1) {
        state.pengurusList[idx] = savedItem;
      }
    } else {
      const newId = Date.now();
      savedItem = { id: newId, lembaga, jabatan, nama, nia, kontak, urutan };
      state.pengurusList.push(savedItem);
    }

    // Urutkan pengurus
    state.pengurusList.sort((a, b) => (a.urutan || 99) - (b.urutan || 99));
    AnsorStore.savePengurus(state.pengurusList);
    renderPengurusTable();
    renderLandingStats();
    if (savedItem) {
      fetch("api.php?action=save_pengurus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedItem)
      }).catch(() => {});
    }
    modalPengurus?.classList.add("hidden");
    alert("Data pengurus ranting berhasil disimpan!");
  });

  // Filter Pengurus Button Bar
  document.querySelectorAll(".btn-filter-pengurus").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-filter-pengurus").forEach((b) => {
        b.classList.remove("active", "bg-emerald-100", "text-ansor-dark", "border-emerald-200", "font-bold");
        b.classList.add("bg-slate-100", "text-slate-700", "font-medium");
      });
      btn.classList.add("active", "bg-emerald-100", "text-ansor-dark", "border-emerald-200", "font-bold");
      btn.classList.remove("bg-slate-100", "text-slate-700", "font-medium");
      state.currentPengurusFilter = btn.getAttribute("data-banom");
      renderPengurusTable();
    });
  });

  document.getElementById("search-pengurus")?.addEventListener("input", renderPengurusTable);

  // --- TAB 6: PENGATURAN (6 USER ROLES & IDENTITAS) ---
  function renderUserCards() {
    const container = document.getElementById("container-user-cards");
    if (!container) return;
    container.innerHTML = "";

    const isSuperAdmin = Boolean(state.currentUser && state.currentUser.role === "Super Admin");

    state.usersList.forEach((u) => {
      const isCurrent = state.currentUser && state.currentUser.id === u.id;

      const card = document.createElement("div");
      card.className = `p-5 rounded-2xl border transition relative overflow-hidden bg-white shadow-sm flex flex-col justify-between ${isCurrent ? "border-2 border-ansor ring-2 ring-ansor/20" : "border-slate-200"}`;
      card.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${u.badgeColor}">
              ${u.role}
            </span>
            ${isCurrent ? `<span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-600 text-white">Sedang Aktif</span>` : `<span class="text-[10px] text-slate-400 font-semibold">${u.status}</span>`}
          </div>

          <div>
            <h4 class="font-bold text-slate-800 text-sm">${u.nama}</h4>
            <div class="text-[11px] font-mono text-slate-500 mt-0.5">@${u.username} &bull; PIN: ••••</div>
            <p class="text-[11px] text-slate-600 mt-1">${u.akses}</p>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between gap-2">
          ${isCurrent ? `
          <span class="text-xs font-extrabold text-emerald-700 flex items-center gap-1.5 py-1">
            <i class="fa-solid fa-circle-check text-emerald-600"></i>
            <span>Akun Aktif Saat Ini</span>
          </span>
          ` : `
          <button data-id="${u.id}" class="btn-switch-user text-xs font-bold text-ansor hover:text-ansor-dark hover:underline flex items-center gap-1.5 py-1" title="Beralih ke akun ini melalui halaman login">
            <i class="fa-solid fa-arrow-right-to-bracket text-[10px]"></i>
            <span>Beralih ke Akun Ini</span>
          </button>
          `}
          ${isSuperAdmin ? `
          <button data-id="${u.id}" class="btn-edit-user-pin text-xs px-2.5 py-1 rounded bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 font-semibold flex items-center gap-1 transition" title="Ubah Sandi / PIN Akun (Khusus Super Admin)">
            <i class="fa-solid fa-key text-[10px]"></i>
            <span>Ubah PIN</span>
          </button>
          ` : `
          <span class="text-[11px] text-slate-400 font-medium flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 border border-slate-200 select-none cursor-not-allowed" title="Pengaturan kata sandi/PIN hanya dapat dilakukan oleh Super Admin">
            <i class="fa-solid fa-lock text-[10px] text-slate-400"></i>
            <span>Sandi Terkunci</span>
          </span>
          `}
        </div>
      `;
      container.appendChild(card);
    });

    // Switch User Click: Wajib melalui modal/halaman login untuk verifikasi PIN / Sandi
    document.querySelectorAll(".btn-switch-user").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-id");
        const found = state.usersList.find((x) => x.id === id);
        if (!found) return;

        if (state.currentUser && state.currentUser.id === found.id) {
          alert(`Anda saat ini sudah aktif masuk sebagai: ${found.role} (${found.nama})`);
          return;
        }

        // Buka halaman/modal login dengan akun tujuan terpilih, wajib verifikasi PIN
        openLoginModal(found.username);
      });
    });

    // Edit User PIN (Khusus Super Admin)
    document.querySelectorAll(".btn-edit-user-pin").forEach((b) => {
      b.addEventListener("click", async () => {
        if (!state.currentUser || state.currentUser.role !== "Super Admin") {
          alert("Akses Ditolak: Pengaturan dan perubahan kata sandi/PIN hanya berhak dilakukan oleh Super Admin!");
          return;
        }

        const id = b.getAttribute("data-id");
        const found = state.usersList.find((x) => x.id === id);
        if (!found) return;

        const newPin = prompt(`[Khusus Super Admin]\nMasukkan PIN / Kata Sandi baru untuk akun ${found.role} (${found.nama}):`, found.pin);
        if (newPin && newPin.trim()) {
          found.pin = newPin.trim();
          AnsorStore.saveUsers(state.usersList);

          // Update ke backend MySQL jika terhubung
          try {
            await fetch("api.php?action=update_user_pin", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: found.user_id || found.id,
                new_pin: newPin.trim(),
                caller_role: state.currentUser.role
              })
            });
          } catch (e) {
            // mode offline browser
          }

          renderUserCards();
          alert(`Kata Sandi / PIN untuk akun ${found.role} (${found.nama}) berhasil diperbarui oleh Super Admin!`);
        }
      });
    });

    populateSettingsInputs();
  }

  function populateSettingsInputs() {
    const s = state.settings || {};
    const setNama = document.getElementById("set-nama-ranting");
    if (setNama && s.namaRanting) setNama.value = s.namaRanting;
    const setWa = document.getElementById("set-wa-official");
    if (setWa && s.waOfficial) setWa.value = s.waOfficial;
    const setAlamat = document.getElementById("set-alamat-sekretariat");
    if (setAlamat && s.alamatSekretariat) setAlamat.value = s.alamatSekretariat;

    const medsos = s.medsos || {};
    const setFb = document.getElementById("set-medsos-facebook");
    if (setFb && medsos.facebook !== undefined) setFb.value = medsos.facebook;
    const setIg = document.getElementById("set-medsos-instagram");
    if (setIg && medsos.instagram !== undefined) setIg.value = medsos.instagram;
    const setYt = document.getElementById("set-medsos-youtube");
    if (setYt && medsos.youtube !== undefined) setYt.value = medsos.youtube;
    const setTt = document.getElementById("set-medsos-tiktok");
    if (setTt && medsos.tiktok !== undefined) setTt.value = medsos.tiktok;
  }

  function renderMedsosLinks() {
    const s = state.settings || {};
    const m = s.medsos || {
      facebook: "https://facebook.com/ansor.jatinom",
      instagram: "https://instagram.com/ansor_jatinom",
      youtube: "https://youtube.com/@ansorjatinom",
      tiktok: "https://tiktok.com/@ansor_jatinom"
    };

    // Helper untuk update atribut link atau sembunyikan jika kosong
    const updateLink = (id, url) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (url && url.trim()) {
        el.href = url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`;
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    };

    // Landing Page Footer Links
    updateLink("landing-link-facebook", m.facebook);
    updateLink("landing-link-instagram", m.instagram);
    updateLink("landing-link-youtube", m.youtube);
    updateLink("landing-link-tiktok", m.tiktok);

    // App Footer Links
    updateLink("app-link-facebook", m.facebook);
    updateLink("app-link-instagram", m.instagram);
    updateLink("app-link-youtube", m.youtube);
    updateLink("app-link-tiktok", m.tiktok);

    // Landing Page Kontak Section Links
    updateLink("kontak-link-facebook", m.facebook);
    updateLink("kontak-link-instagram", m.instagram);
    updateLink("kontak-link-youtube", m.youtube);
    updateLink("kontak-link-tiktok", m.tiktok);

    // Update Kontak WA Text di Landing Page
    const kontakWaText = document.getElementById("landing-kontak-wa");
    if (kontakWaText && s.waOfficial) {
      kontakWaText.textContent = `${s.waOfficial} (Ketua / Sekretariat)`;
    }
  }

  // Form Setting Identitas Ranting Submit
  const handleSettingSubmit = (e) => {
    e.preventDefault();
    const setNamaRanting = document.getElementById("set-nama-ranting");
    if (setNamaRanting) state.settings.namaRanting = setNamaRanting.value.trim();
    const setAlamat = document.getElementById("set-alamat-sekretariat");
    if (setAlamat) state.settings.alamatSekretariat = setAlamat.value.trim();
    const setWa = document.getElementById("set-wa-official");
    if (setWa) state.settings.waOfficial = setWa.value.trim();

    // Medsos Settings
    if (!state.settings.medsos) state.settings.medsos = {};
    const setFb = document.getElementById("set-medsos-facebook");
    if (setFb) state.settings.medsos.facebook = setFb.value.trim();
    const setIg = document.getElementById("set-medsos-instagram");
    if (setIg) state.settings.medsos.instagram = setIg.value.trim();
    const setYt = document.getElementById("set-medsos-youtube");
    if (setYt) state.settings.medsos.youtube = setYt.value.trim();
    const setTt = document.getElementById("set-medsos-tiktok");
    if (setTt) state.settings.medsos.tiktok = setTt.value.trim();

    const setKetua = document.getElementById("set-ketua-nama");
    if (setKetua) state.settings.ketuaNama = setKetua.value.trim();
    const setKetuaNia = document.getElementById("set-ketua-nia");
    if (setKetuaNia) state.settings.ketuaNia = setKetuaNia.value.trim();

    const setSek = document.getElementById("set-sekretaris-nama");
    if (setSek) state.settings.sekretarisNama = setSek.value.trim();
    const setSekNia = document.getElementById("set-sekretaris-nia");
    if (setSekNia) state.settings.sekretarisNia = setSekNia.value.trim();

    const setKasat = document.getElementById("set-kasatkorkel-nama");
    if (setKasat) state.settings.kasatkorkelNama = setKasat.value.trim();
    const setMds = document.getElementById("set-mds-nama");
    if (setMds) state.settings.ketuaMdsNama = setMds.value.trim();

    AnsorStore.saveSettings(state.settings);

    // Sync Kop Inputs if they exist
    const inpTtdKetua = document.getElementById("setting-ttd2-nama") || document.getElementById("input-ttd-ketua");
    if (inpTtdKetua) inpTtdKetua.value = state.settings.ketuaNama;
    const inpNiaKetua = document.getElementById("setting-ttd2-nia") || document.getElementById("input-nia-ketua");
    if (inpNiaKetua) inpNiaKetua.value = "NIA: " + state.settings.ketuaNia;

    const inpTtdSek = document.getElementById("setting-ttd1-nama") || document.getElementById("input-ttd-sekretaris");
    if (inpTtdSek) inpTtdSek.value = state.settings.sekretarisNama;
    const inpNiaSek = document.getElementById("setting-ttd1-nia") || document.getElementById("input-nia-sekretaris");
    if (inpNiaSek) inpNiaSek.value = "NIA: " + state.settings.sekretarisNia;

    const inpAlamatKop = document.getElementById("setting-alamat-kop") || document.getElementById("kop-alamat");
    if (inpAlamatKop) inpAlamatKop.value = state.settings.alamatSekretariat;

    renderProfilDetails();
    renderMedsosLinks();
    alert("Pengaturan identitas dan media sosial ranting berhasil disimpan!");
  };

  document.getElementById("form-settings-umum")?.addEventListener("submit", handleSettingSubmit);
  document.getElementById("form-setting-identitas")?.addEventListener("submit", handleSettingSubmit);

  // Reset Data Dummy ke Nol (Mulai dari Awal) - Khusus Super Admin
  document.getElementById("btn-reset-data-nol")?.addEventListener("click", () => {
    if (!state.currentUser || state.currentUser.role !== "Super Admin") {
      alert("Akses Ditolak: Fitur pengosongan data dummy hanya dapat dilakukan oleh Super Admin.");
      return;
    }
    const konfirmasi = confirm(
      "PERINGATAN MANAJEMEN DATA:\n\n" +
      "Apakah Anda yakin ingin MENGOSONGKAN seluruh data dummy (Kader, Agenda Kegiatan, Arsip Surat, Warta Berita, Keuangan, dan Riwayat Notifikasi)?\n\n" +
      "Setelah dikosongkan, seluruh data akan bernilai 0 (nol) agar siap diinput data riil dari awal.\n" +
      "Catatan: 6 Akun Pengurus resmi dan Pengaturan Ranting TIDAK akan terhapus."
    );
    if (!konfirmasi) return;

    AnsorStore.resetAllDataToZero();

    // Perbarui state in-memory
    state.kaderList = AnsorStore.getKader();
    state.agendaList = AnsorStore.getAgenda();
    state.arsipList = AnsorStore.getArsip();
    state.beritaList = AnsorStore.getBerita();
    state.notifikasiList = AnsorStore.getNotifikasi();
    state.keuanganList = AnsorStore.getKeuangan();

    // Render ulang seluruh tampilan
    renderDashboard();
    renderKaderTable();
    updateKaderStats();
    renderAgendaCards();
    renderArsipTable();
    renderBeritaGrid();
    renderKeuangan();
    updateNotificationBell();

    alert("Berhasil! Seluruh data dummy telah dikosongkan ke 0 (nol). Sistem SAHABAT Jatinom kini bersih dan siap diisi data riil ranting.");
  });

  // --- NOTIFIKASI SYSTEM ---
  function addNotification(judul, pesan, kategori = "info") {
    const item = {
      id: "NTF-" + Date.now().toString().slice(-4),
      judul,
      pesan,
      waktu: "Baru saja",
      dibaca: false,
      kategori
    };
    state.notifikasiList.unshift(item);
    AnsorStore.saveNotifikasi(state.notifikasiList);
    updateNotificationBell();
  }

  function updateNotificationBell() {
    const unreadCount = state.notifikasiList.filter((n) => !n.dibaca).length;
    const badge = document.getElementById("badge-notifikasi-count");
    if (badge) {
      badge.textContent = unreadCount;
      if (unreadCount === 0) {
        badge.classList.add("hidden");
      } else {
        badge.classList.remove("hidden");
        badge.style.display = "flex";
      }
    }
    renderNotificationList();
  }

  function renderNotificationList() {
    const container = document.getElementById("list-notifikasi-container");
    if (!container) return;
    container.innerHTML = "";

    if (state.notifikasiList.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-slate-400 italic">Tidak ada notifikasi aktif.</div>`;
      return;
    }

    state.notifikasiList.forEach((n) => {
      let icon = `<i class="fa-solid fa-bell text-gold"></i>`;
      if (n.kategori === "agenda") icon = `<i class="fa-solid fa-calendar-check text-emerald-600"></i>`;
      if (n.kategori === "surat") icon = `<i class="fa-solid fa-envelope-open-text text-amber-600"></i>`;
      if (n.kategori === "kader") icon = `<i class="fa-solid fa-user-plus text-blue-600"></i>`;
      if (n.kategori === "warta") icon = `<i class="fa-solid fa-newspaper text-cyan-600"></i>`;

      const div = document.createElement("div");
      div.className = `p-3 flex items-start gap-3 hover:bg-slate-50 transition cursor-pointer ${n.dibaca ? "opacity-75" : "bg-emerald-50/40"}`;
      div.innerHTML = `
        <div class="mt-0.5 w-6 h-6 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center shrink-0 text-xs">
          ${icon}
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h5 class="font-bold text-slate-800 text-xs">${n.judul}</h5>
            <span class="text-[10px] text-slate-400">${n.waktu}</span>
          </div>
          <p class="text-[11px] text-slate-600 mt-0.5">${n.pesan}</p>
        </div>
      `;
      div.addEventListener("click", () => {
        n.dibaca = true;
        AnsorStore.saveNotifikasi(state.notifikasiList);
        updateNotificationBell();
      });
      container.appendChild(div);
    });
  }

  const btnToggleNotif = document.getElementById("btn-toggle-notifikasi");
  const dropdownNotif = document.getElementById("dropdown-notifikasi");
  btnToggleNotif?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dropdownNotif) return;
    const isHidden = dropdownNotif.classList.contains("hidden");
    if (isHidden) {
      renderNotificationList();
      dropdownNotif.classList.remove("hidden");
    } else {
      dropdownNotif.classList.add("hidden");
    }
  });

  dropdownNotif?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (dropdownNotif && !dropdownNotif.classList.contains("hidden")) {
      if (!dropdownNotif.contains(e.target) && !btnToggleNotif?.contains(e.target)) {
        dropdownNotif.classList.add("hidden");
      }
    }
  });

  document.getElementById("btn-mark-all-read")?.addEventListener("click", () => {
    state.notifikasiList.forEach((n) => (n.dibaca = true));
    AnsorStore.saveNotifikasi(state.notifikasiList);
    updateNotificationBell();
  });

  // --- EMBED & BACKUP / RESTORE MODALS ---
  const modalEmbed = document.getElementById("modal-embed");
  document.getElementById("btn-open-embed")?.addEventListener("click", () => modalEmbed?.classList.remove("hidden"));
  document.getElementById("btn-close-embed")?.addEventListener("click", () => modalEmbed?.classList.add("hidden"));

  const modalBackup = document.getElementById("modal-backup");
  document.getElementById("btn-open-backup")?.addEventListener("click", () => modalBackup?.classList.remove("hidden"));
  document.getElementById("btn-close-backup")?.addEventListener("click", () => modalBackup?.classList.add("hidden"));

  // Download Backup JSON
  document.getElementById("btn-download-backup")?.addEventListener("click", () => {
    const backupData = {
      appName: "SAHABAT Jatinom",
      ranting: state.settings.namaRanting,
      backupDate: new Date().toISOString(),
      kader: state.kaderList,
      agenda: state.agendaList,
      arsip: state.arsipList,
      berita: state.beritaList,
      settings: state.settings,
      users: state.usersList,
      signatures: state.signatures,
      notifikasi: state.notifikasiList,
      suratCounter: AnsorStore.getNextNomorSurat()
    };

    const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dl = document.createElement("a");
    dl.setAttribute("href", str);
    dl.setAttribute("download", `Backup_SAHABAT_Jatinom_${todayStr}.json`);
    document.body.appendChild(dl);
    dl.click();
    document.body.removeChild(dl);
  });

  // Restore JSON File
  document.getElementById("input-restore-file")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target.result);
        if (json.kader) state.kaderList = json.kader;
        if (json.agenda) state.agendaList = json.agenda;
        if (json.arsip) state.arsipList = json.arsip;
        if (json.berita) state.beritaList = json.berita;
        if (json.settings) state.settings = json.settings;
        if (json.users) state.usersList = json.users;
        if (json.signatures) state.signatures = json.signatures;
        if (json.notifikasi) state.notifikasiList = json.notifikasi;

        AnsorStore.saveKader(state.kaderList);
        AnsorStore.saveAgenda(state.agendaList);
        AnsorStore.saveArsip(state.arsipList);
        AnsorStore.saveBerita(state.beritaList);
        AnsorStore.saveSettings(state.settings);
        AnsorStore.saveUsers(state.usersList);
        AnsorStore.saveSignatures(state.signatures);
        AnsorStore.saveNotifikasi(state.notifikasiList);

        if (json.suratCounter) {
          localStorage.setItem("sahabat_surat_counter", json.suratCounter.toString());
        }

        alert("Data berhasil dipulihkan dari file cadangan!");
        modalBackup?.classList.add("hidden");
        location.reload();
      } catch (err) {
        alert("Gagal membaca file JSON. Pastikan format file cadangan valid.");
      }
    };
    reader.readAsText(file);
  });

  // Reset to default data
  document.getElementById("btn-reset-data")?.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin mereset seluruh data kembali ke kondisi awal bawaan Ranting Jatinom?")) {
      AnsorStore.resetAll();
      alert("Data berhasil direset!");
      location.reload();
    }
  });

  // Modal Backup Trigger Handlers
  document.getElementById("btn-download-backup-json")?.addEventListener("click", () => {
    const backupData = {
      appName: "SAHABAT Jatinom",
      ranting: state.settings.namaRanting,
      backupDate: new Date().toISOString(),
      kader: state.kaderList,
      agenda: state.agendaList,
      arsip: state.arsipList,
      berita: state.beritaList,
      pengurus: state.pengurusList,
      settings: state.settings,
      users: state.usersList,
      signatures: state.signatures,
      notifikasi: state.notifikasiList,
      suratCounter: AnsorStore.getNextNomorSurat()
    };

    const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dl = document.createElement("a");
    dl.setAttribute("href", str);
    dl.setAttribute("download", `Backup_SAHABAT_Jatinom_${todayStr}.json`);
    document.body.appendChild(dl);
    dl.click();
    document.body.removeChild(dl);
  });

  document.getElementById("input-file-restore")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target.result);
        if (json.kader) state.kaderList = json.kader;
        if (json.agenda) state.agendaList = json.agenda;
        if (json.arsip) state.arsipList = json.arsip;
        if (json.berita) state.beritaList = json.berita;
        if (json.pengurus) state.pengurusList = json.pengurus;
        if (json.settings) state.settings = json.settings;
        if (json.users) state.usersList = json.users;
        if (json.signatures) state.signatures = json.signatures;
        if (json.notifikasi) state.notifikasiList = json.notifikasi;

        AnsorStore.saveKader(state.kaderList);
        AnsorStore.saveAgenda(state.agendaList);
        AnsorStore.saveArsip(state.arsipList);
        AnsorStore.saveBerita(state.beritaList);
        AnsorStore.savePengurus(state.pengurusList);
        AnsorStore.saveSettings(state.settings);
        AnsorStore.saveUsers(state.usersList);
        AnsorStore.saveSignatures(state.signatures);
        AnsorStore.saveNotifikasi(state.notifikasiList);

        alert("Data berhasil dipulihkan dari file cadangan!");
        document.getElementById("modal-backup")?.classList.add("hidden");
        location.reload();
      } catch (err) {
        alert("Gagal membaca file JSON. Pastikan format file cadangan valid.");
      }
    };
    reader.readAsText(file);
  });

  document.getElementById("btn-reset-pabrik")?.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin mereset seluruh data kembali ke kondisi awal bawaan Ranting Jatinom?")) {
      AnsorStore.resetAll();
      alert("Data berhasil direset!");
      location.reload();
    }
  });

  // --- INITIAL RUN ---
  renderAllLogos();
  renderLoginRoleButtons();
  updateHeaderUserBadge();
  setSubSurat("ansor");
  renderDashboard();    // Dashboard pertama kali
  renderBeritaGrid();
  renderArsipTable();
  updateKaderStats();
  renderKaderTable();
  renderAgendaCards();
  renderKeuangan();
  renderProfilDetails();
  renderPengurusTable();
  renderUserCards();
  populateSettingsInputs();
  renderMedsosLinks();
  updateNotificationBell();

  // Update judul header ke Dashboard saat pertama load
  const pageTitleEl = document.getElementById("page-active-title");
  if (pageTitleEl) pageTitleEl.textContent = "Dashboard Ranting";

  // ==================== FITUR LANDING PAGE PUBLIK ====================
  let landingActiveWartaKategori = "semua";
  let landingSearchWartaKeyword = "";
  let landingActivePengurusBanom = "semua";

  function switchToLandingMode() {
    document.documentElement.classList.remove("initial-app");
    document.documentElement.classList.add("initial-landing");
    document.body.classList.add("viewing-landing");
    document.body.classList.remove("viewing-app");
    if (modalLoginPortal) {
      modalLoginPortal.classList.add("hidden");
      modalLoginPortal.style.display = "";
    }

    // Admin bar di atas landing page (muncul jika sudah login)
    const adminBar = document.getElementById("landing-admin-bar");
    const isSessionActive = sessionStorage.getItem("sahabat_session_active") === "true";
    if (adminBar) {
      if (isSessionActive && state.currentUser) {
        adminBar.classList.remove("hidden");
        const adminNama = document.getElementById("landing-admin-nama");
        const adminRole = document.getElementById("landing-admin-role");
        if (adminNama) adminNama.textContent = state.currentUser.nama;
        if (adminRole) adminRole.textContent = state.currentUser.role;
      } else {
        adminBar.classList.add("hidden");
      }
    }

    renderLandingStats();
    renderLandingWarta(landingActiveWartaKategori, landingSearchWartaKeyword);
    renderLandingPengurus(landingActivePengurusBanom);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function switchToAppMode() {
    document.documentElement.classList.remove("initial-landing");
    document.documentElement.classList.add("initial-app");
    document.body.classList.remove("viewing-landing");
    document.body.classList.add("viewing-app");
    if (modalLoginPortal) {
      modalLoginPortal.classList.add("hidden");
      modalLoginPortal.style.display = "";
    }
    const adminBar = document.getElementById("landing-admin-bar");
    if (adminBar) adminBar.classList.add("hidden");

    if (typeof renderDashboard === "function") renderDashboard();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function openLoginModal(targetUsername = null) {
    document.getElementById("login-error-msg")?.classList.add("hidden");
    const pinInput = document.getElementById("login-pin");
    if (pinInput) pinInput.value = "";
    if (modalLoginPortal) {
      modalLoginPortal.classList.remove("hidden");
      modalLoginPortal.style.display = "flex";
    }
    renderLoginRoleButtons();

    if (targetUsername) {
      const selectEl = document.getElementById("login-username");
      if (selectEl) {
        selectEl.value = targetUsername;
        selectEl.dispatchEvent(new Event("change"));
      }
    }

    setTimeout(() => {
      pinInput?.focus();
    }, 80);
  }

  function closeLoginModal() {
    if (modalLoginPortal) {
      modalLoginPortal.classList.add("hidden");
      modalLoginPortal.style.display = "";
    }
  }

  function logoutSession() {
    if (confirm("Apakah Anda yakin ingin keluar dari akun pengurus?")) {
      sessionStorage.removeItem("sahabat_session_active");
      state.currentUser = null;
      addNotification("Sesi Berakhir", "Anda telah keluar ke portal publik.", "info");
      switchToLandingMode();
    }
  }

  function renderLandingStats() {
    const elWarta = document.getElementById("landing-stat-warta");
    if (elWarta) elWarta.textContent = (state.beritaList || []).length;

    const elKader = document.getElementById("landing-stat-kader");
    const totalKader = (state.kaderList || []).length;
    if (elKader) elKader.textContent = totalKader;

    const elPengurus = document.getElementById("landing-stat-pengurus");
    const pengurusList = (state.pengurusList && state.pengurusList.length > 0) ? state.pengurusList : AnsorStore.getPengurus();
    if (elPengurus) elPengurus.textContent = pengurusList.length;

    const elAgenda = document.getElementById("landing-stat-agenda");
    const totalAgenda = (state.agendaList || []).length;
    if (elAgenda) elAgenda.textContent = totalAgenda;
  }

  function renderLandingWarta(kategori = "semua", keyword = "") {
    const container = document.getElementById("landing-warta-grid");
    if (!container) return;

    let list = [...(state.beritaList || [])];

    if (kategori && kategori !== "semua") {
      list = list.filter((b) => (b.kategori || "").toLowerCase().includes(kategori.toLowerCase()));
    }

    if (keyword && keyword.trim() !== "") {
      const q = keyword.toLowerCase().trim();
      list = list.filter((b) => (b.judul || "").toLowerCase().includes(q) || (b.ringkasan || "").toLowerCase().includes(q) || (b.isi || "").toLowerCase().includes(q));
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500 bg-slate-950/60 rounded-2xl border border-slate-800">
          <i class="fa-solid fa-newspaper text-3xl text-slate-700 mb-2"></i>
          <p class="text-xs italic">Belum ada warta informasi pada kategori atau pencarian ini.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map((b) => {
      let badgeColor = "bg-emerald-900/80 text-emerald-300 border-emerald-700/60";
      if ((b.kategori || "").includes("BANSER")) badgeColor = "bg-red-900/80 text-red-300 border-red-700/60";
      else if ((b.kategori || "").includes("Rijalul")) badgeColor = "bg-amber-900/80 text-gold border-amber-700/60";
      else if ((b.kategori || "").includes("Sosial")) badgeColor = "bg-cyan-900/80 text-cyan-300 border-cyan-700/60";

      const defaultImg = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80";
      const gambarSrc = b.gambar || defaultImg;

      return `
        <article class="bg-slate-950 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-lg hover:shadow-emerald-950/40">
          <div class="relative h-48 overflow-hidden bg-slate-900 cursor-pointer" onclick="openBacaBerita('${b.id}')">
            <img src="${gambarSrc}" alt="${b.judul}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='${defaultImg}'" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            <span class="absolute top-3 left-3 text-[10.5px] font-extrabold uppercase px-2.5 py-1 rounded-full border shadow backdrop-blur-md ${badgeColor}">
              ${b.kategori || "Warta"}
            </span>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2.5">
              <div class="flex items-center gap-2 text-[11px] text-slate-400">
                <span><i class="fa-regular fa-calendar-check text-emerald-400 mr-1"></i>${b.tanggal || "-"}</span>
                <span>&bull;</span>
                <span class="truncate"><i class="fa-regular fa-user text-gold mr-1"></i>${b.penulis || "Redaksi"}</span>
              </div>
              <h3 class="font-bold text-white text-sm sm:text-base leading-snug group-hover:text-gold transition-colors line-clamp-2 cursor-pointer" onclick="openBacaBerita('${b.id}')">
                ${b.judul}
              </h3>
              <p class="text-xs text-slate-400 leading-relaxed line-clamp-3">
                ${b.ringkasan || (b.isi ? b.isi.substring(0, 120) + "..." : "")}
              </p>
            </div>

            <div class="pt-3 border-t border-slate-900 flex items-center justify-between">
              <button type="button" onclick="openBacaBerita('${b.id}')" class="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition">
                <span>Baca Selengkapnya</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
              <button type="button" onclick="shareWartaWa('${b.id}')" class="text-slate-400 hover:text-emerald-400 text-xs p-1.5 transition" title="Bagikan ke WhatsApp">
                <i class="fa-brands fa-whatsapp text-sm"></i>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function shareWartaWa(id) {
    const b = (state.beritaList || []).find((x) => x.id === id);
    if (!b) return;
    const msg = `*WARTA RESMI GP ANSOR RANTING JATINOM*\n\n*${b.judul}*\n_${b.tanggal} | Oleh: ${b.penulis}_\n\n${b.ringkasan}\n\nSelengkapnya dapat disimak pada portal resmi SAHABAT Jatinom (Kec. Kanigoro, Kab. Blitar).\n\n_Wallahul Muwaffiq Ila Aqwamith Thorieq_`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, "_blank");
  }
  window.shareWartaWa = shareWartaWa;

  function renderLandingPengurus(filterBanom = "semua") {
    const container = document.getElementById("landing-pengurus-grid");
    if (!container) return;

    let list = (state.pengurusList && state.pengurusList.length > 0) ? state.pengurusList : AnsorStore.getPengurus();

    if (filterBanom && filterBanom !== "semua") {
      list = list.filter((p) => (p.lembaga || "").toLowerCase() === filterBanom.toLowerCase());
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-10 text-center text-slate-400 bg-slate-900/60 rounded-2xl border border-slate-800">
          <i class="fa-solid fa-users text-3xl text-slate-600 mb-2"></i>
          <p class="font-bold text-sm text-slate-300">Belum Ada Susunan Pengurus</p>
          <p class="text-xs text-slate-500 mt-1">Data susunan pengurus ranting siap diinputkan mulai dari nol melalui Portal Administrasi.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map((p) => {
      let icon = "fa-user-tie";
      let badgeClass = "bg-emerald-950 text-emerald-300 border-emerald-700/60";
      let borderGlow = "hover:border-emerald-500/50";

      if (p.lembaga === "Banser") {
        icon = "fa-shield-halved";
        badgeClass = "bg-red-950 text-red-300 border-red-700/60";
        borderGlow = "hover:border-red-500/50";
      } else if (p.lembaga === "Rijalul Ansor") {
        icon = "fa-mosque";
        badgeClass = "bg-amber-950 text-gold border-amber-700/60";
        borderGlow = "hover:border-gold/50";
      } else if (p.lembaga === "Penasehat") {
        icon = "fa-landmark";
        badgeClass = "bg-slate-800 text-slate-300 border-slate-700";
        borderGlow = "hover:border-slate-500";
      } else if (p.lembaga === "Biro") {
        icon = "fa-laptop-code";
        badgeClass = "bg-cyan-950 text-cyan-300 border-cyan-700/60";
        borderGlow = "hover:border-cyan-500/50";
      }

      return `
        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 ${borderGlow} transition shadow flex items-start gap-3.5 group">
          <div class="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center shrink-0 text-sm group-hover:scale-105 transition-transform">
            <i class="fa-solid ${icon} text-gold"></i>
          </div>
          <div class="flex-1 min-w-0 space-y-1">
            <div class="flex items-center justify-between gap-1">
              <span class="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${badgeClass}">
                ${p.lembaga}
              </span>
              <span class="text-[10px] font-mono text-slate-500 truncate">${p.nia && p.nia !== "-" ? "NIA: " + p.nia : ""}</span>
            </div>
            <h4 class="font-bold text-white text-xs truncate group-hover:text-gold transition-colors">
              ${p.nama}
            </h4>
            <p class="text-[11px] text-slate-400 font-medium truncate">
              ${p.jabatan}
            </p>
          </div>
        </div>
      `;
    }).join("");
  }

  function initLandingPage() {
    // Tombol-tombol pemicu login dari landing page
    ["btn-landing-open-login", "btn-hero-login", "btn-kontak-login", "btn-footer-login"].forEach((id) => {
      document.getElementById(id)?.addEventListener("click", openLoginModal);
    });

    // Tombol kembali ke beranda dari modal login
    document.getElementById("btn-login-back-landing")?.addEventListener("click", closeLoginModal);

    // Tombol dari admin bar landing page menuju admin dashboard
    document.getElementById("btn-landing-to-admin")?.addEventListener("click", switchToAppMode);
    document.getElementById("btn-landing-logout")?.addEventListener("click", logoutSession);

    // Tombol dari admin dashboard menuju landing page
    document.getElementById("btn-view-landing-page")?.addEventListener("click", switchToLandingMode);
    document.getElementById("sidebar-btn-landing-page")?.addEventListener("click", () => {
      switchToLandingMode();
      closeSidebar();
    });
    document.getElementById("sidebar-btn-logout")?.addEventListener("click", () => {
      logoutSession();
      closeSidebar();
    });

    // Filter kategori Warta pada Landing Page
    const filterWartaContainer = document.getElementById("landing-filter-warta");
    if (filterWartaContainer) {
      filterWartaContainer.querySelectorAll(".btn-landing-warta-filter").forEach((btn) => {
        btn.addEventListener("click", () => {
          filterWartaContainer.querySelectorAll(".btn-landing-warta-filter").forEach((b) => {
            b.className = "btn-landing-warta-filter px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition";
          });
          btn.className = "btn-landing-warta-filter active px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white border border-emerald-500 shadow-sm transition";
          landingActiveWartaKategori = btn.getAttribute("data-kategori") || "semua";
          renderLandingWarta(landingActiveWartaKategori, landingSearchWartaKeyword);
        });
      });
    }

    // Input live search warta
    document.getElementById("landing-search-warta")?.addEventListener("input", (e) => {
      landingSearchWartaKeyword = e.target.value;
      renderLandingWarta(landingActiveWartaKategori, landingSearchWartaKeyword);
    });

    // Filter Banom Pengurus pada Landing Page
    const filterPengurusContainer = document.getElementById("landing-filter-pengurus");
    if (filterPengurusContainer) {
      filterPengurusContainer.querySelectorAll(".btn-landing-pengurus-filter").forEach((btn) => {
        btn.addEventListener("click", () => {
          filterPengurusContainer.querySelectorAll(".btn-landing-pengurus-filter").forEach((b) => {
            b.className = "btn-landing-pengurus-filter px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700 transition";
          });
          btn.className = "btn-landing-pengurus-filter active px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white border border-emerald-500 shadow-sm transition";
          landingActivePengurusBanom = btn.getAttribute("data-banom") || "semua";
          renderLandingPengurus(landingActivePengurusBanom);
        });
      });
    }
  }

  initLandingPage();

  // Inisialisasi Tampilan: Cek Sesi Aktif Pengurus vs Landing Page Publik
  const isSessionActive = sessionStorage.getItem("sahabat_session_active") === "true";
  const hasValidUser = state.currentUser && state.currentUser.pin;
  if (isSessionActive && hasValidUser) {
    switchToAppMode();
  } else {
    sessionStorage.removeItem("sahabat_session_active");
    switchToLandingMode();
  }

  // XAMPP MySQL Live Check & Auto-Sync Data Real
  AnsorStore.checkXamppStatus().then(async (res) => {
    const pill = document.getElementById("sidebar-xampp-pill");
    if (pill && res.db_connected) {
      pill.innerHTML = `
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-medium text-emerald-200">XAMPP MySQL Terhubung</span>
        </div>
        <span class="font-mono text-[9px] text-gold font-bold">DB: db_sahabat</span>
      `;

      // Sinkronisasi data Pengurus Real dari database MySQL
      try {
        const respP = await fetch("api.php?action=get_pengurus");
        if (respP.ok) {
          const jsonP = await respP.json();
          if (jsonP && jsonP.success && Array.isArray(jsonP.data)) {
            state.pengurusList = jsonP.data;
            AnsorStore.savePengurus(state.pengurusList);
            renderLandingStats();
            renderLandingPengurus(landingActivePengurusBanom);
            if (typeof renderPengurusTable === "function") renderPengurusTable();
          }
        }
      } catch (errSync) {
        // Fallback LocalStorage
      }

      // Sinkronisasi data Warta Real dari database MySQL
      try {
        const respW = await fetch("api.php?action=get_warta");
        if (respW.ok) {
          const jsonW = await respW.json();
          if (jsonW && jsonW.success && Array.isArray(jsonW.data)) {
            state.beritaList = jsonW.data;
            AnsorStore.saveBerita(state.beritaList);
            renderLandingStats();
            renderLandingWarta(landingActiveWartaKategori, landingSearchWartaKeyword);
          }
        }
      } catch (errW) {
        // Fallback LocalStorage
      }

      // Sinkronisasi data Kader Real dari database MySQL
      try {
        const respK = await fetch("api.php?action=get_kader");
        if (respK.ok) {
          const jsonK = await respK.json();
          if (jsonK && jsonK.success && Array.isArray(jsonK.data)) {
            state.kaderList = jsonK.data;
            AnsorStore.saveKader(state.kaderList);
            renderLandingStats();
          }
        }
      } catch (errK) {
        // Fallback LocalStorage
      }

      // Sinkronisasi data Agenda Real dari database MySQL
      try {
        const respA = await fetch("api.php?action=get_agenda");
        if (respA.ok) {
          const jsonA = await respA.json();
          if (jsonA && jsonA.success && Array.isArray(jsonA.data)) {
            state.agendaList = jsonA.data;
            AnsorStore.saveAgenda(state.agendaList);
            renderLandingStats();
          }
        }
      } catch (errA) {
        // Fallback LocalStorage
      }
    }
  });
});
