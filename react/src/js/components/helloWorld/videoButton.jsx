// /* eslint-disable */
// import React from 'react';
// import ReactDOM from 'react-dom';
// import videoModal from "./videoModal";
// import Modal from '../../../../../publish/src/js/components/modal/modal';
//
// /** Class representing the UI for the Spectrum Accordion. */
// export default class videoButton extends React.Component {
//
//     constructor(props){
//         super(props);
//         this.name = this.props.name;
//         this.videoUrl = this.props.videoUrl;
//         this.videoPolicy = this.props.videoPolicy;
//         this.showVideoModal = this.showVideoModal.bind(this);
//     }
//
//     /*
//      * Get our modal from the DOM.
//      */
//     getModal() {
//         return document.querySelector(".modalContainer #video-" + this.name);
//     }
//
//     renderModal() {
//         var div = document.createElement('div');
//         var modalContainer = document.querySelector('.modalContainer');
//
//         var videoModalObj = React.createElement(videoModal, {name: this.name, videoUrl: this.videoUrl, videoPolicy: this.videoPolicy});
//         ReactDOM.render(videoModalObj, div);
//
//         modalContainer.appendChild(div);
//         return this.getModal(this.name);
//     }
//
//     openModal() {
//         // Get our page name and try to find it in our modal container
//         //let videoModal = this.getModal(this.name);
//
//         // If the modal is null, we need to render a new modal.
//         //if (videoModal === null) {
//         var videoModal = this.renderModal();
//         //}
//
//         // Create a new DOM-based modal and open it.
//         videoModal = new Modal(videoModal);
//         videoModal.open();
//     }
//
//     showVideoModal(event) {
//         event.preventDefault();
//         event.stopPropagation();
//         console.log("showVideoModal function from react fired");
//         this.openModal();
//     }
//
//     render() {
//         return (
//             <button
//                 onClick={event => this.showVideoModal(event)}
//                 className="aceui-Button-Round aceui-Button-Round--small aceui-Button-Round--video"/>
//         )
//     }
// }
//
