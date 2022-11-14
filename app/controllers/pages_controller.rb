class PagesController < ApplicationController
  def home; end

  def form
    @email = params.require(:email)
  end

  def mail
    @email = set_email
    redirect_to form_path(params: { email: @email })
  end

  private

  def set_email
    params.required(:mail).permit(:email)[:email]
  end
end
