import React, { useRef, useCallback } from "react";
import { useAsyncLocalState } from "../utils/loader";
import TimeAgo from "react-timeago";
import { getMetadata } from "../utils/getMetadata";
import { ArticleSmall } from "./ArticleSmall";
import { formatSnippet, getImgSrc, lerp } from "../utils/utils";
import { ItemSource } from "./ArticleSource";
import useInterval from "../hooks/useInterval";

export const Article = ({ article }) => {
  const [url] = React.useState(article.link);
  const loader = useCallback(getMetadata(url), [url]);
  const { payload, isLoading, loadError } = useAsyncLocalState(loader);
  const articleRef = useRef();

  let previousOpacity = -1;
  let targetOpacity = 1;
  let opacityDelta = 0;

  useInterval(() => {
    if (!payload || isLoading) return;
    let el = articleRef.current;
    if (targetOpacity !== parseFloat(el.style.opacity)) {
      el.style.opacity = lerp(previousOpacity, targetOpacity, opacityDelta);
      opacityDelta += 0.01;
    }
  }, 1);

  const onScroll = () => {
    if (articleRef?.current) {
      let el = articleRef.current;
      let elDistanceToTop = el.offsetTop - el.scrollTop + el.clientTop + 114;
      let x =
        (Math.min(
          window.innerHeight,
          Math.max(0, elDistanceToTop - window.scrollY)
        ) /
          window.innerHeight) *
        1.25;
      let getMid = x <= 0.5 ? x : 0.5 + -(x - 0.5);
      let opacity = Math.max(0, Math.min(1, 0.7 + 0.7 * getMid));
      if ((previousOpacity = -1)) {
        el.style.opacity = opacity;
      }
      previousOpacity = parseFloat(el.style.opacity);
      targetOpacity = opacity;
      opacityDelta = 0;
    }
  };

  onScroll();

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

  window.addEventListener("scroll", onScroll);

  if (!article.description || article.description.length < 100) {
    return (
      <li ref={articleRef}>
        <ArticleSmall article={article} />
      </li>
    );
  }

  const onHover = () => {
    console.log(article, payload);
  };

  const onImageError = (e) => {
    e.currentTarget.src = "https://source.unsplash.com/random";
    return true;
  };
  return (
    <>
      {article && !isLoading && (
        <li ref={articleRef}>
          <a
            href={article.link}
            className="block group relative overflow-hidden mb-2 md:mb-8 md:grid grid-cols-2 text-left"
            onMouseEnter={() => onHover()}
            target="_blank"
          >
            <img
              className="relative object-cover w-full h-56 drop-shadow-xl rounded-lg visible md:hidden md:float-right transition-all"
              src={article.image}
              alt=""
              onError={onImageError}
            />
            <div className="relative p-2 md:p-4 py-0 mt-2 md:mt-0 md:float-left block mr-4">
              <h5 className="text-m text-stone-400 font-light mb-0 md:mb-2 group-hover:text-stone-400 transition-all">
                {article.title}
              </h5>

              <p className="mt-1 text-sm text-stone-500 mb-2 font-light hidden md:visible md:block prose">
                {formatSnippet(article.description)}
              </p>
              <ItemSource article={article} />
            </div>
            <img
              className="relative object-cover w-full h-56 drop-shadow-xl rounded-lg hidden md:visible md:block md:float-right transition-all"
              src={article.image}
              alt=""
              onError={onImageError}
            />
          </a>
        </li>
      )}
      {loadError && <p>Load Error</p>}
    </>
  );
};
