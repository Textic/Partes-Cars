document.addEventListener('DOMContentLoaded', () => {
    const emailFormContainer = document.getElementById('emailFormContainer');
    const resetPasswordContainer = document.getElementById('resetPasswordContainer');

    const recoverPasswordForm = document.getElementById('recoverPasswordForm');
    const resetPasswordForm = document.getElementById('resetPasswordForm');

    let emailParaRecuperar = null;

    if (recoverPasswordForm) {
        recoverPasswordForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = document.getElementById('emailRecover').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === emailInput);

            if (userExists) {
                emailParaRecuperar = emailInput;
                emailFormContainer.style.display = 'none';
                resetPasswordContainer.style.display = 'block';
            } else {
                alert('No se encontró ninguna cuenta asociada a ese correo electrónico.');
            }
        });
    }

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;

            if (newPassword !== confirmNewPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            const hasUpperCase = /[A-Z]/.test(newPassword);
            const hasLowerCase = /[a-z]/.test(newPassword);
            const hasNumber = /[0-9]/.test(newPassword);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
            const hasValidLength = newPassword.length >= 8;

            if (!hasValidLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
                alert('La nueva contraseña no cumple los requisitos de seguridad (mínimo 8 caracteres, mayúsculas, minúsculas, números y símbolos).');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.email === emailParaRecuperar);

            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));

                alert('¡Contraseña actualizada con éxito! Ahora serás redirigido para iniciar sesión.');
                window.location.href = 'login.html';
            } else {
                alert('Ha ocurrido un error inesperado. Por favor, intenta el proceso de nuevo.');
                 window.location.reload();
            }
        });
    }
});