import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between px-5">
      <h1 className="text-2xl font-bold">Next.js 14</h1>
      <div className="flex gap-3">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
