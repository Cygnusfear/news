import React, { useCallback } from "react";
import { useAsyncLocalState } from "./Loader";
import TimeAgo from "react-timeago";
import { getMetadata } from "./getMetadata";
import { ArticleSmall } from "./ArticleSmall";
import { formatSnippet, getImgSrc } from "./utils";
import { ItemSource } from "./ArticleSource";

export const Article = ({ article }) => {
  const [url] = React.useState(article.link);
  const loader = useCallback(getMetadata(url), [url]);
  const { payload, isLoading, loadError } = useAsyncLocalState(loader);

  if (!payload || isLoading) return <></>;

  // merge metadata
  article = { ...article, ...payload.metadata };

  // do some special stuff in case we didn't get useful metadayta
  if (!article.image) {
    let categories = article.categories;
    if (!article.categories) {
      categories = (article.title || "").split(" ");
    }
    article.image = `https://source.unsplash.com/random/?search=${categories.join(
      " "
    )}`;
    article.image = getImgSrc(article.content) || article.image;
  }

  if (!article.description || article.description.length < 100) {
    return <ArticleSmall article={article} />;
  }

  const onHover = () => {
    console.log(article, payload);
  };
  return (
    <>
      {article && !isLoading && (
        <li>
          <a
            href={article.link}
            className="block group relative overflow-hidden mb-2 md:mb-8 md:grid grid-cols-2 text-left group-visited:opacity-5"
            onMouseEnter={() => onHover()}
          >
            <img
              className="relative object-cover w-full h-56 drop-shadow-xl rounded-lg visible md:hidden md:float-right "
              src={article.image}
              alt=""
            />
            <div className="relative p-2 md:p-4 py-0 mt-2 md:mt-0 md:float-left block">
              <h5 className="text-m text-stone-200 font-light mb-0 md:mb-2 group-hover:text-salomie-300 group-visited:opacity-5">
                {article.title}
              </h5>

              <p className="mt-1 text-sm text-stone-500 mb-2 font-light hidden md:visible md:block group-visited:opacity-5">
                {formatSnippet(article.description)}
              </p>
              <ItemSource article={article} />
            </div>
            <img
              className="relative object-cover w-full h-56 drop-shadow-xl rounded-lg hidden md:visible md:block md:float-right"
              src={article.image}
              alt=""
            />
          </a>
        </li>
      )}
      {loadError && <p>Load Error</p>}
    </>
  );
};
