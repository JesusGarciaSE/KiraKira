import { GiNinjaStar } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/SiteImages/Kirakira_logo_placeholder.png";
import Button from "../Buttons/Button";
import { auth } from "../../Services/FirebaseServices";
import { useAuth } from "../../Services/AuthContext";
import { signOut } from "firebase/auth";
import { INavigationSidebar } from "../../Models/ComponentModels";

const pages = ["Account", "Cart"];

const UserNavigation: React.FC<INavigationSidebar> = ({
  className,
  active,
  color,
  onClick,
}) => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed Out Successful");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    onClick();
    navigate("/home");
  };
  const goToLogin = () => {
    onClick();
    navigate("/login");
  };

  return (
    <div
      className={`z-10 flex flex-col fixed min-h-screen min-w-full p-3 text-2xl text-center ease-in-out duration-300 ${className} ${color} ${
        active ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="relative">
        <GiNinjaStar
          className={`absolute z-20 right-1 text-navClose h-12 w-12`}
          onClick={onClick}
        />
        <div className="grid content-center flex-1 relative">
          <div className="h-48 mx-auto">
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
      </div>
      <ul className="flex-grow">
        {pages.map((page, index) => (
          <Link
            to={page.toLowerCase()}
            onClick={onClick}
            key={`${index}_${page}`}
          >
            <li className="py-3">{page}</li>
          </Link>
        ))}
        <li>
          {loggedIn ? (
            <Button
              className="h-14 w-28 mx-auto p-2 shadow-lg bg-gradient-to-b from-kira-bg-end via-kira-bg-through to-kira-bg-start rounded-lg"
              label="Logout"
              onClick={logout}
            />
          ) : (
            <Button
              className="h-14 w-28 mx-auto p-2 shadow-lg bg-gradient-to-b from-kira-bg-end via-kira-bg-through to-kira-bg-start rounded-lg"
              label="Login"
              onClick={goToLogin}
            />
          )}
        </li>
      </ul>

      <p className="text-sm">KiraKira, LLC 2023</p>
    </div>
  );
};

export default UserNavigation;
