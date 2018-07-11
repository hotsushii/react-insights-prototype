/* eslint-disable */
import React from 'react';
import { If, Then, Else } from 'react-if';
import FilterGroup from "./filterGroup";

import { store } from './collectionState';

/** Class representing the UI for the Spectrum Accordion. */
export default class filterPanel extends React.Component {

    constructor(props) {
        super(props);

        store.subscribe(() => {
            this.setState({});
        });

    }

    componentDidMount(){
        var node = document.querySelector('dexter-filter-panel');
        var node = node.parentElement;
        node.replaceWith(...node.childNodes);
    }

    getShowActiveFilters() {
        var currentState = store.getState();
        if(typeof currentState === 'undefined'){
            return false;
        }
        var activeFilters = currentState.activeFilters || {};
        return activeFilters.length > 0;
    }

    clearActiveFilters() {
        store.dispatch({type: 'CLEAR_ALL_FILTERS'});
    }

    btnTapped(filterId) {
        store.dispatch({type: 'REMOVE_FILTER', data: filterId});
    }

    render() {
        let tagGroups = this.props.tagGroups || {};
        let currentState = store.getState() || {};
        let activeFilters = currentState.hasOwnProperty("activeFilters") ? currentState.activeFilters : [];
        window.activeFilters = activeFilters;

        return (
            <dexter-filter-panel
                role="region"
                aria-label={this.props.searchFiltersLabel}
                class-filters-show-headers={this.props.showHeaders}>
                <If condition={this.getShowActiveFilters()}>
                    <Then>
                        <ul className="tag-List_active-FilterList">
                            {
                                activeFilters.map((filter) => {
                                    return <li key={filter.id}><button onClick={() => this.btnTapped(filter.id)}>{filter.name}</button></li>
                                })
                            }
                        </ul>
                    </Then>
                </If>
                <header>
                    <h2>{this.props.filtersText}</h2>
                    <If condition={this.getShowActiveFilters()}>
                        <Then>
                            <button
                                className="tag-List_Clear"
                                onClick={this.clearActiveFilters}>
                                {this.props.clearText}
                            </button>
                        </Then>
                    </If>
                </header>
                <section
                    className="tag-List">
                    <ul>
                        {
                            Object.keys(tagGroups).map(function(keyName) {
                                return <FilterGroup key={keyName} name={tagGroups[keyName].title} tags={tagGroups[keyName].tags}/>
                            }, this)
                        }
                    </ul>
                </section>
            </dexter-filter-panel>
        );
    }
}

