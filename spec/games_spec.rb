require 'spec_helper'
require_relative '../app/models/games'
describe Games do

  subject(:games) {described_class.new}

  let(:player) {double(:player, first: :player)}

  it 'starts the game at initialization' do
    expect(games.started).to eq(false)
  end

  it 'randomly picks a player' do
    expect(games).to respond_to(:choose_player)
  end

end
