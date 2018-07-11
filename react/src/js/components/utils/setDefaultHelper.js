/** setDefault is a helper that determines which item is selected by default. */
const setDefault = (wrapper) => {
    let theIndex = wrapper.findIndex(element => element.props.selected);
    if (theIndex < 0) {
        theIndex = 0;
    }
    return theIndex;
};

export default setDefault;
