import BasicDisplayOne from "./Items/BasicDisplay/BasicDisplayOne";
import BasicDisplayThree from "./Items/BasicDisplay/BasicDisplayThree";
import BasicDisplayTwo from "./Items/BasicDisplay/BasicDisplayTwo";

const DisplayGrid = () => {
    return (<div className="grid grid-cols-2 gap-4 p-4">
        <BasicDisplayOne />
        <BasicDisplayTwo />
        <BasicDisplayThree />
    </div>)
}

export default DisplayGrid;