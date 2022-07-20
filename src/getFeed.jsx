import Parser from "rss-parser";
let parser = new Parser();

const CORS_PROXY = "http://0.0.0.0:3009/";

export const getFeeds = (urls) => async () => {
  let items = [];
  let promises = [];
  urls.forEach((x) => {
    promises.push(
      new Promise(async (resolve, reject) => {
        try {
          let feedURL = `${import.meta.env.DEV ? CORS_PROXY : ""}${x}`;
          let feed = await parser.parseURL(feedURL);
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
            // console.log(item);
          });
          resolve();
        } catch (e) {
          resolve();
        }
      })
    );
  });
  await Promise.all(promises);
  return Promise.resolve({ feed: items });
};
