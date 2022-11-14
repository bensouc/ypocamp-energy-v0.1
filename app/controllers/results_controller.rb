class ResultsController < ApplicationController


  def show
    @prospect = set_params
  end

  private

  def set_params
    params.required(:prospect)
  end
end
