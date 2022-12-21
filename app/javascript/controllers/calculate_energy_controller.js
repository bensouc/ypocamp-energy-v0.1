import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="calculate-energy"
export default class extends Controller {
  static targets = ['form', 'features', 'percPerDaySummer', 'autonomDaysSummer', 'ahPerDaySummer', 'percPerDayWinter', 'autonomDaysWinter', 'ahPerDayWinter', 'fridge', 'formPercByDay', 'formAutonomDays', 'formAhPerDay', 'winterformPercByDay', 'winterformAutonomDays', 'winterformAhPerDay']

  connect() {
    // console.log("update controller connected")

  }

  changeInForm() {
    var dataFeatures = []
    for (const [key, value] of new FormData(this.formTarget)) {
      dataFeatures.push(value)
    }
    const data = Object.fromEntries(new FormData(this.formTarget).entries())

    // console.log(data)
    // define basic values obje[nb,AJ]
    const capaBaseBattery = 100 //base Ah/Day
    const battery = { 'Plomb': 0.6, 'AGM': 0.7, 'Gel': 0.85, 'Lithium': 0.99 }
    const specsBattery = [12, battery[data['prospect[battery]']] * capaBaseBattery] //capa battery is battery 100AH/j * puissance de charge  battery[data[9]
    const waterPomp = [1, 3] // 1 unit / 3Ah/j
    const led = [1, 7] // 1 unit / 7Ah/j
    const tv = [1, 2] // 1 unit / 2Ah/j
    //declaration 4 non static values
    var fridge = [1, 0]
    var heaterUsage = 0

    // calculate fridge usage
    if (data['prospect[fridge]'] == "TRIMIXTE") {
      fridge = [1, 24] // 1 unit / 24Ah/j
    } else if (data['prospect[fridge]'] == "A COMPRESSION") {
      fridge = [1, 144] // 1 unit / 144Ah/j
    }

    //Calculate Solar Pannel values
    var solarCharge = 0
    if (data['prospect[solar]'] != "AUCUN") {
      solarCharge = data['prospect[solar]'] / specsBattery[0] * 0.4
    }
    const summerChargeDuration = 6
    const winterChargeDuration = 4

    // Calculate phoneusage
    const phonesUsage = Math.round(data['prospect[phone]'] * 0.05 * 10) / 10 // 0.05Ah/D per Phone
    const computersUsage = Math.round(data['prospect[computer]'] * 0.52 * 10) / 10   //0.52Ah/J per computer
    const bikesUsage = Math.round(data['prospect[bike]'] * 6 * 10) / 10 // 6Ah/j per Byke


    //calculate heater usage in Ah/day
    const heaterSpecs = { 'ALDE': 10, 'Gasoil': 30, 'Gaz': 45 }
    if (data['prospect[heater_type]'] != undefined && data['prospect[heater_type]'] != '') {
      heaterUsage = Number(heaterSpecs[data['prospect[heater_type]']])  // 6hrs of heater in average
    }

    //calculate features & additionnal features usage in Ah/day
    const nbFeature = dataFeatures.length
    var featuresUsage = 0
    for (let i = 20; i < (nbFeature); i++) {
      if (dataFeatures[i] != '') { featuresUsage += (Number(dataFeatures[i].split('=>')[1])) } //  value in Ah/Day define in feature form collection :XXX Watt * nb hrs a day / by battery voltage)
    }

    // SUMMER CALCULATIONS
    const usageSummerPerday = (featuresUsage + waterPomp[0] * waterPomp[1]
      + led[0] * led[1] + tv[0] * tv[1] + fridge[1]
      + phonesUsage + computersUsage + bikesUsage
    )
    const usageSummerPercPerDay = Math.round(((usageSummerPerday / (specsBattery[1] + (solarCharge * summerChargeDuration))) * 100)) //usage without heater /by battery + solarcharge
    const automSummerDays = Math.round((specsBattery[1] + (solarCharge * summerChargeDuration)) / usageSummerPercPerDay * 10) / 10
    const readableSummerUsagePerday = Math.round(usageSummerPerday * 100) / 100

    // update result form value summer usage per day in % of battery capacity
    this.formPercByDayTarget.value = `${usageSummerPercPerDay}`

    // update resultform value days of autonomy
    this.formAutonomDaysTarget.value = `${automSummerDays}`

    // update result form value A per Day usage
    this.formAhPerDayTarget.value = `${readableSummerUsagePerday}`


    // WINTER CALCULATIONS
    const usageWinterPerday = (heaterUsage + featuresUsage + waterPomp[0] * waterPomp[1] +
      led[0] * led[1] + tv[0] * tv[1] + fridge[1]
      + phonesUsage + computersUsage + bikesUsage
    )
    const usageWinterPercPerDay = Math.round((usageWinterPerday / (specsBattery[1] + (solarCharge * winterChargeDuration))) * 100) //usage without heater /by battery + solarcharge
    const automWinterDays = Math.round((specsBattery[1] + (solarCharge * winterChargeDuration)) / usageWinterPercPerDay * 10) / 10
    const readableWinterUsagePerday = Math.round(usageWinterPerday * 100) / 100

    // update result form value summer usage per day in % of battery capacity
    this.winterformPercByDayTarget.value = `${usageWinterPercPerDay}`

    // update form value days of autonomy
    this.winterformAutonomDaysTarget.value = `${automWinterDays}`

    // update result display and form value A per Day usage
    this.winterformAhPerDayTarget.value = `${readableWinterUsagePerday}`
  }
}
