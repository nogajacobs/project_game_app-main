document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};
  
    if (users[username] && users[username].password === password) {
      alert('Login successful!');
      // Redirect to home page after successful login
      window.location.href = 'home.html'; // Assuming home.html is your home page
    } else {
      alert('Invalid username or password.');
    }
  });  
  
  document.getElementById('registerForm').addEventListener('submit_sign_up', function(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    alert('Username already exists.');
    if (users[username]) {
      alert('Username already exists.');
    } else {
      users[username] = { password };
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');
      // Redirect or perform actions after successful registration
    }
  });  