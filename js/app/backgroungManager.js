import * as DH from "../tools/domHelper.js"
import * as utils from "../tools/utils.js"

export class backgroundManager{
    constructor(config){
        this.wrapper = DH.createCustomElement("div", {classList: ["css_background-wrapper"]})
        this.video = DH.createCustomElement("video", {classList: ["css_background-video"], src: utils.getAbsoltutePath(config.bgVideo), type: "video/mp4", muted: true, autoplay: true, loop: true})
        this.overlay = DH.createCustomElement("div", {classList: ["css_background-overlay", "js_background-overlay"]})
        this.wrapper.append(this.video, this.overlay)
    }

    build(){
        return this.wrapper
    }

    updateOverlayOpacity(element, ratio) {
    if (element) {
        const baseOpacity = 0.25;
        const maxIncrease = 0.25;
        const finalOpacity = baseOpacity + (1 - ratio) * maxIncrease;
        element.style.backgroundColor = `rgba(0, 0, 0, ${finalOpacity})`;
    }
}
}