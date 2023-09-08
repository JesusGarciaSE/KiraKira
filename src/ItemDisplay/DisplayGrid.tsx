import BasicDisplayOne from "./Items/BasicDisplay/BasicDisplayOne";
import BasicDisplayThree from "./Items/BasicDisplay/BasicDisplayThree";
import BasicDisplayTwo from "./Items/BasicDisplay/BasicDisplayTwo";
import RetracableDisplay from "./Items/RetractableDisplay/RetractableDisplay";
import SpinDisplay from "./Items/SpinDisplay/SpinDisplay";

const DisplayGrid = () => {
    return (<div className="grid grid-cols-2 gap-4 p-4 overflow-y-auto">
        <BasicDisplayOne />
        <BasicDisplayTwo />
        <BasicDisplayThree />
        <RetracableDisplay />
        <SpinDisplay />
    </div>)
}

export default DisplayGrid;