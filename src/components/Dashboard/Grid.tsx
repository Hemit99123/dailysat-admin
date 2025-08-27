import React from "react";
import StatCards from "./StatCards";
import Leaderboard from "./Leaderboard";

const Grid = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatCards />
      <Leaderboard />
    </div>
  );
};

export default Grid