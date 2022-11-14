import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="clean-form"
export default class extends Controller {
  connect() {
    // console.log("clean connected")
  }

  clean(event){
    // console.log(event.target.value)
    const val = event.target.value
    if (val == 'Votre adresse email*') {
      event.target.value = ''
    }
  }
}
