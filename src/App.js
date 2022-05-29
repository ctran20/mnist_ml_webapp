import './App.css';
import 'tachyons';
import React, { useRef, useState, useEffect } from 'react';
import PredictNumber from './predict';
import predict from './predict';
import axios from 'axios';
import CanvasDraw from 'react-canvas-draw';

function App() {
  const [num, setNum] = useState(1);
  const [certainty, setCertainty] = useState(72);
  const canvasRef = useRef();

  const predict = () => {
    // Resize the image to a 28 x 28 array to be passed into the lambda function

    // Get the reference to the canvas 
    const drawingCanvas = canvasRef.current.canvas.drawing;
    const drawingCanvasHeight = drawingCanvas.height, drawingCanvasWidth = drawingCanvas.width;

    // Create a new canvas, so that we can rescale the current canvas to a smaller size so that it matches
    // the size of the trianing and testing images.
    const newImageWidth = 28, newImageHeight = 28;
    const scaledCavasContext = document.createElement('canvas').getContext("2d");
    scaledCavasContext.scale((newImageWidth/drawingCanvasWidth), (newImageHeight/drawingCanvasHeight));
    scaledCavasContext.drawImage(drawingCanvas, 0, 0);

    console.log("Drew the image");

    // Get the values in each pixel of the scaledImage, but each pixel has red, green, blue, alpha number associated with it
    const scaledImageData = scaledCavasContext.getImageData(0, 0, newImageWidth, newImageHeight).data;

    // Extract out the alpha value per pixel, and create a 2D array of 28 x 28 image
    const extractedImageData = [];
    for (let row  = 0; row < newImageHeight; row++) {
      const rowPixels = [];
      for (let col = 0; col < newImageWidth; col++) {
        const pixel = (row * newImageWidth) + col;
        const alphaIndex = (pixel * 4) + 3; 
        rowPixels.push(scaledImageData[alphaIndex]);
      }
      extractedImageData.push(rowPixels);
    }

    // API call parameters
    const api =
      'https://fio4gsagu6.execute-api.us-east-1.amazonaws.com/default/predict_number';
    const data = {
      imageData: extractedImageData
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
    // predict();
  }, []);

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
              <a href="https://github.com/JonathanCen">Jonathan Cen</a>
            </p>
          </div>

          {/* Right Side */}
          <div className="pa3 mr2">
            <div className="flex justify-center outline">
              {/* <canvas id="tutorial" width="300" height="300"></canvas>
              </div> */}
              <CanvasDraw
                canvasWidth={300}
                canvasHeight={300}
                lazyRadius={1}
                brushColor={'black'}
                ref = {canvasRef}
              />
            </div>
            <PredictNumber num={num} certainty={certainty} />
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
