"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
// 52435459912-mem62racbffkl2io1rda8vishuidjg1n.apps.googleusercontent.com

const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="52435459912-mem62racbffkl2io1rda8vishuidjg1n.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
     </GoogleOAuthProvider>
  );
}
