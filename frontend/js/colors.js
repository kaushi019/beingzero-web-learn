
function change(){
    var r = document.getElementById("one").value;
    var g = document.getElementById("two").value;
    var b = document.getElementById("three").value;
    // console.log(r);console.log(g);console.log(b);
    

    //rgb code css
    var code = "rgb("+r+", "+g+", "+b+")";
    if(r+g+b<=341 || (g==0 && b==0))
        document.getElementById("code").style.color = "white";
    else
        document.getElementById("code").style.color = "black";
    document.getElementById("code").innerHTML = code;



    //labels for r,g,b
    document.getElementById("r").innerHTML = r;
    document.getElementById("g").innerHTML = g;
    document.getElementById("b").innerHTML = b;



    // setcolor
    var red = Number(r).toString(16);
    if(red.length<2)red = "0" + red;

    var green = Number(g).toString(16);
    if(green.length<2)green = "0" + green;

    var blue = Number(b).toString(16);
    if(blue.length<2)blue = "0" + blue;

    setcolor(red,green,blue);

};


function setcolor(red,green,blue){
    document.getElementById("disp").style.backgroundColor = "#"+red+green+blue;
    // x = "#"+red+green+blue;
    // console.log(x)
}