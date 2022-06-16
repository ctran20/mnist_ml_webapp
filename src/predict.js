import React from 'react';
import * as tf from '@tensorflow/tfjs';

const PredictNumber = ({ num, certainty }) => {
  const model = tf.loadLayersModel('./cats_model.h5');

  return (
    <div className="flex justify-center">
      <p>
        <strong>Prediction:</strong> {num} with {certainty}%
      </p>
    </div>
  );
};

export default PredictNumber;
