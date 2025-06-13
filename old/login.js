document.addEventListener('DOMContentLoaded', () => {
    const initializeDefaultUsers = () => {
        let users = JSON.parse(localStorage.getItem('users'));

        if (!users || users.length === 0) {
            const defaultUsers = [
                {
                    name: 'Administrador',
                    email: 'admin@partes.com',
                    password: 'admin',
                    role: 'admin'
                },
                {
                    name: 'Usuario',
                    email: 'usuario@partes.com',
                    password: 'usuario',
                    role: 'user'
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    };

    initializeDefaultUsers();

    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const emailInput = document.getElementById('emailLogin').value;
            const passwordInput = document.getElementById('passwordLogin').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const foundUser = users.find(user => user.email === emailInput && user.password === passwordInput);

            if (foundUser) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));

                alert(`¡Bienvenido, ${foundUser.name}!`);

                if (foundUser.role === 'admin') {
                    window.location.href = 'admin_dashboard.html';
                } else {
                    window.location.href = 'profile.html';
                }
            } else {
                alert('Correo electrónico o contraseña incorrectos. Por favor, intente de nuevo.');
            }
        });
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});