class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.string :gender
      t.integer :age
      t.string :city
      t.string :nationality
      t.integer :no_of_friends
      t.string :marital_status

      t.timestamps null: false
    end
  end
end
