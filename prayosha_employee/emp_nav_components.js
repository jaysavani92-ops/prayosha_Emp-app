document.addEventListener("DOMContentLoaded", () => {
    // Inject Top Navigation
    const topNav = document.createElement('header');
    topNav.className = 'top-nav';
    topNav.innerHTML = `
        <div class="nav-logo">
            <img src="logo.png" alt="Prayosha Logo">
        </div>
        <div class="nav-actions">
            <div class="notification-bell">
                🔔 <span class="badge" id="nav-notif-badge">3</span>
            </div>
        </div>
    `;
    document.body.prepend(topNav);

    // Inject Bottom Navigation
    const bottomNav = document.createElement('nav');
    bottomNav.className = 'bottom-nav';
    bottomNav.innerHTML = `
        <a href="emp_dashboard.html" class="nav-item active">
            <span class="nav-icon">🏠</span>
            <span class="nav-label">Home</span>
        </a>
        <a href="emp_tasks.html" class="nav-item">
            <span class="nav-icon">📋</span>
            <span class="nav-label">Tasks</span>
        </a>
        <a href="emp_social.html" class="nav-item">
            <span class="nav-icon">💬</span>
            <span class="nav-label">Social</span>
        </a>
        <a href="#" class="nav-item" onclick="logoutApp()">
            <span class="nav-icon">🚪</span>
            <span class="nav-label">Logout</span>
        </a>
    `;
    document.body.appendChild(bottomNav);
});

function logoutApp() {
    localStorage.clear();
    window.location.href = 'emp_index.html';
}
