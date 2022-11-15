class ResultsController < ApplicationController
  def show
    @prospect = set_params
  end

  private

  def set_params
    out = params.required(:prospect).permit(
      :email, :perc_by_day, :autonom_days,
      :ah_per_day, :fridge,
      :solar, :battery, :kms, :phone,
      :computer, :bike, :heater_type
    )
    out.merge!(other_features: params.required(:prospect).required(:other_features))
  end
end
