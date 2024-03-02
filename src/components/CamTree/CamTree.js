import React from 'react';
import {
    useAppData,
    hookNames as NAME
} from '../../state';
import './camTree.css';

export default function CamTree(props) {
	const { tree, states } = props;
    
    const {
        raiseOnChangeBrandEvent
        , raiseOnChangeModelEvent
        , raiseOnChangeCamEvent
    } = useAppData(NAME.useCamState);

    function getLeaves(cams) {
        return <ul className="cam-tree-list">
                {cams.map((cam, index) => {
                    let id = `checkbox_${cam.brand}_${cam.model}_${cam.size}_${index}`;

                    return (
                        <li key={`leaf_${cam.brand}_${cam.model}_${cam.size}_${index}`}>
                            <input
                                type="checkbox"
                                id={id}
                                value={states[cam.guid].key}
                                checked={states[cam.guid].checked}
                                onChange={raiseOnChangeCamEvent} />
                            <label htmlFor={id}>{`${cam.size} ${cam.color}`}</label>
                        </li>
                    );
                })}
            </ul>
    }

    function getBranches() {
        return tree.branches.map((branch, index) => {
            let id = `checkbox_${tree.brand}_${branch.model}_${index}`;

            return <ul className="cam-tree-list" key={`branch_${tree.brand}_${branch.model}_${index}`}>
                    <li>
                        <input
                            type="checkbox"
                            id={id}
                            key={id}
                            value={states[branch.model].key}
                            checked={states[branch.model].checked}
                            onChange={raiseOnChangeModelEvent}/>
                        <label htmlFor={id}>{branch.model}</label>
                    </li>
                    <li>{getLeaves(branch.cams)}</li>
                </ul>
        });
    }

    return (
        <ul className="cam-tree-list">
            <li>
                <input
                    type="checkbox"
                    id={`checkbox_${tree.brand}`}
                    key={`checkbox_${tree.brand}`}
                    value={states[tree.brand].key}
                    checked={states[tree.brand].checked}
                    onChange={raiseOnChangeBrandEvent} />
                <label htmlFor={`checkbox_${tree.brand}`}>{tree.brand}</label>
            </li>
            <li>{getBranches()}</li>
        </ul>
    );
}
    