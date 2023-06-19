"use client";

import Icon from "@/components/Icon";
import { UserData, logout, me } from "@/providers/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export default function Header() {
  // const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [dUser, setDUser] = useState<UserData | null>(null);

  const { data: user, isLoading } = useQuery({
    queryKey: "user",
    queryFn: me,
    onSuccess: (data) => {
      if (dUser?.data.id !== data.data.id) {
        setDUser(data);
        if (data.data.is_superuser) {
          router.push('/admin')
        } else {
          router.push('/')
        }
      }
    },
    onError: () => {
      router.push('/login')
    },
    retry: false,
  })

  const { mutate: _logout, isLoading: isLogoutLoading } = useMutation({
    mutationKey: "logout",
    mutationFn: logout,
    onSuccess: () => {
      router.push('/login')
    },
    onError: () => {
      router.push('/login')
    }
  })

  return (
    <>
      <header className="shadow-md">
        <nav className="p-5 max-w-7xl mx-auto">
          <section className="flex justify-between">
            <Link href={user?.data.is_superuser ? "/admin" : "/"}>
              <div className="text-primary font-bold text-2xl flex">
                <Icon type="logo" className="w-8 h-8" />
                <span>Presence</span>
              </div>
            </Link>

            {/* <ul className="md:flex gap-12 hidden items-center">
              <li>Home</li>
              <li>Students</li>
              <li>Reports</li>
            </ul> */}

            <div className="flex gap-12 items-center">

              {user ?
                isLogoutLoading ? <div className="h-7 w-7 rounded-full border-2 border-primary border-l-transparent animate-spin"></div>
                  : (<button onClick={() => _logout()}>
                    <Icon type="logout" className="text-gray-500 w-7 h-7 hover:text-red-400" />
                  </button>) : null}
              {/* <button onClick={() => setOpened(!opened)}>
                <Icon type="menu" />
              </button> */}
            </div>
          </section>
        </nav>

        {/* <section
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
        </section> */}
      </header>

      {/* {
        isLoading && (
          <div className="flex flex-col justify-center items-center absolute inset-0 z-50 bg-white">
            <header className="text-center mb-10">
              <Icon type="logo" className="w-24 h-24 mx-auto"></Icon>
              <h3 className="text-3xl font-bold">Welcome to Presence</h3>
            </header>
            <div className="h-12 w-12 rounded-full border-4 border-primary border-l-transparent animate-spin"></div>
          </div>
        )
      } */}
    </>
  );
}
