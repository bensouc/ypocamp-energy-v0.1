import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="enroll"
export default class extends Controller {
  // static targets = ["pledge", "fridge", 'solar', 'battery', 'km', 'features']

  static targets = ['formBox']
  connect() {
    console.log("enroll controller connected")
  }

  displayNext(event){
    const TAB = ["pledge", "fridge", 'solar', 'battery', 'km', 'features']
    // console.log(this.formBoxTargets)
    // const tab = ["pledge", "fridge", 'solar', 'battery', 'km', 'features']
    var id =""
    if (event.path[2].id == "pledge") {
      id = 'pledge'
    } else {
      id = event.path[2].id
    }
    console.log(event.path)
    const index = TAB.indexOf(id)
    this.formBoxTargets[index].classList.add('d-none')
    console.log(this.formBoxTargets[index + 1])
    this.formBoxTargets[index + 1].classList.remove('d-none')
  }
  displayBack(event) {
    const TAB = ["pledge", "fridge", 'solar', 'battery', 'km', 'features']
    // console.log(this.formBoxTargets)
    var id = ""
    console.log(event.path)
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

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
