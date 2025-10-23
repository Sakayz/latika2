// Ambil data rumus dari localStorage
let daftarRumus = JSON.parse(localStorage.getItem("daftarRumus")) || [];

const form = document.getElementById("rumusForm");
const listContainer = document.getElementById("daftarRumus");

form.addEventListener("submit", e => {
  e.preventDefault();

  const nama = document.getElementById("namaRumus").value.trim();
  const jenis = document.getElementById("jenisPelajaran").value.trim();
  const isi = document.getElementById("isiRumus").value.trim();
  const gambarInput = document.getElementById("gambarRumus");

  let gambar = "";
  if (gambarInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (event) {
      gambar = event.target.result;
      simpanRumus(nama, jenis, isi, gambar);
    };
    reader.readAsDataURL(gambarInput.files[0]);
  } else {
    simpanRumus(nama, jenis, isi, gambar);
  }
});

function simpanRumus(nama, jenis, isi, gambar) {
  const rumusBaru = { nama, jenis, isi, gambar };
  daftarRumus.push(rumusBaru);
  localStorage.setItem("daftarRumus", JSON.stringify(daftarRumus));
  tampilkanRumus();
  form.reset();
}

// Tampilkan rumus
function tampilkanRumus() {
  listContainer.innerHTML = daftarRumus.map((r, i) => `
    <div class="rumus-item">
      <h3>${r.nama}</h3>
      <p><strong>Pelajaran:</strong> ${r.jenis}</p>
      ${r.isi ? `<p>🧮 Rumus: ${r.isi}</p>` : ""}
      ${r.gambar ? `<img src="${r.gambar}" alt="Rumus Gambar">` : ""}
      <button onclick="hapusRumus(${i})">🗑️ Hapus</button>
    </div>
  `).join("");
}

function hapusRumus(index) {
  daftarRumus.splice(index, 1);
  localStorage.setItem("daftarRumus", JSON.stringify(daftarRumus));
  tampilkanRumus();
}

tampilkanRumus();
// Cek tema tersimpan
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
