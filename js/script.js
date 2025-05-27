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


//window.scrollTo(0, document.body.scrollHeight / 3);

document.getElementById('scrollButtonback').addEventListener('click', () => {window.scrollBy(0, -1)})

document.getElementById('scrollButton').addEventListener('click', () => {
    window.scrollBy(0, 1);

    const topTitle = document.querySelector('.css_top-title');
    const nextElement = topTitle?.parentElement?.nextSibling;
    const cousin = topTitle?.parentElement?.nextSibling.firstChild
    console.log(topTitle?.parentElement?.nextSibling.firstChild)
    const topTitleBox = topTitle?.getBoundingClientRect();
    const nextBox = nextElement?.getBoundingClientRect();
    const cousinBox = cousin.getBoundingClientRect()

    if (!topTitle || !nextElement || !topTitleBox || !nextBox) return;

    // Supprimer les anciennes lignes
    document.querySelectorAll('.debug-line').forEach(el => el.remove());

    // Ligne rouge : bas du titre
    const redLine = document.createElement('div');
    redLine.className = 'debug-line';
    redLine.style.position = 'fixed';
    redLine.style.top = `${topTitleBox.bottom}px`;
    redLine.style.left = '0';
    redLine.style.width = '100%';
    redLine.style.height = '2px';
    redLine.style.backgroundColor = 'red';
    redLine.style.zIndex = '9999';
    document.body.appendChild(redLine);

    // Ligne verte : haut du titre
    const greenLine = document.createElement('div');
    greenLine.className = 'debug-line';
    greenLine.style.position = 'fixed';
    greenLine.style.top = `${topTitleBox.top}px`;
    greenLine.style.left = '0';
    greenLine.style.width = '100%';
    greenLine.style.height = '2px';
    greenLine.style.backgroundColor = 'green';
    greenLine.style.zIndex = '9999';
    document.body.appendChild(greenLine);

    // Ligne bleue : haut de l’élément suivant
    const blueLine = document.createElement('div');
    blueLine.className = 'debug-line';
    blueLine.style.position = 'fixed';
    blueLine.style.top = `${nextBox.top}px`;
    blueLine.style.left = '0';
    blueLine.style.width = '100%';
    blueLine.style.height = '2px';
    blueLine.style.backgroundColor = 'blue';
    blueLine.style.zIndex = '9999';
    document.body.appendChild(blueLine);

    // Ligne bleue : haut de l’élément suivant
    const yellowLine = document.createElement('div');
    yellowLine.className = 'debug-line';
    yellowLine.style.position = 'fixed';
    yellowLine.style.top = `${cousinBox.top}px`;
    yellowLine.style.left = '0';
    yellowLine.style.width = '100%';
    yellowLine.style.height = '2px';
    yellowLine.style.backgroundColor = 'yellow';
    yellowLine.style.zIndex = '9999';
    document.body.appendChild(yellowLine);


    // Application du décalage et log
    const overlap = nextBox.top - topTitle.offsetHeight;
    const offset = overlap <= 0 ? Math.min(topTitle.offsetHeight, Math.abs(overlap)) : 0;
    topTitle.style.transform = `translateY(${offset}px)`;

    console.log("🟢 topTitle top (ligne verte) :", topTitleBox.top);
    console.log("🔴 topTitle bottom (ligne rouge) :", topTitleBox.bottom);
    console.log("🔵 nextElement top (ligne bleue) :", nextBox.top);
    console.log("🟡 consin top (ligne yellow) :", cousinBox.top);
    console.log("Décalage appliqué :", offset);
});


