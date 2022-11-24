import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="enroll"
export default class extends Controller {


  static targets = ['formBox']
  connect() {
    // console.log("enroll controller connected")
  }
  stopEnterKey(event) {
    // console.log('stop enterkey')
    event.preventDefault()

  }
  // useless feature
  displayNext(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = event.composedPath()[5].id
    if (event.composedPath()[5].id == "fridge") {
      id = 'fridge'
    } else if (event.composedPath()[2].id == "km") {
      id = 'km'
    } else if (event.composedPath()[1].id == "features") {
      id = 'features'
    }
    else {
      id = event.composedPath()[4].id
    }
    // console.log(event.composedPath())
    const index = TAB.indexOf(id)
    this.formBoxTargets[index].classList.add('d-none')
    this.formBoxTargets[index + 1].classList.remove('d-none')
  }

  displayBack(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    if (event.composedPath()[1].id == "features") {
      id = 'features'
    } else {
      id = event.composedPath()[2].id
    }
    const index = TAB.indexOf(id)

    // all fridgenavtargets classList remove inactive et add inactive
    console.log(this.fridgenavTargets)
    // display the right formbox
    this.formBoxTargets[index].classList.add('d-none')
    this.formBoxTargets[index - 1].classList.remove('d-none')
  }

  goToFridge(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    id = event.composedPath()[3].id
    const index = TAB.indexOf(id) //find the actual formbox
    this.formBoxTargets[index].classList.add('d-none') // hide the actual formbx
    this.formBoxTargets[0].classList.remove('d-none') //display fridge form box
  }
  goToSolar(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    id = event.composedPath()[3].id
    const index = TAB.indexOf(id) //find the actual formbox
    this.formBoxTargets[index].classList.add('d-none') // hide the actual formbx
    this.formBoxTargets[1].classList.remove('d-none') //display solar form box
  }
  goToBattery(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    id = event.composedPath()[3].id
    const index = TAB.indexOf(id) //find the actual formbox
    this.formBoxTargets[index].classList.add('d-none') // hide the actual formbx
    this.formBoxTargets[2].classList.remove('d-none') //display battery form box
  }
  goToKm(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    id = event.composedPath()[3].id
    const index = TAB.indexOf(id) //find the actual formbox
    this.formBoxTargets[index].classList.add('d-none') // hide the actual formbx
    this.formBoxTargets[3].classList.remove('d-none') //display km form box
  }
  goToFeatures(event) {
    const TAB = ["fridge", 'solar', 'battery', 'km', 'features', 'results']
    var id = ""
    id = event.composedPath()[3].id
    const index = TAB.indexOf(id) //find the actual formbox
    this.formBoxTargets[index].classList.add('d-none') // hide the actual formbx
    this.formBoxTargets[4].classList.remove('d-none') //display features form box
  }
}
