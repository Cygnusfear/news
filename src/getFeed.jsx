import { read } from "feed-reader";

const CORS_PROXY = "http://0.0.0.0:3009/";

export const getFeeds = (urls) => async () => {
  let items = [];
  let promises = [];
  urls.forEach((x) => {
    promises.push(
      new Promise(async (resolve, reject) => {
        try {
          let feedURL = `${import.meta.env.DEV ? CORS_PROXY : ""}${x}`;
          let feed = await read(feedURL);
          console.log(feed);
          // let feed = await parse.parseURL(feedURL);
          feed.entries.forEach((item) => {
            let delimited =
              item.description.split("…").length > 1 ||
              item.description.split("...").length > 1 ||
              item.description.split("Continue reading").length > 1;
            item.description =
              item.description
                .split("…")[0]
                .split("...")[0]
                .split("Continue reading")[0] + (delimited ? "..." : "");
            items.push(item);
            // console.log(item);
          });
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
