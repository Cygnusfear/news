const CORS_PROXY = "http://0.0.0.0:3009/";
const API = "https://news-wildprojector.vercel.app/api/meta?url=";

export const getMetadata = (url) => async () => {
  return new Promise(async (resolve, reject) => {
    let feedURL = `${import.meta.env.DEV ? CORS_PROXY : ""}${API}${url}`;
    let returnVal;
    try {
      let feed = await fetch(feedURL, {});
      returnVal = feed;
      let response;
      try {
        response = await feed.text();
      } catch (e) {
        console.log(`weird shit`, feed);
        response = await feed.text();
      }
      console.log(response);
      response = JSON.parse(response);

      if (!response.siteName) {
        if (import.meta.env.DEV) {
          feedURL = feedURL.slice(CORS_PROXY.length);
        }
        feedURL = feedURL.slice(API.length);
        feedURL = feedURL.replace(/^https?:\/\/www\./, "");
        let domain = feedURL.split("/");
        response.siteName = domain[0];
      }
      return resolve(response);
    } catch (e) {
      console.warn(url, e, returnVal);
    }
  });
};
