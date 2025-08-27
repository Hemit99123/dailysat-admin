"use client"

import React from "react";
import { IconType } from "react-icons";
import {
  FiHome,
} from "react-icons/fi";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";
import { usePageStore } from "@/store/pageStore"; // Update the import path
import { Page as PageType} from "@/types/page";

const PageSelect = () => {
  const page = usePageStore((state) => state.page); // Retrieve the current page from Zustand store
  const setPage = usePageStore((state) => state.change); // Retrieve the setter function from Zustand store

  // Handle page selection
  const handlePageSelect = (newPage: PageType) => {
    setPage(newPage); // Update the page in Zustand store
  };

  return (
    <div className="space-y-1">
      <Page
        Icon={FiHome}
        selected={page === "dashboard"}
        title="Dashboard"
        onClick={() => handlePageSelect("dashboard")}
      />
      <Page
        Icon={AiFillQuestionCircle}
        selected={page === "questions"}
        title="Create Question"
        onClick={() => handlePageSelect("questions")}
      />
      <Page
        Icon={FaMoneyBill}
        selected={page === "item"}
        title="Create Item"
        onClick={() => handlePageSelect("item")}
      />
    </div>
  );
};

const Page = ({
  selected,
  Icon,
  title,
  onClick,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick} // Call onClick to change page when clicked
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-blue-500" : ""} />
      <span>{title}</span>
    </button>
  );
};

export default PageSelect;
