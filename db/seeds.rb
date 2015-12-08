# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

    player1 = Player.create([{  name: 'Fergus Lemon',
                                gender: 'Male',
                                age: 30,
                                city: 'Manchester',
                                nationality: 'British',
                                no_of_friends: 200,
                                marital_status: 'In a relationship',
                                image_file_name: 'Fergus.jpeg',
                                in_game: false
                              }])
    player2 = Player.create([{
                                name: 'Ivan Sathianathan' ,
                                gender: 'Male',
                                age: 31 ,
                                city: 'London',
                                nationality: 'British',
                                no_of_friends: 250,
                                marital_status: 'Married',
                                image_file_name: 'Ivan.jpeg',
                                in_game: true
                              }])
    player3 = Player.create([{  name: 'Amy Yang' ,
                                gender: 'Female',
                                age: 28 ,
                                city: 'Ulaanbaatar',
                                nationality: 'Mongolian',
                                no_of_friends: 100,
                                marital_status: 'Married',
                                image_file_name: 'Amy.jpeg',
                                in_game: false
                              }])
    player4 = Player.create([{  name: 'Rajeev Hejib' ,
                                gender: 'Male',
                                age: 40,
                                city: 'London',
                                nationality: 'British',
                                no_of_friends: 150,
                                marital_status: 'Married',
                                image_file_name: 'Rajeev.jpeg',
                                in_game: true
                              }])
    player5 = Player.create([{  name: 'Julien Deconinck',
                                gender: 'Male',
                                age: 35,
                                city: 'Paris',
                                nationality: 'French',
                                no_of_friends: 100,
                                marital_status: 'Married',
                                image_file_name: 'Julien.jpeg',
                                in_game: true
                              }])
        player6 = Player.create([{  name: 'Mateja Popovic',
                                gender: 'Male',
                                age: 26,
                                city: 'Belgrade',
                                nationality: 'Serbian',
                                no_of_friends: 100,
                                marital_status: 'Single',
                                image_file_name: 'Mateja.jpeg',
                                in_game: false
                              }])
    player7 = Player.create([{  name: 'Doville Sandaite',
                                gender: 'Female',
                                age: 26,
                                city: 'Vilnus',
                                nationality: 'Lithuanian',
                                no_of_friends: 200,
                                marital_status: 'In a relationship',
                                image_file_name: 'Dovile.jpeg',
                                in_game: true
                              }])
    player8 = Player.create([{  name: 'Rob Stevenson',
                                gender: 'Male',
                                age: 28,
                                city: 'Reading',
                                nationality: 'British',
                                no_of_friends: 500,
                                marital_status: 'In a relationship',
                                image_file_name: 'Rob.jpeg',
                                in_game: true
                                }])
player9 = Player.create([{  name: 'Mari-Ann Meling',
                                gender: 'Female',
                                age: 22,
                                city: 'Stavanger',
                                nationality: 'Norwegian',
                                no_of_friends: 100,
                                marital_status: 'Single',
                                image_file_name: 'Mari-Ann.jpeg',
                                in_game: true
                              }])
