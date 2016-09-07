var sampleRate = 44100;

function AudioPlayer(generator, opts) {
    var context = new AudioContext(),
        oscillators = {};

    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then(success, failure);
    }

    function success (midi) {
        var inputs = midi.inputs.values();
        // inputs is an Iterator

        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            // each time there is a midi message call the onMIDIMessage function
            input.value.onmidimessage = onMIDIMessage;
        }
    }

    function failure () {
        console.error('No access to your midi devices.')
    }

    function onMIDIMessage (message) {
        var frequency = midiNoteToFrequency(message.data[1]);

        if (message.data[0] === 144 && message.data[2] > 0) {
            playNote(frequency);
        }

        if (message.data[0] === 128 || message.data[2] === 0) {
            stopNote(frequency);
        }
    }

    function onFrequency (f) {
        if (f > 0) {
            playNote(f);
        } else {
            stopNote(f);
        }
    }

    function midiNoteToFrequency (note) {
        return Math.pow(2, ((note - 69) / 12)) * 440;
    }

    function playNote (frequency) {
        oscillators[frequency] = context.createOscillator();
        oscillators[frequency].frequency.value = frequency;
        oscillators[frequency].connect(context.destination);
        oscillators[frequency].start(context.currentTime);
        // var osc = context.createOscillator();
        // osc.frequency.value = frequency;
        // osc.connect(context.destination);
        // osc.start(context.currentTime);
    }

    function stopNote (frequency) {
        if (!oscillators[frequency]) return;
        oscillators[frequency].stop(context.currentTime);
        oscillators[frequency].disconnect();
    }


    if (!opts) opts = {};
    var latency          = opts.latency || 1;
    var checkInterval    = latency * 100 /* in ms */
    var buffer           = []; /* data generated but not yet written */
    var minBufferLength  = latency * 2 * sampleRate; /* refill buffer when there are only this many elements remaining */
    var bufferFillLength = Math.floor(latency * sampleRate);

    // Stereo
    var channels = 2;
    // Create an empty two second stereo buffer at the
    // sample rate of the AudioContext
    var frameCount = context.sampleRate * 2.0;
    var myAudioBuffer = context.createBuffer(channels, frameCount, context.sampleRate);

    var i, buffer = generator.generate(bufferFillLength);

    while (! generator.finished) {
        for (var channel = 0; channel < channels; channel++) {
            // This gives us the actual ArrayBuffer that contains the data
            var nowBuffering = myAudioBuffer.getChannelData(channel);
            for (var i = 0; i < buffer.length; i++) {
                nowBuffering[i] = buffer[i];
            }
        }
        buffer = generator.generate(bufferFillLength);
    }

    var source = context.createBufferSource();
    source.buffer = myAudioBuffer;
    source.connect(context.destination);
    source.start();

    source.onended = function () {
        context.close();
    }
}