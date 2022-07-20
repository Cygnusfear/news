import scrape from "html-metadata";

export default async function run(req, res) {
  let query = req.query;
  if (!query.url) {
    res.status(400).end();
  }
  let data = await scrape({
    url: query.url,
    headers: {
      "User-Agent": "webscraper",
      origin: "cors",
    },
  });
  console.log(data);
  res.end(JSON.stringify(data));
}
