import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="min-h-screen body h-full flex flex-col justify-center items-center">
      <h1 className="text-white font-bold text-9xl">404</h1>
      <p className="text-white font-semibold text-7xl text-center">
        <span className="text-red-600">Uh Oh!</span> Page Not Found
      </p>
      <div className="w-full md:w-1/2 flex gap-6  justify-center mt-6">
        <Link to="/">
          <button className="text-white font-medium text-lg bg-orange-600 px-6 py-3 rounded-2xl hover:bg-orange-800 active:bg-orange-300">
            Go Home
          </button>
        </Link>
        <Link to="/contact">
          <button className="text-white font-medium text-lg bg-emerald-600 px-6 py-3 rounded-2xl hover:bg-emerald-800 active:bg-emerald-300">
            Contact Us
          </button>
        </Link>
      </div>
    </main>
  );
}

export default PageNotFound;
