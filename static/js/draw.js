
var margin = {top: 20, right: 50, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d"),
    bisectDate = d3.bisector(function(d) { return d.Date; }).left,
    formatValue = d3.format(",.2f"),
    formatCurrency = function(d) { return "$" + formatValue(d);};

var path = ['static/data/lowest_price/', 'static/data/highest_price/', 'static/data/highest_profit/'];

var keys = ['Low', 'High', 'Profit'];

var title = function(symbol, i) {
  if (i == 0) return "Lowest price in one year before current day for " + symbol;
  if (i == 1) return "Highest price in one year before current day for " + symbol;
  return "Highest profit in one year before current day for " + symbol;
}

function draw(symbol) {

  d3.select('#chart').selectAll('li').remove();
  d3.select('footer').text("");

  var foot = d3.select('footer');

  var moves = [],
      focuses = [];

  path.forEach(function(p, i) {

    var fname = p + symbol + '.csv';
    var key = keys[i];

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var area = d3.svg.area()
        .x(function(d) { return x(d.Date); })
        .y1(function(d) { return y(d[key]); })
        .y0(height);

    var chart = d3.select("#chart").append('li');

    var svg = chart.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(fname, function(error, data) {

      if (error) throw error;

      data.forEach(function(d) {
        d.Date = parseDate.parse(d.Date);
        d.val = + d[key];
      });

      data.sort(function(a, b) {
        return a.Date - b.Date;
      });

      x.domain([data[0].Date, data[data.length - 1].Date]);
      y.domain(d3.extent(data, function(d) { return d.val; }));

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price ($)");

      svg.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area);

      svg.append('text')
          .attr("transform",  "translate(" + width/2 + "," + 6 + ")")
          .attr("dy", ".71em")
          .style("text-anchor", "middle")
          .text(function() {return title(symbol, i)});

      var focus = svg.append("g")
          .attr("class", "focus")
          .style("display", "none");

      focus.append("circle")
          .attr("r", 4.5);

      focus.append("text")
          .attr("x", 9)
          .attr("dy", ".35em");

      var rect = svg.append('rect')
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height);
      //     .on("mouseover", function() { focus.style("display", null); })
      //     .on("mouseout", function() { focus.style("display", "none"); })
      //     .on("mousemove", mousemove);

      // d3.select("#chart")
      //   .on("mouseover", function() { focus.style("display", null); })
      //   .on("mouseout", function() { focus.style("display", "none"); })
      //   .on("mousemove", mousemove);

      var mousemove = function(val) {

        if (val < 0 || val > width) {focus.style("display", "none");}
        else {
          focus.style("display", null);
          var x0 = x.invert(val),
              i = bisectDate(data, x0, 1),
              d0 = data[i - 1],
              d1 = data[i],
              d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
          focus.attr("transform", "translate(" + x(d.Date) + "," + y(d.val) + ")");
          focus.select("text").text(formatCurrency(d.val));
          return parseDate(d.Date);
        } 
        return "";
      };
      moves.push(mousemove);
      //focuses.push(focus);
    });

    d3.select("#chart").on("mousemove", function() {
      var val = d3.mouse(this)[0] - margin.left;
      var date = "";
      moves.forEach(function(move) {date = move(val);}); 
      foot.style("display", null);
      foot.text("Date: "+ date);
    })
    .on("mouseout", function() {
      moves.forEach(function(move) {move(-1);}); 
      foot.style("display", "none");
    });

  });

}