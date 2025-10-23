// keuangan.js (versi auto ".000")

const judulInput = document.getElementById("judul");
const jumlahInput = document.getElementById("jumlah");
const tipeInput = document.getElementById("tipe");
const simpanBtn = document.getElementById("simpan");
const transaksiList = document.getElementById("transaksiList");
const totalKeuangan = document.getElementById("totalKeuangan");

let transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

// Fungsi parsing angka format Indonesia
function parseIndoNumber(str) {
  if (typeof str !== "string") return NaN;
  let s = str.trim();
  if (!s) return NaN;
  s = s.replace(/\./g, "");
  s = s.replace(/,/g, ".");
  s = s.replace(/[^0-9.\-]/g, "");
  const num = parseFloat(s);
  return isNaN(num) ? NaN : num;
}

// Otomatis format angka saat user mengetik
jumlahInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, ""); // hanya angka
  if (!value) {
    e.target.value = "";
    return;
  }

  // format ribuan
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  e.target.value = value;
});

// Simpan transaksi baru
function simpanTransaksi() {
  const judul = judulInput.value.trim();
  let jumlahRaw = jumlahInput.value.trim();
  const tipe = tipeInput.value;

  if (judul === "" || jumlahRaw === "") {
    alert("Isi semua kolom dengan benar!");
    return;
  }

  // Parse input (misal 90 -> 90000, kalau belum ada .000)
  let jumlah = parseIndoNumber(jumlahRaw);

  // Jika jumlah < 1000 dan user tidak menulis titik (contoh: 90)
  // kita anggap maksudnya 90 ribu
  if (jumlah < 1000 && !jumlahRaw.includes(".") && !jumlahRaw.includes(",")) {
    jumlah = jumlah * 1000;
  }

  const data = {
    id: Date.now(),
    judul,
    jumlah,
    tipe,
  };

  transaksi.push(data);
  localStorage.setItem("transaksi", JSON.stringify(transaksi));

  tampilkanTransaksi();
  hitungTotal();

  judulInput.value = "";
  jumlahInput.value = "";
}

// Hapus transaksi
function hapusTransaksi(id) {
  transaksi = transaksi.filter((item) => item.id !== id);
  localStorage.setItem("transaksi", JSON.stringify(transaksi));
  tampilkanTransaksi();
  hitungTotal();
}

// Tampilkan daftar transaksi
function tampilkanTransaksi() {
  transaksiList.innerHTML = "";

  if (transaksi.length === 0) {
    transaksiList.innerHTML = "<p>Belum ada catatan keuangan.</p>";
    return;
  }

  transaksi.forEach((item) => {
    const card = document.createElement("div");
    card.className = "transaksi-card";
    card.style.borderLeftColor = item.tipe === "pemasukan" ? "#28c76f" : "#ff4d4f";

    const jumlahFormatted = item.jumlah.toLocaleString("id-ID");

    card.innerHTML = `
      <h3>${item.judul}</h3>
      <p><strong>Tipe:</strong> ${item.tipe.charAt(0).toUpperCase() + item.tipe.slice(1)}</p>
      <p><strong>Jumlah:</strong> Rp ${jumlahFormatted}</p>
      <button class="hapus" onclick="hapusTransaksi(${item.id})">🗑 Hapus</button>
    `;

    transaksiList.appendChild(card);
  });
}

// Hitung total
function hitungTotal() {
  let total = 0;
  transaksi.forEach((item) => {
    total += item.tipe === "pemasukan" ? item.jumlah : -item.jumlah;
  });

  totalKeuangan.textContent = `Total Keuangan: Rp ${total.toLocaleString("id-ID")}`;
  totalKeuangan.style.color = total >= 0 ? "#28c76f" : "#ff4d4f";
}

// Event listener
simpanBtn.addEventListener("click", simpanTransaksi);

// Inisialisasi tampilan awal
tampilkanTransaksi();
hitungTotal();

// 🌙 Dark Mode Toggle
const toggleBtn = document.getElementById("themeToggle");

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
