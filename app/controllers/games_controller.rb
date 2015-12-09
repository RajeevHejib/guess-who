class GamesController < ApplicationController

  include GamesHelper

  def view
    @player1 = Player.find(1)
    @player2 = Player.find(2)
    @player3 = Player.find(3)
    @player4 = Player.find(4)
    @player5 = Player.find(5)
    @player6 = Player.find(6)
    @player7 = Player.find(7)
    @player8 = Player.find(8)
    @player9 = Player.find(9)
    @random_player = Player.find(session[:random_player_id])
  end

  def new
    redirect_to "/games"
  end

  def gender
    redirect_to "/gender"

  end


end
