require 'rails_helper'
# 1. As a user, so that my profile is added to the game, I want to be able to sign up with my details

feature 'player' do
  context 'no players have been added' do
    scenario 'should display prompt to add player' do
      visit '/players'
      sign_up("email@email.com", 'password', 'password')
      expect(page).to have_link 'Add a player'
    end
  end

end
