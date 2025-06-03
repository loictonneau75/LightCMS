import * as utils from "./utils.js"
import * as DH from "../tools/domHelper.js"

export function setupscroll(){
    const overlay = document.querySelector(".bg-overlay")
    const title = document.querySelector(".ts-title")
    const welcome = document.querySelector(".ts-text")
    const form = document.querySelector(".form")
    const bgColorData = utils.getColorAndOpacity(overlay, "backgroundColor")
    const welcomeColorData = utils.getColorAndOpacity(welcome, "color")


    window.addEventListener("scroll", () => {
        utils.updateElementOpacity(overlay, title, bgColorData, 0.7, "backgroundColor")
        utils.updateElementOpacity(welcome, welcome, welcomeColorData, 0, "color")
        utils.stickyWithTransform(title, welcome, form, window.innerHeight * 0.1, 10)
    })
}

export function flagclick(components = []) {
    const flags = document.querySelectorAll(".language-flag")
    flags.forEach(flag => {
        flag.addEventListener("click", () => {
            localStorage.setItem("lang", flag.title)
            utils.reloadComponent(components)
            setupscroll()
        })
    })
}

export function setupDropdown(input, dropdownList, customInput, otherLabel) {
    const buttons = Array.from(dropdownList.querySelectorAll("button"))
    let highlightedIndex = 0
    input.addEventListener("focus", () => onDropdownFocus(dropdownList, customInput, buttons, (i) => {highlightedIndex = i}))
    input.addEventListener("blur", () => onDropdownBlur(input, dropdownList, customInput, otherLabel))
    input.addEventListener("keydown", (e) => onDropdownKeyDown(e, buttons, input, dropdownList, (i) => {highlightedIndex = i}, highlightedIndex))}

function onDropdownFocus(dropdownList, customInput, buttons, setIndex) {
    dropdownList.style.display = "block"
    customInput.style.display = "none"
    setIndex(0)
    highlightButton(buttons, 0)
}

function onDropdownBlur(input, dropdownList, customInput, otherLabel) {
    setTimeout(() => {
        dropdownList.style.display = "none"
        customInput.style.display = (input.value === otherLabel) ? "block" : "none"
    }, 100)
}

function onDropdownKeyDown(e, buttons, input, dropdownList, setIndex, currentIndex) {
    if (dropdownList.style.display !== "block") return
    switch (e.key) {
        case "ArrowDown":
            e.preventDefault()
            const nextIndex = (currentIndex + 1) % buttons.length
            setIndex(nextIndex)
            highlightButton(buttons, nextIndex)
            break
        case "ArrowUp":
            e.preventDefault()
            const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length
            setIndex(prevIndex)
            highlightButton(buttons, prevIndex)
            break
        case "Enter":
            e.preventDefault()
            buttons[currentIndex].click()
            input.blur()
            break
        case "Escape":
            e.preventDefault()
            input.blur()
            break
    }
}

function highlightButton(buttons, index) {
    buttons.forEach((btn, i) => {
        btn.classList.toggle("form-choice-highlighted", i === index)
        if (i === index) btn.scrollIntoView({ block: "nearest" })
    })
}




