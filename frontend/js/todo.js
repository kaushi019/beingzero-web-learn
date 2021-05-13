$(document).ready(()=>{

    // localStorage.clear()
    if(localStorage !== null)check();

    var a = "";
    var bk = [];

    $("#add-btn").click(()=>{
        a = $("#name").val();

        if(a.length == 0)alert("Enter the Task")
        else addValue()

    });


    



    function addValue(){
        var r = ascii(a);
        console.log(r)

        var t = "<tr id='t"+r+"'><td>"+a+"</td><td><button class='btn btn-secondary btn-sm' id='b"+r+"'>Done</button></td></tr>";

        var ts = Math.floor(Date.now()/1000);
        var date = new Date(ts)
        var x = date.getTime();

        // x += a;
        console.log(x)


        if(localStorage === null){
            $("#t-list").html(t)
            localStorage.setItem(x,a);
        }
        else{
            $("#t-list").prepend(t);
            localStorage.setItem(x,a);
        }


        // $("#t-list").show()


    }


    $('button').click(function(){
        var bx = $(this).attr('id');

        bx = JSON.stringify(bx)
        var sd = bx.slice(2,-1);
        bx = "#t"+bx.slice(2,-1)

        
        $(bx).remove()
        // console.log(sd)
        for(var i in localStorage){
            var d = localStorage.getItem(i);
            if(d !== null){
                var f = ascii(d)
                if(sd == f){
                    sd = i;
                    break;
                }
                // console.log(d)
            }
        }
        // console.log(sd)
        localStorage.removeItem(sd)
    });




    function ascii(a){
        var r="";
        for(let i=0;i<a.length;i++)r += a.charCodeAt(i)
        return r;
    }



    function check(){
        bk = [];
        var t = "";
        for(var i in localStorage){
            var d = localStorage.getItem(i)
            if(d !== null){
                bk.push([i,d])
            }
        }
        bk.sort()

        t = "";
        for(let i=bk.length-1;i>=0;i--){
            var as = ascii(bk[i][1])
            t += "<tr id='t"+as+"'><td>"+bk[i][1]+"</td><td><button class='btn btn-secondary btn-sm' id='b"+as+"'>Done</button></td></tr>"
        }

        $("#t-list").html(t);
    }


});