require 'rails_helper'

feature 'games' do

before(:each) do
  player = create(:player)
  player2 = create(:player2)
  sign_up("email@email.com", 'password', 'password')
  click_link('Start Game')
end

  context 'starting a new game' do
    scenario 'it selects a random player' do
      expect(page).to have_content 'Fergus Lemon'
      expect(page).not_to have_content 'Start Game'
    end
  end

  context 'filtering' do

    scenario 'it allows to filter on gender' do
      click_link('Are you a male?')
      expect(page).to have_content('Fergus')
      expect(page).to have_css('#false')
    end

    scenario 'it allows to filter on age' do
      click_link('Are you over 30?')
      expect(page).to have_content('Fergus')
      expect(page).to have_css('#false')
    end
  end

  # context 'winning the game' do
  #   scenario 'a player can win a game' do
  #     page.set_rack_session(random_player_id: player2.name)
  #     expect(page).to have_content('Hello Fergus Lemon test123')
  #   end
  # end
end
