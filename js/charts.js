function refresh_piechart() {
  var f1 = document.getElementById("field1");
  var f2 = document.getElementById("field2");
  var f1Val = f1.options[f1.selectedIndex].value;
  var f2Val = f2.options[f2.selectedIndex].value;

  //does not have the same value
  if (f1Val==f2Val) {return;}
  
  var stats_on_visible_marker = getMyStats(f1Val,f2Val);
  drawChart(stats_on_visible_marker,f1Val,f2Val);
}

function refresh_day() {
  var f3 = document.getElementById("field3");
  var f3Val = f3.options[f3.selectedIndex].value;
  var fDay = "day";

  //var stats_on_visible_marker = getMyStats(fDay,f3Val);
  var ma = get_visible_markers();
  var data = google.visualization.arrayToDataTable([
        ['Day', 'Drone Attacks', 'Blast Suicide Attacks'],
        ['Mo', ma.map(function(m) { return (m.type_attack == "drone" && parseInt(m[f3Val]) > 0 && m.day == "Monday") ? 1 : 0}).reduce(add, 0), ma.map(function(m) { return (m.type_attack == "blast" && parseInt(m[f3Val]) > 0 && m.day == "Monday") ? 1 : 0}).reduce(add, 0)],
        ['Tu', ma.map(function(m) { return (m.type_attack == "drone" && parseInt(m[f3Val]) > 0 && m.day == "Tuesday") ? 1 : 0}).reduce(add, 0), ma.map(function(m) { return (m.type_attack == "blast" && parseInt(m[f3Val]) > 0 && m.day == "Tuesday") ? 1 : 0}).reduce(add, 0)],
        ['We', ma.map(function(m) { return (m.type_attack == "drone" && parseInt(m[f3Val]) > 0 && m.day == "Wednesday") ? 1 : 0}).reduce(add, 0), ma.map(function(m) { return (m.type_attack == "blast" && parseInt(m[f3Val]) > 0 && m.day == "Wednesday") ? 1 : 0}).reduce(add, 0)],
        ['Th', ma.map(function(m) { return (m.type_attack == "drone" && parseInt(m[f3Val]) > 0 && m.day == "Thursday") ? 1 : 0}).reduce(add, 0), ma.map(function(m) { return (m.type_attack == "blast" && parseInt(m[f3Val]) > 0 && m.day == "Thursday") ? 1 : 0}).reduce(add, 0)],
        ['Fr', ma.map(function(m) { return (m.type_attack == "drone" && parseInt(m[f3Val]) > 0 && m.day == "Friday") ? 1 : 0}).reduce(add, 0), ma.map(function(m) { return (m.type_attack == "blast" && parseInt(m[f3Val]) > 0 && m.day == "Friday") ? 1 : 0}).reduce(add, 0)],
        ['Sa', ma.map(function(m) { return (m.type_attack == "drone" && parseInt(m[f3Val]) > 0 && m.day == "Saturday") ? 1 : 0}).reduce(add, 0), ma.map(function(m) { return (m.type_attack == "blast" && parseInt(m[f3Val]) > 0 && m.day == "Saturday") ? 1 : 0}).reduce(add, 0)],
        ['Su', ma.map(function(m) { return (m.type_attack == "drone" && parseInt(m[f3Val]) > 0 && m.day == "Sunday") ? 1 : 0}).reduce(add, 0), ma.map(function(m) { return (m.type_attack == "blast" && parseInt(m[f3Val]) > 0 && m.day == "Sunday") ? 1 : 0}).reduce(add, 0)],
      ]);

  var materialOptions = {
        chart: {
          title: ' Attack by day of the week'
        },
        hAxis: {
          title: 'Total Population',
          minValue: 0,
        },
        vAxis: {
          title: 'City'
        },
        bars: 'vertical',
        legend: {
            position: 'none'
        },
        height: parseInt($("#div2").css("height")) - 50,
        width: parseInt($("#div2").css("width"))
      };

      var materialChart = new google.charts.Bar(document.getElementById('week-div'));
      materialChart.draw(data, materialOptions);

}

function getCount(attName, countAttName, markers) {
  var ht = [];

  for (var i = 0; i < markers.length; i++) {
    var t = parseInt(markers[i][countAttName]);
    var ht_val = ht[markers[i][attName]];
    ht_val = ((ht_val == '' + NaN) || (ht_val == null) ? 0 : ht_val);
    ht[markers[i][attName]] = ht_val + (t == '' + NaN ? 0 : t);
  }

  var k = [];
  for(var i=0; i<markers.length; i++) {
    if (k.indexOf(markers[i][attName]) == -1) {
      k.push(markers[i][attName]);
    }
  }

  out = [[attName,countAttName]];

  for (var i = 0; i<k.length; i++) {
    out.push([k[i],ht[k[i]]]);
  }
  
  return out;
}

function getMyStats(f1,f2) {
  return getCount(f1, f2, get_visible_markers());
}

function drawChart(array,f1,f2) {
  var data = google.visualization.arrayToDataTable(array);

  var options = {
    title: f1 + ' by nb ' + f2,
    pieSliceText: 'label',
    sliceVisibilityThreshold: .01,
    height: parseInt($("#div2").css("height")) - 50,
    width: parseInt($("#div2").css("width"))
  };
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}