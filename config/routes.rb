Rails.application.routes.draw do

  root :to => 'pages#index'
  
  get '/books' => 'pages#books'
  get '/maps' => 'pages#maps'

  get '/auth/:provider/callback' => 'sessions#create'
  get '/signin' => 'sessions#new', :as => :signin
  get '/signout' => 'sessions#destroy', :as => :signout
  get '/auth/failure' => 'sessions#failure'
  get '/auth/:provider/callback' => 'sessions#create'
end
