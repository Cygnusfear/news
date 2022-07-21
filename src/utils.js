export function formatSnippet(snippet) {
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

export function getNameFromUrl(url) {
  url = url.replace(/^https?:\/\//, "");
  url = url.replace(/^http?:\/\//, "");
  url = url.replace(/^www\./, "");
  let domain = url.split("/");
  return domain[0];
}

export function getImgSrc(content) {
  let match = Array.from(
    content.matchAll(/<img\s.*?src=(?:'|")([^'">]+)(?:'|")/g),
    (m) => m[1]
  );
  return (match && match[0]) || undefined;
}

export function fixIcon(url, icon) {
  if (icon[0] === "/") icon = icon.slice(1);
  if (!icon.includes("http"))
    icon = "https://" + new URL(url).hostname + "/" + icon;
  return icon;
}
