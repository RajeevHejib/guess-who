class PlayersController < ApplicationController

  include GamesHelper

  def index
    @players = Player.all
    @random_player = Player.order("RANDOM()").first
    @random_player_id = @random_player.id
    session[:random_player_id] = @random_player_id
  end

  private

  def player_params
    params.require(:player).permit(:name, :gender, :age, :city, :nationality, :no_of_friends, :marital_status, :image)
  end
end
