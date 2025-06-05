document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const userName = document.getElementById('register-name').value;
            const userEmail = document.getElementById('register-email').value;
            const userPassword = document.getElementById('register-password').value;
            
            if (!userName || !userEmail || !userPassword) {
                alert('Por favor, completa todos los campos.');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            const userExists = users.some(user => user.email === userEmail);
            if (userExists) {
                alert('El correo electrónico ya está registrado.');
                return;
            }
            
            const role = users.length === 0 ? 'admin' : 'user';

            const newUser = {
                name: userName,
                email: userEmail,
                password: userPassword,
                role: role
            };

            users.push(newUser);
            
            localStorage.setItem('users', JSON.stringify(users));

            alert(`¡Registro exitoso! Tu rol es: ${role}. Ahora puedes iniciar sesión.`);
            window.location.href = 'login.html';
        });
    }
});