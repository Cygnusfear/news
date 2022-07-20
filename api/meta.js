import * as _ogjs from "meta-og-scrape";

export default async function run(req, res) {
  console.log(req);
  let query = req.query;
  if (!query.url) {
    res.status(400).end();
  }
  ogjs({ url: `${import.meta.env.DEV ? CORS_PROXY : ""}${url}` }).then(
    function (data) {
      res.end(JSON.stringify(data));
    },
    function (err) {
      console.log("It seems that we have fumbled with an error", err);
      res.status(500).end();
    }
  );
}
