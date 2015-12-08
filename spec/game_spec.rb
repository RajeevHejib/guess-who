require 'spec_helper'
require_relative '../app/models/game'
describe Game do

  subject(:game) {described_class.new}

  it 'starts the game at initialization' do
    expect(game.started).to eq(false)
  end


end
