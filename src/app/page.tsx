"use client"

import { Dashboard } from "@/components/Dashboard/Dashboard";
import Item from "@/components/Item/Item";
import Questions from "@/components/Question/Question";
import Sidebar from "@/components/Sidebar/Sidebar";
import { usePageStore } from "@/store/pageStore";

export default function Home() {
  const page = usePageStore((state) => state.page); // Retrieve the current page from Zustand store

  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
      <Sidebar />

      {page === "dashboard" ? <Dashboard /> : page === "questions" ? <Questions /> : page === "item" ? <Item /> : null}

    </main>
  );
}
