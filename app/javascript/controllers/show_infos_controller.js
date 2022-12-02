import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="show-infos"
export default class extends Controller {
  static targets = ['percentModal', 'autonomyModal', 'averageModal']
  connect() {
    console.log("onfis controller connected")
  }
  displayPercentModal() {
    this.percentModalTarget.classList.toggle('d-none')
  }
  closePercentModal() {
    console.log('fermer modal')
    this.percentModalTarget.classList.remove('d-none')

  }
  displayAverageModal() {
    console.log('fermer modal average')
    this.averageModalTarget.classList.toggle('d-none')
  }
  closeAverageModal(){
    this.averageModalTarget.classList.remove('d-none')

  }
  displayAutonomyModal() {
    this.autonomyModalTarget.classList.toggle('d-none')
  }
}
