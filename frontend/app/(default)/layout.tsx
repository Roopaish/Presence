"use client";

import Icon from "@/components/Icon";
import Link from "next/link";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <header className="shadow-md">
        <nav className="p-5 max-w-7xl mx-auto">
          <section className="flex justify-between">
            <Link href="/">
              <div className="text-primary font-bold text-2xl flex">
                <Icon type="logo" className="w-8 h-8" />
                <span>Presence</span>
              </div>
            </Link>

            <ul className="md:flex gap-12 hidden items-center">
              <li>Home</li>
              <li>Students</li>
              <li>Reports</li>
            </ul>

            <div className="flex gap-12">
              <Link href="/login" className="flex justify-center items-center">
                <Icon type="user" />
              </Link>
              <button onClick={() => setOpened(!opened)}>
                <Icon type="menu" />
              </button>
            </div>
          </section>
        </nav>

        <section
          className={`md:hidden bg-primary font-medium text-lg w-3/4 px-14 pt-20  text-white absolute transition-all
            ${opened ? "right-0" : "-right-full"}
            `}
          style={{
            height: "calc(100vh - 72px)",
          }}
        >
          <ul className="flex flex-col gap-7">
            <li>Home</li>
            <li>Students</li>
            <li>Reports</li>
          </ul>
        </section>
      </header>
      <main className="p-5 max-w-7xl mx-auto">{children}</main>
    </>
  );
}
