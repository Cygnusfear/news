import React, { useCallback } from "react";
import { useAsyncLocalState } from "./Loader";
import TimeAgo from "react-timeago";
import { getFeeds } from "./getFeed";
import { Article } from "./Article";

const feeds = [
  `https://blog.siggraph.org/feed/`,
  `https://scitechdaily.com/feed/`,
  `https://techxplore.com/rss-feed/machine-learning-ai-news/`,
  `https://www.space.com/feeds/all`,
  `http://www.sciencedaily.com/newsfeed.xml`,
  `https://www.theportugalnews.com/rss`,
  `http://www.physorg.com/rss-feed/`,
  `http://feeds.feedburner.com/sciencealert-latestnews`,
  `http://www.universetoday.com/universetoday.xml`,
];

export const Feed = () => {
  const [urls] = React.useState(feeds);
  const loader = useCallback(getFeeds(urls), [urls]);
  const { payload, isLoading, loadError } = useAsyncLocalState(loader);
  if (payload) {
    console.log(payload);
  }
  return (
    <>
      <ul>
        {payload &&
          payload.feed &&
          payload.feed
            .sort((a, b) => {
              if (a.isoDate < b.isoDate) return 1;
              if (a.isoDate > b.isoDate) return -1;
              return 0;
            })
            .map((item) => <Article article={item} key={item.title} />)}
        {loadError && <p>Load Error</p>}
        {isLoading && (
          <p>
            <div
              className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-stone-800"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </p>
        )}
      </ul>
    </>
  );
};
