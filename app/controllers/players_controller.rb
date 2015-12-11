class PlayersController < ApplicationController


  def index
    @players = Player.all
    @random_player = Player.randomizer
    @random_player_id = @random_player.id
    session[:random_player_id] = @random_player_id
  end
end
