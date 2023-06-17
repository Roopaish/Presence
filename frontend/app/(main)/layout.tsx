import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="p-5 max-w-7xl mx-auto">{children}</main>
    </>
  );
}
