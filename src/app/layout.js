import "./globals.css";

export const metadata = {
  title: "Project Manager",
  description: "Track and manage all your projects in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
