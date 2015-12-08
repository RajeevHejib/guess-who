require 'rails_helper'

feature 'game' do
  
  context 'starting a new game' do
    scenario 'it selects a random player' do
      sign_up("email@email.com", 'password', 'password')
      create_player
      click_link('Start Game')
      expect(page).to have_content 'Player 1'
      expect(page).not_to have_content 'Start Game'
    end
  end
end
