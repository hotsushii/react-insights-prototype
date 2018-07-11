/* eslint-disable */
import React from 'react';

/** Class representing the UI for the Spectrum Accordion. */
export default class titleCard extends React.Component {

    constructor(props){
        super(props);
        this.title = this.props.childAttributes[9].get();
        this.styles = this.props.childAttributes[8].get();
        this.description = this.props.childAttributes[6].get();
        this.iconPath = this.props.childAttributes[7].get();
        this.background = this.props.childAttributes[2].get();
        this.handleChange = this.handleChange.bind(this);
    }

    isWide() {
        return this.width === 2;
    }

    getImageSize() {
        if (this.styles.imageSize === 'custom') {
            return this.styles.customImageSize;
        }
        return this.styles.imageSize;
    }

    getImageX() {
        return this.styles.imageHorizontalAlignment || '50%';
    }

    getImageY() {
        return this.styles.imageVerticalAlignment || '50%';
    }

    handleChange(e){
        e.preventDefault();
        this.props.onTextChange && this.props.onTextChange(this.title);
    }

    render() {
        return (
            <div
                onClick={this.handleChange}
                className="card card_static"
                style={{backgroundColor: this.styles.backgroundColor}}>
                <div
                    style={{
                        justifyContent: this.styles.contentVerticalAlignment,
                        backgroundSize: this.getImageSize(),
                        backgroundPosition: `${this.getImageX()} ${this.getImageY()}`,
                        backgroundImage: "url(" + (this.background) + ")"
                    }}
                    className="card_img card_bg">
                    <img
                        className="card_icon" src={this.iconPath} alt= ""/>
                    <h1
                        className="card_title"
                        style={{color: this.styles.titleColor}}>
                        {this.title}
                    </h1>
                    <p
                        style={{color: this.styles.descriptionColor}}
                        className="card_description">
                        {this.description}
                    </p>
                </div>
            </div>
        )
    }
}

