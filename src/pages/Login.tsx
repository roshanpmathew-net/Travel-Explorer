import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

const Login = () => {
  const { login } = useAuth();
  const nav = useNavigate();

  const handleLogin = (cred: string) => {
    const decoded = jwtDecode<GoogleUser>(cred);

    login({
      name: decoded.name,
      img_url: decoded.picture || null,
      islogged: true,
    });

    nav("/");
  };

  return (
    <div className="min-h-screen bg-[url('./images/Login-bg.avif')] bg-cover bg-center">
<div className="min-h-screen bg-white/30 backdrop-blur-xs flex flex-col items-center justify-center px-4 py-8">        
        <div className="flex flex-col items-center gap-4 mb-8">
          <img
            className="h-20 w-20 rounded-3xl shadow-lg"
            src="./images/Logo.png"
            alt="Voyage Logo"
          />

          <div className="text-center">
            <h1 className="text-4xl font-bold text-black">
              Voyage
            </h1>

            <p className="mt-2 text-sm md:text-base text-black/90">
              Your gateway to the world's finest destinations
            </p>
          </div>
        </div>
        <div
          className="
            w-full
            max-w-md
            bg-white/95
            backdrop-blur-md
            rounded-2xl
            shadow-2xl
            p-8
            flex
            flex-col
            gap-6
          "
        >
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(response) => {
                handleLogin(response.credential!);
              }}
              onError={() => console.error("Login failed")}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-400"></div>

            <p className="text-xs font-semibold tracking-widest text-gray-500 whitespace-nowrap">
              OR CONTINUE WITH
            </p>

            <div className="h-px flex-1 bg-gray-400"></div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="mt-2"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-[#2563EB] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-2"
              />
            </div>

            <Button
              className="
                w-full
                h-11
                bg-[#2563EB]
                hover:bg-[#1D4ED8]
                transition-all
                duration-300
                font-medium
                cursor-pointer
                shadow-md
              "
            >
              Sign in to Voyage
            </Button>

            {/* Signup */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#2563EB] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs md:text-sm tracking-[0.3em] text-white/90 font-medium text-center">
          TRUSTED BY TRAVELERS WORLDWIDE
        </p>
      </div>
    </div>
  );
};

export default Login;