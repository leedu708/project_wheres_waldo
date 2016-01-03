# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Image.delete_all
Character.delete_all
ImageCharacter.delete_all
Tag.delete_all
Player.delete_all

puts "Old entries deleted."

i = Image.new
i.name = "Image Name"

i.save!

CHARACTERS = ["Waldo", "Wenda", "Odlaw", "Wizard Whitebeard", "Woof"]

CHARACTERS.each do |name|
  c = Character.new
  c.name = name
  c.images << i
  c.save!
end

puts "Characters created."

p = Player.new
p.name = "player"
p.save!

puts "Player created."

puts "Complete!"