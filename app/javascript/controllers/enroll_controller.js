import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="enroll"
export default class extends Controller {
  // static targets = ["pledge", "fridge", 'solar', 'battery', 'km', 'features']

  static targets = ['formBox','fridgenav', 'solarnav', 'batterynav', 'kmnav', 'featuresnav']
  connect() {
    // console.log("enroll controller connected")
  }

  displayNext(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    if (event.path[1].id == "features") {
      id = 'features'
    } else {
      id = event.path[2].id
    }
    const index = TAB.indexOf(id)
    this.formBoxTargets[index].classList.add('d-none')
    this.formBoxTargets[index + 1].classList.remove('d-none')
  }

  displayBack(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    if (event.path[1].id == "features") {
      id = 'features'
    } else {
      id = event.path[2].id
    }
    const index = TAB.indexOf(id)
    this.formBoxTargets[index].classList.add('d-none')
    this.formBoxTargets[index - 1].classList.remove('d-none')
  }

  goToFridge(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    id = event.path[3].id
    const index = TAB.indexOf(id) //find the actual formbox
    this.formBoxTargets[index].classList.add('d-none') // hide the actual formbx
    this.formBoxTargets[0].classList.remove('d-none') //display fridge form box
  }
  goToSolar(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    id = event.path[3].id
    const index = TAB.indexOf(id) //find the actual formbox
    this.formBoxTargets[index].classList.add('d-none') // hide the actual formbx
    this.formBoxTargets[1].classList.remove('d-none') //display fridge form box
  }
  goToBattery(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    id = event.path[3].id
    const index = TAB.indexOf(id) //find the actual formbox
    this.formBoxTargets[index].classList.add('d-none') // hide the actual formbx
    this.formBoxTargets[2].classList.remove('d-none') //display fridge form box
  }
  goToKm(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    id = event.path[3].id
    const index = TAB.indexOf(id) //find the actual formbox
    this.formBoxTargets[index].classList.add('d-none') // hide the actual formbx
    this.formBoxTargets[3].classList.remove('d-none') //display fridge form box
  }
  goToFeatures(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    id = event.path[3].id
    const index = TAB.indexOf(id) //find the actual formbox
    this.formBoxTargets[index].classList.add('d-none') // hide the actual formbx
    this.formBoxTargets[4].classList.remove('d-none') //display fridge form box
  }
}
