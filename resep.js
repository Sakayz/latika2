
    const nama = document.getElementById('nama');
    const bahan = document.getElementById('bahan');
    const cara = document.getElementById('cara');
    const simpan = document.getElementById('simpan');
    const resepList = document.getElementById('resepList');

    // Ambil dari localStorage
    let resepData = JSON.parse(localStorage.getItem('resepData')) || [];

    function tampilkanResep() {
      resepList.innerHTML = '';
      resepData.forEach((r, i) => {
        const div = document.createElement('div');
        div.className = 'card resep-card';
        div.innerHTML = `
          <h3>${r.nama}</h3>
          <p><strong>Bahan:</strong><br>${r.bahan}</p>
          <p><strong>Cara:</strong><br>${r.cara}</p>
          <button class="hapus" onclick="hapusResep(${i})">🗑 Hapus</button>
        `;
        resepList.appendChild(div);
      });
    }

    function hapusResep(i) {
      resepData.splice(i, 1);
      localStorage.setItem('resepData', JSON.stringify(resepData));
      tampilkanResep();
    }

    simpan.addEventListener('click', () => {
      if (nama.value && bahan.value && cara.value) {
        resepData.push({
          nama: nama.value,
          bahan: bahan.value,
          cara: cara.value
        });
        localStorage.setItem('resepData', JSON.stringify(resepData));
        nama.value = bahan.value = cara.value = '';
        tampilkanResep();
      } else {
        alert("Isi semua kolom terlebih dahulu!");
      }
    });

    tampilkanResep();

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
