import './App.css';
import 'tachyons';
import React, { useState, useEffect } from 'react';
import PredictNumber from './predict';
import CanvasDraw from 'react-canvas-draw';
import * as tf from '@tensorflow/tfjs';

function App() {
<<<<<<< Updated upstream
  const [num, setNum] = useState(1);
  const [certainty, setCertainty] = useState(72);

  const predict = () => {
    const api =
      'https://fio4gsagu6.execute-api.us-east-1.amazonaws.com/default/predict_number';
    const data = {
      key1: 'Cat',
      key2: 'N',
      key3: 'Tran',
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.log('Error: ' + error.message));

    setNum(num + 1);
    setCertainty(certainty + 1);
  };

  useEffect(() => {
    predict();
  }, []);
=======
  const [model, setModel] = useState(null);
  const [number, setNumber] = useState(-1);
  const [imageData, setImageData] = useState(null);
  const [certainty, setCertainty] = useState(-1);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const canvasRef = useRef();

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await tf.loadLayersModel(
        'https://raw.githubusercontent.com/tsu-nera/tfjs-mnist-study/master/model/model.json'
      );
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const saveImage = () => {
    //const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    const drawingCanvas = canvasRef.current.canvas.drawing;

    const context = document.createElement('canvas').getContext('2d');
    const width = 28;
    const height = 28;

    context.drawImage(drawingCanvas, 0, 0, width, height);
    const iData = context.getImageData(0, 0, width, height);

    for (let i = 0; i < iData.data.length; i += 4) {
      const avg = (iData.data[i] + iData.data[i + 1] + iData.data[i + 2]) / 3;
      iData.data[i] = avg;
      iData.data[i + 1] = avg;
      iData.data[i + 2] = avg;
    }

    setImageData(iData);
  };

  if (isModelLoading) {
    //
  } else {
    //
  }

  const predict = async () => {
    if (!model) {
      console.log('null model!');
      return;
    }

    loadModel();
    saveImage();

    await tf.tidy(() => {
      let maxProb = 0;
      let number;
      let img = tf.browser.fromPixels(imageData, 1);
      img = tf.cast(img, 'float32').div(tf.scalar(255));

      // reshape input format (shape: [batch_size, width, height, channels])
      img = img.expandDims();

      const output = model.predict(img);
      const predictions = Array.from(output.dataSync());

      predictions.forEach((prob, num) => {
        if (prob > maxProb) {
          maxProb = prob;
          number = num;
        }
      });

      setNumber(number);
      setCertainty((maxProb * 100) | 0);
    });
  };
>>>>>>> Stashed changes

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
                <strong>Prediction:</strong> {number} with {certainty}%
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <a
            type="submit"
            onClick={predict}
            className="f6 link dim ph3 pv2 mb2 dib white bg-black"
            href="#0"
          >
            Submit
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
