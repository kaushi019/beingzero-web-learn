
document.getElementById('tlist').innerHTML = "";

display();

function display(){
    fetch('https://bz-m4.herokuapp.com/api/todoAPI')
        .then(res => {
            return res.json();
        })
        .then(data =>{
            var t = "";
            
            for(let i=data.result.length-1;i>=0;i--){
                t += "<tr id='t"+i+"' ><td>"+data.result[i]+"</td><td><i id='b"+i+"' class='fa fa-check' aria-hidden='true' onclick='del(this.id)' ></i></td></tr>";
            }
            document.getElementById('tlist').innerHTML = t;

        })
        .catch(err => console.error("Error occurred " + err))
}

function del(c){
    c = JSON.stringify(c)
    var x = "t" + c.slice(2,-1);

    var y = Number(c.slice(2,-1));
    
    var d = document.getElementById(x)
    d.parentNode.removeChild(d)
    fetch(`https://bz-m4.herokuapp.com/api/todoAPI/${y}`, {method : 'DELETE'} );
    display();
}