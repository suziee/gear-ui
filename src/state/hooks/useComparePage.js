import React from 'react';
import * as SUB from './subscriptionKeys';
import { useComparePage as id } from './hookNames';

// not used anymore... T_T
export default function useComparePage(args) {
    const {
        messenger
    } = args;

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        console.log(open)
    }, [open])

    messenger.subscribe(id, {
        [SUB.COMPARE_PAGE_OPEN]: display,
        [SUB.COMPARE_PAGE_CLOSE]: hide,
    });

    function display() {
        console.log("display")
        setOpen(x => true);
    }

    function hide() {
        console.log("hide")
        setOpen(x => false);
    }

    return {
        open: open,
    }
}