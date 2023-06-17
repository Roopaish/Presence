'use client'

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import { SimpleResponse } from "@/providers/api";
import { resetPassword } from "@/providers/auth";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export default function Resetpassword({ params }: {
  params: {
    uid: string;
    token: string;
  }
}) {
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully");
      router.push('/login')
    },
    onError: (error: AxiosError<SimpleResponse>) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    mutate({
      newPassword: data.get("password") as string,
      uid: params.uid,
      token: params.token
    })
  }

  return (
    <main className="px-5 py-14">
      <div className="flex flex-col gap-1 justify-between items-center w-full">
        <header className="text-center mb-10">
          <Icon type="logo" className="w-24 h-24 mx-auto"></Icon>
          <h3 className="text-xl font-bold">Reset Your password</h3>
          <Link className="flex gap-1 justify-center" href="/login">
            <Icon type="back" className="w-4" />
            <h2> Back to Sign in</h2>
          </Link>
        </header>
      </div>

      <section className="max-w-md mx-auto p-6 rounded-lg text-black">
        <form className="w-full" onSubmit={handleSubmit}>
          <Input
            type="password"
            name="password"
            required
            label="New Password"
          />
          <div className="mt-8">
            <Button type="submit" isLoading={isLoading}>Submit</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
