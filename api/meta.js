import scrape from "html-metadata";

export default async function run(req, res) {
  let query = req.query;
  if (!query.url) {
    res.status(400).end();
  }
  try {
    let data = await scrape({
      url: query.url,
      headers: {
        "User-Agent": "webscraper",
        origin: "cors",
      },
    });
    res.end(JSON.stringify(data));
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}
