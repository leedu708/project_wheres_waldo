Rails.application.routes.draw do
  
  root 'games#new'

  resources :games, :only => [:new, :create, :show, :update, :index] do
    resources :tags, :only => [:create, :index, :destroy]
    resources :characters, :only => [:index]
  end

  resources :players, :only => [:update]
  
end
