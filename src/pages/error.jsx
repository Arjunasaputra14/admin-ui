import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-special-mainBg text-center px-4">
      <h1 className="text-5xl font-bold text-primary mb-4">Oops!</h1>

      <p className="text-gray-600 mb-2">
        Sorry, an unexpected error has occurred.
      </p>

      <p className="text-sm text-gray-400 mb-6">
        {error?.statusText || error?.message}
      </p>

      <Link
        to="/"
        className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
