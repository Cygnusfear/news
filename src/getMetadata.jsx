const CORS_PROXY = "http://0.0.0.0:3009/";
const API = "https://news-wildprojector.vercel.app/api/meta?url=";

export const getMetadata = (url) => async () => {
  return new Promise(async (resolve, reject) => {
    let feedURL = `${import.meta.env.DEV ? CORS_PROXY : ""}${API}${url}`;
    try {
      let feed = await fetch(feedURL, {});
      feed = await feed.json();
      return resolve(feed);
    } catch (e) {
      console.warn(e);
    }
  });
};
