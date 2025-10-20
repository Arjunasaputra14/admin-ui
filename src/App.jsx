import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-special-mainBg flex justify-center items-center font-poppins">
      <div className="w-full max-w-sm p-5">
        {/* logo start */}
        <div className="flex justify-center tracking-wide text-primary text-4xl text-center w-full items-center p-5">
          <span className="font-bold">FINE</span>bank<span className="font-bold">.IO</span>
        </div>

        {/* logo end */}

        {/* form start */}
        <form action="" className="mt-2">
          <div className="py-2">
            <label htmlFor="email" className="block text-sm">
              Email Address
            </label>
            <input
              type="email"
              className="p-2 text-sm rounded-md w-full bg-special-mainBg border border-gray-300 text-gray-700 focus:border-black focus:outline-none focus:ring-0 my-2"
              placeholder="johndoe@email.com"
              id="email"
            />
          </div>

          <div className="py-2 relative">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
              <a href="#" className="text-primary text-xs hover:underline">
                Forgot Password?
              </a>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="p-2 text-sm rounded-md w-full bg-special-mainBg border border-gray-300 text-gray-700 focus:border-black focus:outline-none focus:ring-0 my-2 pr-10"
              placeholder="********"
              id="password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.544-7a9.963 9.963 0 012.043-3.368m3.003-2.551A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.544 7a9.958 9.958 0 01-4.038 5.18M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18M10.477 10.477A3 3 0 0115 12m6.963 0a9.978 9.978 0 01-1.29 2.81m-1.99 2.358C16.94 18.814 14.61 20 12 20c-4.478 0-8.268-2.943-9.544-7a9.974 9.974 0 012.59-4.263M6.18 6.18A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.544 7a9.978 9.978 0 01-1.249 2.592"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2 mb-4">
            <input
              type="checkbox"
              className="accent-primary"
              id="status"
            />
            <label htmlFor="status" className="text-sm text-gray-700">
              Keep me signed in
            </label>
          </div>

          <button
            className="rounded-md text-sm bg-primary w-full text-white py-2 hover:opacity-90 transition"
            type="submit"
          >
            Login
          </button>
        </form>
      {/* form end */}

        {/* teks start */}
        <div className="flex items-center justify-center my-4 relative">
          <div className="w-full border-t border-gray-300"></div>
          <span className="absolute bg-special-mainBg px-2 text-xs text-gray-400">
            or sign in with
          </span>
        </div>
        {/* teks end */}

        {/* sign in with googlr start */}
        <button
          className="flex items-center justify-center rounded-md text-sm w-full bg-gray-100 text-gray-600 py-2 hover:bg-gray-200 transition"
          type="button"
        >
          <svg
            className="h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FBBC05"
              d="M9.827 24c0-1.524.253-2.986.705-4.356L2.623 13.604C1.082 16.734.214 20.26.214 24c0 3.737.867 7.261 2.406 10.389l7.905-6.051A14.172 14.172 0 0 1 9.827 24z"
            />
            <path
              fill="#EB4335"
              d="M23.714 10.133c3.311 0 6.302 1.173 8.652 3.093l6.836-6.827C35.036 2.773 29.695.533 23.714.533 14.427.533 6.445 5.844 2.623 13.604l7.909 6.04c1.822-5.532 7.017-9.511 13.182-9.511z"
            />
            <path
              fill="#34A853"
              d="M23.714 37.867c-6.165 0-11.36-3.979-13.182-9.511l-7.909 6.039C6.445 42.156 14.427 47.467 23.714 47.467c5.732 0 11.205-2.035 15.312-5.849l-7.507-5.804a14.19 14.19 0 0 1-7.805 2.053z"
            />
            <path
              fill="#4285F4"
              d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714V28.8h12.604a10.017 10.017 0 0 1-4.8 7.015l7.507 5.804C43.339 37.614 46.145 31.649 46.145 24z"
            />
          </svg>
          Continue with Google
        </button>
        {/* sign in with googlr start */}

        {/* Link start */}
        <div className="flex justify-center mt-4">
          <a href="#" className="text-primary text-sm font-bold hover:underline">
            Create an account
          </a>
        </div>
        {/* Link start */}

      </div>
    </main>
  );
}

export default App;
