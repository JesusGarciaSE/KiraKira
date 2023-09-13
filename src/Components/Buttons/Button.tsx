interface IButton {
  className?: string;
  label?: string;
  children?: React.ReactNode;
  onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const Button: React.FC<IButton> = ({className, label, onClick, children }) => {
  return (
    <div
      className={`${className}`}
      onClick={onClick}
    >
      <div className="place-self-center mx-auto max-h-full max-w-full overflow-hidden">
        {children ? (
          children
        ) : (
          <p className="text-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-kira-hlogo-start via-kira-hlogo-through to-kira-hlogo-end">
            {label}
          </p>
        )}
      </div>
    </div>
  );
};

export default Button;
