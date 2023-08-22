const API_URLd = "https://vfkbqzbgkvktbyiudlay.supabase.co";
const API_KEYd =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZma2JxemJna3ZrdGJ5aXVkbGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2Njg1NTYsImV4cCI6MjAwODI0NDU1Nn0.vn8gN0sc8HAVTAnuOUwsATCtPj68mMUiQQ_EMtJfdBk";
const SUPABASE = supabase.createClient(API_URLd, API_KEYd);

const getAllPosts = async () => {
  const { data: posts, error: postsError } = await SUPABASE.from(
    "posts"
  ).select("title, text, synopsis, slug, author, created_at");
  if (postsError !== null) {
    console.log(postsError);
  }

  return posts;
};

getAllPosts();
