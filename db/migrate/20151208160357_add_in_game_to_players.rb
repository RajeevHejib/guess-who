class AddInGameToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :in_game, :boolean
  end
end
