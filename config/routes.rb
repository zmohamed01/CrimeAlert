Rails.application.routes.draw do
  devise_for :model
  resources :locations do
    resources :comments
  end
  get 'homepage/index'
  resources :places
  root 'homepage#index'
  resources :reports
  get 'police/index'
  get 'news/index'
  resources :contacts, only: [:new, :create]
  get 'search', to: "places#search"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end