import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2"
import process from "process"
import hubspot from "@hubspot/api-client"
import * as sweetalert2 from "sweetalert2"

// Connects to data-controller="enroll"
export default class extends Controller {


  static targets = ['formBox', 'fridge', 'form']
  connect() {
    // console.log("enroll controller connected")
  }
  stopEnterKey(event) {
    // console.log('stop enterkey')
    event.preventDefault()

  }

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
    window.scrollTo({ top: 0 })
  }

  finishForm(event) {
    // dispaly next
    const displayNext = ((event) => {
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
      window.scrollTo({ top: 0 })
    })


    let isValid = this.validateForm(this.formTarget); //Homemade form validation see @EOF
    // form validation if true then display next
    if (isValid) {
      this.sendContact()
      displayNext(event)
      // displayNext(event)
    } else {
      // else sweert alert with you muste fill all te mandatory fields
      Swal.fire({
        title: "Pour continuer, vous devez choisir au minimun :",
        text: 'Un type de frigo, de batterie, de chauffage et si vous possédez ou non des panneaux solaires',
        icon: 'error',
      })

    }

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
    // console.log(this.fridgenavTargets)

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

  // JS fonction
  validateForm() {
    let isValid = true;

    // Tell the browser to find any required fields
    let requiredFieldSelectors = 'input:required';
    let requiredFields = this.formTarget.querySelectorAll(requiredFieldSelectors);

    requiredFields.forEach((field) => {
      // For each required field, check to see if the value is empty
      // if so, we focus the field and set our value to false
      if (!field.disabled && !field.value.trim()) {
        field.focus();

        isValid = false;
      }
    });

    // If we already know we're invalid, just return false
    if (!isValid) {
      return false;
    }

    // Search for any browser invalidated input fields and focus them
    let invalidFields = this.formTarget.querySelectorAll('input:invalid');

    invalidFields.forEach((field) => {
      if (!field.disabled) {
        field.focus();

        isValid = false;
      }
    });
    return isValid
  }

  async sendContact() {
    const dataContact = Object.fromEntries(new FormData(this.formTarget).entries())
    var dataTemp = []
    for (const [key, value] of new FormData(this.formTarget)) {
      dataTemp.push(value)
    }
    const dataFeatures = dataTemp.slice(17)
    // API POST RESUQET
    const url = 'https://api.hubapi.com/crm/v3/objects/contacts'
    const API_BEARER_TOKEN = process.env.API_BEARER_TOKEN
    const body = `{
                    "properties": {
                                    "email": "${dataContact['prospect[email]']}",
                                    "firstname": "test prénom",
                                    "lastname": "test"
                                  }
                  }`

    fetch(url, {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'authorization': API_BEARER_TOKEN,
        'Content-Type': 'application/json'
      },
      // body: '{\n  "properties": {\n    "email": "bcooper@biglytics.net",\n    "firstname": "Bryan"\n  }\n}',
      body: JSON.stringify(body)
    })
    .then((data) => console.log(data))

    // // const hubspot = require('@hubspot/api-client');

    // const hubspotClient = new hubspot.Client({ "accessToken": API_BEARER_TOKEN });

    // const properties = {
    //   "email": `${dataContact['prospect[email]']}`,
    //   "firstname": "test prénom",
    //   "lastname": "test"
    // };
    // const SimplePublicObjectInput = { properties };

    // try {
    //   const apiResponse = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);
    //   console.log(JSON.stringify(apiResponse.body, null, 2));
    // }
    // catch (e) {
    //   }
    // //   e.message === 'HTTP request failed'
    // //     ? console.error(JSON.stringify(e.response, null, 2))
    // //     : console.error(e)
    // // }



  }
}
