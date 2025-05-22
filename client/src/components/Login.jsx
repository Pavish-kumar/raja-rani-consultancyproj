import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password });
      if (data.success) {
        navigate('/');
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 text-sm text-gray-600"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-5 bg-white p-8 sm:p-10 w-80 sm:w-[360px] rounded-lg shadow-2xl border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {state === "login" ? "Login to Your Account" : "Create Your Account"}
        </h2>

        {state === "register" && (
          <div className="w-full">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="w-full">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-center text-sm">
          {state === "register" ? (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => setState("login")}
                className="text-primary font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              New here?{' '}
              <span
                onClick={() => setState("register")}
                className="text-primary font-medium cursor-pointer hover:underline"
              >
                Create account
              </span>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dull transition"
        >
          {state === "register" ? "Sign Up" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
