import Metascraper from "metascraper";

export default async function run(req, res) {
  let query = req.query;
  if (!query.url) {
    res.status(400).end();
  }
  let data = await Metascraper.scrapeUrl(query.url);
  console.log(data);
  res.end(JSON.stringify(data));
}
