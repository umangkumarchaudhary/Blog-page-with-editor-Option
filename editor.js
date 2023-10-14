document.addEventListener("DOMContentLoaded", () => {
  const blogEditorForm = document.getElementById("blog-editor-form");
  const articleContainer = document.querySelector(".article-container");

  // Load existing blogs from local storage on page load
  const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  existingBlogs.forEach(blogData => {
      createBlog(blogData.title, blogData.content, blogData.imageData);
  });

  blogEditorForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("blog-title").value;
      const content = document.getElementById("blog-content").value;
      const imageInput = document.getElementById("blog-image");

      if (title && content) {
          // Handle file upload
          const file = imageInput.files[0];
          const reader = new FileReader();

          reader.onload = function() {
              const imageData = reader.result;

              createBlog(title, content, imageData);

              // Store the new blog in local storage
              const newBlogData = { title, content, imageData };
              existingBlogs.push(newBlogData);
              localStorage.setItem("blogs", JSON.stringify(existingBlogs));

              blogEditorForm.reset();
          };

          reader.readAsDataURL(file);
      }
  });

  function createBlog(title, content, imageData) {
      const blog = document.createElement("div");
      blog.classList.add("article");

      blog.innerHTML = `
          <h2>${title}</h2>
          <p>${content}</p>
      `;

      if (imageData) {
          const image = document.createElement("img");
          image.src = imageData;
          image.style.maxWidth = "100%";
          blog.appendChild(image);
      }

      articleContainer.appendChild(blog);
  }
});

