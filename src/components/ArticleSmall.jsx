import { ItemSource } from "./ArticleSource";

export const ArticleSmall = ({ article }) => {
  const onHover = () => {
    console.log(article);
  };
  return (
    <li>
      <a
        href={article.link}
        className="block group relative overflow-hidden mb-6 md:mb-8 grid grid-cols-2 text-left visited:opacity-80"
        onMouseEnter={() => onHover()}
      >
        <div className="relative p-2 md:p-4 py-0">
          <h5 className="text-sm md:text-m text-stone-200 font-light mb-1 md:mb-2 group-hover:text-salomie-300">
            {article.title}
          </h5>
          <ItemSource article={article} />
        </div>
        <img
          className="relative object-cover w-full h-28 drop-shadow-xl rounded-lg"
          src={article.image}
          alt=""
        />
      </a>
    </li>
  );
};