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
  fill_in "Name", with: 'Player 1'
  page.attach_file 'player[image]', 'spec/support/mona_lisa.jpeg'
  fill_in 'Gender', with: "M"
  fill_in 'Age', with: 30
  fill_in 'City', with: 'London'
  fill_in 'Nationality', with: 'British'
  fill_in 'No of friends', with: 200
  fill_in 'Marital status', with: true
  click_button 'Create Player'
end
