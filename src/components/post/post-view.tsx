import { Post } from "post-type";
import { ButtonLink } from "../button/button-link";
import { limitText } from "./utils/text";

type PostViewProps = {
  url: string;
  post: Post;
};

export function PostView({ url, post }: PostViewProps) {
  const { title, description, publishedAt } = post;
  const displayDescription = description
    ? limitText(description, 250)
    : "No description available";

  return (
    <ButtonLink
      href={url}
      target="_self"
      className="bg-surface-background text-main-foreground text-left flex flex-col h-full"
    >
      <div className="flex-grow flex flex-col">
        <h2 className="font-heading w500:text-lg text-xl mb-2">{title}</h2>

        {/* Container với chiều cao cố định */}
        <div className="relative h-[120px] mb-4 overflow-hidden">
          <p className="w500:text-sm">{displayDescription}</p>
          {/* Gradient overlay luôn hiển thị */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-surface-background to-transparent"></div>
        </div>
      </div>

      <div className="flex w-max items-center mt-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w500:h-3 w500:w-3 mr-3 h-4 w-4"
          viewBox="-0.5 0 15 15"
        >
          <path
            className="fill-main-foreground"
            fillRule="evenodd"
            d="M61,154.006845 C61,153.45078 61.4499488,153 62.0068455,153 L73.9931545,153 C74.5492199,153 75,153.449949 75,154.006845 L75,165.993155 C75,166.54922 74.5500512,167 73.9931545,167 L62.0068455,167 C61.4507801,167 61,166.550051 61,165.993155 L61,154.006845 Z M62,157 L74,157 L74,166 L62,166 L62,157 Z M64,152.5 C64,152.223858 64.214035,152 64.5046844,152 L65.4953156,152 C65.7740451,152 66,152.231934 66,152.5 L66,153 L64,153 L64,152.5 Z M70,152.5 C70,152.223858 70.214035,152 70.5046844,152 L71.4953156,152 C71.7740451,152 72,152.231934 72,152.5 L72,153 L70,153 L70,152.5 Z"
            transform="translate(-61 -152)"
          ></path>
        </svg>
        <p className="w500:text-xs text-sm leading-5 tracking-wide">
          {publishedAt}
        </p>
      </div>
    </ButtonLink>
  );
}
