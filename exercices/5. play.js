// start coding !

loadRemote('midi/sml.mid', function(data) {

  midiFile = MidiFile(data)

  playMidi(midiFile)
})
