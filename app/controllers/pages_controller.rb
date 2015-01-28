class PagesController < ApplicationController
  def index
  	auth = @auth

  	respond_to do |format|
      format.html
    end
  end

  def maps
  	auth = @auth

  	respond_to do |format|
      format.html
    end
  end

  def books
  	auth = @auth
    user = User.where(:provider => auth['provider'],
                      :uid => auth['uid'].to_s).first
  	respond_to do |format|
      format.html
    end
  end
end
