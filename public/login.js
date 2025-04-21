document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    const messageDiv = document.getElementById('loginMessage');

    if (response.ok) {
        // On successful login, redirect to home page or dashboard
        window.location.href = '/home.html';  // Redirect to homepage or user dashboard
    } else {
        // Show error message
        messageDiv.textContent = result.error || 'Invalid credentials';
    }
});
