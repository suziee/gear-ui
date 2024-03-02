import React from 'react';
import {
    useAppData,
    hookNames as NAME,
    subscriptionKeys as SUB
} from '../../state';
import './headerMenu.css';

export default function HeaderMenu(props) {
    const { menu } = useAppData(NAME.useHeaderMenu);

    function buildMenu() {
        const count = menu.length;

        return menu.map((item, index) => {
            if (index == count-1) {
                return <div 
                    id={item.selected ? "menu-item-selected" : null}
                    key={`nav_item_${index}`}
                    onClick={item.onClick}>{item.label}</div>
            }

            //https://stackoverflow.com/questions/74051218/in-react-why-cant-you-add-a-key-to-an-empty-fragment-short-syntax
            return <React.Fragment key={`nav_item_${index}`}>
                <div
                    id={item.selected ? "menu-item-selected" : null}
                    onClick={item.onClick}>{item.label}</div>
                <div>|</div>
            </React.Fragment>
        });
    }

    return (
        <nav id="menu">
            {buildMenu()}
        </nav>
    );
}