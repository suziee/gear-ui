import React from 'react';
import {
    useAppData,
    hookNames as NAME
} from '../../state';

export default function RangeComparer(props) {
    const { camsSortedByRange, aggregates: agg } = useAppData(NAME.useCamData);
    const { camTreesStateDict: states } = useAppData(NAME.useCamState);
    const { pixelsPerInch } = useAppData(NAME.useCalibrateForm);

    function getSortedByRange() {
        if (camsSortedByRange == null || camsSortedByRange.length === 0) {
            return;
        }

        return (
            <div style={{ display: "inline" }}>
                {getRanges(camsSortedByRange)}
            </div>
        )
    }

    // function getRanges(cams) {
    //     //https://stackoverflow.com/questions/5135019/css-opacity-only-to-background-color-not-the-text-on-it
    //     // won't really work right now using cam.cssColor, but if you can convert string to rgb, then
    //     // try it out...
    //     return cams.map((cam, index) => {
    //         return (
    //             <div style={{ display: states[cam.guid].checked ? 'grid' : 'none', gridTemplateColumns: '1fr' }} key={`range_${index}`}>
    //                 <div style={{
    //                     width: 400,
    //                     height: 20,
    //                     margin: 5,
    //                     gridRowStart: 1,
    //                     gridColumnStart: 1,
    //                     marginLeft: ((cam.usableMin - agg.minRange) / 25.4) * pixelsPerInch,
    //                     fontSize: 15,
    //                     fontWeight: 'bold',
    //                     color: 'white'
    //                 }}>
    //                     {`${cam.brand} ${cam.model} ${cam.size}`}
    //                 </div>
    //                 <div style={{
    //                     width: (cam.usableMin / 25.4) * pixelsPerInch,
    //                     backgroundColor: cam.cssColor,
    //                     opacity: 0.75,
    //                     height: 20,
    //                     margin: 5,
    //                     gridRowStart: 1,
    //                     gridColumnStart: 1,
    //                     marginLeft: ((cam.usableMin - agg.minRange) / 25.4) * pixelsPerInch
    //                 }} />
    //                 <div style={{
    //                     width: (cam.usableMax / 25.4) * pixelsPerInch,
    //                     backgroundColor: cam.cssColor,
    //                     opacity: 0.5,
    //                     height: 20,
    //                     margin: 5,
    //                     gridRowStart: 1,
    //                     gridColumnStart: 1,
    //                     marginLeft: ((cam.usableMin - agg.minRange) / 25.4) * pixelsPerInch
    //                 }} />
    //             </div>
    //         );
    //     })
    // }


    function getRanges(cams) {
        //https://stackoverflow.com/questions/5135019/css-opacity-only-to-background-color-not-the-text-on-it
        // won't really work right now using cam.cssColor, but if you can convert string to rgb, then
        // try it out...
        return cams.map((cam, index) => {
            return <div key={`range_${index}`} style={{display: states[cam.guid].checked ? 'flex' : 'none', flexDirection: 'row'}}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
                    <div style={{
                        width: (cam.usableMin / 25.4) * pixelsPerInch,
                        backgroundColor: cam.cssColor,
                        opacity: 0.75,
                        height: 20,
                        margin: 5,
                        gridRowStart: 1,
                        gridColumnStart: 1,
                        marginLeft: ((cam.usableMin - agg.minRange) / 25.4) * pixelsPerInch,
                        borderRight: '1px solid white',
                    }} />
                    <div style={{
                        width: (cam.usableMax / 25.4) * pixelsPerInch,
                        backgroundColor: cam.cssColor,
                        opacity: 0.5,
                        height: 20,
                        margin: 5,
                        gridRowStart: 1,
                        gridColumnStart: 1,
                        marginLeft: ((cam.usableMin - agg.minRange) / 25.4) * pixelsPerInch
                    }} />
                </div>
                <div style={{
                    width: 400,
                    height: 20,
                    margin: 5,
                    fontSize: 15,
                }}>
                    {`${cam.brand} ${cam.model} ${cam.size}`}
                </div>
                </div>;
        })
    }

    return (
        <div style={{ display: "inline" }}>
            {getSortedByRange()}
        </div>
    )
}