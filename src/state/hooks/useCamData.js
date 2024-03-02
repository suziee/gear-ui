import React from 'react';
import * as SUB from './subscriptionKeys';
import { useCamData as id } from './hookNames';
import { getBrands, getModelsByBrand, getCams, getAggregates } from '../../api';
import { Tree, Branch } from '../../models';

export default function useCamData(args) {
    const {
        messenger
    } = args;

    messenger.subscribe(id, {
        [SUB.STARTUP]: getDataFromApi,
    });

    const [cams, setCams] = React.useState([]);
    const [brands, setBrands] = React.useState([]);
    const [trees, setTrees] = React.useState([]);
    const [camsSortedByRange, setSortedCams] = React.useState([]);
    const [aggregates, setAggregates] = React.useState({});

    function getDataFromApi() {
        async function getDataAsync() {
            let cams = await getCams();
            let brands = await getBrands();
            let aggs = await getAggregates();

            setCams(x => cams);
            setBrands(x => brands);
            setAggregates(x => ({...x, ...aggs}));
        }

        getDataAsync();
    }

    React.useEffect(() => {
        async function build() {
            if (cams != null && cams.length !== 0
                && brands != null && brands.length !== 0) {
                    await buildTrees(brands, cams);
            }
        }

        build();
    }, [brands, cams]);

    React.useEffect(() => {
        if (cams != null && cams.length !== 0) {
            const sorted = cams.sort((a, b) => {
                if (a.usableMin < b.usableMin) return -1;
                else if (a.usableMin > b.usableMin) return 1;
                else return 0;
            });

            setSortedCams(x => sorted);
        }
    }, [cams])

    async function buildTrees(brands, cams) {
        let trees = [];

        //https://stackoverflow.com/questions/63466656/javascript-why-object-array-is-not-iterable-with-for-i-of-array
        //https://stackoverflow.com/questions/29285897/what-is-the-difference-between-for-in-and-for-of-statements
        for (let brandIndex in brands) {
            const brand = brands[brandIndex];
            let models = await getModelsByBrand(brand);

            let branches = [];
            for (let modelIndex in models) {
                const model = models[modelIndex];
                let filteredCams = cams.filter((cam, index) => cam.brand === brand && cam.model === model);
                
                let branch = new Branch({brand: brand, model: model, cams: filteredCams});
                branches.push(branch);
            }

            trees.push(new Tree({brand: brand, models: models, branches: branches}));
        }

        setTrees(x => trees);
    }

    return {
        camsSortedByRange: camsSortedByRange,
        camTrees: trees,
        aggregates: aggregates,
        getDataFromApi: getDataFromApi,
    }
}