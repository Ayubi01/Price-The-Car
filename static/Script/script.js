const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnlogin-popup');
const iconClose = document.querySelector('.icon-close');
const usernameDisplay = document.querySelector('.username-display');

// Function to handle user registration
function register() {
    const registerUsername = document.getElementById('registerUsername').value;
    const registerEmail = document.getElementById('registerEmail').value;
    const registerPassword = document.getElementById('registerPassword').value;

    const user = {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword
    };

    // Save user details to localStorage
    localStorage.setItem(registerEmail, JSON.stringify(user));

    // Replace the Login/Signup button with username button
    btnPopup.style.display = 'none';

    // Create a new button with the username
    const usernameButton = document.createElement('button');
    const icon = document.createElement('ion-icon');
    icon.setAttribute('name', 'person-sharp');
    usernameButton.appendChild(icon);
    usernameButton.textContent = user.username;
    usernameButton.classList.add('username-button');
    usernameButton.addEventListener('click', () => {
        // Display popup with logout button
        showLogoutPopup();
    });
    document.querySelector('.navigation').appendChild(usernameButton);

    // Close the popup
    wrapper.classList.remove('active');
    wrapper.classList.remove('active-popup');
}

// Function to handle user login
function login() {
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Retrieve user details from localStorage
    const storedUser = localStorage.getItem(loginEmail);

    if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user.password === loginPassword) {
            alert('Login successful. Welcome, ' + user.username);

            // Replace the Login/Signup button with username button
            btnPopup.style.display = 'none';

            // Create a new button with the username
            const usernameButton = document.createElement('button');
            const icon = document.createElement('ion-icon');
            icon.setAttribute('name', 'person-sharp');
            usernameButton.appendChild(icon);
            usernameButton.textContent = user.username;
            usernameButton.classList.add('username-button');
            usernameButton.addEventListener('click', () => {
                // Display popup with logout button
                showLogoutPopup();
            });
            document.querySelector('.navigation').appendChild(usernameButton);

            // Close the popup
            wrapper.classList.remove('active-popup');
        } else {
            alert('Incorrect password. Please try again.');
        }
    } else {
        alert('User not found. Please register.');
    }
}

// Function to show popup with logout button
function showLogoutPopup() {
    // Create a popup element
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // Create a logout button
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', () => {
        // Remove the username button and display the Login/Signup button
        const usernameButton = document.querySelector('.username-button');
        if (usernameButton) {
            usernameButton.remove();
            btnPopup.style.display = 'inline-block';
        }

        // Close the popup
        popup.remove();
    });

    // Append the logout button to the popup
    popup.appendChild(logoutButton);

    // Append the popup to the body
    document.body.appendChild(popup);
}



registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Add an event listener for the service link
const serviceLink = document.querySelector('.navigation a[href="index.html"]');
if (serviceLink) {
    serviceLink.addEventListener('click', openServicePage);
}

