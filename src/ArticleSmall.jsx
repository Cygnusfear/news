import TimeAgo from "react-timeago";

export const ArticleSmall = (props) => {
  let { article, metadata, icon, image } = props;
  return (
    <li>
      <a
        href={article.link}
        className="block relative overflow-hidden mb-6 md:mb-8 grid grid-cols-2 text-left"
      >
        <div className="relative p-4 py-0 ">
          <h5 className="text-m text-stone-200 font-light mb-0 md:mb-2">
            {article.title}
          </h5>
          <div className="mb-3 text-xs font-normal text-stone-700 break-inside-avoid">
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
            {metadata.siteName}{" "}
            <span className="text-yellow-800 font-extrabold">&#183;</span>
            &nbsp;
            <TimeAgo date={article.isoDate} />
          </div>
        </div>
        <img
          className="relative object-cover w-full h-28 drop-shadow-xl rounded-lg"
          src={image}
          alt=""
        />
      </a>
    </li>
  );
};
