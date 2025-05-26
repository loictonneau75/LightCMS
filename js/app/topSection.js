import * as DH from "../tools/domHelper.js"

export class TopSection{
    constructor(config, label, lang){
        this.wrapper = DH.createCustomElement("div", {classList:["css_top-wrapper"]})
        this.welcome = DH.createCustomElement("p", {innerText: label[lang].welcome ,classList: ["css_top-text", "js_top-text"]})
        this.title = DH.createCustomElement("p", {innerText: config.siteName.replace(/ /g, '\n') ,classList: ["css_top-text", "css_top-title", "js_top-title"]})
        this.wrapper.append(this.welcome, this.title)
    }
    build(){
        return this.wrapper
    }

    handleScroll(background){
        this.topText = document.querySelector(".js_top-text");
        this.topTitle = document.querySelector(".js_top-title");
        const overlay = document.querySelector(".js_background-overlay");
        const fadeRatio = this.calculateFadeRatio(window.scrollY, 0, 150);
        this.topText.style.opacity = fadeRatio;
        background.updateOverlayOpacity(overlay, fadeRatio);
        this.handleStickyTitle();
    }

    calculateFadeRatio(scrollY, fadeStart, fadeEnd) {
        if (scrollY <= fadeEnd) {
            let ratio = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
            return Math.max(0, Math.min(1, ratio));
        }
        return 0;
    }

    handleStickyTitle() {
        const overlap = this.topTitle.parentElement.nextSibling.getBoundingClientRect().top - this.topTitle.offsetHeight;
        if (overlap <= 0) {
            const offset = Math.min(this.topTitle.offsetHeight, Math.abs(overlap));
            this.topTitle.style.transform = `translateY(${offset}px)`;
        } else {
            this.topTitle.style.transform = "translateY(0)";
        }
    }
}