
var localURL = 'http://localhost:3000/api/todoAPI';
var deployedURL = 'https://bz-m4.herokuapp.com/api/todoAPI';


display();

function display(){

    fetch(deployedURL)
        .then(res => {
            return res.json();
        })
        .then(data =>{
            var t = "";
            
            for(let i=data.result.length-1;i>=0;i--){
                t += "<tr id='t"+i+"' ><td style='text-decoration:"+data.result[i][2]+";' >"+data.result[i][0]+"</td><td align='right' ><i id='b"+i+"' class='"+data.result[i][1]+"' aria-hidden='true' onclick='del(this.id)' ></i></td></tr>";
            }
            document.getElementById('tlist').innerHTML = t;

        })
        .catch(err => console.error("Error occurred " + err))
}

function del(c){

    var cname = document.getElementById(c);

    if(cname.className == 'fa fa-check'){
        cname.className = 'fa fa-window-close'
        
        var f = JSON.stringify(c)
        var y = Number(f.slice(2,-1));

        var e = document.getElementById('tlist')
        var select =  e.rows[y].cells[0];
        select.style.textDecoration = 'line-through';


        fetch(`https://bz-m4.herokuapp.com/api/todoAPI/${y}`, {method : 'PUT'})
        display();
        // .then(res => {
        //     return res.json();
        // })
        // .then(newData =>{
        //     var t = "";
        //     for(let i=newData.result.length-1;i>=0;i--){
        //         t += "<tr id='t"+i+"' ><td style='text-decoration:"+newData.result[i][2]+";' >"+newData.result[i][0]+"</td><td align='right' ><i id='b"+i+"' class='"+newData.result[i][1]+"' aria-hidden='true' onclick='del(this.id)' ></i></td></tr>";
        //     }
        //     document.getElementById('tlist').innerHTML = t;

        // })
        // .catch(err => console.error("Error occurred " + err))

    }
    else{
        c = JSON.stringify(c)
        var x = "t" + c.slice(2,-1);

        var y = Number(c.slice(2,-1));
        
        var d = document.getElementById(x)
        d.parentNode.removeChild(d)
        fetch(`https://bz-m4.herokuapp.com/api/todoAPI/${y}`, {method : 'DELETE'} );
        display();
    }
    
}