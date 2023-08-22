// SET API SUPABASE
const API_URLd = "https://vfkbqzbgkvktbyiudlay.supabase.co";
const API_KEYd =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZma2JxemJna3ZrdGJ5aXVkbGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2Njg1NTYsImV4cCI6MjAwODI0NDU1Nn0.vn8gN0sc8HAVTAnuOUwsATCtPj68mMUiQQ_EMtJfdBk";
const SUPABASE = supabase.createClient(API_URLd, API_KEYd);

// SET DOM
const containerArticleListDOM = document.querySelector(
  "#container__article-list"
);
const containerModalDOM = document.querySelector("#container__modal");
const formModalDOM = document.querySelector("#form__modal");

// HANDLE EVENT
const toggleModal = () => {
  containerModalDOM.classList.toggle("hidden");
  containerModalDOM.classList.toggle("show-modal");
};

const onInsertData = () => {
  try {
    // GET DATA FROM FORM
    const setData = {
      title: document.forms["form__modal"]["title"].value,
      synopsis: document.forms["form__modal"]["synopsis"].value,
      slug: document.forms["form__modal"]["slug"].value,
      author: document.forms["form__modal"]["author"].value,
      text: document.forms["form__modal"]["text"].value,
    };

    // CLOSE MODAL FORM
    toggleModal();

    // RESET FORM
    document.forms["form__modal"]["title"].value = "";
    document.forms["form__modal"]["synopsis"].value = "";
    document.forms["form__modal"]["slug"].value = "";
    document.forms["form__modal"]["author"].value = "";
    document.forms["form__modal"]["text"].value = "";

    insertPost(setData);
  } catch (e) {
    console.log(e);
  }
};

// PLAY WITH DATA
const getAllPosts = async () => {
  try {
    const { data: posts, error: postsError } = await SUPABASE.from(
      "posts"
    ).select("title, text, synopsis, slug, author, created_at");

    if (postsError !== null) {
      throw postsError;
    }

    return posts;
  } catch (e) {
    console.log(e);
  }
};

const getSinglePost = async (slug) => {
  try {
    console.log(slug)
    const { data: post, error: errorPost } = await SUPABASE.from("posts")
      .select("title, text, synopsis, slug, author, created_at")
      .eq("slug", slug)
      .single();

    if (errorPost !== null) {
      throw errorPost;
    }

    return post
  } catch (e) {
    console.log(e);
  }
};

const insertPost = async ({ title, synopsis, slug, author, text }) => {
  try {
    const { error } = await SUPABASE.from("posts").insert({
      title: title,
      synopsis: synopsis,
      slug: slug,
      author: author,
      text: text,
    });

    if (error !== null) {
      throw error;
    }
  } catch (e) {
    console.log(e);
  }
};

const updatePost = async () => {
  try {
    const { error } = await SUPABASE.from("posts")
      .update({ name: "Australia" })
      .eq("id", 1);

    if (error !== null) {
      throw error;
    }
  } catch (e) {
    console.log(e);
  }
};

const deletePost = async (slug) => {
  try {
    const { error } = await SUPABASE.from("posts").delete().eq("slug", slug);

    if (error !== null) {
      throw error;
    }
  } catch (e) {
    console.log(e);
  }
};

// RUN FIRST
function runOnHome() {
  getAllPosts().then((posts) => {
    let listArticle = "";
    posts.forEach((post) => {
      listArticle += `
          <article class="relative bg-gray-50 hover:bg-gray-100 border rounded-lg py-3 px-5">
              <button onClick="deletePost('${post.slug}')" type="button" class="absolute top-0 right-0 bg-red-600 py-2 px-2 rounded text-gray-50 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>              
              </button>
              <a href="detail.html?slug=${post.slug}" class="block">
                  <section class="mb-2.5">
                      <h2 class="font-semibold text-lg md:text-xl text-gray-700">${post.title}</h2>
                  </section>
                  <div>
                      <p class="text-sm md:text-base text-gray-700">${post.synopsis}</p>
                  </div>
              </a>
          </article>
      `;
    });
    containerArticleListDOM.innerHTML = listArticle;
  });
}

function runOnDetail(slug) {
  getSinglePost(slug).then((post) => {
    // SET DATA FORM
    document.forms["form__modal"]["title"].value = post.title;
    document.forms["form__modal"]["synopsis"].value = post.synopsis;
    document.forms["form__modal"]["slug"].value = post.slug;
    document.forms["form__modal"]["author"].value = post.author;
    document.forms["form__modal"]["text"].value = post.text;
  })
}
