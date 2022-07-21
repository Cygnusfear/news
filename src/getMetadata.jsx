import { formatSnippet, getNameFromUrl } from "./utils";

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

function fixIcon(url, icon) {
  if (icon[0] === "/") icon = icon.slice(1);
  if (!icon.includes("http"))
    icon = "https://" + new URL(url).hostname + "/" + icon;
  return icon;
}

export const getMetadata = (url) => async () => {
  return new Promise(async (resolve, reject) => {
    let feedURL = `${import.meta.env.DEV ? CORS_PROXY : ""}${API}${url}`;
    try {
      let feed;
      try {
        feed = await fetch(feedURL, options);
      } catch (e) {
        console.warn(e);
        return resolve({ empty: true });
      }
      // bail if no metadata / bad response
      if (!feed.ok) return resolve({});
      let response = await feed.json();
      let metadata = {
        icon: fixIcon(url, response?.general?.icons[0]?.href) || "",
        siteName: response?.openGraph?.site_name || getNameFromUrl(url),
        image: response?.openGraph?.image?.url || undefined,
        description: response?.general?.description || undefined,
      };
      console.log({ metadata, response });
      return resolve({ metadata, response });
    } catch (e) {
      return resolve({ empty: true });
    }
  });
};
