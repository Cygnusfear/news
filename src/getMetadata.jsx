const CORS_PROXY = "http://0.0.0.0:3009/";
const API = "https://news-wildprojector.vercel.app/api/meta?url=";

export const getMetadata = (url) => async () => {
  return new Promise(async (resolve, reject) => {
    let feedURL = `${import.meta.env.DEV ? CORS_PROXY : ""}${API}${url}`;
    try {
      let feed = await fetch(feedURL, {});
      feed = await feed.json();
      if (!feed.siteName) {
        if (import.meta.env.DEV) {
          feedURL = feedURL.slice(CORS_PROXY.length);
        }
        feedURL = feedURL.slice(API.length);
        feedURL = feedURL.replace(/^https?:\/\/www\./, "");
        let domain = feedURL.split("/");
        feed.siteName = domain[0];
      }
      return resolve(feed);
    } catch (e) {
      console.warn(e);
    }
  });
};
