module GameHelper

    def  current_game
      @current_game ||= Game.new
    end


end
