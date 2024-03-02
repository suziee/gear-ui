import React from 'react';

export default function useCalibrateForm(args) {
    const {
        messenger
    } = args;

    const [pixelsPerInch, setPPI] = React.useState(0);
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [diagonal, setDiagonal] = React.useState(0);

    function save(width, height, diagonal) {
        setWidth(x => width);
        setHeight(x => height);
        setDiagonal(x => diagonal);
        setPPI(x => calculatePixelsPerInch(width, height, diagonal));
    }

    function calculatePixelsPerInch(width, height, diagonalInInches) {
        //https://www.calculatorsoup.com/calculators/technology/ppi-calculator.php
        const diagonalInPixels = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        return diagonalInPixels / diagonalInInches;
    }

    function useLaptopDefault() {
        save(2560, 1440, 14);
    }

    function useAsusCurveMonitorDefault() {
        save(2560, 1440, 27);
    }

    return {
        raiseSaveEvent: save,
        useDefault1: useLaptopDefault,
        useDefault2: useAsusCurveMonitorDefault,
        pixelsPerInch: pixelsPerInch,
        width: width,
        height: height,
        diagonal: diagonal,
    }
}