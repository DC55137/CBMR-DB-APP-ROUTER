import Navbar from "@/components/Navbar";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter, Lexend } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "Job Management App",
  description: "Manage your jobs efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth bg-white antialiased [font-feature-settings:'ss01']"
    >
      <body
        className={`${inter.className} ${lexend.className} flex h-full flex-col`}
      >
        <ToastContainer autoClose={2000} />
        <div className="bg-main-2">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
