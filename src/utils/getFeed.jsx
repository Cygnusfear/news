import { setgid } from "process";
import stringSimilarity from "string-similarity";
import { getNameFromUrl } from "./utils";

const CORS_PROXY = "http://0.0.0.0:3009/";
const API = "https://news-wildprojector.vercel.app/api/feed?url=";

let items = [];
// let collector = {
//   categories: [""],
//   ratings: {},
// };
// let sortPromises = [];

// async function sortIntoCategory(cat, collector) {
//   return new Promise((resolve, reject) => {
//     // we get a category
//     let match = stringSimilarity.findBestMatch(cat, collector.categories);
//     // check for best ranking existing category
//     if (match.bestMatch.rating < 0.4) {
//       collector.categories.push(cat);
//       if (!collector.ratings[cat]) collector.ratings[cat] = 0;
//       collector.ratings[cat]++;
//       resolve({ cat, collector });
//     } else {
//       cat = match.bestMatch.target;
//     }
//     resolve({ cat, collector });
//   });
// }

export const getFeeds = (urls) => async () => {
  let promises = [];
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
            if (
              items.find(
                (x) =>
                  x.title === item.title ||
                  x.contentSnippet === item.contentSnippet
              )
            )
              return;
            item.siteName = getNameFromUrl(item.link);
            item.description = item.contentSnippet;
            item.image = feed?.image?.url || undefined;
            item.icon = feed?.icon || "";
            items.push(item);
            // if (item.categories) {
            //   item.categories.forEach((cat, idx) => {
            //     cat = cat.replaceAll('"', "");
            //     if (cat[cat.length - 1] === " ") cat = cat.slice(0, -1);
            //     item.categories[idx] = cat;
            //     sortPromises.push(sortIntoCategory(cat, collector));
            //   });
            // }
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
  // Promise.all(sortPromises).then((res) => {
  //   console.log(res[0].collector);
  //   let { categories, ratings, setCategories } = res[0].collector;
  //   let topCategories = [];
  //   console.time("ratings");
  //   for (let r of Object.keys(ratings)) {
  //     // delete ratings that suck
  //     if (ratings[r] < 2) {
  //       // delete ratings[r];
  //       // categories.splice(categories.indexOf(r), 1);
  //     } else {
  //       topCategories.push({ name: r, rating: ratings[r] });
  //     }
  //   }
  //   topCategories.sort((a, b) => {
  //     if (a.rating < b.rating) return 1;
  //     if (a.rating > b.rating) return -1;
  //     return 0;
  //   });
  //   topCategories = topCategories.slice(0, 15);
  //   console.timeEnd("ratings");
  //   console.log(topCategories, ratings);
  //   setCategories(topCategories);
  // });
  // console.log("beforeReturn");
  return Promise.resolve({ feed: items });
};
