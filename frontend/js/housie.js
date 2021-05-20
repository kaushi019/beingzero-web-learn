
var numbers = [];
for(let i=1;i<=90;i++)numbers.push(i);

function display(){


    var t = "<tr>", x = "";

    for(let i=1;i<=90;i++){
        if(i%10==0){
            x += "<td align='center' id='"+i+"' >"+i+"</td>";
            t+=x;
            t+="</tr>"
            if(i!=90)t +="<tr>";
            x = "";
        }
        else x += "<td align='center' id='"+i+"'  >"+i+"</td>";
    }
    
    $("#board").css({
        "background-color" : "white",
    })
    $('td').css('border','2px solid black')
    $("#board").html(t);

}


function addNum(n){
    var s = getColor();
    console.log(n)
    console.log(s)

    $('#'+n).css({
        "background-color" : s
    });
}

function getColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i=0;i<6;i++){
      color += letters[ Math.floor(Math.random() * 16) ];
    }
    return color;
}


$(document).ready(()=>{

    display();


    $("#start").click(()=>{


        var time = setInterval(()=>{

            if(numbers.length==0){
                alert("Game is Completed !!");
                alert("Press Clear Board, to start a New Game")
                clearInterval(time);
            }
    
            var n = numbers[ Math.floor(Math.random()*numbers.length) ]
            if(numbers.includes(n)){
                $('#numtext').html(n);
                var ind = numbers.indexOf(n);
                numbers.splice(ind,1);
                
                addNum(n.toString());
    
            }

        }, 2500);


    })


    $("#clear").click(()=>{

        for(let i=1;i<=90;i++)numbers.push(i);
        $('#numtext').html('');
        $('td').css({
            "background-color" : "white"
        });

    })


})