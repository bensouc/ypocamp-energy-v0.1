import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="other-features"
export default class extends Controller {
  static targets = ['input','new','name','watt']
  connect() {
    console.log('other feature controller connected')
  }
  addFeatures(){
    // console.log(this.nameTarget.value)
    // console.log(this.wattTarget.value)
    this.newTarget.insertAdjacentHTML('afterBegin',
      `<ul><li>Name :${this.nameTarget.value}</li><li>Watt: ${this.wattTarget.value}</li></ul>`)
      // `<input><li>Name :${this.nameTarget.value}</li><li>Watt: ${this.wattTarget.value}>`)
      `< input class="form-control string email required" value = "Indiquer le nom*" data - controller="clean-form"
      data-action="click->clean-form#clean" required = "required" aria - required="true" type = "text" name = "mail[additional-features[]]" id = "mail_additional-features" " data-form-type="text" >`
  }
}
