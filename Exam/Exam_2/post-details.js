const url = new URL(location.href);
const postId = url.searchParams.get('id');

const postDetailsBox = document.getElementById('post-details');
const commentsBox = document.getElementById('comments-box');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json())
    .then(post => {
        for (const key in post) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${key}:</strong> ${post[key]}`;
            postDetailsBox.appendChild(p);
        }
    });

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(res => res.json())
    .then(comments => {
        comments.forEach(comment => {
            const commentCard = document.createElement('div');
            commentCard.classList.add('comment-card');

            for (const key in comment) {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${key}:</strong> ${comment[key]}`;
                commentCard.appendChild(p);
            }

            commentsBox.appendChild(commentCard);
        });
    });
