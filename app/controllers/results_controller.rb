# require "hubspot-api-client"

class ResultsController < ApplicationController
  def show
    @prospect = set_params
    other_features = ""
    @prospect[:other_features].map do |feature|
      unless feature.nil? || feature.empty?
        other_features += "#{feature.split('=>')[0]}-#{feature.split('=>')[1]}Watts\n"
      end
    end
    properties = {
                                         "email": @prospect[:email].to_s,
              "consommation_journaliere__ah_jr_": @prospect[:ah_per_day].to_s,
                          "atonomie___ete__jrs_": @prospect[:autonom_days].to_s,
          "consommation_journaliere__en_____ete": @prospect[:perc_by_day].to_s,
      "consommation_journaliere__ah_jr____hiver": @prospect[:winter_ah_per_day].to_s,
        "consommation_journaliere__en_____hiver": @prospect[:winter_perc_by_day].to_s,
                        "atonomie___hiver__jrs_": @prospect[:winter_autonom_days].to_s,
                                      "batterie": @prospect[:battery].to_s,
                           "distance_jounaliere": @prospect[:kms].to_s,
                               "panneau_solaire": @prospect[:solar].to_s,
                               "type_de_chauffage": @prospect[:heater_type].to_s,
                                 "refrigerateur": @prospect[:fridge].to_s,
                                     "telephone": @prospect[:phone].to_s,
                                    "ordinateur": @prospect[:computer].to_s,
                                          "velo": @prospect[:bike].to_s,
                       "cree_via_le_calculateur": true
    }
    properties.merge!({ autres_appareils: other_features }) unless other_features.nil? || other_features.empty?
    body = { properties: properties }

    # autres_appareils = {autres_appareils :}

    api_client = Hubspot::Client.new(access_token: ENV["API_BEARER_TOKEN"])
    contact = api_client.crm.contacts.basic_api.create(body: body) { |error| error.code }
    if contact == 409
      api_client = Hubspot::Client.new(access_token: ENV["API_BEARER_TOKEN"])
      # get_by_id(contact_id: email, id_property: "email", archived: false)
      api_client.crm.contacts.basic_api.update(contact_id: "#{@prospect[:email]}", id_property: "email", body: body) { |error| error.message }
    end
  end

  private

  def set_params
    params.required(:prospect).permit(
      :email,
      :perc_by_day, :autonom_days, :ah_per_day,
      :winter_perc_by_day, :winter_autonom_days, :winter_ah_per_day,
      :fridge,
      :solar, :battery, :kms, :phone,
      :computer, :bike, :heater_type, other_features: [],
    )
  end
end
