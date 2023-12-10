song = ""
leftWristX = 0
rigtWristX = 0
leftWristY = 0
rightWristY = 0
scoreLeftWrist = 0
function preload(){
 song = loadSound("music.mp3")
}
function setup(){
canvas = createCanvas(600, 500)
canvas.center()
video = createCapture(VIDEO)
video.hide()
poseNet = ml5.poseNet(video, modelLoaded)
poseNet.on('poses', gotPoses)
}
function modelLoaded(){
    console.log("Model has been loaded.")
}
function draw(){
    image(video, 0, 0, 600, 500)

    fill(255, 0, 0)
    stroke(255, 0, 0)
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20)
        inNumberLeftWristY = Number(leftWristY)
        remove_decimals = floor(inNumberLeftWristY)
        volume = remove_decimals/500
        document.getElementById("volume").innerHTML = "volume"+volume;
        song.setVolume(volume)
    }
    
}
function play(){
   song.play()
   song.setVolume(1)
   song.rate(1)
   
   
}
function gotPoses(results){
    if(results.length>0){
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist"+scoreLeftWrist)
        console.log("leftWristX"+leftWristX+"leftWristY"+leftWristY)

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX"+rightWristX+"rightWristY"+rightWristY)
    }
}