import "./App.css";
import "tachyons";
import CanvasDraw from "react-canvas-draw";

const App = () => {
  const location = "";
  return (
    <div>
      <div className="ma4">
        <h1 className="f1 tc lh-title">Handwritten Digits</h1>

        <div className="flex justify-center">
          <div class="outline w-25 pa3 mr2">
            <p>Using MNIST dataset to recognize Handwritten Digits</p>
          </div>
          <div class="outline w-25 pa3 mr2">
            <div>
              <CanvasDraw
                canvasWidth={200}
                canvasHeight={200}
                lazyRadius={1}
                brushColor={"darkblue"}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <a className="f6 link dim ph3 pv2 mb2 dib white bg-black" href="#0">
            Submit
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
