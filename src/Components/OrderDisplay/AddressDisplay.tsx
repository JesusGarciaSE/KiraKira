import { ICustomizableComponent } from "../../Models/ComponentModels";
import { IAddress } from "../../Models/UserModels";

interface IAddressDisplay extends ICustomizableComponent {
  address: IAddress;
  type?: "shipping" | "billing" | "default";
}

const AddressDisplay: React.FC<IAddressDisplay> = ({ address, type }) => {
  return (
    <div className="p-5">
      {(() => {
        switch (type) {
          case "shipping":
            return <h3>Shipping Address</h3>;
          case "billing":
            return <h3>Billing Address</h3>;
          case "default":
            return <h3>Default Address</h3>;
          default:
            return <h3>Additional Address</h3>;
        }
      })()}
    <p>{address.line1}</p>
    <p>{`${address.city} ${address.state} ${address.postal_code}`}</p>
    <p>{address.country}</p>
    </div>
  );
};

export default AddressDisplay;
