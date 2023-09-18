import { ICustomizableComponent } from "../../Models/ComponentModels";

interface IButtonSelect extends ICustomizableComponent {
  initialValue: number;
  buttonColor?: string;
  increment(): void;
  decrement(): void;
  updateQuantity(x: number): void;
}

const ButtonSelector: React.FC<IButtonSelect> = ({
  className,
  buttonColor,
  initialValue,
  increment,
  decrement,
  updateQuantity,
}) => {
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    value
      ? value > 99
        ? updateQuantity(99)
        : updateQuantity(value)
      : updateQuantity(0);
  };
  return (
    <div
      className={`${className} flex flex-row border-1 rounded-lg border-solid border-slate-400/75`}
    >
      <button
        className={`${buttonColor} h-full w-12 text-2xl`}
        onClick={decrement}
      >
        -
      </button>
      <input
        className="w-12 p-2 text-2xl text-center flex-1"
        type="number"
        placeholder="6"
        onChange={handleFormChange}
        value={initialValue.toString()}
      ></input>
      <button
        className={`${buttonColor} h-full w-12 text-2xl`}
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};
export default ButtonSelector;
