import * as DH from "./tools/domHelper.js";
import * as utils from "./tools/utils.js"

const label = await utils.getConfigValue("json/label.json")
const config = await utils.getConfigValue("json/data.json")
document.body.appendChild(backGround())

const body = DH.createCustomElement("div")
const h1 = DH.createCustomElement("p", {innerText: config.siteName ,classList: ["css_title"]})
body.appendChild(h1)
document.body.appendChild(body)


function backGround(){
    const video = DH.createCustomElement("video", {classList: ["css_background-video"], src: utils.getAbsoltutePath(config.bgVideo), type: "video/mp4", muted: true, autoplay: true, loop: true})
    const overlay = DH.createCustomElement("div", {classList: ["css_background-overlay"]})
    const div = DH.createCustomElement("div", {classList: ["css_background-div"]})
    div.append(video, overlay)
    return div
}