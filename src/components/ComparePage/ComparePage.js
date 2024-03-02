import React from 'react';
import {
    useAppData,
    hookNames as NAME,
    subscriptionKeys as SUB
} from '../../state';
import { COMPARE } from '../../shared/headerMenu';
import './comparePage.css';
import CamTree from '../CamTree';
import RangeComparer from '../RangeComparer/RangeComparer';

export default function ComparePage(props) {
    const { menu } = useAppData(NAME.useHeaderMenu);
    const { camTrees: trees, camsSortedByRange } = useAppData(NAME.useCamData);
    const { camTreesStateDict: states } = useAppData(NAME.useCamState);

    // const messenger = useAppData(NAME.useMessenger);
    // React.useEffect(() => { messenger.broadcast(SUB.TEST)}, []);

    function camTrees() {
        //https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons
        if (trees == null || trees.length === 0 || states == null || Object.keys(states).length === 0) {
            return null;
        }

        return trees.map((tree, index) => {
            return <CamTree key={"camtree" + index} tree={tree} states={states}/>
        });
    }

    function comparisons() {
        if (trees == null || trees.length === 0 
            || camsSortedByRange == null || camsSortedByRange.length === 0 
            || states == null || Object.keys(states).length === 0) {
            return null;
        }

        return <RangeComparer />;
    }

    return (
        <div id={menu.find(x => x.label == COMPARE).selected ? "compare-page" : "compare-page-hidden"}>
            <div id="cam-tree">
                {camTrees()}
            </div>
            <div id="compare-content">
                {comparisons()}
            </div>
        </div>
    );
}
//https://stackoverflow.com/questions/28922126/how-to-align-flexbox-columns-left-and-right