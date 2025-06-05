document.addEventListener('DOMContentLoaded', () => {
    const recoverPasswordForm = document.getElementById('recoverPasswordForm');

    if (recoverPasswordForm) {
        recoverPasswordForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('emailRecover').value;

            alert(`Si existe una cuenta asociada al correo ${email}, recibirás un enlace para recuperar tu contraseña.`);

            window.location.href = 'login.html';
        });
    }
});