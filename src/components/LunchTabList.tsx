import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * ランチのレビューと店情報を表示するタブ.
 */
export default function LunchTabList() {
  const [categories] = useState({
     ランチレビュー: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    お店情報: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
  });

  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-bgc rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-bold text-text-brown rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow border-4 border-basic"
                    : "text-text-brown text-opacity-60 hover:text-opacity-100 hover:bg-white hover:bg-opacity-60 ",
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
