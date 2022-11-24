import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="other-features"
export default class extends Controller {
  static targets = ['input', 'new', 'name', 'watt', 'last']
  connect() {
    // console.log(this.lastTargets[5].parentElement.parentElement)
  }
  addFeatures() {
    // console.log(this.nameTarget.value)
    // console.log(this.wattTarget.value)
    // aller chercher le wrapper
    this.lastTargets[5].parentElement.parentElement.insertAdjacentHTML('beforeend',
      `<div class="form-check"><input checked class="form-check-input check_boxes required selector domain-selector-small" data-calculate-energy-target="features" data-action="click->calculate-energy#changeInForm" type="checkbox" value="${this.nameTarget.value}=>${this.wattTarget.value}" name="prospect[other_features][]" id="prospect_other_features_${name.replace(/ /g, "_")}">
<label class="form-check-label collection_check_boxes" for="prospect_other_features_${this.nameTarget.value.replace(/ /g, "_")}"> <i class="fa-regular fa-user"></i>  ${this.nameTarget.value}
</label></div>`)
  }

}
