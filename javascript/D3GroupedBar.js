function unique(list) {
        var result = [];
        $.each(list, function (i, e) {
            if ($.inArray(e, result) == -1) result.push(e);
        });
        return result;
    }
var D3GroupedBar = function (data) {

    window.d3.data = data;

    

    window.d3.margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 130
    };
    window.d3.width = 1000 - window.d3.margin.left - window.d3.margin.right;
    window.d3.height = 500 - window.d3.margin.top - window.d3.margin.bottom;

  

    
    
    
};
D3GroupedBar.prototype.plot = function(){
      window.d3.keyNames = unique(window.d3.data.map(function (d) {
        return d.key;
    }));
    window.d3.x0 = d3.scale.ordinal()
        .rangeRoundBands([0, window.d3.width], .1)
        .domain(window.d3.data.map(function (d) {
            return d.year;
        }));
    window.d3.x1 = d3.scale.ordinal()
        .rangeRoundBands([0, window.d3.x0.rangeBand()])
        .domain(window.d3.keyNames);
    
    window.d3.y = d3.scale.linear()
        .range([window.d3.height, 0])
        .domain([0, 3]);

    window.d3.color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    // xaxis
    window.d3.xAxis = d3.svg.axis()
        .scale(window.d3.x0)
        .orient("bottom");

    // y axis
    window.d3.yAxisTemp = d3.svg.axis()
        .scale(window.d3.y)
        .orient("left")
        .ticks(3)
        .tickFormat(function(d){
            switch(d){
                case 1:
                    return 'Dry';
                    break;                
                case 2:
                    return 'Normal';
                    break;                
                case 3:
                    return 'Warm';
                    break;
            }
        });

    window.d3.yAxisMoist = d3.svg.axis()
        .scale(window.d3.y)
        .orient("left").ticks(3)
        .tickFormat(function(d){
            switch(d){
                case 1:
                    return 'Cool';
                    break;                
                case 2:
                    return 'Normal';
                    break;                
                case 3:
                    return 'Wet';
                    break;
            }
        });

    window.d3.svg = d3.select("#chart")
        .append("svg")
        .attr("width", window.d3.width + window.d3.margin.left + window.d3.margin.right)
        .attr("height", window.d3.height + window.d3.margin.top + window.d3.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + window.d3.margin.left + "," + window.d3.margin.top + ")");

    window.d3.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + window.d3.height + ")")
        .call(window.d3.xAxis);

    // place moisture axis
    window.d3.svg.append("g")
        .attr("class", "y axis")
        .call(window.d3.yAxisTemp)
        .append("text")
        .attr("y", -20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Moisture");

    // place temperature axis
    window.d3.svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(-50 ,0)")
        .call(window.d3.yAxisMoist)
        .append("text")
        .attr("y", -20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temperature");



    window.d3.rect = window.d3.svg.selectAll(".bar");

   
    this.drawLegend();

    
    
    window.d3.svg.selectAll("x.axis")
        .attr("transform", "translate(0," + window.d3.height + ")")
        .call(window.d3.xAxis);
    
     window.d3.rect
        .data(window.d3.data)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", function (d) {
            return "translate(" + window.d3.x0(d.year) + ",0)";
        }).append("rect").attr("x", function (d) {
            return window.d3.x1(d.key);
        })
        .attr("y", function (d) {
            return window.d3.y(Math.max(0, d.value));
        })
        .attr("height", function (d) {
            return Math.abs(window.d3.y(d.value) - window.d3.y(0));
        })
        .attr("width", window.d3.x1.rangeBand())
        .style("fill", function (d) {
            return window.d3.color(d.key);
        })
        .style({
            "opacity": 0.6,
            "stroke-width": "2"
        });
    
};


D3GroupedBar.prototype.drawLegend = function(){
    window.d3.legend = window.d3.svg.selectAll(".legend")
        .data(window.d3.keyNames.slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    window.d3.legend.append("rect")
        .attr("x", window.d3.width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", window.d3.color);

    window.d3.legend.append("text")
        .attr("x", window.d3.width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) {
            return d;
        });
}

D3GroupedBar.prototype.addValue = function (val) {
    var val_len = val.length;
    for(var i=0;i < val_len; i++){
        window.d3.data.push(val[i]);
    }
    console.log(window.d3.data);
   
    this.plot();

};
