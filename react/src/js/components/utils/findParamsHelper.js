import 'url-search-params-polyfill';

/** findParams is a helper that returns the value of a specified query patam key. */
const findParams = (queryKey) => {
    const search = new URLSearchParams(window.location.search);
    return search.get(queryKey);
};

export default findParams;
