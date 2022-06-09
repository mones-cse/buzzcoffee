import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Link href={"/"}>
        <a>
          <h2>Go back Home </h2>
        </a>
      </Link>
      {id}
    </div>
  );
};
export default CoffeeStore;
