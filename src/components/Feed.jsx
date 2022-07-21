import React, { Suspense, useCallback, useState } from "react";
import { useAsyncLocalState } from "../utils/loader";
import TimeAgo from "react-timeago";
import { getFeeds } from "../utils/getFeed";
import { Article } from "./Article";
import feedJson from "../feeds.json";
import useInterval from "../hooks/useInterval";

const feeds = feedJson.feeds;

export const Feed = () => {
  const [urls] = useState(feeds);
  const [loaded, setLoaded] = useState(10);
  const [refresh, setRefresh] = useState(0);
  const loader = useCallback(getFeeds(urls), [urls, refresh]);
  const { payload, isLoading, loadError } = useAsyncLocalState(loader);

  useInterval(() => {
    setRefresh(refresh + 1);
    console.log("refresh triggered");
  }, 300000);

  if (!payload?.feed)
    return (
      <p
        className=""
        style={{ marginLeft: "auto", width: "100%", textAlign: "center" }}
      >
        <img
          src="./icon.png"
          className="animate-pulse animate-bounce drop-shadow-lg mx-auto"
          // style={{ marginLeft: "calc(50% - 48px)" }}
        />
      </p>
    );

  window.onscroll = function (ev) {
    var pageHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    if (window.innerHeight + window.scrollY >= pageHeight / 2) {
      setLoaded(loaded + 2);
    }
  };

  return (
    <>
      <ul
        className="m-4 mt-6 md:m-8 md:max-w-screen-md md:mx-auto"
        style={{ userSelect: "none" }}
      >
        {payload &&
          payload.feed &&
          payload.feed
            .sort((a, b) => {
              if (a.isoDate < b.isoDate) return 1;
              if (a.isoDate > b.isoDate) return -1;
              return 0;
            })
            .slice(0, loaded)
            .map((item, idx) => (
              <Suspense key={item.title}>
                <Article article={item} key={item.title} />
              </Suspense>
            ))}
        {loadError && <p>Load Error</p>}
      </ul>
    </>
  );
};
