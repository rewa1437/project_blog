import Link from "next/link";

export default function Register() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Link href="/">
        <div className="absolute top-4 left-4 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:shadow-2xl hover:scale-105 transition-all">
          <span className="text-2xl">×</span>
        </div>
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>

        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Your username"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Re-Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-sm text-center">
            <p>Already have an account? 
              <Link href="/logins">
                <span className="text-blue-500 hover:underline">Login here</span>
              </Link>
            </p>
          </div>

          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
