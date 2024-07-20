let highScore=0;
let level=0;
let numClick=-1;
let userPattern=[];
let correctPattern=[];

let possible_Color=["red","green","blue","yellow"];

//Adding events to the Buttons we have made
function playAudio(color)
{
    let path =`sounds/${color}.mp3`;
    //using string interpolation to generate the sound

    let audio=new Audio(path);
    audio.play();
}
$(".button").click(function(ele)
{
    numClick++;
    let color=ele.target.id;
    playAudio(color);
    clickAnimation("#"+color);
    checkAnswer(color);
   
})

function checkAnswer(color)
{
    userPattern.push(color);
    if(color==correctPattern[numClick]) 
    {
        if(userPattern.length==correctPattern.length)
        {
            setTimeout(function()
        {
            numClick=-1;
            userPattern=[];
            nextSequence();

        },1000);
         
           
        }
    }

    //agar wrong pattern hogya tab game over hoga
    else{
        $("h2").text("Game Over !Start Again");
        correctPattern=[];
        userPattern=[];

        if(level>highScore)
        {
            highScore=level;
            $("#highscore").text(level);
        }
        level=0;
        numClick=-1;
        playAudio("wrong");
    }
}
function nextSequence()
{
    level++;
    $("#level").text(level);
    let rand=Math.floor(Math.random()*4);
    let color=possible_Color[rand];
    correctPattern.push(color);
    // alert(correctPattern);

    playAudio(color);
    //Adding Animation to the Button that are clicked

    clickAnimation("#" +color);
}
function clickAnimation(id)
{
    $(id).fadeOut(100).fadeIn(100);
}
//key or Button press karne pe functionality aayegi
$(document).keydown(function()
{
    if(level<=0)
    {
        // document.querySelector("h2").innerText="The Game Begin";   
        // we can do the above thing using jQuery as Well 
        $("h2").text("The Game Begins");
        nextSequence();
    }
})