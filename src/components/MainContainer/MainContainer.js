import React from 'react';
import './mainContainer.css';
import HeaderMenu from '../HeaderMenu';
import CalibrateForm from '../CalibrateForm';
import ComparePage from '../ComparePage';
import ChartPage from '../ChartPage';

export default function MainContent(props) {
    return (
        <React.Fragment>
            <div id="header-content">
                <header>
                    <div id="header-logo">Camparison</div>
                    <HeaderMenu />
                    <CalibrateForm />
                </header>
            </div>
            <div id="main-content">
               <ComparePage />
               <ChartPage />
            </div>
        </React.Fragment>
    );
}