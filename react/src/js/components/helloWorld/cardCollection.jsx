/* eslint-disable */
import React, { Fragment } from 'react';
import { If, Then, Else } from 'react-if';


import FilterPanel from "./filterPanel"
import ShowMoreCard from "./showMoreCard";
import Card from "./Card";
import SortBy from "./sortBy";
import Pagination from "./pagination";

import CardCollectionDAO from './CardCollectionDAO';
import { store } from "./collectionState";

/** Class representing the UI for the Spectrum Accordion. */
export default class cardCollection extends React.Component {

    static PLACEHOLDER_COUNT = '{count}';
    static PAGINATION_PAGES = 'pages';
    static PAGINATION_SCROLL = 'scroll';

    constructor(props){

        super(props);
        this.showMobileHeaders = false;
        this.resultsToLoad = null;
        this.hasTags = false;
        this.tagList = {};

        this.state = {
            tags: {},
            page: null,
            totalPages: null,
            cards: []
        };

        this.setInitialSort();
        this.setDao();
        this.getCollectionType();

        this.shouldEnableFilterPanel = this.shouldEnableFilterPanel.bind(this);
        this.loadMoreCards = this.loadMoreCards.bind(this);

        window.cardCollection = this;

        store.subscribe(() => {
            let currentState = store.getState() || {};
            let activeFilters = currentState.hasOwnProperty("activeFilters") ? currentState.activeFilters : [];
            let activeFilterIds = [];

            activeFilters.map(function(filter){
                activeFilterIds.push(filter.id)
            });

            this.dao.page = 1;
            this.dao.activeFilters = activeFilterIds;
            window.activeFilters = activeFilterIds;
            this.getData();
        });

    }

    setInitialSort() {
        this.sort = this.props.defaultSort ? this.props.defaultSort : SortBy.SORT_BY_POPULAR;
    }

    /**
     * Get the current page minus '.html' postfix
     *
     * @returns {string} current relative page url minus '.html'
     * @memberof CardCollection
     */
    currentPageEndpoint() {
        const pn = window.location.pathname;
        if (pn.substr(pn.length - 5, pn.length) === '.html') {
            return pn.substr(0, pn.length - 5);
        }
        return pn;
    }

    setDao() {
        this.dao = new CardCollectionDAO({
            endpoint: this.currentPageEndpoint(),
            pageType: this.pageType,
            sort: this.sort,
            results: this.resultsPerPage,
            page: 1,
        });
    }

    getFiltersRootId() {
        if (this.props.filtersRoot.substr(this.props.filtersRoot.length - 1) === ':') {
            this.filtersRootId = this.props.filtersRoot.slice(0, -1);
        } else {
            this.filtersRootId = this.props.filtersRoot;
        }
    }

    /**
     * Handle page and filter events.
     *
     * @memberof CardCollection
     */
    handleEvents() {
    }

    getData() {
        this.dao
            .getData()
            .then((data) => {
                this.loadNewData(data);
                this.handleEvents();
            });
    }

    getTags(tags) {
        const tagArray = Object.keys(tags);
        tagArray.forEach((name) => {
            const tag = tags[name];

            if (tag.id === this.filtersRootId) {
                this.tags = tag.tags;

            }

            this.tagList[tag.id] = tag;
            if (tag.tags) {
                this.getTags(tag.tags);
            }
        });
    }

    /**
     * Determine the number of cards that will load on the next page.
     */
    setResultsToLoad() {
        const resultsLoaded = this.page * this.resultsPerPage;
        const resultsRemaining = this.totalResults - resultsLoaded;

        this.resultsToLoad = resultsRemaining < this.resultsPerPage
            ? resultsRemaining
            : this.resultsPerPage;
    }

    /**
     * Replace all cards on the page with given data
     *
     * @param {object} data json data from server
     * @memberof CardCollection
     */
    loadNewData(data) {
        this.page = data.page;
        if (data.sort !== this.sort) {
            this.sort = data.sort;
        }
        this.totalResults = data.totalResults;

        // Don't load tags again if we already have them
        if (this.hasTags === false && data.tags) {
            this.tags = data.tags;
            this.getTags(data.tags);
            this.hasTags = true;
        }

        this.totalPages = data.totalPages;

        this.cards = data.cards;
        this.setResultsToLoad();
        this.resultsLoaded = data.cards.length;

        this.setState({
            tags: this.tags,
            page: this.page,
            totalPages: this.totalPages,
            cards: this.cards
        })
    }

    getCollectionType() {
        if (this.props.pageType === 'archive') {
            this.getFiltersRootId();
            this.dao.page = 1;
            this.dao.activeFilters = [];
            this.getData();
        } else {
            this.getData();
        }
    }

    /**
     * Set the text used on the button for <code>Show {count} more</code> text.
     *
     * Replace <code>{count}</code> with the number of results that will load. If there are more
     * remaining results than results per page, the number is the results per page. If three are
     * less remaining than results per page, the number is the results remaining.
     */
    getLoadMoreLabel() {
        if (this.props.showMoreLabel.includes(cardCollection.PLACEHOLDER_COUNT)) {
            return this.props.showMoreLabel.replace(cardCollection.PLACEHOLDER_COUNT, this.resultsToLoad);
        }

        return this.showMoreLabel;
    }

    filterBtnTxt() {
        if (!this.showMobileHeaders) {
            return this.filtersText || 'Filters';
        }
        return this.filtersCloseText || 'Close';
    }

    shouldEnableFilterPanel(){
        if(this.props.enableFilterPanel === null)
            return false;
        return true;
    }

    /**
     * Load one more "page" of cards and add to the this.cards array
     *
     * @param {int} [loadUntilPage] Continue loading page data until this page
     * @memberof CardCollection
     */
    loadMoreCards(loadUntilPage = 0) {
        console.log("loadMoreCards ran");
        return this.dao
            .nextPage()
            .then((data) => {
                // Show message only before the first card on the new page.
                if (data.cards && data.cards.length > 0) {
                    data.cards[0].showNewResultsLoaded = true;
                }

                this.page = data.page;

                // merge tags data in case any new tags have been added in the new cards
                //Object.assign(this.tags, data.tags);
                this.cards = this.cards.concat(data.cards);
                // Load more data if loadUntilPage is set
                if (loadUntilPage && loadUntilPage > this.page) {
                    this.loadMoreCards(loadUntilPage);
                }

                this.setResultsToLoad();
                this.resultsLoaded = data.cards.length;
            })
            .then(() => {
                this.setState({
                    page: this.page,
                    totalPages: this.totalPages,
                    cards: this.cards
                });
                //this.sendAnalytics('loadmore', 'click');
            });
    }

    /**
     * Set the sort order for the cards
     *
     * @param {string} sortBy One of the static strings SortBy.SORT_BY_NAME
     *                        or SortBy.SORT_BY_POPULAR
     * @memberof CardCollection
     */
    setSort(sortBy) {
        if (this.sort !== sortBy) {
            const loadedPages = this.page;
            // Load the first new page of results
            this.dao
                .setSort(sortBy)
                .setPage(1)
                .getData()
                .then((data) => {
                    this.loadNewData(data);
                })
                .then(() => {
                    // When "Show More" is enabled:
                    // Keep loading cards until we match the previous page total
                    if (this.paginationType === cardCollection.PAGINATION_SCROLL &&
                        loadedPages > this.page) {
                        this.loadMoreCards(loadedPages);
                    }
                })
                .then(() => {
                    //this.sendAnalytics(`sort-${this.sort}`, 'click');
                });
        }
    }

    /**
     * Set the sorting to by popular
     *
     * @memberof CardCollection
     */
    setSortByPopular() {
        this.setSort(SortBy.SORT_BY_POPULAR);
    }

    /**
     * Set the sorting to by name
     *
     * @memberof CardCollection
     */
    setSortByName() {
        this.setSort(SortBy.SORT_BY_NAME);
    }

    isPaginationScroll() {
        return this.props.paginationType === cardCollection.PAGINATION_SCROLL;
    }

    isPaginationPages() {
        return this.props.paginationType === cardCollection.PAGINATION_PAGES;
    }

    /**
     * Should the showMore button be displayed
     *
     * @returns {boolean} Are there more cards available to load
     * @memberof CardCollection
     */
    shouldShowMore() {
        return this.page < this.totalPages;
    }

    /**
     * Get the tag object for the associated tag key
     *
     * @param {string} tagKey
     * @returns {object} tag object containing {title, color, url}
     * @memberof CardCollection
     */
    getTag(card) {
        let cardTagId;
        if (typeof card.primaryTagId !== 'undefined') {
            cardTagId = card.primaryTagId;
        } else if (typeof card.tags !== 'undefined') {
            cardTagId = card.tags[0];
        }
        if (Object.prototype.hasOwnProperty.call(this.tagList, cardTagId)) {
            return this.tagList[cardTagId];
        }
        return {};
    }

    pageChange(newPage) {
        if (newPage !== this.currentPage) {
            this.dao
                .setPage(newPage)
                .getData()
                .then((data) => {
                    this.loadNewData(data);
                    this.scrollToTop();
                })
                .then(() => {
                    this.sendAnalytics('pagechange', 'click');
                });
        }
    }

    /**
     * Get the flex class that corresponds to the AEM showMorePosition value
     *
     * @returns {string} flex class for show more button position
     * @memberof CardCollection
     */
    showMorePositionFlex() {
        let smp;
        switch (this.props.showMorePosition) {
            case 'right':
                smp = 'flex-end';
                break;
            case 'left':
                smp = '';
                break;
            default:
                smp = 'center';
        }
        return smp;
    }

    isBlackBackground() {
        const isBlack = this.props.backgroundColor === '#000000';
        return isBlack;
    }

    render() {
        let showMobileHeaders = this.showMobileHeaders ? 'filters-show-headers' : '';
        let cards = this.state.cards || [];
        let shouldOutlineWhite = this.isBlackBackground() ? 'button_cta-outlineWhite' : '';

        return (
            <Fragment>
                <If condition={this.props.pageType === 'archive'}>
                    <Then>
                        <div>
                            <div className="display-filters-btn">
                                <button
                                    className="spectrum-Button spectrum-Button--cta"
                                    onClick={() => { this.showMobileHeaders = !this.showMobileHeaders; }}
                                    aria-label={this.getLoadMoreLabel()}>
                                    {this.filterBtnTxt()}
                                </button>
                            </div>
                            <FilterPanel
                                clearText={this.props.clearText}
                                filtersText={this.props.filtersText}
                                searchFiltersLabel={this.props.searchFiltersLabel}
                                showHeaders={this.showMobileHeaders}
                                tagGroups={this.state.tags}>
                            </FilterPanel>
                        </div>
                    </Then>
                </If>
                <div
                    className="card-collection"
                    role="region"
                    aria-label={this.searchResultsLabel}>
                    <div
                        className={ "card-collection_header " + showMobileHeaders}>
                        <SortBy
                            ariaControlsId={this.props.id}
                            displayResults={this.props.pageType !== 'collection'}
                            totalResults={this.totalResults}
                            onSortByPopular={category => this.setSortByPopular(category)}
                            onSortByName={category => this.setSortByName(category)}
                            sort={this.sort}

                            nameSortText={this.props.nameSortText}
                            popularSortText={this.props.popularSortText}
                            resultsText={this.props.resultsText}
                            sortByText={this.props.sortByText}
                            sortingOptionsText={this.props.sortingOptionsText}>
                        </SortBy>
                    </div>
                    <div
                        className="card-collection_cards"
                        id={this.props.id}>
                        {
                            cards.map((card, index) => {
                                return <Card
                                    key={index}
                                    {...card}
                                    tag={ this.getTag(card) }
                                />
                            })
                        }
                        <If condition={this.isPaginationScroll() && this.props.showMoreType === 'card'
                        && this.shouldShowMore()}>
                            <ShowMoreCard
                                loadMoreCards={this.loadMoreCards.bind(this)}>
                            </ShowMoreCard>
                        </If>
                        <If condition={this.totalResults === 0}>
                            <h3 class="no-Results">{this.noResultsText}</h3>
                        </If>
                    </div>
                    <If condition={this.isPaginationPages()}>
                        <Then>
                            <Pagination
                                currentPage={this.page}
                                totalPages={this.totalPages}
                                onPageChange={page => this.pageChange(page)}
                                pageText={this.pageText}
                                nextText={this.nextText}
                                prevText={this.prevText}
                                firstPageText={this.firstPageText}
                                lastPageText={this.lastPageText}
                                paginationLabel={this.paginationLabel} />
                        </Then>
                    </If>
                    <If condition={this.isPaginationScroll() && this.props.showMoreType === 'button'}>
                        <Then>
                            <div
                                className="card-collection_footer"
                                style={{justifyContent: this.showMorePositionFlex()}}>
                                <If condition={this.shouldShowMore()}>
                                    <button
                                        className= {shouldOutlineWhite + "spectrum-Button spectrum-Button--cta"}
                                        onClick={this.loadMoreCards}
                                        aria-label={this.getLoadMoreLabel()}>
                                        {this.props.showMoreText || 'Show more'}
                                    </button>
                                </If>
                            </div>
                        </Then>
                    </If>
                </div>
            </Fragment>
        )
    }
};

