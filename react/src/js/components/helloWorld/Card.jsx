/* eslint-disable */
import StandardCard from "./standardCard"

import React from 'react';

export default class Card extends React.Component {

    render() {
        window.Card = this;

        if (this.props.type === undefined || this.props.type === 'standard') {
            return (
                <StandardCard
                    {... this.props}
                    onTextChange={ text => alert(text) }/>
            );
        } else if (this.props.type === 'featured') {
            return "";
        } else if (this.props.type === 'static') {
            return ""
        } else if (this.props.type === 'subscription') {
            return "";
        }
        return '';
    }
}
