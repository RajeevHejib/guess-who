FactoryGirl.define do
 factory :player do
   name 'Fergus Lemon'
   gender 'Male'
   age 30
   city 'Manchester'
   nationality 'British'
   no_of_friends 200
   marital_status 'In a relationship'
   image_file_name 'Fergus.jpeg'
 end

 # This will use the User class (Admin would have been guessed)
 factory :player2, class: Player do
   name 'Amy Yang'
   gender 'Female'
   age 28
   city 'Ulaanbaatar'
   nationality 'Mongolian'
   no_of_friends 100
   marital_status 'Married'
   image_file_name 'Amy.jpeg'
 end
end
