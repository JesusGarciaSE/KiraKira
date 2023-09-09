import BasicDisplaySix from "./Items/BasicDisplay/BasicDisplaySix";
import RetracableDisplay from "./Items/RetractableDisplay/RetractableDisplay";
import SpinDisplay from "./Items/SpinDisplay/SpinDisplay";

const DisplayGrid = () => {
    return (<div className="grid grid-cols-2 gap-4 p-4 overflow-y-auto">
        <BasicDisplaySix />
        <BasicDisplaySix />
        <BasicDisplaySix />
        <BasicDisplaySix />
        <BasicDisplaySix />
        <BasicDisplaySix />
        <RetracableDisplay />
        <SpinDisplay />
    </div>)
}

export default DisplayGrid;