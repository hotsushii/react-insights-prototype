/* eslint-disable */
import React from 'react';
import FilterItem from "./filterItem"

export default class filterGroup extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        };
        this.openGroup = this.openGroup.bind(this);
    }

    componentDidMount(){
        var node = document.querySelector('dexter-filter-panel');
        node = node.parentElement;
        node.style.visibility = 0;
        node.chil
    }

    getNameId(){
        return this.props.name.replace(/\s/g, '').toLowerCase()
    }

    openGroup(){
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        let isOpen = this.state.isOpen ? 'is-Open' : 'is-Closed';
        return (
            <section
                className={"tag-List_Group " + isOpen}>
                <input
                    className="tag-List_Group-header"
                    onClick={this.openGroup}
                    type="checkbox"
                    id={`tag-List_Group-${this.getNameId()}`}
                    role="button"
                    aria-controls={`tag-List_Group-tags-${this.getNameId()}`}
                    aria-labelledby={`tag-List_Group_Label-${this.getNameId()}`}
                    aria-expanded={this.props.isOpen}>
                </input>
                <label
                    id={`tag-List_Group_Label-${this.getNameId()}`}>
                    <span className="tag-List_Group-header-arrow"></span>
                    {this.props.name}
                </label>
                <ul className="tag-List_Group-tags"
                    id={`tag-List_Group-tags-${this.getNameId()}`}>
                    {
                        Object.keys(this.props.tags).map(function(keyName) {
                            return <FilterItem key={keyName} name={this.props.tags[keyName].title} id={this.props.tags[keyName].id} group={this.props.name}/>
                        }, this)
                    }
                </ul>
            </section>
        )
    }
}
