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
      expect(page).not_to have_content('No players yet!')
    end
  end

  context 'creating players' do
    scenario 'prompts player to fill out a form, then displays player details' do
      visit '/players'
      click_link 'Add a player'
      fill_in "Name", with: 'Player 1'
      fill_in 'Gender', with: "M"
      fill_in 'Age', with: 30
      fill_in 'City', with: 'London'
      fill_in 'Nationality', with: 'British'
      fill_in 'No of friends', with: 200
      fill_in 'Marital status', with: true
      click_button 'Create Player'
      expect(page).to have_content 'Player 1'
      expect(current_path).to eq '/players'
    end
  end
  
  feature "User can sign in and out" do
   context "user not signed in and on the homepage" do
     it "should see a 'sign in' link and a 'sign up' link" do
       visit('/')
       expect(page).to have_link('Sign in')
       expect(page).to have_link('Sign up')
     end

     it "should not see 'sign out' link" do
       visit('/')
       expect(page).not_to have_link('Sign out')
     end
   end

   context "user signed in on the homepage" do
     before do
       visit('/')
       click_link('Sign up')
       fill_in('Email', with: 'test@example.com')
       fill_in('Password', with: 'testtest')
       fill_in('Password confirmation', with: 'testtest')
       click_button('Sign up')
     end

     it "should see 'sign out' link" do
       visit('/')
       expect(page).to have_link('Sign out')
     end

     it "should not see a 'sign in' link and a 'sign up' link" do
       visit('/')
       expect(page).not_to have_link('Sign in')
       expect(page).not_to have_link('Sign up')
     end
   end
  end


end
