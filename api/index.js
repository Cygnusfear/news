import faviconFetch from "favicon-fetch";
import Parser from "rss-parser";
let parser = new Parser();

export default async function run(req, res) {
  console.log(req);
  let query = req.query;
  if (!query.url) {
    res.status(400).end();
  }
  let icon = await faviconFetch({ uri: url });
  let feed = await parser.parseURL(query.url);
  feed.icon = icon;
  res.end(JSON.stringify(feed));
}
