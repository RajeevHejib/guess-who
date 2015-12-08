class Game
  attr_reader :started

  def initialize
    @started = false
  end

  def in_game
    @started = true
  end

end
