import * as DH from "./tools/domHelper.js";
import * as utils from "./tools/utils.js"
import * as BGM from "./app/backgroungManager.js"
import * as TS from "./app/topSection.js"


const label = await utils.getConfigValue("json/label.json")
const config = await utils.getConfigValue("json/data.json")

document.title = config.siteName

const background = new BGM.backgroundManager(config)
document.body.appendChild(background.build())

const topSection = new TS.TopSection(config, label)
document.body.appendChild(topSection.build())

document.body.appendChild(DH.createCustomElement("div", {classList: ["spacer-test"], id: "test1"}))
document.body.appendChild(DH.createCustomElement("div", {classList: ["spacer-test"], id: "test2"}))

window.addEventListener("scroll", () => topSection.handleScroll(background));


