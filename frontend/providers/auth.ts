import api, { SimpleResponse } from "./api";

export async function login({ username, password }: LoginInputs) {
  const res = await api.post<SimpleResponse>("/users/login", {
    username,
    password,
  });
  return res.data;
}

export async function loginWithGoogle({ token }: { token: string }) {
  const res = await api.post<SimpleResponse>("/users/login/google", 
  {
    token,
  });
  return res.data;
}

export async function me() {
  const res = await api.get<UserData>("/users/me");
  return res.data;
}

export async function logout() {
  const res = await api.get("/users/logout");
  return res.data;
}

export async function forgotPassword({ email }: { email: string }) {
  const res = await api.post("/users/forgot-password", { email });
  return res.data;
}

export async function resetPassword({
  uid,
  token,
  newPassword,
}: {
  uid: string;
  token: string;
  newPassword: string;
}) {
  const res = await api.post(`/users/reset-password/${uid}/${token}`, {
    new_password: newPassword,
  });
  return res.data;
}

export interface UserData {
  success: boolean;
  data: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_superuser: boolean;
    has_submitted_images: boolean;
  };
}

export interface LoginInputs {
  username: string;
  password: string;
}
