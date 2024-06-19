
function toggleAuth() {
    const container = document.querySelector('.auth-container');
    const isLogin = container.querySelector('h2').innerText === 'Login';
    container.querySelector('h2').innerText = isLogin ? 'Sign Up' : 'Login';
    container.querySelector('button').innerText = isLogin ? 'Sign Up' : 'Login';
    container.querySelector('button').onclick = isLogin ? signup : login;
    container.querySelector('.toggle-link').innerText = isLogin ? 'Already have an account? Login' : "Don't have an account? Sign up";
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        alert('Login successful');
        window.location.href = 'posts.html';
    } else {
        alert('Invalid username or password');
    }
}

function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Signup successful');
        window.location.href = 'posts.html';
    } else {
        alert('Please enter a valid username and password');
    }
}

let posts = [];

function createPost() {
    const title = document.getElementById('new-title').value;
    const content = document.getElementById('new-content').value;
    const imageInput = document.getElementById('new-image');
    let imageUrl = '';

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageUrl = e.target.result;
            addPost(title, content, imageUrl);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        addPost(title, content, imageUrl);
    }
}

function addPost(title, content, imageUrl) {
    if (title && content) {
        const post = { id: Date.now(), title, content, imageUrl };
        posts.push(post);
        renderPosts();
    }
}

function editPost(id) {
    const post = posts.find(post => post.id === id);
    const newTitle = prompt('Edit title:', post.title);
    const newContent = prompt('Edit content:', post.content);
    const imageInput = document.getElementById('new-image');
    let newImageUrl = post.imageUrl;

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newImageUrl = e.target.result;
            updatePost(post, newTitle, newContent, newImageUrl);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        updatePost(post, newTitle, newContent, newImageUrl);
    }
}

function updatePost(post, title, content, imageUrl) {
    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    renderPosts();
}

function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    renderPosts();
}

function removeImage(id) {
    const post = posts.find(post => post.id === id);
    post.imageUrl = '';
    renderPosts();
}

function renderPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        postsContainer.innerHTML += `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="max-width: 100%;">` : ''}
                <div class="actions">
                    <button onclick="editPost(${post.id})">Edit</button>
                    <button class="delete" onclick="deletePost(${post.id})">Delete</button>
                    ${post.imageUrl ? `<button onclick="removeImage(${post.id})">Remove Image</button>` : ''}
                </div>
            </div>
        `;
    });
}
