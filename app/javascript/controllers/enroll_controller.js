import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="enroll"
export default class extends Controller {
  static targets = ["pledge", "fridge", 'solar', 'battery', 'km', 'features']

  connect() {
    console.log("connexion OK")
  }
  displayFridge(event) {
    console.log(event)
    this.pledgeTarget.classList.add('d-none')
    this.fridgeTarget.classList.remove('d-none')
  }
  displaySolar() {
    this.fridgeTarget.classList.add('d-none')
    this.solarTarget.classList.remove('d-none')
  }
  displayBattery() {
    this.solarTarget.classList.add('d-none')
    this.batteryTarget.classList.remove('d-none')
  }
  displayKm() {
    this.batteryTarget.classList.add('d-none')
    this.kmTarget.classList.remove('d-none')
  }
  displayFeatures() {
    this.kmTarget.classList.add('d-none')
    this.featuresTarget.classList.remove('d-none')
  }
}
