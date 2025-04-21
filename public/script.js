document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    const messageDiv = document.getElementById('loginMessage');

    if (response.ok) {
        // On successful login, redirect to home page
        window.location.href = '/home.html';  // Redirect to the homepage (index.html)
    } else {
        // Show error message
        messageDiv.textContent = result.message || 'Invalid credentials';
    }
});
