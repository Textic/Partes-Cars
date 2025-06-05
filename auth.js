document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const currentPage = window.location.pathname.split("/").pop();

    // Referencias a los elementos del menú de navegación
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const profileLink = document.getElementById('profile-link');
    const logoutDivider = document.getElementById('logout-divider');
    const logoutButtonLi = document.getElementById('logout-button-li');
    const adminLink = document.getElementById('admin-link');
    const accountName = document.getElementById('account-name');
    const logoutButton = document.getElementById('logout-button');

    if (loggedInUser) {
        if (accountName) accountName.textContent = loggedInUser.name;
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'block';
        if (logoutDivider) logoutDivider.style.display = 'block';
        if (logoutButtonLi) logoutButtonLi.style.display = 'block';

        if (adminLink) {
            if (loggedInUser.role === 'admin') {
                adminLink.style.display = 'block';
            } else {
                adminLink.style.display = 'none';
            }
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('loggedInUser');
                alert('Has cerrado sesión correctamente.');
                window.location.href = 'index.html';
            });
        }

        if (currentPage === 'admin_dashboard.html' && loggedInUser.role !== 'admin') {
            alert('Acceso denegado. No tienes permisos de administrador.');
            window.location.href = 'index.html';
        }

    } else {
        if (accountName) accountName.textContent = 'Cuenta';
        if (loginLink) loginLink.style.display = 'block';
        if (registerLink) registerLink.style.display = 'block';
        if (profileLink) profileLink.style.display = 'none';
        if (logoutDivider) logoutDivider.style.display = 'none';
        if (logoutButtonLi) logoutButtonLi.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';

        const protectedPages = ['profile.html', 'admin_dashboard.html'];
        if (protectedPages.includes(currentPage)) {
            alert('Debes iniciar sesión para acceder a esta página.');
            window.location.href = 'login.html';
        }
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});