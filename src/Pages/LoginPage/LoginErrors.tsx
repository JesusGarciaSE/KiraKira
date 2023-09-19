import { IErrors } from "../../Models/UserModels";

const LoginErrors: React.FC<IErrors> = ({ code, error }) => {
  return (
    <p className="text-center text-red-800 text-lg font-bold">
      {code} {error}
    </p>
  );
};

export default LoginErrors;