import './App.css';
import 'tachyons';
import axios from 'axios';
import CanvasDraw from 'react-canvas-draw';

const App = () => {
  const test = () => {
    const api =
      'https://fio4gsagu6.execute-api.us-east-1.amazonaws.com/default/predict_number';
    const data = {
      key1: 'Cat',
      key2: 'N',
      key3: 'Tran',
    };

    const requestOptions = {
      mode: 'no-cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.log('Error: ' + error.message));
  };

  return (
    <div>
      <div>
        <h1 className="f1 tc lh-title pa3">Handwritten Digits</h1>
        {/* Left Side */}
        <div className="flex justify-center">
          <div className="pa3 mr2">
            <h3>What?</h3>
            <p>
              A machine leraning program that can recognize handwritten digits
              from 0 to 9.
            </p>
            <h3>How?</h3>
            <p>AWS Lambda and Convolutional Neural Networks.</p>
            <h3>Who?</h3>
            <p>
              <a href="https://www.catcodebox.com/">Cat Tran</a>
            </p>
            <p>
              <a href="https://github.com/JonathanCen">Johnathan Cen</a>
            </p>
          </div>

          {/* Right Side */}
          <div className="pa3 mr2">
            <div className="flex justify-center outline">
              <CanvasDraw
                canvasWidth={300}
                canvasHeight={300}
                lazyRadius={1}
                brushColor={'darkblue'}
              />
            </div>
            <div className="flex justify-center">
              <p>
                <strong>Prediction:</strong> 5 with 80%
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <a className="f6 link dim ph3 pv2 mb2 dib white bg-black" href="#0">
            Submit
          </a>
          <form type="submit">
            <button onSubmit={test()}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
