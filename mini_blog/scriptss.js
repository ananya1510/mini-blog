document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('profile-username').innerText = username;
    }

    document.querySelectorAll('.bookmark-button').forEach(button => {
        button.addEventListener('click', function() {
            bookmarkPost(button.closest('.post'));
        });
    });

    document.getElementById('create-button').addEventListener('click', createPost);
    document.getElementById('show-bookmarks-button').addEventListener('click', showBookmarks);
    document.getElementById('show-categories-button').addEventListener('click', showCategories);

    document.getElementById('close-bookmarks-modal').addEventListener('click', () => {
        document.getElementById('bookmarks-modal').style.display = 'none';
    });

    document.getElementById('close-categories-modal').addEventListener('click', () => {
        document.getElementById('categories-modal').style.display = 'none';
    });

    window.onclick = function(event) {
        const bookmarksModal = document.getElementById('bookmarks-modal');
        const categoriesModal = document.getElementById('categories-modal');

        if (event.target === bookmarksModal) {
            bookmarksModal.style.display = 'none';
        }
        if (event.target === categoriesModal) {
            categoriesModal.style.display = 'none';
        }
    };
});

function createPost() {
    const title = document.getElementById('new-title').value;
    const content = document.getElementById('new-content').value;
    const imageInput = document.getElementById('new-image');
    const postsContainer = document.getElementById('posts');

    if (title && content) {
        const newPost = document.createElement('div');
        newPost.className = 'post';

        const postTitle = document.createElement('h3');
        postTitle.textContent = title;
        newPost.appendChild(postTitle);

        const postContent = document.createElement('p');
        postContent.textContent = content;
        newPost.appendChild(postContent);

        if (imageInput.files && imageInput.files[0]) {
            const postImage = document.createElement('img');
            postImage.src = URL.createObjectURL(imageInput.files[0]);
            postImage.alt = title;
            postImage.style.maxWidth = '100%';
            newPost.appendChild(postImage);
        }

        const postButtons = document.createElement('div');
        postButtons.className = 'post-buttons';

        const bookmarkButton = document.createElement('button');
        bookmarkButton.textContent = 'Bookmark';
        bookmarkButton.className = 'bookmark-button';
        bookmarkButton.addEventListener('click', () => bookmarkPost(newPost));
        postButtons.appendChild(bookmarkButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', () => showEditForm(newPost));
        postButtons.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => deletePost(newPost));
        postButtons.appendChild(deleteButton);

        newPost.appendChild(postButtons);

        postsContainer.appendChild(newPost);

        document.getElementById('new-title').value = '';
        document.getElementById('new-content').value = '';
        document.getElementById('new-image').value = '';
    } else {
        alert('Please fill out the title and content.');
    }
}

function bookmarkPost(postElement) {
    const bookmarksContainer = document.getElementById('bookmarks');
    const bookmarkTitle = document.createElement('div');
    bookmarkTitle.className = 'bookmark-title';
    bookmarkTitle.textContent = postElement.querySelector('h3').textContent;
    bookmarksContainer.appendChild(bookmarkTitle);
    alert('Your post has been added to bookmarks.');
}

function showBookmarks() {
    document.getElementById('bookmarks-modal').style.display = 'block';
}

function showCategories() {
    document.getElementById('categories-modal').style.display = 'block';
}

function showEditForm(postElement) {
    const title = postElement.querySelector('h3').textContent;
    const content = postElement.querySelector('p').textContent;

    const editForm = document.createElement('div');
    editForm.className = 'edit-form';

    const editTitle = document.createElement('input');
    editTitle.type = 'text';
    editTitle.value = title;
    editForm.appendChild(editTitle);

    const editContent = document.createElement('textarea');
    editContent.rows = '4';
    editContent.value = content;
    editForm.appendChild(editContent);

    const editImage = document.createElement('input');
    editImage.type = 'file';
    editImage.accept = 'image/*';
    editForm.appendChild(editImage);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = () => {
        const newTitle = editTitle.value;
        const newContent = editContent.value;

        if (newTitle && newContent) {
            postElement.querySelector('h3').textContent = newTitle;
            postElement.querySelector('p').textContent = newContent;

            if (editImage.files && editImage.files[0]) {
                const newImageSrc = URL.createObjectURL(editImage.files[0]);
                if (postElement.querySelector('img')) {
                    postElement.querySelector('img').src = newImageSrc;
                } else {
                    const newImage = document.createElement('img');
                    newImage.src = newImageSrc;
                    newImage.alt = newTitle;
                    newImage.style.maxWidth = '100%';
                    postElement.appendChild(newImage);
                }
            }

            postElement.removeChild(editForm);
        } else {
            alert('Please fill out the title and content.');
        }
    };
    editForm.appendChild(saveButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = () => postElement.removeChild(editForm);
    editForm.appendChild(cancelButton);

    postElement.appendChild(editForm);
}

function deletePost(postElement) {
    if (confirm('Are you sure you want to delete this post?')) {
        postElement.remove();
    }
}
