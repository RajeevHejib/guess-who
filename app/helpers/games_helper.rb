module GamesHelper

  def  current_game
    @current_game ||= Games.new
  end


  def picked_player
    @picked_player ||= current_game.choose_player
  end

end
