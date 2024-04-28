"use client"

import Image from "next/image";
import { useEffect } from "react";
import SearchPage from "../../components/searchBox";
// import { fetchPublication } from "../../components/UpdateHashnode";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
  <SearchPage />
    </main>
  );
}
