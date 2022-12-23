# frozen_string_literal: true

# Send via Huspot API all energy calculation
class ResultsController < ApplicationController
  def show
    @prospect = set_params
    body = create_body(@prospect)
    # send_prospect(@prospect, body)
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

  def create_body(prospect)
    features_spec = { 'Convertisseur' => 440,
      'Machine à café' => 1000,
      'Respirateur' => 500,
      'Sèche-cheveux' => 1400,
      'Robot Cuisine' => 1550, # 1550W => 7Ah/D (220V), in average 20mins => 2.3
      'Micro-onde' => 900 }
      other_features = ''
      # Create propertie for user created features AND Basic features
    prospect[:other_features].map do |feature|
      next if feature.nil? || feature.empty?

      feature_name = feature.split('=>')[0] # Get feature name
      if features_spec[feature_name].nil? # if feature_name is nil <=> not in the features_spec Hash
        other_features += "#{feature.split('=>')[0]}-#{(feature.split('=>')[1].to_f * 220).fdiv(10.to_f.fdiv(60)).round / 10 * 10}Watts\n" # // W / 220V => Ah/D *10min (in average)
      else # Get the Watts from features_spec Hash
        other_features += "#{feature_name}-#{features_spec[feature_name]}Watts\n"
      end
    end
    properties = {
      "email": prospect[:email].to_s,
      "consommation_journaliere__ah_jr____ete": prospect[:ah_per_day].to_s,
      "autonomie___ete__jrs_": prospect[:autonom_days].to_s,
      "consommation_journaliere__en_____ete": prospect[:perc_by_day].to_s,
      "consommation_journaliere__ah_jr____hiver": prospect[:winter_ah_per_day].to_s,
      "consommation_journaliere__en_____hiver": prospect[:winter_perc_by_day].to_s,
      "autonomie___hiver__jrs_": prospect[:winter_autonom_days].to_s,
      "batterie": prospect[:battery].to_s,
      "distance_journaliere": prospect[:kms].to_s,
      "panneau_solaire": prospect[:solar].to_s,
      "type_de_chauffage": prospect[:heater_type].to_s,
      "refrigerateur": prospect[:fridge].to_s,
      "telephone": prospect[:phone].to_s,
      "ordinateur": prospect[:computer].to_s,
      "velo": prospect[:bike].to_s,
      "cree_via_le_calculateur": true
    }
    properties.merge!({ autres_appareils: other_features }) unless other_features.nil? # || other_features.empty?
    { properties: properties }
  end

  def send_prospect(prospect, body)
    api_client = Hubspot::Client.new(access_token: ENV['API_BEARER_TOKEN'])
    contact = api_client.crm.contacts.basic_api.create(body: body, &:code)
    return unless contact == 409

    api_client = Hubspot::Client.new(access_token: ENV['API_BEARER_TOKEN'])
    api_client.crm.contacts.basic_api.update(contact_id: prospect[:email].to_s, id_property: 'email', body: body, &:message)
  end
end
