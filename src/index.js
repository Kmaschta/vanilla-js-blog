const dateFormatter = new Intl.DateTimeFormat("fr", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

const getPosts = async () => {
  const response = await fetch("/api/posts");
  const posts = await response.json();

  return posts;
};

const resetPage = () => {
  document.querySelector("#app").innerHTML = "";
};

const renderCreatePostPage = () => {
  resetPage();

  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", "/api/posts");

  form.innerHTML = `
    <div class="form-group">
      <label for="title-input">Titre</label>
      <input type="text" class="form-control" id="title-input" name="title" />
    </div>
    <div class="form-group">
      <label for="author-input">Auteur</label>
      <input type="text" class="form-control" id="author-input" name="author" />
    </div>
    <div class="form-group">
      <label for="body-input">Contenu</label>
      <textarea class="form-control" id="body-input" name="body" rows="10"></textarea>
    </div>
    <button type="submit" class="btn btn-success">Publier</button>
  `;

  document.querySelector("#app").appendChild(form);
};

const renderPostPage = (post) => {
  resetPage();

  const postContainer = document.createElement("div");

  postContainer.innerHTML = `
    <div class="d-inline-flex justify-content-between mb-3">
      <button id="back-button" class="btn btn-secondary">Retour</button>
    </div>
    <article class="card">
      <div class="card-body">
        <h3 class="card-title">${post.title}</h3>
        <small>Publié le ${dateFormatter.format(
          new Date(post.createdAt)
        )}</small>
        <p class="card-text mt-3">${post.body.split("\n").join("<br />")}</p>
      </div>
    </article>
  `;

  document.querySelector("#app").appendChild(postContainer);
  document
    .querySelector("#back-button")
    .addEventListener("click", renderPostsPage);
};

const renderPostsPage = async () => {
  resetPage();

  const posts = await getPosts();

  const postsContainer = document.createElement("ul");
  postsContainer.setAttribute("class", "list-group");

  posts.forEach((post) => {
    const postItem = document.createElement("li");

    postItem.setAttribute(
      "class",
      "list-group-item d-inline-flex justify-content-between cursor-pointer"
    );

    postItem.innerHTML = `
        <div>
            ${post.title}
        </div>
        <div class="text-right">
            ${dateFormatter.format(new Date(post.createdAt))}
        </div>
    `;

    postItem.addEventListener("click", () => {
      renderPostPage(post);
    });

    postsContainer.appendChild(postItem);
  });

  document.querySelector("#app").appendChild(postsContainer);
};

// Wait for the document to be loaded before doing anything else
window.onload = async () => {
  await renderPostsPage();

  document
    .querySelector("#create-post-button")
    .addEventListener("click", renderCreatePostPage);
};
