import * as DH from "./tools/domHelper.js";
import * as utils from "./tools/utils.js"
import * as BGM from "./app/backgroungManager.js"
import * as TS from "./app/topSection.js"
import * as Form from "./app/form.js"
import * as Language from "./app/language.js"


const label = await utils.getConfigValue("json/label.json")
const config = await utils.getConfigValue("json/data.json")

document.title = config.siteName
document.head.appendChild(DH.createCustomElement("link", {rel: "icon", href: config.favicon, type: "image/x-icon"}))

const background = new BGM.backgroundManager(config)
document.body.appendChild(background.build())

const language = new Language.Language(label)
document.body.appendChild(language.build())

let lang = utils.getlang()

const topSection = new TS.TopSection(config, label, lang)
document.body.appendChild(topSection.build())

const form = new Form.Form(config, label ,lang)
document.body.appendChild(form.build())

document.body.appendChild(DH.createCustomElement("div", {id: "test1"}))

window.addEventListener("scroll", () => topSection.handleScroll(background));


window.scrollTo(0, document.body.scrollHeight / 3);

