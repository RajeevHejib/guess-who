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
    scenario 'it allows to ask questions' do
      sign_up("email@email.com", 'password', 'password')
      click_link('Start Game')
      select('Male', from: 'Gender')
      click_button('Update Player')
      expect(page).to have_content('Fergus')
      expect(page).not_to have_content('Ivan')
    end
  end


end
