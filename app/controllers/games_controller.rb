class GamesController < ApplicationController

  include GamesHelper
  include PlayersHelper

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
    @player10 = Player.find(10)
    @player11 = Player.find(11)
    @player12 = Player.find(12)
    @player13 = Player.find(13)
    @player14 = Player.find(14)
    @player15 = Player.find(15)
    @player16 = Player.find(16)
    @random_player = Player.find(session[:random_player_id])
  end

  def new
    redirect_to "/games"
  end

  def gender
    @players= Player.all
    @random_player = Player.find(session[:random_player_id])
    @players.each do |player|
      player.update(:in_game => false) unless player.gender == @random_player.gender
    end
    redirect_to '/games'
  end

  def age
    @players= Player.all
    @random_player = Player.find(session[:random_player_id])
    @players.each do |player|
      if @random_player.age > 30
        player.update(:in_game => false) if player.age <= 30
      else
        player.update(:in_game => false) if player.age > 30
      end
    end
    redirect_to '/games'
  end

  def nationality
    @players= Player.all
    @random_player = Player.find(session[:random_player_id])
    @players.each do |player|
      if @random_player.nationality == 'British'
        player.update(:in_game => false) unless player.nationality == 'British'
      else
        player.update(:in_game => false) if player.nationality == 'British'
      end
    end
    redirect_to '/games'
  end


  def single
    @players= Player.all
    @random_player = Player.find(session[:random_player_id])
    @players.each do |player|
      if @random_player.marital_status == 'Single'
        player.update(:in_game => false) unless player.marital_status == 'Single'
      else
        player.update(:in_game => false) if player.marital_status == 'Single'
      end
    end
    redirect_to '/games'
  end

  def restart
    @players= Player.all
    @players.each do |player|
      player.update(:in_game => true)
    end
    @random_player = Player.order("RANDOM()").first
    @random_player_id = @random_player.id
    session[:random_player_id] = @random_player_id
    redirect_to '/games'
  end

  def guess
    @random_player = Player.find(session[:random_player_id])
    @picked_player = Player.find_by_name(params[:games][:name])
    if @random_player.name == @picked_player.name
      flash[:notice] = 'Good guess!'
    else
    flash[:notice] = 'Game over!'
    end
    redirect_to '/games'
  end

end
