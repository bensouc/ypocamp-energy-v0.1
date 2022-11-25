import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="results-card"
export default class extends Controller {
  static targets =  ['summerbtn','winterbtn','summercard','wintercard' ]

  connect() {
    console.log ("results controller connected")
  }

  displaySummerCard(){
    this.summerbtnTarget.classList.remove('inactive')
    this.winterbtnTarget.classList.add('inactive')
    this.summercardTarget.classList.remove('d-none')
    this.wintercardTarget.classList.add('d-none')
  }
  displayWinterCard() {
    this.winterbtnTarget.classList.remove('inactive')
    this.summerbtnTarget.classList.add('inactive')
    this.wintercardTarget.classList.remove('d-none')
    this.summercardTarget.classList.add('d-none')
  }
}
