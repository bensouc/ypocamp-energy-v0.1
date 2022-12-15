import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="calculate-energy"
export default class extends Controller {
  static targets = ['form', 'features', 'percPerDaySummer', 'autonomDaysSummer', 'ahPerDaySummer', 'percPerDayWinter', 'autonomDaysWinter', 'ahPerDayWinter', 'fridge', 'formPercByDay', 'formAutonomDays', 'formAhPerDay', 'winterformPercByDay', 'winterformAutonomDays', 'winterformAhPerDay']

  connect() {
    // console.log("update controller connected")
    // prospect_other_features_machine_à_café
    // this.percPerDaySummerTarget.innerHTML = "<bold>25%</bold>"
    // this.autonomDaysSummerTarget.innerHTML = "<bold>3.9 jours</bold>"
    // this.ahPerDaySummerTarget.innerHTML = "<bold>17 AH par jour</bold>"
    // this.percPerDayWinterTarget.innerHTML = "<bold>25%</bold>"
    // this.autonomDaysWinterTarget.innerHTML = "<bold>3.9 jours</bold>"
    // this.ahPerDayWinterTarget.innerHTML = "<bold>17 AH par jour</bold>"
  }
  changeInForm() {
    // console.log("Change in form")
    var dataFeatures = []
    for (const [key, value] of new FormData(this.formTarget)) {
      dataFeatures.push(value)
    }
    const data = Object.fromEntries(new FormData(this.formTarget).entries())
    console.log(dataFeatures)

    // console.log(data)
    // define basic values obje[nb,AJ]
    const capaBaseBattery = 100 //base Ah/Day
    const battery = { 'Plomb': 0.6, 'AGM': 0.7, 'Gel': 0.85, 'Lithium': 0.99 }
    const specsBattery = [12, battery[data['prospect[battery]']] * capaBaseBattery] //capa battery is battery 100AH/j * puissance de charge  battery[data[9]
    // console.log(`battery is  ${data[9]} Type and its capa is ${battery[data[9]]} *100 Ah/D`)
    const waterPomp = [1, 3] // 1 unit / 3Ah/j
    const led = [1, 7] // 1 unit / 7Ah/j
    const tv = [1, 2] // 1 unit / 2Ah/j
    //declaration 4 non static values
    var fridge = [1, 0]
    var heaterUsage = 0

    // calculate fridge usage
    if (data['prospect[fridge]'] == "TRIMIXTE") {
      fridge = [1, 5]
    } else if (data['prospect[fridge]'] == "A COMPRESSION") {
      fridge = [1, 44]
    }
    // console.log(`fridge is ${data[5]} and a ${fridge[1]} Ah/D`)

    //Solar Pannel calculation
    const solarCharge = data['prospect[solar]'] / specsBattery[0] * 0.4
    const summerChargeDuration = 6
    const winterChargeDuration = 4
    // console.log(`solair is ${data['prospect[solar]']} et sa charge par heure est ${solarCharge}`)

    // Calculate phoneusage
    const phonesUsage = Math.round(data['prospect[phone]'] * 0.1 * 10) / 10 //3.6W en charge 220V *6h=> 0.1Ah/D
    const computersUsage = Math.round(data['prospect[computer]'] * ((75 / 220) * 6) * 10) / 10   // 75W computer tablette pour 6h
    const bikesUsage = Math.round(data['prospect[bike]'] * ((504 / 220) * 6) * 10) / 10 // 504Wh pour 6h
    // console.log( phonesUsage + computersUsage + bikesUsage)

    //calculate heater usage in Ah/day
    // const heaterSpecs = {'ALDE': 10, 'Gasoil': 30, 'Gaz': 45 }
    if (data['prospect[heater_type]'] != undefined && data['prospect[heater_type]'] != '') {
      heaterUsage = Number(data['prospect[heater_type]'])  // 6hrs of heater in average
    }
    // console.log(`heaterusage is ${data[15]} per Hour=> ${heaterUsage}Ah/d`)

    //calculate features & additionnal features usage in Ah/day
    const nbFeature = dataFeatures.length
    var featuresUsage = 0
    for (let i = 21; i < (nbFeature); i++) {
      featuresUsage += (Number(dataFeatures[i].split('=>')[1])) //  value in Ah/Day( define in from collection :XXX Watt * nb hrs a day / by battery voltage)
    }
    // console.log(`featuresUsage is ${featuresUsage} perday`)

    // SUMMER CALCULATIONS
    const usageSummerPerday = (featuresUsage + waterPomp[0] * waterPomp[1]
      + led[0] * led[1] + tv[0] * tv[1] + fridge[1]
      + phonesUsage + computersUsage + bikesUsage
    )
    const usageSummerPercPerDay = Math.round(((usageSummerPerday / (specsBattery[1] + (solarCharge * summerChargeDuration))) * 100)) //usage without heater /by battery + solarcharge
    const automSummerDays = Math.round((specsBattery[1] + (solarCharge * summerChargeDuration)) / usageSummerPercPerDay * 10) / 10
    const readableSummerUsagePerday = Math.round(usageSummerPerday * 100) / 100
    // update result display and form value summer usage per day in % of battery capacity
    this.percPerDaySummerTarget.innerHTML = `<bold>${usageSummerPercPerDay}%</bold>`
    this.formPercByDayTarget.value = `${usageSummerPercPerDay}`
    // console.log(`usageSummerPercPerDay is ${usageSummerPercPerDay} % of battery capacity`)

    // update result display and form value days of autonomy
    this.autonomDaysSummerTarget.innerHTML = `<bold>${automSummerDays} jours</bold>`
    this.formAutonomDaysTarget.value = `${automSummerDays}`
    // console.log(`automSummerDays is ${automSummerDays} Days of autonomy`)

    // update result display and form value A per Day usage
    this.ahPerDaySummerTarget.innerHTML = `<bold>${readableSummerUsagePerday} AH par jour</bold>`
    this.formAhPerDayTarget.value = `${readableSummerUsagePerday}`
    // console.log(`readableSummerUsagePerday is ${readableSummerUsagePerday} Ah/Day, solar charging included`)


    // WINTER CALCULATIONS

    const usageWinterPerday = (heaterUsage + featuresUsage + waterPomp[0] * waterPomp[1] +
      led[0] * led[1] + tv[0] * tv[1] + fridge[1]
      + phonesUsage + computersUsage + bikesUsage
    )
    const usageWinterPercPerDay = Math.round((usageWinterPerday / (specsBattery[1] + (solarCharge * winterChargeDuration))) * 100) //usage without heater /by battery + solarcharge
    const automWinterDays = Math.round((specsBattery[1] + (solarCharge * winterChargeDuration)) / usageWinterPercPerDay * 10) / 10
    const readableWinterUsagePerday = Math.round(usageWinterPerday * 100) / 100

    this.percPerDayWinterTarget.innerHTML = `<bold>${usageWinterPercPerDay}%</bold>`
    this.winterformPercByDayTarget.value = `${usageWinterPercPerDay}`
    
    // console.log(`usageWinterPercPerDa is ${usageWinterPercPerDay} % `)

    // update result display and form value days of autonomy
    this.autonomDaysWinterTarget.innerHTML = `<bold>${automWinterDays} jours</bold>`
    this.winterformAutonomDaysTarget.value = `${automWinterDays}`

    // update result display and form value A per Day usage
    this.ahPerDayWinterTarget.innerHTML = `<bold>${readableWinterUsagePerday} AH par jour</bold>`
    this.winterformAhPerDayTarget.value = `${readableWinterUsagePerday}`

  }



}
