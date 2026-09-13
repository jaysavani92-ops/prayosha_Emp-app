// Replace this with the URL you get after deploying your Google Apps Script as a Web App
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxHKLn4nZPKN-EsXlROyNGU6PqD-w0_FUj9oiPed0nH_MrUyKUk8Jt2LQHrmb1L08ysaA/exec";

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const pin = document.getElementById('userPin').value;
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const loginBtn = document.getElementById('loginBtn');

    // UI Loading State
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    loginBtn.disabled = true;
    loginBtn.style.opacity = '0.7';

    try {
        const response = await fetch(GAS_API_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'authenticate',
                pin: pin
            }),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            }
        });

        const data = await response.json();

        if (data.status === 'success') {
            // Store session data offline in localStorage
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userRole', data.role);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('assignedProject', data.projectId);

            // Routing based on Role
            if (data.role === 'Director') {
                window.location.href = 'director_dashboard.html';
            } else if (data.role === 'Employee' || data.role === 'Site Manager') {
                window.location.href = 'employee_dashboard.html';
            } else {
                window.location.href = 'agency_dashboard.html';
            }
        } else {
            alert("Invalid PIN. Please try again.");
            document.getElementById('userPin').value = '';
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Network error. You may be offline. Please check your connection.");
    } finally {
        // Reset UI State
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        loginBtn.disabled = false;
        loginBtn.style.opacity = '1';
    }
});

// Optional: Format PIN input to only accept numbers
document.getElementById('userPin').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});
