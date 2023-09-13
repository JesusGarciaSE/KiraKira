interface ILoginErrors {
  code: string;
  error: string;
}

const LoginErrors: React.FC<ILoginErrors> = ({ code, error }) => {
  return <p className="text-center text-red-800 text-lg font-bold">{code} {error}</p>;
};

export default LoginErrors;
