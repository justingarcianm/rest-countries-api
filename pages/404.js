import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-8">
      <h2 className="font-bold text-4xl pb-8"> Page not found. </h2>
      <Link href={"/"} className="py-2 px-8 shadow-lg bg-white dark:bg-slate-800">
        {" "}
        Go Home{" "}
      </Link>
    </div>
  );
};

export default NotFound;
