import faviconFetch from "favicon-fetch";
import * as _ogjs from "meta-og-scrape";
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupogjs, Ogjs } from "meta-og-scrape";

const ogjs = _rollupogjs || _ogjs;

const CORS_PROXY = "http://0.0.0.0:3009/";

export const getMetadata = (url) => async () => {
  let icon = faviconFetch({ uri: url });
  return new Promise(async (resolve, reject) => {
    ogjs({ url: `${import.meta.env.DEV ? CORS_PROXY : ""}${url}` }).then(
      function (data) {
        if (data) data.icon = icon;
        resolve({ metadata: data });
      },
      function (err) {
        console.log("It seems that we have fumbled with an error", err);
        reject();
      }
    );
  });
};
