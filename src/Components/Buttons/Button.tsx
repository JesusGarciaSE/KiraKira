interface IButton {
  className?: string;
  textOptions?: string;
  label?: string;
  children?: React.ReactNode;
  onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const Button: React.FC<IButton> = ({
  className,
  textOptions,
  label,
  onClick,
  children,
}) => {
  return (
    <div className={`${className} flex flex-row`} onClick={onClick}>
      <div className="place-self-center mx-auto max-h-full max-w-full overflow-hidden">
        {children ? (
          children
        ) : (
          <p
            className={`${textOptions} text-center font-bold text-transparent bg-clip-text bg-gradient-to-b from-kira-hlogo-start via-kira-hlogo-through to-kira-hlogo-end`}
          >
            {label}
          </p>
        )}
      </div>
    </div>
  );
};

export default Button;
