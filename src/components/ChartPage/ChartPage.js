import React from 'react';
import {
    useAppData,
    hookNames as NAME,
} from '../../state';
import { CHART } from '../../shared/headerMenu';
import './chartPage.css';

export default function ChartPage(props) {
    const { menu } = useAppData(NAME.useHeaderMenu);
    const { camTrees: trees } = useAppData(NAME.useCamData);

    // way less code than react state onClick
    // https://bobbyhadz.com/blog/add-onclick-event-to-table-row-in-javascript
    React.useEffect(() => {
        const tbody = document.getElementsByTagName("tbody")[0];
        const rows = Array.from(tbody.getElementsByTagName("tr"));

        rows.forEach((row, index, array) => {
            row.addEventListener('click', (event) => {
                // can't do 'for (blah in blah)' b/c blah = index...
                rows.forEach((row, index, array) => {
                    row.classList.remove("highlighted-row");
                });
                row.classList.add("highlighted-row");
            })
        });
    }, [trees]);

    function getCams() {
        //https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons
        if (trees == null || trees.length === 0) {
            return null;
        }

        let counter = 0;

        //https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
        return trees.map((tree, treeIndex) => {
            return tree.branches.map((branch, branchIndex) => {
                return branch.cams.map((cam, camIndex) => {
                    return <tr id={++counter} key={'chartPage_cam_' + cam.guid}>
                        <td>{cam.brand}</td>
                        <td>{cam.model}</td>
                        <td>{cam.size}</td>
                        <td style={{backgroundColor: `${cam.color}`}}>{cam.color}</td>
                        <td className="td-align-right">{`${cam.weight} ${cam.weightUnit}`}</td>
                        <td className="td-align-right">{`${cam.strength} ${cam.strengthUnit}`}</td>
                        <td className="td-align-right">{`${cam.usableMin} ${cam.rangeUnit}`}</td>
                        <td className="td-align-right">{`${cam.usableMax} ${cam.rangeUnit}`}</td>
                        <td className="td-align-right">{`${cam.usableRange.toFixed(2)} ${cam.rangeUnit}`}</td>
                        <td className="td-align-right">{`${cam.usableMinInInches} in`}</td>
                        <td className="td-align-right">{`${cam.averageInches.toFixed(2)} in`}</td>
                        <td className="td-align-right">{`${cam.usableMaxInInches} in`}</td>
                    </tr>
                })
            });
        });
    }

    return (
        <div id={menu.find(x => x.label == CHART).selected ? "chart-page" : "chart-page-hidden"}>
            <div style={{display: 'block', maxHeight: 'calc(100vh - 46px)', overflowY: 'scroll'}}>
                <table>
                    <thead>
                        <tr>
                            <td>Brand</td>
                            <td>Model</td>
                            <td>Size</td>
                            <td>Color</td>
                            <td>Weight</td>
                            <td>Strength</td>
                            <td>Usable Min</td>
                            <td>Usable Max</td>
                            <td>Usable Range</td>
                            <td>Usable Min Inches</td>
                            <td>mid</td>
                            <td>Usable Max Inches</td>
                        </tr>
                    </thead>
                    <tbody>
                        {getCams()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}