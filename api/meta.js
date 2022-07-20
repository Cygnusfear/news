import Metascraper from "scrape-meta";

export default async function run(req, res) {
  let query = req.query;
  if (!query.url) {
    res.status(400).end();
  }
  console.log(Metascraper.default);
  let data = await Metascraper.scrapeUrl(query.url);
  res.end(JSON.stringify(data));
}
