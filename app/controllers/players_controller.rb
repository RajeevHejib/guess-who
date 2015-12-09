class PlayersController < ApplicationController

  include GamesHelper

  def index
    @players = Player.all
    @random_player = Player.order("RANDOM()").first
    @random_player_id = @random_player.id
    session[:random_player_id] = @random_player_id
  end



  # def new
  #   @player = Player.new
  # end
  #
  # def create
  #   @player = Player.create(player_params)
  #   redirect_to '/players'
  # end
  #
  #
  #
  # def update
  #   @players= Player.all
  #   @players.each do |player|
  #     player.update(:in_game => false) unless picked_player.gender == player_params["gender"]
  #   end
  #
  #   # @players= Player.where(gender: player_params["gender"])
  #   #   @players= Player.all
  #   #   # else
  #   #   # @players = Player.filter(params.slice(:gender => @gender_param))
  #   #   p @players
  #   # end
  #   redirect_to '/games'
  # end
  #
  # private
  #
  # def player_params
  #   params.require(:player).permit(:name, :gender, :age, :city, :nationality, :no_of_friends, :marital_status, :image)
  # end
end
