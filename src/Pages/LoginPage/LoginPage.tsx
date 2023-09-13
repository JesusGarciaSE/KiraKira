import { useState } from "react";
import Button from "../../Components/Buttons/Button";
import { loginWithEmailandPassword } from "../../Services/FirebaseServices";
import logo from "../../assets/SiteImages/Kirakira_logo_placeholder.png";
import { useNavigate } from "react-router-dom";
import LoginErrors from "./LoginErrors";

interface ILoginPage {
  className: string;
}

interface UserLogin {
  email: string;
  password: string;
}

const LoginPage: React.FC<ILoginPage> = ({ className }) => {
  const [user, setUser] = useState<UserLogin>({ email: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setError(false);
    loginWithEmailandPassword(user.email, user.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        setError(true);
        console.log("error", error);
      });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className={`${className} flex`}>
      <div className="w-4/5 m-auto rounded-xl bg-fuchsia-500 shadow-md shadow-purple-800">
        <div className="p-5 flex flex-col gap-3">
          <div className="grid content-center flex-1 relative">
            <div className="h-24 mx-auto">
              <img
                loading="lazy"
                className="max-h-full max-w-full"
                src={logo}
                alt="Logo"
              />
            </div>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-custom text-transparent bg-clip-text bg-clip bg-gradient-to-br from-kira-slogo-start via-kira-slogo-through to-kira-slogo-end">
              KiraKira
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="email">Email</label>
            <input
              className="flex-grow text-black px-1 py-0.5"
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={(event) => {
                handleFormChange(event);
              }}
            />
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="password">Password</label>
            <input
              className="flex-grow text-black px-1 py-0.5"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(event) => {
                handleFormChange(event);
              }}
            />
          </div>
          {error && (
            <LoginErrors code="400" error="Invalid email or password." />
          )}
          <Button
            label="Login"
            className="h-14 w-28 place-self-end p-2 shadow-lg bg-gradient-to-b from-kira-bg-start via-kira-bg-through to-kira-bg-end rounded-lg flex flex-row"
            onClick={(event) => {
              handleLogin(event);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
