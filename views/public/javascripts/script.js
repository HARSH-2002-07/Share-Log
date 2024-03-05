var hasRecording = false;
console.log(hasRecording);
const playButton = document.getElementById("playButton");
let chunks = [];
let audioElement;

function startRecording() {
    console.log("rec_started");
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = e => {
                chunks.push(e.data);
            };
            mediaRecorder.start();
        })
        .catch(err => console.error('Error:', err));
}

function saveRecording() {
    console.log("rec_saved");
    mediaRecorder.stop();

    const blob = new Blob(chunks, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    //url = url; // Store the recording URL
    //chunks = [];
}

function playRecording() {
    console.log("playing");
    const blob = new Blob(chunks, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);

    playButton.recordingURL = url;
    if (playButton.recordingURL) { // Check if recording URL is available
        audioElement = new Audio(playButton.recordingURL);
        audioElement.play();
    } else {
        console.error('No recorded audio to play.');
    }
    
}

function rewindRecording() {
    if (audioElement) {
        console.log("rewind");
        audioElement.currentTime -= 5; // Rewind by 5 seconds
    }
}

function forwardRecording() {
    if (audioElement) {
        console.log("forward");
        audioElement.currentTime += 5; // Forward by 5 seconds
    }
}

$(document).ready(function(){
    
    if (!hasRecording) {
        $('.mic-button').click(function() {
            startRecording();
            setTimeout(saveRecording, 20000);
            
            console.log("hello");
            $('#micButton').addClass('hidden');
            $('#playButton, #rewindButton, #forwardButton').removeClass('hidden');
            hasRecording=true;
        });
    } else {
        // If recording exists, show the play button and other controls
        $('#playButton, #rewindButton, #forwardButton').removeClass('hidden');
    }

    // Add functionality to play button, rewind button, and forward button
    $('#playButton').click(function() {
       playRecording();
    });

    $('#rewindButton').click(function() {
        // Logic to rewind recording by 5 seconds
        rewindRecording();
    });

    $('#forwardButton').click(function() {
        // Logic to forward recording by 5 seconds
        forwardRecording();
    });
});
