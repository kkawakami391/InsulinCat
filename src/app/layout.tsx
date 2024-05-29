import type { Metadata } from "next";
// import "./globals.css";
import Nav from "./components/Nav";
import MuiThemeProvider from "./components/MuiThemeProvider";

export const metadata: Metadata = {
  title: "Insulinating the cat",
  icons: "favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <MuiThemeProvider>
            <Nav />
            {children}
          </MuiThemeProvider>
        </main>
      </body>
    </html>
  );
}
