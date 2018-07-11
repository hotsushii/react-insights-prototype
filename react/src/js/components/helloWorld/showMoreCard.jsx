/* eslint-disable */
import React from 'react';

/** Class representing the UI for the Spectrum Accordion. */
export default class showMoreCard extends React.Component {

    constructor(props){
        super(props);
        this.foo = "";
        this.handleChange = this.handleChange.bind(this);
    }

    keyPress(ev){
        if (ev.charCode === 13 || ev.charCode === 32) {
            this.handleChange(ev);
        }
    }

    handleChange(e){
        //e.preventDefault();
        //this.props.onShowMore && this.props.onShowMore("");
        console.log("react show more card shown");
        this.props.loadMoreCards();
    }

    render() {
        return (
            <div className="card card_showmore">
                <svg onClick={this.handleChange} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" width="48">
                    <path d="M37 20H26V9a1 1 0 0 0-1-1H21a1 1 0 0 0-1 1V20H9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1H20V37a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V26H37a1 1 0 0 0 1-1V21A1 1 0 0 0 37 20Z" fill="#1473E6" />
                </svg>
                <span onClick={this.handleChange} onKeyPress={ev => this.keyPress(ev)} role="button" tabIndex="0">{this.props.showMoreText || 'Show more'}</span>
            </div>
        )
    }
}

