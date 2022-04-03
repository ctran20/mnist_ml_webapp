import './App.css';
import CanvasDraw from 'react-canvas-draw';

const App = () => {
  const location = '';
  return (
    <div>
      <div className="ma4">
        <h1 className="f1 lh-title">Handwriting Digits</h1>
        <CanvasDraw canvasWidth={200} canvasHeight={200} />
        <button>Submit</button>
      </div>
    </div>
  );
};

export default App;
