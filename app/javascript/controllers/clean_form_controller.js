import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="clean-form"
export default class extends Controller {
  connect() {
    //  console.log("clean connected")
  }

  clean(event){
    const val = event.target.value
    if (val == 'Votre adresse email*' || val == "Nom de l'appareil*" ) {
      event.target.value = ''
    }
  }
}
