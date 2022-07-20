import React, { useCallback } from "react";
import { useAsyncLocalState } from "./Loader";
import TimeAgo from "react-timeago";
import { getMetadata } from "./getMetadata";
import { ArticleSmall } from "./ArticleSmall";

export const Article = (props) => {
  const [url] = React.useState(props.article.link);
  const loader = useCallback(getMetadata(url), [url]);
  const { payload, isLoading, loadError } = useAsyncLocalState(loader);
  let { article } = props;
  let image = "https://source.unsplash.com/random/?news";
  if (article.categories && article.categories.length > 0) {
    image =
      "https://source.unsplash.com/random/?" + article.categories.join("");
  }
  if (!payload) return <></>;
  let metadata = payload;
  if (metadata && metadata.image && metadata.image) {
    image = metadata.image;
  }
  if (article.contentSnippet.length < 100)
    return (
      <ArticleSmall
        article={article}
        metadata={metadata}
        icon={article.icon}
        image={image}
      />
    );
  return (
    <>
      {metadata && !isLoading && (
        <li>
          <a
            href={article.link}
            className="block relative overflow-hidden mb-2 md:mb-8 md:grid grid-cols-2 text-left"
          >
            <img
              className="relative object-cover w-full h-56 drop-shadow-xl rounded-lg visible md:hidden md:float-right"
              src={image}
              alt=""
            />
            <div className="relative p-4 py-0 mt-2 md:mt-0 md:float-left block">
              <h5 className="text-m text-stone-200 font-light mb-0 md:mb-2">
                {article.title}
              </h5>

              <p className="mt-1 text-sm text-stone-500 mb-2 font-light hidden md:visible md:block ">
                {article.contentSnippet}
              </p>
              <div className="mb-3 text-xs font-normal text-stone-600 break-inside-avoid">
                <div
                  className="mr-2"
                  style={{
                    background: `url(${article.icon || ""})`,
                    backgroundSize: "cover",
                    height: "16px",
                    width: "16px",
                    display: "inline-block",
                    verticalAlign: "middle",
                    opacity: "0.2",
                  }}
                />
                {metadata.title}{" "}
                <span className="text-yellow-800 font-extrabold">&#183;</span>
                &nbsp;
                <TimeAgo date={article.isoDate} />
              </div>
            </div>
            <img
              className="relative object-cover w-full h-56 drop-shadow-xl rounded-lg hidden md:visible md:block md:float-right"
              src={image}
              alt=""
            />
          </a>
        </li>
      )}
      {loadError && <p>Load Error</p>}
      {isLoading && <p></p>}
    </>
  );
};
