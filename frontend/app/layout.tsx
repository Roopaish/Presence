import Providers from "@/configs/providers";
import { Raleway } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "Presence",
  description: "Automated Auttendance System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={raleway.className}>
      <Providers>
        <body className="overflow-x-hidden font-normal">
          <ToastContainer />
          {children}
        </body>
      </Providers>
    </html>
  );
}
