import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

async function predict(model, imageData) {
  let number = -1;
  let maxProb = -1;

  if (!this.model) {
    return;
  }

  try {
    await tf.tidy(() => {
      let img = tf.browser.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      const output = model.predict(img);
      const predictions = Array.from(output.dataSync());

      predictions.forEach((prob, num) => {
        if (prob > maxProb) {
          number = num;
          maxProb = prob;
        }
      });
    });
  } catch (err) {
    console.log(err);
  }

  return [number, maxProb];
}

const PredictNumber = ({ imageData }) => {
  const model = tf.loadLayersModel('./cats_model.h5');

  predict();

  return (
    <div className="flex justify-center">
      <p>
        <strong>Prediction:</strong> {result[0]} with {result[1]}%
      </p>
    </div>
  );
};

export default PredictNumber;
