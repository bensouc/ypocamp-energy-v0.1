import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="calculate-energy"
export default class extends Controller {
  static targets = ['form', 'features', 'percPerDaySummer', 'autonomDaysSummer', 'ahPerDaySummer', 'percPerDayWinter', 'autonomDaysWinter', 'ahPerDayWinter', 'fridge', 'formPercByDay', 'formAutonomDays', 'formAhPerDay']

  connect() {
    console.log("update controller connected")
    // prospect_other_features_machine_à_café
    this.percPerDaySummerTarget.innerHTML = "<bold>25%</bold>"
    this.autonomDaysSummerTarget.innerHTML = "<bold>3.9 jours</bold>"
    this.ahPerDaySummerTarget.innerHTML = "<bold>17 AH par jour</bold>"
    this.percPerDayWinterTarget.innerHTML = "<bold>25%</bold>"
    this.autonomDaysWinterTarget.innerHTML = "<bold>3.9 jours</bold>"
    this.ahPerDayWinterTarget.innerHTML = "<bold>17 AH par jour</bold>"
  }
  changeInForm() {
    console.log("Change in form")
    var data = []
    for (const [key, value] of new FormData(this.formTarget)) {
      data.push(value)
    }
    console.log(data)
    // define basic values obje[nb,AJ]
    const capaBaseBattery = 100 //base Ah/Day
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
    const solarCharge = data[7] / specsBattery[0] * 0.4
    const summerChargeDuration = 6
    const winterChargeDuration = 4
    console.log(`solair is ${data[7]} et sa charge par heure est ${solarCharge}`)


    //calculate heater usage in Ah/day
    const heaterSpecs = {'ALDE': 10, 'Gasoil': 30, 'Gaz': 45 }
    if (data[15] != undefined && data[15] != ''){
      heaterUsage = data[15] * 6 // 6hrs of heater in average
    }


    //calculate features & additionnal features usage in Ah/day
    const nbFeature = data.length
    var featuresUsage = 0
    // const usageHourPerday = 0.2 // 0.2hrs  of a additionnal features in average
    for (let i = 17; i < (nbFeature); i++) {
      featuresUsage += (data[i].split('=>')[1]) //  value in Ah/Day(XXX Watt * nb hrs a day / by battery voltage)
    }

    // console.log(`heater usage: ${heaterUsage}`)
    // console.log(`specsbatt usage: ${specsBattery }`)
    // SUMMER CALCULATIONS
    const usageSummerPerday = ( featuresUsage + waterPomp[0] * waterPomp[1] + led[0] * led[1] + tv[0] * tv[1] + fridge[1])
    const usageSummerPercPerDay = Math.round(((usageSummerPerday / (specsBattery[1] + (solarCharge * summerChargeDuration))) * 100)) //usage without heater /by battery + solarcharge
    const automSummerDays = Math.round(specsBattery[1] / usageSummerPercPerDay * 10) / 10
    const readableSummerUsagePerday = Math.round(usageSummerPerday * 100) / 100

    this.percPerDaySummerTarget.innerHTML = `<bold>${usageSummerPercPerDay}%</bold>`
    this.formPercByDayTarget.value = `${usageSummerPercPerDay}`

    // update result display and form value days of autonomy
    this.autonomDaysSummerTarget.innerHTML = `<bold>${automSummerDays} jours</bold>`
    this.formAutonomDaysTarget.value = `${automSummerDays}`

    // update result display and form value A per Day usage
    this.ahPerDaySummerTarget.innerHTML = `<bold>${readableSummerUsagePerday} AH par jour</bold>`
    this.formAhPerDayTarget.value = `${readableSummerUsagePerday}`

    // WINTER CALCULATIONS

    const usageWinterPerday = ( heaterUsage + featuresUsage + waterPomp[0] * waterPomp[1] + led[0] * led[1] + tv[0] * tv[1] + fridge[1])
    const usageWinterPercPerDay = Math.round(((usageWinterPerday / (specsBattery[1] + (solarCharge * winterChargeDuration))) * 100)) //usage without heater /by battery + solarcharge
    const automWinterDays = Math.round(specsBattery[1] / usageWinterPercPerDay * 10) / 10
    const readableWinterUsagePerday = Math.round(usageWinterPerday * 100) / 100

    this.percPerDayWinterTarget.innerHTML = `<bold>${usageWinterPercPerDay}%</bold>`
    // this.formPercByDayTarget.value = `${usagePercPerDay}`

    // update result display and form value days of autonomy
    this.autonomDaysWinterTarget.innerHTML = `<bold>${automWinterDays} jours</bold>`
    // this.formAutonomDaysTarget.value = `${automWinterDays}`

    // update result display and form value A per Day usage
    this.ahPerDayWinterTarget.innerHTML = `<bold>${readableWinterUsagePerday} AH par jour</bold>`
    // this.formAhPerDayTarget.value = `${readableWinterUsagePerday}`

  }



}
