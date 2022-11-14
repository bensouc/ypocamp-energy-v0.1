import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="calculate-energy"
export default class extends Controller {
  static targets = ['form', 'percPerDay', 'autonomDays', 'ahPerDay', 'fridge', 'formPercByDay', 'formAutonomDays', 'formAhPerDay']
  connect() {
    // console.log("update controller connected")
    this.percPerDayTarget.innerHTML = "<bold>84%</bold>"
    this.autonomDaysTarget.innerHTML = "<bold>5 jours</bold>"
    this.ahPerDayTarget.innerHTML = "<bold>1 AH par jour</bold>"
  }

  changeInForm() {
    var data = []
    for (const [key, value] of new FormData(this.formTarget)) {
      data.push(value)
    }
    // console.log(data)
    // console.log(`fridge_type: ${data[3]}`)
    // console.log(`solar: ${data[5]}`)
    // console.log(`battery: ${data[7]}`)
    // console.log(`km: ${data[8]}`)
    // console.log(`phone: ${data[9]}`)
    // console.log(`computer: ${data[10]}`)
    // console.log(`bike: ${data[11]}`)
    // console.log(`heater_type: ${data[13]}`)
    // console.log(`Convertisseur: ${data[15]}`)
    // console.log(`cafe: ${data[16]}`)
    // console.log(`breather: ${data[17]}`)
    // console.log(`hair drayer: ${data[18]}`)
    // console.log(`kitchenaide: ${data[19]}`)
    // console.log(`microwave: ${data[20]}`)

    // define basic value obje[nb,AJ]
    const battery = [12, 67]
    const waterPomp = [1, 3]
    const led = [1, 7]
    const tv = [1, 2]
    //update non static values
    var fridge = [1, 44]
    if (data[3] == "TRIMIXTE") {
      fridge = [1, 5]
    }

    const usagePerday = (waterPomp[0] * waterPomp[1] + led[0] * led[1] + tv[0] * tv[1] + fridge[0] * fridge[1])
    const usagePercPerDay = Math.round((usagePerday / battery[1]) * 100)
    const automDays = Math.round(battery[1] / usagePerday * 10) / 10
    const readableUsagePerday = Math.round(usagePerday * 100) / 100

    // update result display and form value 4 usage % per day
    this.percPerDayTarget.innerHTML = `<bold>${usagePercPerDay}%</bold>`
    this.formPercByDayTarget.value = `${usagePercPerDay}`

    // update result display and form value days of autonomy
    this.autonomDaysTarget.innerHTML = `<bold>${automDays} jours</bold>`
    this.formAutonomDaysTarget.value = `${automDays}`
    console.log(`auton${automDays}`)

    // update result display and form value A per Day usage
    console.log(`usage per day: ${readableUsagePerday}`)

    this.ahPerDayTarget.innerHTML = `<bold>${readableUsagePerday} AH par jour</bold>`
    this.formAhPerDayTarget.value = `${readableUsagePerday}`

  }
}
