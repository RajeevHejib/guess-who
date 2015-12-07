require 'rails_helper'
# 1. As a user, so that my profile is added to the game, I want to be able to sign up with my details

feature 'player' do
  context 'no players have been added' do
    scenario 'should display prompt to add player' do
      visit '/players'
      expect(page).to have_content 'No players yet'
      expect(page).to have_link 'Add a player'
    end
  end

  context 'player has been added' do
    before do
      Player.create(name: 'Player 1')
    end

    scenario 'display players'do
      visit '/players'
      expect(page).to have_content('Player 1')
      expect(page).not_to have_content('No players yet')
    end
  end

end
