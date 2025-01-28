import React from "react";
import { IconType } from "react-icons";
import {
  FiHome,
} from "react-icons/fi";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";

const PageSelect = () => {
  return (
    <div className="space-y-1">
      <Page Icon={FiHome} selected={true} title="Dashboard" />
      <Page Icon={AiFillQuestionCircle} selected={false} title="Create Question" />
      <Page Icon={FaMoneyBill} selected={false} title="Create Item" />
    </div>
  );
};

const Page = ({
  selected,
  Icon,
  title,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
}) => {
  return (
    <button
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