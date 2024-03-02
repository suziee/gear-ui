import React from 'react';
import * as SUB from './subscriptionKeys';
import { useHeaderMenu as id } from './hookNames';
import * as PAGE from '../../shared/headerMenu';

export default function useHeaderMenu(args) {
    const { messenger } = args;

    const [menu, setMenu] = React.useState([
        {
            label: PAGE.COMPARE,
            onClick: gotoComparePage,
            selected: false,
        },
        {
            label: PAGE.CHART,
            onClick: gotoChartPage,
            selected: false,
        }
    ]);

    messenger.subscribe(id, {
        [SUB.STARTUP]: gotoComparePage,
        [SUB.TEST]: test,
    });

    function test() {
        console.log("test in header hook")
    }

    function gotoComparePage () {
        console.log("compare page")
        updateMenu(PAGE.COMPARE);
    }

    function gotoChartPage() {
        console.log("chart page")
        updateMenu(PAGE.CHART);
    }

    function updateMenu(id) {
        // "close" current page
        let index = menu.findIndex((item, index, arr) => {
            return item.selected;
        });

        if (index != -1) {
            let menuItem = menu[index];
            menu[index] = {...menuItem, selected: false};
        }

        // "open" new page
        index = menu.findIndex((item, index, arr) => {
            return item.label == id;
        });

        let menuItem = menu[index];
        menu[index] = {...menuItem, selected: true};

        setMenu(x => [...menu]);
    }

    return {
        menu: menu,
    };
}