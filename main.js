camera = document.getElementById("camera");
Webcam.attach('#camera');

prediction_1 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTMl = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/h9E9sHA7l/', modelLoaded);

function modelLoaded()
{
    console.log('model loaded!');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction Is" + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;

        prediction_1 = results[0].label;
        speak();

        if (results[0].label == "hand raised")
        {
            document.getElementById("update_emoji").innerHTML = "&#9995;";
        }

        if (results[0].label == "victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }

        if (results[0].label == "finger up")
        {
            document.getElementById("update_emoji").innerHTML = "&#128070;";
        }

        if (results[1].label == "amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }

        if (results[1].label == "thumbs up")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if (results[1].label == "thumbs down")
        {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }

        if (results[1].label == "clap")
        {
            document.getElementById("update_emoji").innerHTML = "&#128079;";
        }
    }
}