const moistureCanvas = document.getElementById('moistureChart');
const waterCanvas = document.getElementById('waterChart');

Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
Chart.defaults.font.size = 10;
Chart.defaults.color = '#8a988e';

const moistureChart = new Chart(moistureCanvas, {
  type: 'line',
  data: {
    labels: ['08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00'],
    datasets: [{
      label: 'Kelembapan (%)',
      data: [48, 51, 54, 58, 62, 64, 61, 63, 66, 62, 60, 62],
      borderColor: '#439665',
      backgroundColor: 'rgba(67,150,101,.12)',
      fill: true,
      tension: .38,
      pointRadius: 2,
      pointHoverRadius: 5,
      borderWidth: 2
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { displayColors: false } },
    scales: {
      y: { min: 0, max: 100, ticks: { stepSize: 20, callback: v => v + '%' }, grid: { color: '#edf2ed' }, border: { display: false } },
      x: { grid: { display: false }, border: { display: false } }
    }
  }
});

const waterChart = new Chart(waterCanvas, {
  type: 'bar',
  data: {
    labels: ['08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00'],
    datasets: [{
      label: 'Volume air (L)',
      data: [1.8, 3.2, 2.5, 4.1, 3.4, 2.1, 4.6, 2.9],
      backgroundColor: '#8bcbd3',
      hoverBackgroundColor: '#48a9ba',
      borderRadius: 5,
      maxBarThickness: 24
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { displayColors: false } },
    scales: {
      y: { beginAtZero: true, ticks: { callback: v => v + ' L' }, grid: { color: '#edf2ed' }, border: { display: false } },
      x: { grid: { display: false }, border: { display: false } }
    }
  }
});

const valveToggle = document.getElementById('valveToggle');
let valveOn = false;

function updateTimestamp() {
  const now = new Date();
  document.getElementById('lastUpdated').textContent = now.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'});
}
updateTimestamp();

valveToggle.addEventListener('click', () => {
  valveOn = !valveOn;
  document.getElementById('valveValue').textContent = valveOn ? 'ON' : 'OFF';
  document.getElementById('valveValue').style.color = valveOn ? '#32945a' : '#8b78c4';
  document.getElementById('valveStatus').innerHTML = valveOn
    ? '<i class="bi bi-droplet-fill"></i> Simulasi menyiram'
    : '<i class="bi bi-pause-circle-fill"></i> Tidak menyiram';
  document.getElementById('valveDetail').textContent = valveOn ? 'Terbuka (simulasi)' : 'Tertutup';
  document.getElementById('irrigationBadge').textContent = valveOn ? 'Menyiram' : 'Siaga';
  document.getElementById('irrigationBadge').className = valveOn ? 'status-pill status-good' : 'status-pill status-neutral';
  document.getElementById('flowValue').textContent = valveOn ? '1.8' : '0.0';
  document.getElementById('flowDetail').textContent = valveOn ? '1.8 L/min (simulasi)' : '0.0 L/min (simulasi)';
  valveToggle.innerHTML = valveOn
    ? '<i class="bi bi-power"></i> Matikan simulasi'
    : '<i class="bi bi-power"></i> Nyalakan simulasi';
  updateTimestamp();

  const activityList = document.getElementById('activityList');
  const row = document.createElement('div');
  row.className = 'activity-item';
  row.innerHTML = `<span class="activity-icon ${valveOn ? 'blue' : 'amber'}"><i class="bi ${valveOn ? 'bi-droplet-fill' : 'bi-pause-circle'}"></i></span><div><strong>${valveOn ? 'Simulasi irigasi dinyalakan' : 'Simulasi irigasi dimatikan'}</strong><small>Katup solenoid demo ${valveOn ? 'terbuka' : 'tertutup'}</small></div><time>${new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})}</time>`;
  activityList.prepend(row);
});

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  sidebar.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => sidebar.classList.remove('open')));
}
