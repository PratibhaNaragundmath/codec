// script.js
    document.getElementById("loginForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const email = document.getElementById("email").value;

      // Show dashboard after any valid login
      document.getElementById("loginPage").classList.add("d-none");
      document.getElementById("dashboardWrapper").classList.remove("d-none");

      // Show username in sidebar
      document.getElementById("userName").innerText = email.split("@")[0];
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", function(e) {
      e.preventDefault();
      document.getElementById("dashboardWrapper").classList.add("d-none");
      document.getElementById("loginPage").classList.remove("d-none");
      document.getElementById("loginForm").reset();
    });
    // Sidebar navigation
    const links = document.querySelectorAll('.sidebar a');
    const sections = document.querySelectorAll('.page-section');

    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        links.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        const sectionId = this.getAttribute('data-section');
        sections.forEach(sec => sec.classList.add('d-none'));
        document.getElementById(sectionId).classList.remove('d-none');
      });
    });

    // Dashboard Line Chart
    new Chart(document.getElementById('statsChart'), {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Earnings',
          data: [120, 190, 300, 500, 200, 300, 450],
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56,189,248,0.3)',
          fill: true,
          tension: 0.4
        }]
      }
    });

    // Analytics Bar Chart
    new Chart(document.getElementById('analyticsChart'), {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Users',
          data: [500, 700, 1200, 900, 1500, 2000],
          backgroundColor: '#facc15'
        }]
      }
    });

    // Pie Chart
    new Chart(document.getElementById('pieChart'), {
      type: 'pie',
      data: {
        labels: ['Instagram', 'Twitter', 'YouTube'],
        datasets: [{
          data: [55, 25, 20],
          backgroundColor: ['#dc2743', '#1DA1F2', '#FF0000']
        }]
      }
    });

    // Doughnut Chart
    new Chart(document.getElementById('doughnutChart'), {
      type: 'doughnut',
      data: {
        labels: ['Subscriptions', 'Ads', 'Sponsorships'],
        datasets: [{
          data: [40, 35, 25],
          backgroundColor: ['#38bdf8', '#f43f5e', '#facc15']
        }]
      }
    });
  