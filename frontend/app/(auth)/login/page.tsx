import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <main className="px-5 py-8">
      <div className="flex flex-col gap-1 justify-between items-center w-full">
        <header className="text-center mb-10">
          <Icon type="logo" className="w-24 h-24 mx-auto"></Icon>
          <h3 className="text-3xl font-bold">Welcome to Presence</h3>
        </header>
      </div>
      <section className="max-w-md mx-auto p-6 rounded-lg text-black">
        <form className="w-full space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="ram.191704@ncit.edu.np"
            required
            label="College Email"
          />
          <Input type="password" name="password" required label="Password" />
          <div className="mb-4">
            <Button type="submit">Login</Button>
            <Link href="/forgot-password">
              <section>
                <a
                  href="#"
                  className="text-primary font-semibold hover:underline text-right block"
                >
                  Forgot password?
                </a>
              </section>
            </Link>
          </div>
        </form>
        <div className="mb-9 flex items-center gap-2 w-full">
          <div className="bg-black flex-1 h-[1px]"></div>
          <div>or</div>
          <div className="bg-black flex-1 h-[1px]"></div>
        </div>
        <Button variant="outline">
          <span className="mr-4 text-xl font-semibold">Continue with</span>
          <a href="https://myaccount.google.com/" target="blank">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2504/2504739.png"
              alt=""
              height="18"
              width="18"
            />
          </a>
        </Button>
      </section>
    </main>
  );
}
