document.addEventListener('DOMContentLoaded', () => {
    const usersContainer = document.getElementById('usersContainer');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const reloadBtn = document.getElementById('reloadBtn');

    fetchUsers();

    reloadBtn.addEventListener('click', fetchUsers);

    function fetchUsers() {
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        usersContainer.innerHTML = '';

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(users => {
                displayUsers(users);
                loadingElement.style.display = 'none';
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                loadingElement.style.display = 'none';
                errorElement.textContent = `Failed to load user data. ${error.message}`;
                errorElement.style.display = 'block';
            });
    }

    function displayUsers(users) {
        if (!users || users.length === 0) {
            errorElement.textContent = 'No user data available.';
            errorElement.style.display = 'block';
            return;
        }

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';

            const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p class="username">Username: ${user.username}</p>
                <p class="email">Email: <a href="mailto:${user.email}">${user.email}</a></p>
                <p class="phone">Phone: ${user.phone}</p>
                <p class="website">Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                <p class="address">Address: ${address}</p>
                <p class="company">Company: ${user.company.name}</p>
            `;

            usersContainer.appendChild(userCard);
        });
    }
});
