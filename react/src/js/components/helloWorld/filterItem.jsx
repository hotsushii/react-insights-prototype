/* eslint-disable */
import React from 'react';

import { store } from './collectionState';

/** Class representing the UI for the Spectrum Accordion. */
export default class filterItem extends React.Component {

    constructor(props){
        super(props);
        this.toggleItem = this.toggleItem.bind(this);
        this.triggerEvent = this.triggerEvent.bind(this);

        this.state = {
            isChecked: false
        };

        store.subscribe(() => {
            var currentState = store.getState();
            var activeFilters = currentState.activeFilters;

            /* When someone clicks the clear all filter */
            if(activeFilters.length === 0){
                this.setState({
                    isChecked: false
                })
            }
        });
    }

    getFormattedId() {
        return this.props.id.replace(/\W+/g, '-');
    }

    triggerEvent(selectedItem){
        if(!this.state.isChecked){
            store.dispatch({type: 'ADD_FILTER', data: selectedItem});
        } else {
            store.dispatch({type: 'REMOVE_FILTER', data: selectedItem.id});
        }
    }

    toggleItem() {
        var currentState = this.state.isChecked;

        var selectedItem = {
            name: this.props.name,
            id: this.props.id,
            domId: this.getFormattedId(),
            group: this.props.group,
        };

        this.setState({
            isChecked: !currentState
        }, this.triggerEvent(selectedItem));

    }

    render() {
        return (
            <li>
                <input
                    id={this.getFormattedId()}
                    type="checkbox"
                    name={this.getFormattedId()}
                    value={this.getFormattedId()}
                    checked={this.state.isChecked}
                    aria-labelledby={`${this.getFormattedId()}-label`}>
                </input>
                <label
                    id={`${this.getFormattedId()}-label`}
                    onClick={this.toggleItem}>
                    {this.props.name}
                </label>
            </li>
        );
    }
}

