import * as DH from "../tools/domHelper.js"
import * as utils from "../tools/utils.js"
import * as storage from "../tools/storage.js"
import * as event from "../tools/event.js"

export class Form{
    constructor(config, labels){
        this.collectablesNames = config.collectables.en
        this.lang = utils.getlang()
        this.labels = labels[this.lang]
        this.fieldsData = config.fields
        this.hasRequiredInput = false

        this.formSection = DH.createCustomElement("section", {classList: ["form-section"]})
        this.formElement = DH.createCustomElement("form", {classList: ["form"],autocomplete :"off"})
        this.fieldsData.forEach(fieldRowData => this.renderFieldRow(fieldRowData));
        this.renderRequiredNote()
        this.renderSubmitButton()
        this.formSection.appendChild(this.formElement)
    }
    build(){
        return this.formSection
    }

    renderFieldRow(rowData){
        const row = DH.createCustomElement("div", {classList: ["form-row"]})
        Object.values(rowData).forEach(inputData => {this.renderField(inputData, row)})
        this.formElement.appendChild(row)
    }

    renderField(data, parent){
        const inputWrapper = DH.createCustomElement("div", {classList: ["form-input-wrapper"]}) 
        if (data.otherId){inputWrapper.append(...this.renderSelectableInputWithCustom(data))}
        //else if(data.choiceId){}
        //else if(data.textarea){}
        else inputWrapper.appendChild(this.renderTextInput(data))
        parent.appendChild(inputWrapper)
        if(data.nbColumn && data.nbColumn > 0) this.fillEmptyColumns(data, parent)
    }

    fillEmptyColumns(data, parent){
        const nbEmpty = data.nbColumn - 1
            for (let i = 0; i < nbEmpty; i++){
                const emptyWrapper = DH.createCustomElement("div", {classList: ["form-input-wrapper", "empty"]})
                parent.appendChild(emptyWrapper)
            }
    }

    renderTextInput(data){
        return DH.createCustomElement("input", {id: data.id, type: "text", placeholder: this.required(data), classList: ["form-input"]})
    }

    renderSelectableInputWithCustom(data) {
        const savedOptions = storage.getDataFromLocalStorage(data.storageKey);
        if (savedOptions.length === 0) return [this.renderTextInput(data)]
        const selectedOptionInput = this.renderTextInput(data)
        selectedOptionInput.readOnly = true
        const customOptionInput = DH.createCustomElement("input", {type: "text", placeholder: this.labels.other, classList: ["form-input", "form-input-other"]})
        const dropdownList = this.createDropdownList(savedOptions, selectedOptionInput)
        const dropdownWrapper = this.createDropdownInputWrapper(selectedOptionInput)
        event.setupDropdown(selectedOptionInput, dropdownList, customOptionInput, this.labels.other)
        return [dropdownWrapper, dropdownList, customOptionInput]
    }

    createDropdownInputWrapper(selectedInput) {
        const wrapper = DH.createCustomElement("div", {classList: ["form-input-wrapper-inner"]})
        const caret = DH.createCustomElement("div", {classList: ["form-input-caret"]})
        wrapper.append(selectedInput, caret)
        return wrapper
    }

    createDropdownList(options, selectedInput) {
        const list = DH.createCustomElement("div", { classList: ["form-input-choice-wrapper"] })
        // the semicolon is just to make sure JavaScript understands that the [] is not part of the previous statement
        ;[this.labels.other, ...options].forEach(option => { 
            const button = DH.createCustomElement("button", {type: "button",textContent: option,classList: ["form-input-choice"]})
            button.addEventListener("click", () => {selectedInput.value = option})
            list.appendChild(button)
        })
        return list
    }

    required(data){
        if(data.required){
            this.hasRequiredInput = true
            return `${data.label[this.lang]}*`
        }
        return data.label[this.lang]
    }

    renderRequiredNote(){
        if(this.hasRequiredInput){
            const note = DH.createCustomElement("p", {classList: ["form-note"]})
            note.append(
                document.createTextNode(this.labels.required[0] + " "),
                DH.createCustomElement("span", {classList: ["form-asterisk"],innerText: this.labels.required[1]}),
                document.createTextNode(" " + this.labels.required[2])
            )
            this.formElement.appendChild(note)
        }
    }

    renderSubmitButton(){
        const submitButton = DH.createCustomElement("button", {type: "button",innerText: this.labels.save,classList: ["form-button"]})
        this.formElement.appendChild(submitButton)
    }
    
}