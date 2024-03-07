
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { light } from "@clerk/themes";


import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: light,
    }}>
      <html lang="en"> 
        <body className={inter.className}>
        <Header />
          <main className="container">
            <div className="flex items-start justify-center min-h-screen">
              <div className="mt-20 mx-auto">
              {children}
              </div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}

