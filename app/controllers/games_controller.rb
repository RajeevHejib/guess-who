class GamesController < ApplicationController

  def index
    @player1 = Player.find(1)
    @player2 = Player.find(2)
    @player3 = Player.find(3)
    @player4 = Player.find(4)
    @player5 = Player.find(5)
    @player6 = Player.find(6)
    @player7 = Player.find(7)
    @player8 = Player.find(8)
    @player9 = Player.find(9)
  end

end
