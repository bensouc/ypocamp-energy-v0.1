import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="calculate-energy"
export default class extends Controller {
  static targets = ['form', 'features', 'percPerDay', 'autonomDays', 'ahPerDay', 'fridge', 'formPercByDay', 'formAutonomDays', 'formAhPerDay']

  connect() {
    console.log("update controller connected")
    // prospect_other_features_machine_à_café
    this.percPerDayTarget.innerHTML = "<bold>25%</bold>"
    this.autonomDaysTarget.innerHTML = "<bold>3.9 jours</bold>"
    this.ahPerDayTarget.innerHTML = "<bold>17 AH par jour</bold>"
  }
  changeInForm() {
    console.log("Change in form")
    var data = []
    for (const [key, value] of new FormData(this.formTarget)) {
      data.push(value)
    }
    console.log(data)
    // define basic values obje[nb,AJ]
    const capaBaseBattery = 100 //base
    const battery = { 'Plomb': 0.6, 'AGM': 0.7, 'Gel': 0.85, 'Lithium': 0.99 }
    const specsBattery = [12, battery[data[9]] * capaBaseBattery] //capa battery is battery 100AH/j * puissance de charge  battery[data[9]
    const waterPomp = [1, 3] // 1 unit / 3Ah/j
    const led = [1, 7] // 1 unit / 7Ah/j
    const tv = [1, 2] // 1 unit / 2Ah/j
    //declaration 4 non static values
    var fridge = [1, 44]
    var heaterUsage = 0

    // calculate fridge usage
    if (data[5] == "TRIMIXTE") {
      fridge = [1, 5]
    }
    //Solar Pannel calculation
    const solarCharge = data[7] * 0.4 / specsBattery[0]
    console.log(`solair is ${data[7]} et sa charge par heure est ${solarCharge}`)


    //calculate heater usage in Ah/day
    const heaterSpecs = {'ALDE': 10, 'Gasoil': 30, 'Gaz': 45 }
    if (data[15] != undefined && data[15] != ''){
      heaterUsage = heaterSpecs[data[15]] * 6
    }


    //calculate features & additionnal features usage in Ah/day
    const nbFeature = data.length
    var featuresUsage = 0
    const usageHourPerday = 0.5
    // console.log(` ${data[16]}`)


    for (let i = 17; i < (nbFeature); i++) {
      featuresUsage += ((data[i].split('=>')[1]) * usageHourPerday / specsBattery[0])
      // console.log(featuresUsage)
    }

    console.log(`heater usage: ${heaterUsage}`)
    console.log(`specsbatt usage: ${specsBattery }`)
    const usagePerday = (waterPomp[0] * waterPomp[1] + led[0] * led[1] + tv[0] * tv[1] + fridge[1])
    const usagePercPerDay = Math.round((usagePerday / specsBattery[1]) * 100)
    const automDays = Math.round(specsBattery[1] / usagePerday * 10) / 10
    const readableUsagePerday = Math.round(usagePerday * 100) / 100

    // update result display and form value 4 usage % per day
    this.percPerDayTarget.innerHTML = `<bold>${usagePercPerDay}%</bold>`
    this.formPercByDayTarget.value = `${usagePercPerDay}`

    // update result display and form value days of autonomy
    this.autonomDaysTarget.innerHTML = `<bold>${automDays} jours</bold>`
    this.formAutonomDaysTarget.value = `${automDays}`

    // update result display and form value A per Day usage
    this.ahPerDayTarget.innerHTML = `<bold>${readableUsagePerday} AH par jour</bold>`
    this.formAhPerDayTarget.value = `${readableUsagePerday}`

  }



}
