require 'rails_helper'

feature 'games' do

before(:each) do
  @player = create(:player)
  @player2 = create(:player2)
end

  context 'starting a new game' do
    scenario 'it selects a random player' do
      sign_up("email@email.com", 'password', 'password')
      click_link('Start Game')
      expect(page).to have_content 'Fergus Lemon'
      expect(page).not_to have_content 'Start Game'
    end
  end

  context 'filtering' do

    scenario 'it allows to filter on gender' do
      sign_up("email@email.com", 'password', 'password')
      click_link('Start Game')
      click_link('Are you a male?')
      expect(page).to have_content('Fergus')
      expect(page).to have_css('#false')
    end

    scenario 'it allows to filter on age' do
      sign_up("email@email.com", 'password', 'password')
      click_link('Start Game')
      click_link('Are you over 30?')
      expect(page).to have_content('Fergus')
      expect(page).to have_css('#false')
    end


  end


end
