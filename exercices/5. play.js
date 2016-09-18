// start coding !

F.loadRemote('midi/sml.mid', function(data) {

  midiFile = MidiFile(data)

  F.playMidi(midiFile)
})
