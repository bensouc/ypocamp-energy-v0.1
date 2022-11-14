import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="enroll"
export default class extends Controller {
  // static targets = ["pledge", "fridge", 'solar', 'battery', 'km', 'features']

  static targets = ['formBox']
  connect() {
    console.log("enroll controller connected")
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
}
