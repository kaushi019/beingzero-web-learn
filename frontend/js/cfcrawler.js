
$(document).ready(function(){

    $('#cf_handle').html("");
    $('#rating').html("");
    $('#rank').html("");
    $("#languages").hide();
    $("#submissions").hide()


    google.charts.load('current', {'packages':['corechart']});

    const parentURL = "https://codeforces.com/api/";
    var user_id;
    var userLang = {};
    var userSubmissionsInfo = {};
    var langList = [], submissionList = [];


    var childURL = {
        "ratingChange" : "contest.ratingChanges?contestId=1520",
        "contestStatus" : "contest.status?contestId=566&from=1&count=10",
        "userInfo" : "user.info?handles=",
        "userContests" : "user.rating?handle=",
        "userSubmissions" : "user.status?handle=",
        "userRecentSubmissions" : "problemset.recentStatus?count=10"
    }


    $("#crawl").click(function(){

        $('#cf_handle').html("");
        $('#rating').html("");
        $('#rank').html("");
        $("#languages").hide();
        $("#submissions").hide()


        user_id = $("#username").val();
        console.log(user_id);

        const userInfoAPI = parentURL+childURL.userInfo+user_id;
        getUserInfo(userInfoAPI);

        
        const userSubmissionsAPI = parentURL+childURL.userSubmissions+user_id;
        getUserSubmissions(userSubmissionsAPI);

        const userContestsAPI = parentURL+childURL.userContests+user_id;
    });



    async function getUserInfo(url){
        const res = await fetch(url);
        var data = await res.json();
        console.log(data);
    
        $("#cf_handle").html(user_id);
        $("#rating").html(data.result[0].rating);
        $("#rank").html(data.result[0].rank);
    }
    
    async function getUserSubmissions(url){
        userLang = {};userSubmissionsInfo = {};
        langList = [];submissionList = [];
    
        const res = await fetch(url);
        var data = await res.json();
        console.log(data);
    
        for(let i=0;i<data.result.length;i++){
            var x = data.result[i].programmingLanguage;
    
            if(userLang[x] === undefined)userLang[x] = 0;
            userLang[x]++;
    
            var y = data.result[i].verdict;
            if(userSubmissionsInfo[y] === undefined)userSubmissionsInfo[y] = 0;
            userSubmissionsInfo[y]++;
        }
    
        var lang = JSON.stringify(userLang)
        var l = "";
        for(let i=2;i<lang.length;i++){
            if(lang[i]==","){
                let j = 0;
                while(l[j]!=":")j++;
                l = l.substring(0,j-1);
                langList.push(l);
                l = "";
                i++;
            }
            else
                l+=lang[i];
        }
        let j=0;
        while(l[j]!=":")j++;
        l = l.substring(0,j-1);
        langList.push(l);


        var subm = JSON.stringify(userSubmissionsInfo)
        console.log(subm)
        l = "";
        for(let i=2;i<subm.length;i++){
            if(subm[i]==","){
                let k = 0;
                while(l[k]!=":")k++;
                l = l.substring(0,k-1);
                submissionList.push(l);
                l = "";
                i++;
            }
            else
                l+=subm[i];
        }
        j=0;
        while(l[j]!=":")j++;
        l = l.substring(0,j-1);
        submissionList.push(l);


        google.charts.setOnLoadCallback(drawChartLanguages);
        google.charts.setOnLoadCallback(drawChartVerdicts);

    }
    
    
    function drawChartLanguages(){
        var data = new google.visualization.DataTable();
            data.addColumn('string', 'solvedcount');
            data.addColumn('number', 'Slices');
    
            for(let i=0;i<langList.length;i++)
                data.addRows([
                    [ langList[i],userLang[langList[i]] ]
                ]);
            
        var options = {
            title : 'Languages used',
            width : 500,
            height : 400,
            is3D : true,
            pieSliceText : 'none',
        };
    
        var chart = new google.visualization.PieChart(document.getElementById('languages'));
        chart.draw(data, options);
        
        $("#languages").show()
    }


    function drawChartVerdicts(){
        var data = new google.visualization.DataTable();
            data.addColumn('string', 'solvedcount');
            data.addColumn('number', 'Slices');
    
            for(let i=0;i<submissionList.length;i++)
                data.addRows([
                    [ submissionList[i],userSubmissionsInfo[submissionList[i]] ]
                ]);
            
        var options = {
            title : 'User Submissions',
            width : 500,
            height : 400,
            is3D : true,
            pieSliceText : 'none',
        };
    
        var chart = new google.visualization.PieChart(document.getElementById('submissions'));
        chart.draw(data, options);
        
        $("#submissions").show()
    }

});





