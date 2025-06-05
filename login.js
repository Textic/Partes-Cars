document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const userEmail = document.getElementById('login-email').value;
            const userPassword = document.getElementById('login-password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = users.find(user => user.email === userEmail && user.password === userPassword);

            if (foundUser) {
                localStorage.setItem('loggedInUser', JSON.stringify(foundUser));

                if (foundUser.role === 'admin') {
                    window.location.href = 'admin_dashboard.html';
                } else {
                    window.location.href = 'profile.html';
                }
            } else {
                alert('Correo o contraseña incorrectos.');
            }
        });
    }
});