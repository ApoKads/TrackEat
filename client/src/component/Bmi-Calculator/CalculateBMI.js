import React from 'react';

const CalculateBMI = (height, weight) => {
    if (!height || !weight) return null;

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    let category = '';
    let advice = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        advice = 'Consider a balanced diet to gain weight.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal';
        advice = 'Keep maintaining your healthy lifestyle!';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Overweight';
        advice = 'Consider regular exercise and a balanced diet.';
    } else {
        category = 'Obese';
        advice = 'Seek professional advice for weight management.';
    }

    return { bmi, category, advice };
};

export default CalculateBMI;