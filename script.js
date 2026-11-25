const CLUSTERS = {
  logic: {
    name: "Logika & Sistem",
    color: "#0284c7",
    maxScore: 8,
    majors: ["Informatika / Ilmu Komputer", "Sistem Informasi", "Teknik Elektro"],
    careers: ["Software Engineer", "System Analyst", "IT Support / DevOps"],
    description:
      "Cocok untuk kamu yang menikmati pemecahan masalah bertahap, merancang alur kerja, dan membangun solusi berbasis teknologi.",
    roadmap: [
      "Pelajari dasar logika pemrograman (variabel, percabangan, perulangan) selama 4 minggu.",
      "Buat 1 proyek kecil sederhana dan unggah ke repositori GitHub.",
      "Ikuti lomba/tantangan logika atau olimpiade sains/teknologi tingkat sekolah."
    ]
  },
  data: {
    name: "Analisis Data & Riset",
    color: "#7c3aed",
    maxScore: 8,
    majors: ["Sains Data", "Statistika", "Aktuaria"],
    careers: ["Data Analyst", "Business Intelligence Analyst", "Researcher"],
    description:
      "Cocok untuk kamu yang gemar membaca angka, menemukan pola tersembunyi, dan mengambil keputusan berbasis bukti.",
    roadmap: [
      "Kuasai dasar spreadsheet (rumus logika, pivot, grafik) dan membaca dataset sederhana.",
      "Latihan menyusun laporan singkat dari data survei atau data publik simulasi.",
      "Bangun portofolio mini analisis tren yang mudah dipresentasikan."
    ]
  },
  comm: {
    name: "Komunikasi & Sosial",
    color: "#e11d48",
    maxScore: 8,
    majors: ["Ilmu Komunikasi", "Psikologi", "Hubungan Internasional"],
    careers: ["Content Strategist", "Public Relations", "HR / Community Specialist"],
    description:
      "Cocok untuk kamu yang komunikatif, empatik, mudah bekerja sama dalam tim, dan terampil menyampaikan ide.",
    roadmap: [
      "Latih kemampuan presentasi terstruktur dan menulis ringkasan gagasan.",
      "Aktif berorganisasi, kepanitiaan, atau diskusi kelompok untuk mengasah kolaborasi.",
      "Susun portofolio tulisan, kampanye edukasi, atau proyek komunikasi tim."
    ]
  },
  biz: {
    name: "Bisnis & Ekonomi",
    color: "#d97706",
    maxScore: 8,
    majors: ["Manajemen", "Ekonomi / Ekonomi Syariah", "Akuntansi"],
    careers: ["Product / Project Manager", "Financial Analyst", "Entrepreneur"],
    description:
      "Cocok untuk kamu yang tertarik pada pengelolaan sumber daya, perencanaan strategi, keuangan, dan peluang usaha.",
    roadmap: [
      "Pelajari konsep dasar keuangan pribadi, arus kas, dan model bisnis sederhana.",
      "Simulasikan perencanaan anggaran atau studi kasus bisnis kecil.",
      "Ikuti kompetisi bisnis plan atau analisis kasus ekonomi/keuangan."
    ]
  }
};

const QUESTIONS = [
  {
    id: 1,
    cluster: "logic",
    text: "Saya senang menyusun langkah-langkah sistematis saat menghadapi masalah yang rumit.",
    hint: "Pikirkan saat kamu memecah tugas besar menjadi urutan langkah kecil."
  },
  {
    id: 2,
    cluster: "logic",
    text: "Saya tertarik memahami cara kerja aplikasi, situs web, atau sistem otomatis di balik layar.",
    hint: "Misalnya penasaran bagaimana tombol, form, atau aturan sistem bekerja."
  },
  {
    id: 3,
    cluster: "data",
    text: "Saya suka membandingkan angka, grafik, atau data sebelum membuat kesimpulan.",
    hint: "Misalnya mengecek data perbandingan sebelum menentukan pilihan."
  },
  {
    id: 4,
    cluster: "data",
    text: "Saya merasa puas ketika berhasil menemukan pola atau tren dari kumpulan informasi.",
    hint: "Seperti melihat perubahan naik-turun pada tabel, statistik, atau catatan."
  },
  {
    id: 5,
    cluster: "comm",
    text: "Saya nyaman menjelaskan ide kepada orang lain dan bekerja sama dalam diskusi kelompok.",
    hint: "Termasuk saat membantu teman memahami materi atau mempresentasikan hasil kerja."
  },
  {
    id: 6,
    cluster: "comm",
    text: "Saya mudah memahami sudut pandang orang lain dan membantu menengahi perbedaan pendapat.",
    hint: "Perhatikan peranmu saat tim sedang berbeda pendapat."
  },
  {
    id: 7,
    cluster: "biz",
    text: "Saya tertarik mengatur anggaran, target waktu, atau sumber daya agar kegiatan berjalan efisien.",
    hint: "Misalnya mengatur biaya kegiatan, jadwal, atau alokasi dana."
  },
  {
    id: 8,
    cluster: "biz",
    text: "Saya senang mengamati peluang kebutuhan pasar, strategi usaha, atau pengelolaan keuangan.",
    hint: "Seperti melihat peluang jualan/jasa atau cara mengelola keuangan secara sehat."
  }
];

const SCALE_OPTIONS = [
  { value: 1, label: "1 — Sangat Tidak Setuju" },
  { value: 2, label: "2 — Kurang Setuju" },
  { value: 3, label: "3 — Setuju" },
  { value: 4, label: "4 — Sangat Setuju" }
];

const state = {
  currentIndex: 0,
  answers: Array(QUESTIONS.length).fill(null),
  studentName: ""
};

// DOM Elements
const introSection = document.getElementById("intro-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const studentNameInput = document.getElementById("student-name");
const startBtn = document.getElementById("start-btn");
const backToIntroBtn = document.getElementById("back-to-intro-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");
const homeBtn = document.getElementById("home-btn");

const progressText = document.getElementById("progress-text");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const questionCluster = document.getElementById("question-cluster");
const questionText = document.getElementById("question-text");
const questionHint = document.getElementById("question-hint");
const optionsContainer = document.getElementById("options-container");
const validationMsg = document.getElementById("validation-msg");

const resultGreeting = document.getElementById("result-greeting");
const resultSummary = document.getElementById("result-summary");
const scoresBreakdown = document.getElementById("scores-breakdown");
const recommendationsContainer = document.getElementById("recommendations-container");
const roadmapList = document.getElementById("roadmap-list");

function startQuiz() {
  const rawName = studentNameInput.value.trim();
  state.studentName = rawName || "Pengguna Simulasi";
  state.currentIndex = 0;
  state.answers = Array(QUESTIONS.length).fill(null);

  introSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  renderQuestion();
}

function backToIntro() {
  quizSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  introSection.classList.remove("hidden");
}

function renderQuestion() {
  const q = QUESTIONS[state.currentIndex];
  const clusterInfo = CLUSTERS[q.cluster];
  const stepNum = state.currentIndex + 1;
  const pct = Math.round(((stepNum - 1) / QUESTIONS.length) * 100);

  progressText.textContent = `Pertanyaan ${stepNum} dari ${QUESTIONS.length}`;
  progressPercent.textContent = `${pct}%`;
  progressFill.style.width = `${pct}%`;

  questionCluster.textContent = `Klaster: ${clusterInfo.name}`;
  questionText.textContent = q.text;
  questionHint.textContent = q.hint;
  validationMsg.classList.add("hidden");

  optionsContainer.innerHTML = "";
  SCALE_OPTIONS.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = opt.label;
    if (state.answers[state.currentIndex] === opt.value) {
      btn.classList.add("selected");
    }
    btn.addEventListener("click", () => {
      state.answers[state.currentIndex] = opt.value;
      validationMsg.classList.add("hidden");
      renderQuestion();
    });
    optionsContainer.appendChild(btn);
  });

  prevBtn.disabled = state.currentIndex === 0;
  nextBtn.textContent =
    state.currentIndex === QUESTIONS.length - 1 ? "Lihat Hasil" : "Selanjutnya";
}

function calculateScores() {
  const totals = { logic: 0, data: 0, comm: 0, biz: 0 };
  QUESTIONS.forEach((q, idx) => {
    const val = state.answers[idx] || 0;
    totals[q.cluster] += val;
  });

  return Object.entries(totals)
    .map(([key, score]) => {
      const info = CLUSTERS[key];
      const percentage = Math.round((score / info.maxScore) * 100);
      return { key, score, percentage, ...info };
    })
    .sort((a, b) => b.score - a.score);
}

function renderResults() {
  const ranked = calculateScores();
  const top = ranked[0];
  const second = ranked[1];

  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  resultGreeting.textContent = `Hasil Rekomendasi untuk ${state.studentName}`;
  resultSummary.textContent = `Dominasi tertinggi berada pada klaster ${top.name} (${top.percentage}%), diikuti oleh ${second.name} (${second.percentage}%).`;

  scoresBreakdown.innerHTML = "";
  ranked.forEach((item) => {
    const row = document.createElement("div");
    row.innerHTML = `
      <div class="score-row-label">
        <span>${item.name}</span>
        <span>${item.score}/${item.maxScore} (${item.percentage}%)</span>
      </div>
      <div class="score-track">
        <div class="score-fill" style="width: ${item.percentage}%; background: ${item.color};"></div>
      </div>
    `;
    scoresBreakdown.appendChild(row);
  });

  recommendationsContainer.innerHTML = "";
  [top, second].forEach((cluster, idx) => {
    const card = document.createElement("div");
    card.className = "card rec-card";
    card.style.borderTop = `5px solid ${cluster.color}`;
    card.innerHTML = `
      <h3 style="color: ${cluster.color};">${idx === 0 ? "Rekomendasi Utama" : "Rekomendasi Pendukung"}: ${cluster.name}</h3>
      <p>${cluster.description}</p>
      <p><strong>Jurusan Relevan:</strong> ${cluster.majors.join(", ")}</p>
      <ul>
        ${cluster.careers.map((c) => `<li>Karier: ${c}</li>`).join("")}
      </ul>
    `;
    recommendationsContainer.appendChild(card);
  });

  roadmapList.innerHTML = "";
  top.roadmap.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    roadmapList.appendChild(li);
  });
}

function handleNext() {
  if (state.answers[state.currentIndex] === null) {
    validationMsg.classList.remove("hidden");
    return;
  }

  if (state.currentIndex < QUESTIONS.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
  } else {
    progressFill.style.width = "100%";
    progressPercent.textContent = "100%";
    renderResults();
  }
}

function handlePrev() {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    renderQuestion();
  }
}

startBtn.addEventListener("click", startQuiz);
backToIntroBtn.addEventListener("click", backToIntro);
prevBtn.addEventListener("click", handlePrev);
nextBtn.addEventListener("click", handleNext);
retryBtn.addEventListener("click", startQuiz);
homeBtn.addEventListener("click", backToIntro);
