require 'rails_helper'
# 1. As a user, so that my profile is added to the game, I want to be able to sign up with my details

feature 'player' do
  context 'no players have been added' do
    scenario 'should display prompt to add player' do
      visit '/players'
      sign_up("email@email.com", 'password', 'password')
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
      expect(page).not_to have_content('No players yet!')
    end
  end

  context 'creating players' do
    scenario 'prompts player to fill out a form, then displays player details' do
      visit '/players'
      sign_up("email@email.com", 'password', 'password')
      click_link 'Add a player'
      fill_in "Name", with: 'Player 1'
      page.attach_file 'player[image]', 'spec/support/mona_lisa.jpeg'
      fill_in 'Gender', with: "M"
      fill_in 'Age', with: 30
      fill_in 'City', with: 'London'
      fill_in 'Nationality', with: 'British'
      fill_in 'No of friends', with: 200
      fill_in 'Marital status', with: true
      click_button 'Create Player'
      expect(page).to have_content 'Player 1'
      expect(current_path).to eq '/players'
      expect(page).to have_selector("img")
    end
  end

end
