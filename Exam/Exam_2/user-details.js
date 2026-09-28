const url = new URL(location.href);
const userId = url.searchParams.get('id');

const userDetailsBox = document.getElementById('user-details');
const postsBtn = document.getElementById('posts-btn');
const postsBox = document.getElementById('posts-box');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(user => {
        function parseObject(obj) {
            for (const key in obj) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    if (key === 'geo') {
                        const p = document.createElement('p');
                        p.innerHTML = `<strong>geo:</strong> lat: ${obj[key].lat}, lng: ${obj[key].lng}`;
                        userDetailsBox.appendChild(p);
                    } else {
                        const title = document.createElement('h4');
                        title.innerText = `${key.charAt(0).toUpperCase() + key.slice(1)}:`;
                        userDetailsBox.appendChild(title);
                        parseObject(obj[key]);
                    }
                } else {
                    const p = document.createElement('p');
                    p.innerHTML = `<strong>${key}:</strong> ${obj[key]}`;
                    userDetailsBox.appendChild(p);
                }
            }
        }

        parseObject(user);
    });

postsBtn.onclick = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(res => res.json())
        .then(posts => {
            postsBox.innerHTML = '';
            posts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');

                const title = document.createElement('h4');
                title.innerText = post.title;

                const link = document.createElement('a');
                link.classList.add('btn');
                link.href = `post-details.html?id=${post.id}`;
                link.innerText = 'Post details';

                postCard.append(title, link);
                postsBox.appendChild(postCard);
            });
        });
};
