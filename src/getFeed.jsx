const CORS_PROXY = "http://0.0.0.0:3009/";
const API = "https://news-wildprojector.vercel.app/api/feed?url=";

export const getFeeds = (urls) => async () => {
  let items = [];
  let promises = [];
  let icon;
  urls.forEach((x) => {
    promises.push(
      new Promise(async (resolve, reject) => {
        try {
          let feedURL = `${import.meta.env.DEV ? CORS_PROXY : ""}${API}${x}`;
          let feed = await fetch(feedURL, {});
          feed = await feed.json();
          console.log(feed);
          // let feed = await parse.parseURL(feedURL);
          feed.items.forEach((item) => {
            let delimited =
              item.contentSnippet.split("…").length > 1 ||
              item.contentSnippet.split("...").length > 1 ||
              item.contentSnippet.split("Continue reading").length > 1;
            item.contentSnippet =
              item.contentSnippet
                .split("…")[0]
                .split("...")[0]
                .split("Continue reading")[0] + (delimited ? "..." : "");
            items.push(item);
          });
          icon = feed.icon;
          console.log(feed);
          resolve();
        } catch (e) {
          console.warn(e);
          resolve();
        }
      })
    );
  });
  await Promise.all(promises);
  return Promise.resolve({ feed: items, icon: icon });
};
