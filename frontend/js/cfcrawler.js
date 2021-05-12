
$(document).ready(function(){


    $("#loading").hide();
    $("#user-info").hide();
    $("#languages").hide();
    $("#submissions").hide();
    $("#levels").hide();
    $("#rating-name").hide();
    $("#contests-name").hide();
    $("#contests").hide();


    google.charts.load('current', {'packages':['corechart']});

    const parentURL = "https://codeforces.com/api/";
    var user_temp;
    var user_id,rating,rank;
    var maxrating,maxrank;

    var userLang = {}, userSubmissionsInfo = {};
    var langList = [], submissionList = [];

    var userLevelInfo = {}, userProblemRatingInfo = {};
    var levelList = [], problemRatingList = [];


    var childURL = {
        "ratingChange" : "contest.ratingChanges?contestId=1520",
        "contestStatus" : "contest.status?contestId=566&from=1&count=10",
        "userInfo" : "user.info?handles=",
        "userContests" : "user.rating?handle=",
        "userSubmissions" : "user.status?handle=",
        "userRecentSubmissions" : "problemset.recentStatus?count=10"
    }


    $("#crawl").click(function(){


        $("#loading").show();
        $("#user-info").hide();
        $("#languages").hide();
        $("#submissions").hide();
        $("#levels").hide();
        $("#contests-name").hide();
        $("#contests").hide();


        user_id = $("#username").val();
        
        console.log(user_id);

        const userInfoAPI = parentURL+childURL.userInfo+user_id;
        getUserInfo(userInfoAPI);
        
        const userSubmissionsAPI = parentURL+childURL.userSubmissions+user_id;
        getUserSubmissions(userSubmissionsAPI);

        const userContestsAPI = parentURL+childURL.userContests+user_id;
        getUserContests(userContestsAPI);


        // $("#loading").hide();

    });



    async function getUserInfo(url){
        const res = await fetch(url);
        var data = await res.json();


        user_id = data.result[0].handle;
        rating = data.result[0].rating;
        maxrating = data.result[0].maxRating;

        rank = data.result[0].rank;
        maxrank = data.result[0].maxRank;

        user_temp = JSON.stringify(user_id);
        user_temp = user_temp.slice(1,-1);

    }
    
    async function getUserSubmissions(url){
        userLang = {}; userSubmissionsInfo = {};
        langList = []; submissionList = [];
    
        const res = await fetch(url);
        var data = await res.json();
        console.log(data);
    
        for(let i=0;i<data.result.length;i++){

            //languages
            var x = data.result[i].programmingLanguage;
            if(userLang[x] === undefined)userLang[x] = 0;
            userLang[x]++;

            //verdicts
            var y = data.result[i].verdict;
            if(userSubmissionsInfo[y] === undefined)userSubmissionsInfo[y] = 0;
            userSubmissionsInfo[y]++;

            //levels
            var lev = data.result[i].problem.index;
            if(userLevelInfo[lev] === undefined)userLevelInfo[lev] = 0;
            userLevelInfo[lev]++;

            //problem rating
            var pbr = data.result[i].problem.rating;
            if(userProblemRatingInfo[pbr] === undefined)userProblemRatingInfo[pbr] = 0;
            userProblemRatingInfo[pbr]++;
        }

        console.log(userLevelInfo)
        console.log(userProblemRatingInfo)
    
        //languages
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


        //verdicts
        var subm = JSON.stringify(userSubmissionsInfo)
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




        //levels
        var lvl = JSON.stringify(userLevelInfo)
        l = "";
        for(let i=2;i<lvl.length;i++){
            if(lvl[i]==","){
                let k = 0;
                while(l[k]!=":")k++;
                l = l.substring(0,k-1);
                levelList.push(l);
                l = "";
                i++;
            }
            else
                l+=lvl[i];
        }
        j=0;
        while(l[j]!=":")j++;
        l = l.substring(0,j-1);
        levelList.push(l);
        console.log(levelList)




        //DOM
        var t = "<tr><td id='userrank' >"+rank+"</td></tr>";
        t += "<tr><td id='userid'>"+user_id+"</td></tr>";
        t += "<tr><td id='userrating' >Rating : "+rating+"</td><td>(max. "+maxrank+", "+maxrating+")</td></tr>";

        $("#user-info").html(t);
        $("#userid").css({
            "font-size" : "25px",
            "text-decoration" : "italic"
        });
        $("#user-info").show();
        

        google.charts.setOnLoadCallback(drawChartLanguages);
        google.charts.setOnLoadCallback(drawChartVerdicts);
        // google.charts.setOnLoadCallback(drawChartLevels);

        $("#loading").hide();

    }
    

    async function getUserContests(url){

        const res = await fetch(url);
        var data = await res.json();

        //DOM
        var t = "<tr><th>#</th><th>Contest Name</th><th>Contest Rank</th><th>Old Rating</th><th>New Rating</th><th>Rating Change</th></tr>";

        for(let i=data.result.length-1;i>=0;i--){
            var td = "<tr><td>#"+JSON.stringify(i+1)+"</td><td>"+data.result[i].contestName+"</td><td>"+data.result[i].rank+"</td><td>"+data.result[i].oldRating+"</td><td>"+data.result[i].newRating+"</td><td>"+JSON.stringify(data.result[i].newRating-data.result[i].oldRating)+"</td></tr>";
            t+=td;
        }


        $("#contests-name").html("Contests Participated");
        $("#contests-name").css({"text-decoration" : "underline"});
        $("#contests-name").show();
        $("#contests").html(t);
        $("#contests").show();


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
            title : 'Languages of '+user_temp,
            width : 550,
            height : 450,
            is3D : true,
            pieSliceText : 'none',
        };
    
        var chart = new google.visualization.PieChart(document.getElementById('languages'));
        chart.draw(data, options);
        
        $("#languages").css({
            "border" : "1px solid black"
        })
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
            title : 'Verdicts of '+user_temp,
            width : 550,
            height : 450,
            is3D : true,
            pieSliceText : 'none',
        };
    
        var chart = new google.visualization.PieChart(document.getElementById('submissions'));
        chart.draw(data, options);
        
        $("#submissions").css({
            "border" : "1px solid black"
        })
        $("#submissions").show()
    }

    // function drawChartLevels(){
    //     var data = new google.visualization.DataTable();
    //         data.addColumn('string', 'solvedcount');
    //         data.addColumn('number', 'Slices');
    
    //         for(let i=0;i<levelList.length;i++)
    //             data.addRows([
    //                 [ levelList[i],userLevelInfo[levelList[i]] ]
    //             ]);
            
    //     var options = {
    //         title : 'Levels of Problems Solved',
    //         legend : {position : 'none'}
    //         // width : 600,
    //         // height : 500,
    //         // is3D : true,
    //         // pieSliceText : 'none',
    //     };
    
    //     var chart = new google.visualization.Histogram(document.getElementById('levels'));
    //     chart.draw(data, options);
        
    //     $("#levels").show()
    // }





});