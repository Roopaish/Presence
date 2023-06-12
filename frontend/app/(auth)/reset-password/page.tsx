import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import React from "react";

export default function Resetpassword() {
  return (
    <main className="px-5 py-14">
      <div className="flex flex-col gap-1 justify-between items-center w-full">
        <header className="text-center mb-10">
          <Icon type="logo" className="w-24 h-24 mx-auto"></Icon>
          <h3 className="text-xl font-bold">Reset Your password</h3>

          <h2> Back to Sign in</h2>
        </header>
      </div>

      <section className="max-w-md mx-auto p-6 rounded-lg text-black">
        <form className="w-full">
          <Input
            type="password"
            name="password"
            required
            label="New Password"
          />
          <div className="mt-8">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
