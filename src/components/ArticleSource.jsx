import TimeAgo from "react-timeago";
import shortStrings from "react-timeago/lib/language-strings/en-short";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const formatter = buildFormatter(shortStrings);

export const ItemSource = ({ article }) => {
  return (
    <div className="mb-3 mt-2 md:mt-1 text-xs font-normal text-stone-700 break-inside-avoid ">
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
      {article.siteName}{" "}
      <span className="text-yellow-800 font-extrabold">&#183;</span>
      &nbsp;
      <TimeAgo date={article.isoDate} formatter={formatter} />
    </div>
  );
};
