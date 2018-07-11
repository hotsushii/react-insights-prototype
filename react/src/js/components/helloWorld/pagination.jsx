/* eslint-disable */
import React from 'react';
import { If, Then, Else } from 'react-if';

/** Class representing the UI for the Spectrum Accordion. */
export default class pagination extends React.Component {

    constructor(props){
        super(props);
        this.mobilePageList = this.mobilePageList.bind(this);
    }

    static DESKTOP_PAGE_COUNT = 10;
    static MOBILE_PAGE_COUNT = 4;

    currentPage() {
        return this.props.currentPage;
    }

    pageList() {
        return this.generatePageList(
            pagination.DESKTOP_PAGE_COUNT,
            this.props.currentPage,
            this.props.totalPages,
        );
    }

    mobilePageList() {
        return this.generatePageList(
            pagination.MOBILE_PAGE_COUNT,
            this.props.currentPage,
            this.props.totalPages,
        );
    }


    /**
     * @method generatePageList
     * @param {number} pageCount - Total pages to display
     * @param {number} currentPageNumber - Current page user is on
     * @param {number} totalPages - Total number of pages available
     * @return {Array}
     * @description Return array of pages up to a max length of pageCount
     * @memberOf Pagination
     */
    generatePageList(pageCount, currentPageNumber, totalPages) {
        const halfPageCount = Math.floor(pageCount / 2);
        let start;
        let end;

        if (totalPages <= (pageCount + 1)) {
            // show all pages
            start = 1;
            end = totalPages;
        } else {
            start = Math.min(
                Math.max(1, currentPageNumber - halfPageCount),
                totalPages - pageCount,
            );
            end = Math.max(
                Math.min(currentPageNumber + halfPageCount, totalPages),
                pageCount + 1,
            );
        }

        return this.range(start, end);
    }

    // Return a range
    range(startVal, end) {
        let start = startVal; // required due to no-param-reassign eslint rule
        let step = 1;
        const range = [];

        if (end < start) {
            step = -step;
        }

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }

        return range;
    }

    /**
     * Click handler for Pagination.  Triggers a 'pagechange' event if user selects a new page.
     * @param {object} ev click event
     */
    onClick(ev) {
        const elem = ev.target;
        const elemType = elem.nodeName.toLowerCase();
        let pageValue;
        if (elemType === 'i') {
            pageValue = elem.parentElement.value;
        } else if (elemType === 'button') {
            pageValue = elem.value;
        }
        if (pageValue) {
            this.props.onPageChange && this.props.onPageChange(pageValue);
        }
    }

    render() {
        return (
            <section
                className="pagination"
                aria-label={this.props.paginationLabel}
                onClick={ev => this.onClick(ev)}>

                <span id="paginationPageText">{this.props.pageText}</span>

                <If condition={this.props.currentPage > 1}>
                    <Then>
                        <button value="1">
                            <i className="spectrumIcon_chevronDoubleLeft" aria-label={this.props.firstPageText} />
                        </button>
                    </Then>
                </If>

                <If condition={this.props.currentPage > 1}>
                    <Then>
                        <button className="pagination_prev" value={this.props.currentPage - 1} id="paginationPrev" aria-labelledby="paginationPrev paginationPageText">
                            <i className="spectrumIcon_chevronLeft" />
                            {this.props.prevText}
                        </button>
                    </Then>
                </If>

                <ul>
                    {
                        this.pageList().map(function(pageNumber){

                            if(this.props.currentPage === pageNumber)
                                return <li key={pageNumber}>{pageNumber}</li>
                            else
                                return  <li key={pageNumber}>
                                    <button
                                        value={pageNumber}
                                        id={`paginationPage-${pageNumber}`}
                                        aria-labelledby={`paginationPageText paginationPage-${pageNumber}`}>
                                        {pageNumber}
                                    </button>
                                </li>

                        }, this)
                    }
                </ul>

                <ul className="pagination_mobile">
                    {
                        this.mobilePageList().map(function(pageNumber){

                            if(this.props.currentPage === pageNumber)
                                return <li key={pageNumber}>{pageNumber}</li>
                            else
                                return  <li key={pageNumber}>
                                            <button
                                                value={pageNumber}
                                                id={`paginationPage-${pageNumber}`}
                                                aria-labelledby={`paginationPageText paginationPage-${pageNumber}`}>
                                                {pageNumber}
                                            </button>
                                        </li>

                        }, this)
                    }
                </ul>

                <If condition={this.props.currentPage < this.props.totalPages}>
                    <button className="pagination_next" value={this.props.currentPage + 1} id="paginationNext" aria-labelledby="paginationNext paginationPageText">
                        {this.props.nextText}
                        <i className="spectrumIcon_chevronRight" />
                    </button>
                </If>
                <If condition={this.props.currentPage < this.props.totalPages}>
                    <button className="pagination_last" value={this.props.totalPages} aria-label={this.props.lastPageText}>
                        <i className="spectrumIcon_chevronDoubleRight" />
                    </button>
                </If>
            </section>
        )
    }
}

