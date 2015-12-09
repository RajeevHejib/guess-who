class PlayersController < ApplicationController

  include GamesHelper

  def index
    @players = Player.all
    @random_player = Player.order("RANDOM()").first
    @random_player_id = @random_player.id
    session[:random_player_id] = @random_player_id
  end

  def update
    @players= Player.all
    @random_player = Player.find(session[:random_player_id])
    @players.each do |player|
      player.update(:in_game => false) unless player.gender == @random_player.gender
    end

    redirect_to '/games'
  end

  def test
  end

  private

  def player_params
    params.require(:player).permit(:name, :gender, :age, :city, :nationality, :no_of_friends, :marital_status, :image)
  end
end
