# require "hubspot-api-client"

class ResultsController < ApplicationController
  def show
    @prospect = set_params

    api_client = Hubspot::Client.new(access_token: ENV['API_BEARER_TOKEN'] )
    properties = {
                  "email": "#{@prospect[:email]}",
                  "firstname": "test prénom",
                  "lastname": "test",
                  'batterie': "#{@prospect[:battery]}"
    }
    body = { properties: properties }
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
