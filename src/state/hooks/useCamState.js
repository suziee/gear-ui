import React from 'react';

export default function useCamState(args) {
    const { camData, } = args;
    const { camTrees: trees, } = camData;
    const [states, setStates] = React.useState({});

    React.useEffect(() => {
        if (trees != null && trees.length !== 0) {
            buildStateMap();
        }
    }, [trees]);

    React.useEffect(() => {
        if (states == null || Object.keys(states).length === 0) {
            return;
        }

        let newStates = {};

        for (const treeIndex in trees) {
            const tree = trees[treeIndex];

            let allModelsChecked = true;
            for (const branchIndex in tree.branches) {
                const branch = tree.branches[branchIndex];

                let allCamsChecked = true;
                for (const leafIndex in branch.cams) {
                    const cam = branch.cams[leafIndex];
                    allCamsChecked = allCamsChecked && states[cam.guid].checked;
                }

                if (allCamsChecked && !states[branch.model].checked) {
                    allModelsChecked = allModelsChecked && true;
                    newStates = {
                        ...newStates, 
                        [branch.model]: {
                            ...states[branch.model],
                            checked: true
                        }
                    };
                } else if (!allCamsChecked && states[branch.model].checked) {
                    allModelsChecked = allModelsChecked && false;
                    newStates = {
                        ...newStates, 
                        [branch.model]: {
                            ...states[branch.model],
                            checked: false
                        }
                    };
                } else {
                    allModelsChecked = allModelsChecked && states[branch.model].checked;
                }
            }

            if (allModelsChecked && !states[tree.brand].checked) {
                newStates = {
                    ...newStates,
                    [tree.brand]: {
                        ...states[tree.brand],
                        checked: true
                    }
                }
            } else if (!allModelsChecked && states[tree.brand].checked) {
                newStates = {
                    ...newStates,
                    [tree.brand]: {
                        ...states[tree.brand],
                        checked: false
                    }
                }
            }
        }

        if (Object.keys(newStates).length != 0) {
            setStates(x => ({...x, ...newStates}));
        }
    }), [states];

    function buildStateMap() {
        let map = {...states};

        for (const treeIndex in trees) {
            const tree = trees[treeIndex];

            map = {
                ...map,
                [tree.brand]: {
                    brand: tree.brand,
                    key: tree.brand,
                    isBrand: true,
                    checked: false,
                }
            };

            for (const branchIndex in tree.branches) {
                const branch = tree.branches[branchIndex];
                map = {
                    ...map,
                    [branch.model]: {
                        brand: branch.brand,
                        model: branch.model,
                        key: branch.model,
                        isModel: true,
                        checked: false,
                    }
                };

                for (const leafIndex in branch.cams) {
                    const cam = branch.cams[leafIndex];
                    map = {
                        ...map,
                        [cam.guid]: {
                            brand: cam.brand,
                            model: cam.model,
                            key: cam.guid,
                            isCam: true,
                            checked: false,
                        }
                    };
                }
            }
        }

        //https://stackoverflow.com/questions/71751120/updating-a-specific-field-of-object-state-in-react
        setStates(x => ({
            ...x,
            ...map
        }));
    }

    function checkBrand(event) {
        const brand = event.target.value;

        Object.values(states)
        .filter((state, index) => state.brand === brand)
        .map((state, index) => {
            setStates(x =>({
                ...x,
                [state.key]: {
                    ...state,
                    checked: !states[brand].checked,
                }
            }));
        });
    }
    
    function checkModel(event) {
        const model = event.target.value;

        Object.values(states)
        .filter((state, index) => state.model === model)
        .map((state, index) => {
            setStates(x =>({
                ...x,
                [state.key]: {
                    ...state,
                    checked: !states[model].checked,
                }
            }));
        });
    }

    function checkCam(event) {
        const cam = event.target.value;

        setStates(x =>({
            ...x,
            [cam]: {
                ...states[cam],
                checked: !states[cam].checked,
            }
        }));
    }

    return {
        camTreesStateDict: states,
        raiseOnChangeBrandEvent: checkBrand,
        raiseOnChangeModelEvent: checkModel,
        raiseOnChangeCamEvent: checkCam,
    };
}