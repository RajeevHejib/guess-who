class GamesController < ApplicationController

  include GamesHelper
  include PlayersHelper

  def view
    @players = Player.order(:created_at)
    @random_player = Player.find(session[:random_player_id])
  end

  def new
    redirect_to "/games"
  end

  def gender
    @players = Player.order(:created_at)
    @random_player = Player.find(session[:random_player_id])
    @players.each do |player|
      player.update(:in_game => false) unless player.gender == @random_player.gender
    end
    redirect_to '/games'
  end

  def age
    @players = Player.order(:created_at)
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
    @players = Player.order(:created_at)
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
    @players = Player.order(:created_at)
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
    @players = Player.order(:created_at)
    @players.each do |player|
      player.update(:in_game => true)
    end
    @random_player = Player.randomizer
    @random_player_id = @random_player.id
    session[:random_player_id] = @random_player_id
    redirect_to '/games'
  end

  def guess
    @random_player = Player.find(session[:random_player_id])
    @picked_player = Player.find_by_name(params[:games][:name])
    p params[:games][:name]
    if @random_player.name == @picked_player.name
      redirect_to '/congratulations'
    else
      redirect_to '/unlucky'
    end
  end

  def congratulations
    @random_player = Player.find(session[:random_player_id])
    render 'congratulations'
  end

  def unlucky
    @random_player = Player.find(session[:random_player_id])
    render 'unlucky'
  end

end
