/* eslint-disable */
import React from 'react';
import VideoButton from "./videoButton"

/** Class representing the UI for the Spectrum Accordion. */
export default class standardCard extends React.Component {

    constructor(props){
        super(props);

        // this.background = this.props.childAttributes[2].get();
        // this.url = this.props.childAttributes[10].get();
        // this.video = this.props.childAttributes[12].get();
        // this.styles = {}; //this.props.childAttributes[8].get();
        // this.styles.titleColor = "";
        // this.styles.backgroundColor = "";
        // this.tag = this.props.tag;
        // this.title = this.props.childAttributes[9].get();
        // this.author = this.props.childAttributes[1].get();

    }

    /*
     * Determine if the tag should be displayed
     */
    shouldDisplayTag() {
        return (this.tag && this.tag.title);
    }

    /*
     * Determine if the video button should be displayed
     */
    canDisplayVideoButton() {
        return false;
        if(this.video && this.video.url) {
            return (this.video && this.video.url);
        }
    }

    /*
     * Get the page name sans domain and html
     */
    getPageName() {
        const pageNameIndex = this.url.lastIndexOf('/');
        const pageNamePlusExt = this.url.substring(pageNameIndex + 1);
        return pageNamePlusExt.split('.')[0];
    }

    getAuthor() {
        let authorStr = this.author || '';
        if (authorStr.length && this.byText && this.byText.includes('{authorName}')) {
            authorStr = this.byText.replace('{authorName}', authorStr);
        }
        return authorStr;
    }

    render() {
        this.background = this.props.background || "";
        this.video = this.props.video || "";
        this.styles = this.props.styles || {};
        this.styles.titleColor = "";
        this.styles.backgroundColor = "";
        this.tag = this.props.tag || "";
        this.article = this.props.article || {};
        this.url = this.props.article.url || "";
        this.title = this.article.title || "";
        this.author = this.article.author || "";

        return (
            <div className="card card_standard">
                <div
                    className="card_img"
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: "url(" + (this.background) + ")"}}>
                    <a className="card_hero" href={this.url}>
                    {this.canDisplayVideoButton() ?
                        <VideoButton
                            name={this.getPageName()}
                            videoUrl={this.video.url}
                            videoPolicy={this.video.policy.toString()}/>
                        : ''
                    }
                    </a>
                    {this.shouldDisplayTag() ?
                        <div className="tag_label" style= {{ backgroundColor: this.tag.color}}>
                            <a href={this.tag.url}>
                                {this.tag.title}
                            </a>
                        </div> : ''
                    }
                </div>
                <div className="card_bg" style={{backgroundColor: this.styles.backgroundColor}}>
                    <h2 className="card_title" style= {{color: this.styles.titleColor}}>
                        <a href={this.url}>{this.title}</a>
                    </h2>
                    <h4 className="card_author">{this.getAuthor()}</h4>
                </div>
            </div>
        );
    }
}

