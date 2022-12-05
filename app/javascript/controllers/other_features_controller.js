import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="other-features"
export default class extends Controller {
  static targets = ['input', 'new', 'name', 'watt', 'last']
  connect() {
    // console.log(this.lastTargets[5].parentElement.parentElement)
  }
  addFeatures() {

    // aller chercher le wrapper
    const feature_daily_usage = Math.round((this.wattTarget.value / 220) * (10 / 60) * 100) / 100 // W / 220V => Ah/D *10min (in average)
    // add in DOM the new feature
    this.lastTargets[5].parentElement.parentElement.insertAdjacentHTML('beforeend',
      `<div class="form-check ">
          <input checked class=" form-check-input check_boxes required selector domain-selector-small" data-calculate-energy-target="features" type="checkbox" value="${this.nameTarget.value}=>${feature_daily_usage}" name="prospect[other_features][]" id="prospect_other_features_${this.nameTarget.value.replace(/ /g, "_")}">
          <label class=" d-flex justify-content-between  align-items-baseline form-check-label collection_check_boxes" for="prospect_other_features_${this.nameTarget.value.replace(/ /g, "_")}">
            <i class="fa-regular fa-user"></i>  ${this.nameTarget.value}
            <div data-action="click->other-features#removeFeature"> <i class="fa-solid fa-trash"></i> </div>
          </label>
        </div>`)
    this.nameTarget.value ="Nom de l'appareil *"
    this.wattTarget.value = 0
  }

  removeFeature(event){
    event.target.parentElement.parentElement.parentElement.remove()
   }

}
