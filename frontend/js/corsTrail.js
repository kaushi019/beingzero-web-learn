$(document).ready(()=>{

    var url = 'https://mentorpick.com/api/report/5fc9711508395c71106bde9c';
    $.get(url,(data,status)=>{
        console.log(data);
    })
    .fail((xhr,status)=>{
        console.log('Failed')
    })

})