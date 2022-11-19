class ResultsController < ApplicationController
  def show

    @prospect = set_params
    # raise
  end

  private

  def set_params
    params.required(:prospect).permit(
      :email, :perc_by_day, :autonom_days,
      :ah_per_day, :fridge,
      :solar, :battery, :kms, :phone,
      :computer, :bike, :heater_type, other_features: []
    )
  end
end
