require 'rails_helper'

feature 'games' do

before(:each) do
  sign_up("email@email.com", 'password', 'password')
  click_link('?')
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


    scenario 'it allows to filter on nationality' do
      click_link('Are you British?')
      expect(page).to have_content('Fergus')
      expect(page).to have_css('#false')
    end

    scenario 'it allows to filter on marital status' do
      click_link('Are you single?')
      expect(page).to have_content('Fergus')
      expect(page).to have_css('#false')
    end

    scenario 'it allows user to reset game' do
      click_link('Restart the game')
      expect(page).not_to have_css('#false')
      expect(page).to have_css('#true')
    end

  end

  context 'winning the game' do
      given!(:player2) { create(:player2, name: 'Amy Yangs') }
      scenario 'a player can win a game' do
      page.set_rack_session(random_player_id: player2.id)
      visit '/games'
      select('Amy Yangs', from: 'games_name')
      click_button('Submit')
      expect(page).to have_content('Amy Yangs')
      expect(page).not_to have_content('Fergus')
      # expect(page.get_rack_session_key('random_player_id')).to eq(189)
    end
  end
end
