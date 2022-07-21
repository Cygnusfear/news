export default function formatSnippet(snippet) {
  snippet = snippet
    .replaceAll(/(.*)<[^>]*>/g, " ")
    .replaceAll(/\\s+/g, " ")
    .replaceAll(/Image via \w+\s+/gi, " ")
    .trim();
  let delimited =
    snippet.split("…").length > 1 ||
    snippet.split("...").length > 1 ||
    snippet.split("Continue reading").length > 1 ||
    snippet.length > 300;
  if (snippet.length > 300) snippet = snippet.slice(0, 300);
  snippet =
    snippet.split("…")[0].split("...")[0].split("Continue reading")[0] +
    (delimited ? "..." : "");
  return snippet;
}
