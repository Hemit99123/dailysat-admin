"use client"

import { User } from "@/types/user";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiDollarSign } from "react-icons/fi";

const Leaderboard = () => {
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("/api/leaderboard");
        const data = response.data;
        setSortedUsers(data.sortedUsers); // Assuming the response contains a `sortedUsers` array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiDollarSign /> Leaderboard
        </h3>
      </div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : sortedUsers?.length > 0 ? (
            sortedUsers.map((user, index) => (
              <TableRow
                key={user._id}
                id={user._id || `#${index + 1}`}
                name={user.name || "Unknown"}
                money={`$${user.currency}`}
                order={index + 1}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">ID</th>
        <th className="text-start p-1.5">Name</th>
        <th className="text-start p-1.5">Money</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

export default Leaderboard;

const TableRow = ({
  id,
  name,
  money,
  order,
}: {
  id: string;
  name: string;
  money: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a
          href="#"
          className="text-blue-600 underline flex items-center gap-1"
        >
          {id} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{name}</td>
      <td className="p-1.5">{money}</td>
    </tr>
  );
};
