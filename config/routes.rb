Rails.application.routes.draw do
  get 'results/calculate'
  get 'results/show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "pages#home"
  get "/form", to: "pages#form"
  post "/mail", to: "pages#mail"
  get "calculate", to: "results#show"
end
