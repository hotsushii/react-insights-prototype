/* eslint-disable */
/**
 * Created by sanrai on 7/2/18.
 */

export default class baseCard{
    constructor() {
        if (!this.styles) {
            this.styles = {};
        }
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
}
