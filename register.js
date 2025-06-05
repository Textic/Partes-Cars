document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const userName = document.getElementById('register-name').value;
            const userEmail = document.getElementById('register-email').value;
            const userPassword = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // --- INICIO DE VALIDACIONES ---
            if (!userName || !userEmail || !userPassword || !confirmPassword) {
                alert('Por favor, completa todos los campos.');
                return;
            }

            if (userPassword !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            // Expresiones regulares para validar la contraseña
            const hasUpperCase = /[A-Z]/.test(userPassword);
            const hasLowerCase = /[a-z]/.test(userPassword);
            const hasNumber = /[0-9]/.test(userPassword);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(userPassword);
            const hasValidLength = userPassword.length >= 8;

            if (!hasValidLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
                let errorMessage = 'La contraseña no es segura. Asegúrate de que cumpla con lo siguiente:\n';
                if (!hasValidLength) errorMessage += '- Al menos 8 caracteres de longitud.\n';
                if (!hasUpperCase) errorMessage += '- Al menos una letra mayúscula.\n';
                if (!hasLowerCase) errorMessage += '- Al menos una letra minúscula.\n';
                if (!hasNumber) errorMessage += '- Al menos un número.\n';
                if (!hasSpecialChar) errorMessage += '- Al menos un carácter especial (ej. !@#$%...).';
                alert(errorMessage);
                return;
            }
            // --- FIN DE VALIDACIONES ---

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