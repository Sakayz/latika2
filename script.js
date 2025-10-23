// 🔄 Ambil data keuangan dari localStorage
let keuanganData = JSON.parse(localStorage.getItem('keuangan')) || [];

// Hitung total pemasukan & pengeluaran
let totalPemasukan = 0, totalPengeluaran = 0;
keuanganData.forEach(item => {
  if (item.jenis === 'pemasukan') totalPemasukan += item.nominal;
  else if (item.jenis === 'pengeluaran') totalPengeluaran += item.nominal;
});

document.getElementById("income").textContent = `Rp ${totalPemasukan.toLocaleString('id-ID')}`;
document.getElementById("expense").textContent = `Rp ${totalPengeluaran.toLocaleString('id-ID')}`;

// 📊 Chart Keuangan
const financeCtx = document.getElementById("financeChart").getContext("2d");
const financeChart = new Chart(financeCtx, {
  type: 'line',
  data: {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    datasets: [
      {
        label: 'Pemasukan',
        data: [200000, 250000, 180000, 300000, 220000, 400000, 350000],
        borderColor: '#1e88e5',
        fill: true,
        backgroundColor: 'rgba(30,136,229,0.1)',
        tension: 0.4
      },
      {
        label: 'Pengeluaran',
        data: [150000, 180000, 120000, 250000, 200000, 350000, 300000],
        borderColor: '#e53935',
        fill: true,
        backgroundColor: 'rgba(229,57,53,0.1)',
        tension: 0.4
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: '#555' } } },
    scales: {
      x: { ticks: { color: '#555' } },
      y: { ticks: { color: '#555' } }
    }
  }
});

// 💻 Chart Sistem
const systemCtx = document.getElementById("systemChart").getContext("2d");
const systemChart = new Chart(systemCtx, {
  type: 'doughnut',
  data: {
    labels: ['CPU', 'RAM', 'Memory'],
    datasets: [{
      data: [30, 50, 70],
      backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726'],
    }]
  },
  options: { responsive: true, cutout: '70%' }
});

// Simulasi update CPU/RAM/Memory tiap 2 detik
setInterval(() => {
  systemChart.data.datasets[0].data = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100)
  ];
  systemChart.update();
}, 2000);

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
