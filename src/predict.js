import React from 'react';

const PredictNumber = ({ num, certainty }) => {
  return (
    <div className="flex justify-center">
      <p>
        <strong>Prediction:</strong> {num} with {certainty}%
      </p>
    </div>
  );
};

export default PredictNumber;
