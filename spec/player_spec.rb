describe Player do

  subject(:player) { described_class.new }

  xit 'generates a random player' do
    allow(player).to receive(:randomizer).and_return()
  end
end
