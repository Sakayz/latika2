 const kategoriSelect = document.getElementById('kategori');
    const rumusSelect = document.getElementById('rumus');
    const inputArea = document.getElementById('input-area');
    const hasil = document.getElementById('hasil');

    const rumusData = {
      matematika: {
        "Pythagoras": ["Sisi A", "Sisi B"],
        "Keliling Lingkaran": ["Jari-jari"],
        "Luas Segitiga": ["Alas", "Tinggi"],
        "Volume Kubus": ["Sisi"]
      },
      fisika: {
        "Kecepatan": ["Jarak (m)", "Waktu (s)"],
        "Gaya": ["Massa (kg)", "Percepatan (m/s²)"],
        "Energi Potensial": ["Massa (kg)", "Gravitasi (m/s²)", "Tinggi (m)"],
        "Tekanan": ["Gaya (N)", "Luas (m²)"]
      },
      kimia: {
        "Mol": ["Massa (g)", "Mr"],
        "Konsentrasi Larutan": ["Mol zat terlarut", "Volume (L)"],
        "Persentase Massa": ["Massa zat terlarut", "Massa larutan"],
        "Volume Gas": ["Mol"]
      }
    };

    kategoriSelect.addEventListener('change', () => {
      const kategori = kategoriSelect.value;
      rumusSelect.innerHTML = '<option value="">-- Pilih Rumus --</option>';
      if (kategori && rumusData[kategori]) {
        for (let key in rumusData[kategori]) {
          const opt = document.createElement('option');
          opt.value = key;
          opt.textContent = key;
          rumusSelect.appendChild(opt);
        }
      }
      inputArea.innerHTML = '';
      hasil.textContent = 'Hasil akan muncul di sini';
    });

    rumusSelect.addEventListener('change', () => {
      const kategori = kategoriSelect.value;
      const rumus = rumusSelect.value;
      inputArea.innerHTML = '';
      if (kategori && rumusData[kategori][rumus]) {
        rumusData[kategori][rumus].forEach(label => {
          const input = document.createElement('input');
          input.type = 'number';
          input.placeholder = label;
          inputArea.appendChild(input);
        });
      }
    });

    document.getElementById('hitung').addEventListener('click', () => {
      const kategori = kategoriSelect.value;
      const rumus = rumusSelect.value;
      const inputs = inputArea.querySelectorAll('input');
      const values = Array.from(inputs).map(i => parseFloat(i.value));

      if (values.some(isNaN)) {
        hasil.textContent = "⚠️ Isi semua kolom terlebih dahulu!";
        return;
      }

      let result = "Tidak dikenali";

      if (kategori === 'matematika') {
        switch (rumus) {
          case 'Pythagoras': result = Math.sqrt(values[0]**2 + values[1]**2).toFixed(2); break;
          case 'Keliling Lingkaran': result = (2 * Math.PI * values[0]).toFixed(2); break;
          case 'Luas Segitiga': result = (0.5 * values[0] * values[1]).toFixed(2); break;
          case 'Volume Kubus': result = (values[0]**3).toFixed(2); break;
        }
      } else if (kategori === 'fisika') {
        switch (rumus) {
          case 'Kecepatan': result = (values[0] / values[1]).toFixed(2) + " m/s"; break;
          case 'Gaya': result = (values[0] * values[1]).toFixed(2) + " N"; break;
          case 'Energi Potensial': result = (values[0] * values[1] * values[2]).toFixed(2) + " J"; break;
          case 'Tekanan': result = (values[0] / values[1]).toFixed(2) + " Pa"; break;
        }
      } else if (kategori === 'kimia') {
        switch (rumus) {
          case 'Mol': result = (values[0] / values[1]).toFixed(3) + " mol"; break;
          case 'Konsentrasi Larutan': result = (values[0] / values[1]).toFixed(3) + " M"; break;
          case 'Persentase Massa': result = ((values[0] / values[1]) * 100).toFixed(2) + " %"; break;
          case 'Volume Gas': result = (values[0] * 22.4).toFixed(2) + " L"; break;
        }
      }

      hasil.textContent = "📊 Hasil: " + result;
    });

    // Toggle tema
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });