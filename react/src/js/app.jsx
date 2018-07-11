/* eslint-disable */
import { DOMRegistry } from 'react-dom-components';
import authorWatch from './watch';
import cardCollectionDOM from "./components/helloWorld/cardCollectionDOM";

const cardCollection = new cardCollectionDOM();

const initReact = (element) => {
    const registry = new DOMRegistry(element);
    registry.register({
        cardCollection,
    });
    authorWatch(registry);
};

// Initialize React
initReact(document);

// Add to DXF Registry
window.dexter = {};
window.dexter.dxf = { apps: [] };
window.dexter.dxf.registerApp = (app) => {
    window.dexter.dxf.apps.push(app);
};

window.dexter.dxf.registerApp(initReact);

