import { formatSnippet } from "./utils";

const CORS_PROXY = "http://0.0.0.0:3009/";
const API = "https://news-wildprojector.vercel.app/api/feed?url=";

let items = [];

export const getFeeds = (urls) => async () => {
  let promises = [];
  let icon;
  urls.forEach((x) => {
    promises.push(
      new Promise(async (resolve, reject) => {
        try {
          let feedURL = `${import.meta.env.DEV ? CORS_PROXY : ""}${API}${x}`;
          let feed = await fetch(feedURL, {});
          feed = await feed.json();
          // console.log(feed);
          // let feed = await parse.parseURL(feedURL);
          feed.items.forEach((item) => {
            if (item.creator && item.creator.includes("Advertiser")) return;
            if (items.find((x) => x.title === item.title)) return;
            item.description = item.contentSnippet;
            item.image = feed?.image?.url || undefined;
            item.icon = feed?.icon || "";
            items.push(item);
          });
          // console.log(feed);
          resolve();
        } catch (e) {
          console.warn(e);
          resolve();
        }
      })
    );
  });
  await Promise.all(promises);
  return Promise.resolve({ feed: items });
};
