import * as DH from "./tools/domHelper.js";


const backgroundDiv = backGround()
document.body.appendChild(backgroundDiv)
console.log(getBasePath())

function backGround(){
    const video = DH.createCustomElement("video", {classList: ["css_background-video"], src: "./video/thé_background.mp4", type: "video/mp4", muted: true, autoplay: true, loop: true})
    const overlay = DH.createCustomElement("div", {classList: ["css_background-overlay"]})
    const div = DH.createCustomElement("div", {classList: ["css_background-div"]})
    div.append(video, overlay)
    return div
}

function getBasePath() {
    const path = window.location.pathname;
    return path.endsWith('/') ? path : path + '/';
}

async function getConfigValue() {
    const response = await fetch()
}