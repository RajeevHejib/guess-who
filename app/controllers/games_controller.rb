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



end
