Rails.application.routes.draw do
  resources :locations
  get 'homepage/index'
  resources :places
  devise_for :users
  root 'home#home'
  #root 'homepage#index'
  resources :reports
  get 'police/index'
  resources :contacts, only: [:new, :create]
  get 'search', to: "places#search"
# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
