const create_post_form = document.getElementById("create_post_form");
const msg = document.querySelector(".msg");
const postList = document.querySelector(".user_post_list");

//Show Post

const showNewPosts = () => {
  const posts = getDataLS("posts");

  let content = "";

  if (posts.length > 0) {
    posts.reverse().map((item, index) => {
      content += `
      <div class="post-container">
              <!------- Post Header ------>
              <div class="post-header">
                <div class="author">
                  <div class="author-profile-img">
                    <img
                      src=" ${item.author_photo} "
                      alt=""
                    />
                  </div>
                  <div class="post-author-name">
                    <a href="#">${item.author_name}</a>
                    <span><i class="fa-solid fa-earth-americas"></i>
                    ${timeAgo(item.post_time)}</span>
                    <a href="#"></a>
                    <p>${item.author_location}</p>
                  </div>
                </div>
                <div class="three-dot">
                  <a href="#"><i class="fas fa-ellipsis-h"></i></a>
                </div>
              </div>

              <!------ Post Body ------>
              <div class="post-body">
                <div class="post-img">
                  ${
                    item.post_photo
                      ? `<img src="${item.post_photo}" alt=""/>`
                      : ""
                  }
                </div>
                <div class="post-reaction">
                  <div class="p-reaction-left">
                    <div class="post-like post-icon">
                      <span><i class="far fa-heart"></i></span>
                    </div>
                    <div class="post-comment post-icon">
                      <span><i class="far fa-comment"></i></span>
                    </div>
                    <div class="post-share post-icon">
                      <span><i class="far fa-paper-plane"></i></span>
                    </div>
                  </div>
                  <div class="post-save post-icon">
                    <span><i class="far fa-bookmark"></i></span>
                  </div>
                </div>
                <div class="post-like-total">
                  <p>5,691,354 likes</p>
                </div>
                <div class="post-content">
                  <p>
                    <a href="#">natureBeauty</a> ${
                      item.post_content ? item.post_content : ""
                    }
                    <a href="#" class="post-tag">
                      #upinthehills / #close_to_nature</a
                    >
                  </p>
                </div>
                <div class="write-comment">
                  <p>View all 204 comments</p>
                  <form action="#">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Add a comment…"
                    />
                  </form>
                  <span><i class="far fa-smile"></i></span>
                </div>
              </div>
            </div>
          
      `;
    });
  } else {
    content = " <h2>No Post Found! </h2>";
  }
  postList.innerHTML = content;
};

showNewPosts();

// form submit
create_post_form.onsubmit = (e) => {
  e.preventDefault();

  // Get form data
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  if (!data.author_name || !data.author_photo) {
    msg.innerHTML = createAlert("User Name & Photo Must be Inserted!");
  } else {
    //  Get Previous Data
    const prevData = getDataLS("posts");
    prevData.push({
      author_name: data.author_name,
      author_photo: data.author_photo,
      author_location: data.author_location ?? null,
      post_content: data.post_content ?? null,
      post_photo: data.post_photo ?? null,
      post_time: Date.now(),
    });

    // send Data to LS
    sendDataLS("posts", prevData);

    //Show new Posts
    showNewPosts();

    // Form Reset
    e.target.reset();
  }
};
