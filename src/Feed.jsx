import React, { useCallback } from "react";
import { useAsyncLocalState } from "./Loader";
import TimeAgo from "react-timeago";
import { getFeeds } from "./getFeed";
import { Article } from "./Article";
import feedJson from "./feeds.json";

const feeds = feedJson.feeds;

export const Feed = () => {
  const [urls] = React.useState(feeds);
  const loader = useCallback(getFeeds(urls), [urls]);
  const { payload, isLoading, loadError } = useAsyncLocalState(loader);
  if (payload) {
    console.log(payload);
  }
  if (isLoading)
    return (
      <p
        className="absolute w-full"
        style={{ marginLeft: "auto", width: "100%", textAlign: "center" }}
      >
        <img
          src="./icon.png"
          className="animate-pulse animate-bounce drop-shadow-lg"
          style={{ marginLeft: "calc(50% - 48px)" }}
        />
      </p>
    );
  return (
    <>
      <ul className=" m-4 mt-6 md:m-8">
        {payload &&
          payload.feed &&
          payload.feed
            .sort((a, b) => {
              if (a.isoDate < b.isoDate) return 1;
              if (a.isoDate > b.isoDate) return -1;
              return 0;
            })
            .map((item, idx) => <Article article={item} key={idx} />)}
        {loadError && <p>Load Error</p>}
      </ul>
    </>
  );
};
