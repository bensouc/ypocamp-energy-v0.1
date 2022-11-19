import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="calculate-energy"
export default class extends Controller {
  static targets = ['form', 'features', 'percPerDay', 'autonomDays', 'ahPerDay', 'fridge', 'formPercByDay', 'formAutonomDays', 'formAhPerDay']

  connect() {
    // console.log("update controller connected")
    // prospect_other_features_machine_à_café
    this.element[this.identifier] = this
    this.percPerDayTarget.innerHTML = "<bold>25%</bold>"
    this.autonomDaysTarget.innerHTML = "<bold>3.9 jours</bold>"
    this.ahPerDayTarget.innerHTML = "<bold>17 AH par jour</bold>"
    // this.featuresTargets.forEach(target => {
    //   // console.log(target.id.split('prospect_other_features_')[1] + 'test')
    //   target.innerHTML = target.id.split('prospect_other_features_')[1] + 'test'
    //   // if (target.id.value)
    // })

  }
  changeInForm() {
    var data = []
    for (const [key, value] of new FormData(this.formTarget)) {
      data.push(value)
    }
    console.log(data)
    // console.log(`fridge_type: ${data[5]}`)
    // console.log(`solar: ${data[7]}`)
    // console.log(`battery: ${data[9]}`)
    // console.log(`km: ${data[10]}`)
    // console.log(`phone: ${data[11]}`)
    // console.log(`computer: ${data[12]}`)
    // console.log(`bike: ${data[13]}`)
    // console.log(`heater_type: ${data[15]}`)
    // console.log(`Convertisseur: ${data[17]}`)
    // console.log(`cafe: ${data[18]}`)
    // console.log(`breather: ${data[19]}`)
    // console.log(`hair drayer: ${data[20]}`)
    // console.log(`kitchenaide: ${data[21]}`)
    // console.log(`microwave: ${data[22]}`)

    // define basic values obje[nb,AJ]
    const capaBaseBattery = 100 //base
    const battery = { 'Plomb': 0.6,'AGM':0.7,'Gel':0.85,'Lithium':99.99}
    const specsBattery = [12, battery[data[9]] * capaBaseBattery]
    const waterPomp = [1, 3]
    const led = [1, 7]
    const tv = [1, 2]
    //update non static values
    var fridge = [1, 44]
    // console.log(data)
    if (data[5] == "TRIMIXTE") {
      fridge = [1, 5]
    }
    const nbFeature = data.length
    var featuresUsage = 0
    const usageHourPerday = 5
    console.log(` ${data[16]}`)

    for (let i = 17; i < (nbFeature); i++) {
      featuresUsage += ((data[i].split('=>')[1]) * usageHourPerday / specsBattery[0])
      console.log(featuresUsage)
    }


    const usagePerday = featuresUsage + (waterPomp[0] * waterPomp[1] + led[0] * led[1] + tv[0] * tv[1] + fridge[0] * fridge[1])
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
