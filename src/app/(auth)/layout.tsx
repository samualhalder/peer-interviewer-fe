import React from "react";
import "../globals.css";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>{/* Add any global meta tags or links here */}</head>
      <body>
        <div className="flex justify-center items-center h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
