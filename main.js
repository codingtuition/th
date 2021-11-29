img="";
status="";
object=[];
function preload()
{
    song=loadSound();

}
function setup()
{
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(300,300);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="status=detecting object";
}

function modelloaded()
{
    console.log("modelloaded");
    status=true;
    
}

function getresult(error,result)
{
    if(error)
    {
console.log(error);

}
console.log(result);
object=result;

}


function draw()
{
    image(video,0,0,300,300);
    if(status!="");
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video,getresult);
for(i=0;i<object.length;i++)
{
    document.getElementById("status").innerHTML="objects detected";
    fill(r,g,b);
    percent=floor(object[i].confidence*100);
   text(object[i].label+" "+percent+"%",object[i].x+7,object[i].y+15);
   
    noFill();
    stroke(r,g,b);
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
    if(object[i].label=="person")
    {
        document.getElementById("status").innerHTML="babyfound";
        song.stop();
    }
    else{
        document.getElementById("status").innerHTML="babynotfound";
        song.play();
    }
}
    }
   
}

