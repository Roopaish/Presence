'use client'

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import { SimpleResponse } from "@/providers/api";
import { forgotPassword } from "@/providers/auth";
import { AxiosError } from "axios";
import Link from "next/link";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export default function Forgotpassword() {
  const { mutate, isLoading } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Reset link sent to your email");
    },
    onError: (error: AxiosError<SimpleResponse>) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    mutate({ email });
  }

  return (
    <main className="px-5 py-14">
      <div className="flex flex-col gap-1 justify-between items-center w-full">
        <header className="text-center mb-10">
          <Icon type="logo" className="w-24 h-24 mx-auto "></Icon>
          <h3 className="text-xl font-bold">
            Enter your email to get a reset link
          </h3>
          <Link className="flex gap-1 justify-center" href="/login">
            <Icon type="back" className="w-4" />
            <h2> Back to Sign in</h2>
          </Link>
        </header>
      </div>

      <section className="max-w-md mx-auto p-6  rounded-lg text-black">
        <form className="w-full" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="ram.191704@ncit.edu.np"
            required
            label="College Email"
          />
          <div className="mt-8">
            <Button type="submit" isLoading={isLoading}>Submit</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
