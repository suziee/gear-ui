import React from 'react';
import {
    useAppData,
    hookNames as NAME
} from '../../state';
import './calibrateForm.css';

export default function CalibrateForm(props) {
    const {
        raiseSaveEvent
        , useDefault1
        , useDefault2
        , width
        , height
        , diagonal } = useAppData(NAME.useCalibrateForm);

    const widthRef = React.useRef();
    const heightRef = React.useRef();
    const diagonalRef = React.useRef();

    function save() {
        const width = parseInt(widthRef.current.value);
        const height = parseInt(heightRef.current.value);
        const diagonal = parseFloat(diagonalRef.current.value);
        raiseSaveEvent(width, height, diagonal)
    }

    React.useEffect(() => {
        widthRef.current.value = width;
    }, [width]);

    React.useEffect(() => {
        heightRef.current.value = height;
    }, [height]);

    React.useEffect(() => {
        diagonalRef.current.value = diagonal;
    }, [diagonal]);
    
    return (
        <div id="calibrate-form">
            <div className="calibrate-form-element">
                <label>Screen Resolution Width</label>
                <input type="text" ref={widthRef}/>
            </div>
            <div className="calibrate-form-element">
                <label>Screen Resolution Height</label>
                <input type="text" ref={heightRef}/>
            </div>
            <div className="calibrate-form-element">
                <label>Diagonal in Inches</label>
                <input type="text" ref={diagonalRef}/>
            </div>
            <div id="calibrate-form-buttons">
                <button className="calibrate-form-button calibrate-form-default" onClick={useDefault1}>1</button>
                <button className="calibrate-form-button calibrate-form-default" onClick={useDefault2}>2</button>
                <button className="calibrate-form-button" onClick={save}>Calibrate</button>
            </div>
        </div>
    );
}