import * as DH from "./tools/domHelper.js";
import * as utils from "./tools/utils.js"

const label = await utils.getConfigValue("json/label.json")
const config = await utils.getConfigValue("json/data.json")
const backgroundDiv = backGround()
document.body.appendChild(backgroundDiv)


function backGround(){
    const video = DH.createCustomElement("video", {classList: ["css_background-video"], src: utils.getAbsoltutePath(config.bgVideo), type: "video/mp4", muted: true, autoplay: true, loop: true})
    const overlay = DH.createCustomElement("div", {classList: ["css_background-overlay"]})
    const div = DH.createCustomElement("div", {classList: ["css_background-div"]})
    div.append(video, overlay)
    return div
}