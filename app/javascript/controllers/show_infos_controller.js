import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="show-infos"
export default class extends Controller {
  static targets = ['percentModal', 'autonomyModal','averageModal']
  connect() {
    console.log("onfis controller connected")
  }
  displayPercentModal() {
    this.percentModalTarget.classList.toggle('d-none')
  }
  displayAverageModal() {
    this.averageModalTarget.classList.toggle('d-none')
  }
  displayAutonomyModal() {
    this.autonomyModalTarget.classList.toggle('d-none')
  }
}
