// pages/404.jsx
import Link from "next/link";

export default function Custom404() {
  return (
      <div className={"flex flex-col items-center justify-center h-screen"}>
        <h1 className={"text-5xl pb-8"}>404 - Page Not Found</h1>
        <Link className={"hover:underline"} href={"/"} > Back to home </Link>
      </div>
  );
}
