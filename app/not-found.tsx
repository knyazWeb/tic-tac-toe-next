import Link from "next/link";


export default function notFound() {
  return (
    <div className="flex justify-center items-center flex-col w-screen">
      <h2 className="text-3xl text-textDark font-bold">404 Not Found</h2>
      <Link
        href="/"
        className="text-xl text-textDark cursor-pointer hover:underline mt-5 transition-all duration-200 ease-in-out"
      >
        Return Home
      </Link>
    </div>
  );
}