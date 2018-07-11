/* eslint-disable */
import React from 'react';
import { If, Then, Else } from 'react-if';

/** Class representing the UI for the Spectrum Accordion. */
export default class sortBy extends React.Component {
    static SORT_BY_NAME = 'name';
    static SORT_BY_POPULAR = 'popular';

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            sortBy: this.props.sort // the default sort
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.triggerSortByName = this.triggerSortByName.bind(this);
        this.triggerSortByPopular = this.triggerSortByPopular.bind(this);
    }


    togglePopup() {
        console.log(this.state.isOpen);
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    get isSortByName() {
        return this.state.sortBy === sortBy.SORT_BY_NAME;
    }

    get isSortByPopular() {
        return this.state.sortBy === sortBy.SORT_BY_POPULAR;
    }

    triggerSortByName(e) {
        e.preventDefault();
        this.setState({
            sortBy: sortBy.SORT_BY_NAME
        });
        this.props.onSortByName && this.props.onSortByName('sortByName');

    }

    triggerSortByPopular(e) {
        e.preventDefault();
        this.setState({
            sortBy: sortBy.SORT_BY_POPULAR
        });
        this.props.onSortByPopular && this.props.onSortByPopular('sortByName');
    }

    onPopupKeydown(ev) {
        const keyCode = ev.keyCode;
        let preventDefault = false;
        if (keyCode === 40 && hasFocus(this.sortByPopularBtn)) {
            this.sortByNameBtn.focus();
            preventDefault = true;
        } else if (keyCode === 38) {
            if (hasFocus(this.sortByPopularBtn)) {
                this.toggleSortBtn.focus();
            } else if (hasFocus(this.sortByNameBtn)) {
                this.sortByPopularBtn.focus();
            }
            preventDefault = true;
        } else if (keyCode === 37) {
            this.toggleSortByOpen();
            this.toggleSortBtn.focus();
            preventDefault = true;
        }

        if (preventDefault) {
            ev.preventDefault();
        }
    }

    onToggleSortKeydown(ev) {
        const keyCode = ev.keyCode;
        if (keyCode === 34) {
            this.sortByPopularBtn.focus();
            ev.preventDefault();
        } else if ((keyCode === 37 && this.state.sortByOpen) ||
            (keyCode === 39 && !this.state.sortByOpen)) {
            this.toggleSortByOpen();
            ev.preventDefault();
        }
    }

    render() {
        let active = this.state.isOpen ? 'active' : 'inactive';
        let sortedByPopular = this.isSortByPopular ? 'active' : 'inactive';
        let sortedByName = this.isSortByName ? 'active': 'inactive';

        return (
            <div className="card-collection_sort"
                 role="toolbar"
                 aria-label={this.props.sortingOptionsText}
                 aria-controls={this.props.ariaControlsId}>
                <If condition={this.props.displayResults}>
                    <span
                        id="total-results">
                        {this.props.totalResults} {this.props.resultsText}
                    </span>
                </If>
                <button
                    className={active + " sortby_label "}
                    onClick={this.togglePopup}
                    onKeyDown={ev => this.onToggleSortKeydown(ev)}
                    aria-haspopup="true"
                    aria-expanded={this.props.sortByOpen}>
                        {this.props.sortByText || 'Sort By'}
                </button>
                <div
                    className={active + " sortby_popup "}
                    onKeyDown={ev => this.onPopupKeydown(ev)}>
                    <ul>
                        <li>
                            <button
                                onClick={this.triggerSortByPopular}
                                className={sortedByPopular + " sortby  popular"}
                                aria-label={this.props.popularSortText || 'Popular'} >
                                {this.props.popularSortText || 'Popular'}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={this.triggerSortByName}
                                className={sortedByName + " sortby  name"}
                                aria-label={this.nameSortText || 'A-Z'} >
                                {this.nameSortText || 'A-Z'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

