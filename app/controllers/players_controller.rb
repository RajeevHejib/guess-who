class PlayersController < ApplicationController

  def index
    @players = Player.all
    @player = Player.find(1)
  end

  def new
    @player = Player.new
  end

  def create
    @player = Player.create(player_params)
    redirect_to '/players'
  end

  def player_params
    params.require(:player).permit(:name, :gender, :age, :city, :nationality, :no_of_friends, :marital_status, :image)
  end

end
