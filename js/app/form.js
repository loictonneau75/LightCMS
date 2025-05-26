import * as DH from "../tools/domHelper.js";

export class Form{
    constructor(config, label, lang){
        this.lang = lang;
        this.label = label
        this.collectableName = config.collectables.en;
        this.fields = config.fields;
        this.wrapper = DH.createCustomElement("div", {classList: ["css_form-wrapper"]});
        this.buildForm()
    }

    build(){
        return this.wrapper
    }

    buildForm(){
        this.form = DH.createCustomElement("form", {classList: ["css_form"], autocomplete: "off"});
        this.wrapper.appendChild(this.form);
        this.fields.forEach(fieldRow => this.buildRow(fieldRow))
        const submitButton = DH.createCustomElement("button", {type: "button", innerText:this.label[this.lang].save})
        this.form.appendChild(submitButton)

    }

    buildRow(fieldsrow){
        const row = DH.createCustomElement("div", {classList: ["css_form-row"]})
        Object.values(fieldsrow).forEach(field => this.buildField(field, row))
        this.form.appendChild(row)
    }

    buildField(field, row){
        const wrapper = DH.createCustomElement("div", {classList: ["css_form-input-wrapper"]})
        //if(field.otherId){wrapper.appendChild(this.createInputWithDropdown())}
        //else if(field.choiceId){wrapper.appendChild(this.createInputWithOption())}
        //else if(field.textarea){wrapper.appendChild()}
        //else
        this.createInput(field, wrapper)
        row.appendChild(wrapper)
    }

    createInput(data, wrapper){
        const input = DH.createCustomElement("input", {classList:["css_form-input"], id: data.id, type: "text", placeholder: data.label[this.lang]})
        wrapper.append(input)
    }

}