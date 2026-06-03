import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";




interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

const Login = () => {
  // const [user, setUser] = useState<User | null>(null);
  const { login } = useAuth()

  const nav = useNavigate();

  const handleLogin = (cred: string) => {
    const decoded = jwtDecode<GoogleUser>(cred);
    login({
      name: decoded.name,
      img_url: decoded.picture || null,
      islogged: true
    });
    nav("/");
  };
  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin
        onSuccess={(response) => {
          handleLogin(response.credential!);
        }}
        onError={() => console.error("Login failed")}
      />
    </div>
  );
};

export default Login;
