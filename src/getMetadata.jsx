const CORS_PROXY = "http://0.0.0.0:3009/";
const API = "https://news-wildprojector.vercel.app/api/meta?url=";

const options = {
  method: "GET",
  mode: "cors",
  cache: "force-cache",
  headers: {
    "Cache-Control": "max-age=3600",
    Pragma: "max-age=3600",
    "x-requested-with": "XMLHttpRequest",
  },
};

export const getMetadata = (url) => async () => {
  return new Promise(async (resolve, reject) => {
    let feedURL = `${import.meta.env.DEV ? CORS_PROXY : ""}${API}${url}`;
    let returnVal;
    try {
      let feed;
      try {
        feed = await fetch(feedURL, options);
      } catch (e) {
        console.warn(e);
        return resolve({});
      }
      if (!feed.ok) return resolve({});
      returnVal = feed;
      let response = await feed.json();
      if (!response.title) {
        if (import.meta.env.DEV) {
          feedURL = feedURL.slice(CORS_PROXY.length);
        }
        feedURL = feedURL.slice(API.length);
        feedURL = feedURL.replace(/^https?:\/\//, "");
        feedURL = feedURL.replace(/^http?:\/\//, "");
        feedURL = feedURL.replace(/^www\./, "");
        let domain = feedURL.split("/");
        response.title = domain[0];
      }
      if (response?.openGraph?.image?.url) {
        response.image = response.openGraph.image.url;
      } else {
        // console.log(url, response);
      }
      return resolve(response);
    } catch (e) {
      console.warn(url, e, returnVal);
    }
  });
};
