'use client'

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import { SimpleResponse } from "@/providers/api";
import { login, loginWithGoogle, me } from "@/providers/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

type GoogleUserData = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};


export default function LoginPage() {
  const router = useRouter();

  const { refetch } = useQuery({
    queryKey: "user",
    queryFn: me,
    onSuccess: (data) => {
      if (data.data.is_superuser) {
        router.push('/admin')
      } else {
        router.push('/')
      }
    }
  })

  const { mutate: _login, isLoading } = useMutation(
    {
      mutationFn: login,
      onSuccess: () => {
        refetch();
      },

      onError: (error: AxiosError<SimpleResponse>) => {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      }
    }
  );

  const { mutate: _loginWithGoogle, isLoading: isGoogleLoginLoading } = useMutation(
    {
      mutationFn: loginWithGoogle,
      onSuccess: () => {
        refetch();
      },
      onError: (error: AxiosError<SimpleResponse>) => {
        console.log('hey')
        toast.error(error.response?.data?.message ?? "Something went wrong");
      }
    }
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    _login({ username, password });
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      _loginWithGoogle({ token: codeResponse?.access_token ?? "" });
    }
  });


  return (
    <main className="px-5 py-8">
      <div className="flex flex-col gap-1 justify-between items-center w-full">
        <header className="text-center mb-10">
          <Icon type="logo" className="w-24 h-24 mx-auto"></Icon>
          <h3 className="text-3xl font-bold">Welcome to Presence</h3>
        </header>
      </div>
      <section className="max-w-md mx-auto p-6 rounded-lg text-black">
        <form className="w-full space-y-4" onSubmit={onSubmit}>
          <Input
            type="email"
            name="username"
            placeholder="ram.191704@ncit.edu.np"
            required
            label="College Email"
          />
          <Input type="password" name="password" required label="Password" />
          <div className="mb-4">
            <Button type="submit" isLoading={isLoading || isGoogleLoginLoading}>Login</Button>
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
        <Button variant="outline" onClick={() => googleLogin()}>
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
