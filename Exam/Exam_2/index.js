const usersBox = document.getElementById('users-box');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');

            const infoBox = document.createElement('div');
            infoBox.classList.add('user-info');

            const id = document.createElement('p');
            id.innerText = `ID: ${user.id}`;

            const name = document.createElement('h3');
            name.innerText = user.name;

            infoBox.append(id, name);

            const link = document.createElement('a');
            link.classList.add('btn');
            link.href = `user-details.html?id=${user.id}`;
            link.innerText = 'Details';

            userCard.append(infoBox, link);
            usersBox.appendChild(userCard);
        });
    });
