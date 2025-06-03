import * as DH from "../tools/domHelper.js";
import * as utils from "../tools/utils.js"

export class Language{
    constructor(label){
        this.section = DH.createCustomElement("section", {classList:["language"]})
        for (const lang in label){
            const flag = DH.createCustomElement("img", {classList:["language-flag"], src: label[lang].flag, alt: lang, title: lang})
            this.section.appendChild(flag)
        }
    }

    build(){
        return this.section
    }
}