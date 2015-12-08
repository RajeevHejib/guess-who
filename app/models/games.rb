# require_relative 'player'

class Games
  attr_reader :started

  def initialize
    @started = false
  end

  def in_game
    @started = true
  end

  def choose_player
    Player.order("RANDOM()").first
  end

end
