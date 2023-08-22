// SET API SUPABASE
const API_URLd = "https://vfkbqzbgkvktbyiudlay.supabase.co";
const API_KEYd =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZma2JxemJna3ZrdGJ5aXVkbGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2Njg1NTYsImV4cCI6MjAwODI0NDU1Nn0.vn8gN0sc8HAVTAnuOUwsATCtPj68mMUiQQ_EMtJfdBk";
const SUPABASE = supabase.createClient(API_URLd, API_KEYd);

// SET DOM
const containerArticleListDOM = document.querySelector(
  "#container__article-list"
);

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

const getSinglePost = async () => {
  try {
    const { data, error } = await SUPABASE.from("countries")
      .select()
      .eq("slug", "Albania")
      .single();

    if (postsError !== null) {
      throw postsError;
    }
  } catch (e) {
    console.log(e);
  }
};

const insertPost = async () => {
  try {
    const { error } = await SUPABASE.from("posts").insert({
      id: 1,
      name: "Denmark",
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

const deletePost = async () => {
  try {
    const { error } = await SUPABASE.from("posts").delete().eq("id", 1);

    if (error !== null) {
      throw error;
    }
  } catch (e) {
    console.log(e);
  }
};

getAllPosts().then((posts) => {
  let listArticle = "";
  posts.forEach((post) => {
    listArticle += `
        <a href="./${post.slug}">
            <article class="bg-gray-50 hover:bg-gray-100 border rounded-lg py-3 px-5">
                <section class="mb-2.5">
                    <h2 class="font-semibold text-lg md:text-xl text-gray-700">${post.title}</h2>
                </section>
                <div>
                    <p class="text-sm md:text-base text-gray-700">${post.synopsis}</p>
                </div>
            </article>
        </a>
    `;
  });
  containerArticleListDOM.innerHTML = listArticle;
});
