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
      "https://source.unsplash.com/random/?search" +
      article.categories.join(",");
  }
  if (!payload) return <></>;
  let metadata = payload;
  if (metadata) {
    if (metadata.image && metadata.image !== "") {
      image = metadata.image;
    } else if (!article.categories) {
      let categories = (
        article.title ||
        metadata.general?.title ||
        metadata.description ||
        ""
      ).split(" ");
      if (categories == "") console.log(article.title, image);
      image = `https://source.unsplash.com/random/?search=${categories.join(
        ","
      )}`;
      metadata.image = image;
    }
    if (metadata.description) {
      article.contentSnippet = metadata.description;
    }
  }
  const onHover = () => {
    console.log(metadata);
  };
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
            className="block group relative overflow-hidden mb-2 md:mb-8 md:grid grid-cols-2 text-left group-visited:opacity-5"
            onMouseEnter={() => onHover()}
          >
            <img
              className="relative object-cover w-full h-56 drop-shadow-xl rounded-lg visible md:hidden md:float-right "
              src={image}
              alt=""
            />
            <div className="relative p-2 md:p-4 py-0 mt-2 md:mt-0 md:float-left block">
              <h5 className="text-m text-stone-200 font-light mb-0 md:mb-2 group-hover:text-salomie-300 group-visited:opacity-5">
                {article.title}
              </h5>

              <p className="mt-1 text-sm text-stone-500 mb-2 font-light hidden md:visible md:block group-visited:opacity-5">
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
