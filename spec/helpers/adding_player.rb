def sign_up(email, password, password_confirmation)
  visit('/')
   click_link('Sign up')
   fill_in('Email', with: email)
   fill_in('Password', with: password)
   fill_in('Password confirmation', with: password_confirmation)
   click_button('Sign up')
end

def sign_in(email, password)
  visit('/')
   click_link('Sign in')
   fill_in('Email', with: email)
   fill_in('Password', with: password)
   click_button('Sign in')
end

def create_player
  visit '/players'
  click_link 'Add a player'
  fill_in "Name", with: 'Fergus Lemon'
  page.attach_file 'player[image]', 'spec/support/mona_lisa.jpeg'
  select('Male', from: 'Gender')
  fill_in 'Age', with: 30
  fill_in 'City', with: 'London'
  fill_in 'Nationality', with: 'British'
  fill_in 'No of friends', with: 200
  select('Single', from: 'Marital status')
  click_button 'Create Player'
end

def start_game
  visit '/players'
  click_link 'Start Game'
end
