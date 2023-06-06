// Post Button
const postBtn = document.querySelector(".postBtn");

// fetching submit post API
function submitPost(event) {
  event.preventDefault();

  fetch("http://localhost:8080/posts", {
    method: "POST",
    body: JSON.stringify({
      post_text: document.querySelector(".wirtePostArea").value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      window.location.reload("http://localhost:8080/feed");
    })
    .catch((error) => {
      console.error("Error fetching submit posts API:", error);
    });
}
postBtn.addEventListener("click", submitPost);

const middleContent = document.querySelector(".middleContent");

// Function to create and append a post element
function createPostElement(post) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("showPost");

  const postCredentialsDiv = document.createElement("div");
  postCredentialsDiv.classList.add("postCredentials");

  const profileImg = document.createElement("img");
  profileImg.classList.add("postImg");
  profileImg.src = "../../assets/images/logo2.png";
  profileImg.alt = "";

  const username = document.createElement("h5");
  username.classList.add("postName");
  username.textContent = post.name;

  postCredentialsDiv.appendChild(profileImg);
  postCredentialsDiv.appendChild(username);

  const postContentDiv = document.createElement("div");
  postContentDiv.classList.add("post");

  const postText = document.createElement("p");
  postText.textContent = post.post_text;

  postContentDiv.appendChild(postText);

  postDiv.appendChild(postCredentialsDiv);
  postDiv.appendChild(postContentDiv);

  return postDiv;
}

// Fetch the posts from the posts API
fetch("http://localhost:8080/posts")
  .then((response) => response.json())
  .then((posts) => {
    const reversePosts = posts.reverse();
    reversePosts.forEach((post) => {
      const postElement = createPostElement(post);
      middleContent.appendChild(postElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching posts:", error);
  });

// Fetch the posts of a specific user's from the posts API
function fetchPostsOfSpecificUser(username) {
  fetch(`http://localhost:8080/posts/${username}`)
    .then((response) => response.json())
    .then((posts) => {
      // Functionalities To remove the post element middle content
      const postDiv = document.querySelectorAll(".showPost");
      for (let i = 0; i < postDiv.length; i++) {
        postDiv[i].parentNode.removeChild(postDiv[i]);
      }

      const reversePosts = posts.reverse();
      reversePosts.forEach((post) => {
        const postElement = createPostElement(post);
        middleContent.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

const searchBar = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", () => {
  fetchPostsOfSpecificUser(searchBar.value);
});
