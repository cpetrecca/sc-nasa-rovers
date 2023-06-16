import "./globals.css";
//import { Inter } from "next/font/google";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Main from "@/components/layout/main/Main";
import Space from "@/components/space/Space";
//const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nasa Rovers",
  description: "Southern Code Technical Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${/*inter.className*/""} overflow-y-auto flex place-content-center  max-w-screen  bg-transparent `}
      >
        <Space />
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
