Rails.application.routes.draw do
  get 'homepage/index'
  resources :places
  root 'homepage#index'
  get 'search', to: "places#search"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
