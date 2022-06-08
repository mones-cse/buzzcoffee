import React from "react";
import Link from "next/link";

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to Next.js with Ankita</h1>
      <Link href={"/foobar"}>Go back to Dynamic page</Link>
    </div>
  );
};

export default Welcome;
