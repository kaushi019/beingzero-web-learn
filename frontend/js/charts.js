
google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);

function drawChart(){
    var data = new google.visualization.DataTable();
        data.addColumn('string', 'solvedcount');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Leetcode', 41],
          ['Codechef', 147],
          ['Codeforces', 120],
          ['Vjudge', 103],
          ['Mentorpick', 152]
        ]);
        
    var options = {'title':'No. of Problems solved in different Coding Platforms',
                'width':600,
                'height':500};

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}