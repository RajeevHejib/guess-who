class GameController < ApplicationController

  include GameHelper

  def new
    current_game.in_game
    redirect_to "/players"
  end

end
