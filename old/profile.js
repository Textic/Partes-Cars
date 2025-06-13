document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    const profileNombreInput = document.getElementById('profileNombre');
    const profileEmailInput = document.getElementById('profileEmail');
    
    if (profileNombreInput) profileNombreInput.value = loggedInUser.name;
    if (profileEmailInput) profileEmailInput.value = loggedInUser.email;

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const newName = profileNombreInput.value;
            const newEmail = profileEmailInput.value;

            if (!newName || !newEmail) {
                alert('El nombre y el correo no pueden estar vacíos.');
                return;
            }
            
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.email === loggedInUser.email);

            if (userIndex !== -1) {
                users[userIndex].name = newName;
                users[userIndex].email = newEmail;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            loggedInUser.name = newName;
            loggedInUser.email = newEmail;
            sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

            alert('¡Perfil actualizado con éxito!');
            window.location.reload();
        });
    }

    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;

            if (currentPassword !== loggedInUser.password) {
                alert('La contraseña actual es incorrecta.');
                return;
            }
            
            if (newPassword !== confirmNewPassword) {
                alert('La nueva contraseña y su confirmación no coinciden.');
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
            const userIndex = users.findIndex(user => user.email === loggedInUser.email);
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
            }

            loggedInUser.password = newPassword;
            sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

            alert('¡Contraseña actualizada con éxito!');
            changePasswordForm.reset();
        });
    }
});