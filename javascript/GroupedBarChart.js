function unique(list) {
    var result = [];
    $.each(list, function (i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}
var D3GroupedBar = function (width, height, labels) {
    window.d3.data = new Array();
    /*  window.d3.data.push({
                      "Temperature": randit(3),
                      "Moisture": randit(3)
                  });
                  */

    var temperatureFormat = function (d) {
        switch (d) {
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
    };
    var moistureFormat = function (d) {
        switch (d) {
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
    };

    window.d3.margin = {
            top: 40,
            right: 20,
            bottom: 30,
            left: 130
        },
        window.d3.width = width - window.d3.margin.left - window.d3.margin.right,
        window.d3.height = height - window.d3.margin.top - window.d3.margin.bottom;
    window.d3.x0 = d3.scale.ordinal()
        .rangeRoundBands([0, window.d3.width], .2);
    window.d3.x1 = d3.scale.ordinal();
    window.d3.y = d3.scale.linear()
        .range([window.d3.height, 0])
        .domain([0, 3]);
    window.d3.color = d3.scale.category10();
    /*
     window.d3.color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
        */
    window.d3.xAxis = d3.svg.axis()
        .scale(window.d3.x0)
        .orient("bottom");
    window.d3.yAxis1 = d3.svg.axis()
        .scale(window.d3.y)
        .orient("left")
        .ticks(3)
        .tickFormat(temperatureFormat);
    window.d3.yAxis2 = d3.svg.axis()
        .scale(window.d3.y)
        .orient("left")
        .ticks(3)
        .tickFormat(moistureFormat);

    window.d3.svgCont = d3.select("#gameContainer").append("svg")
        .attr("id", "BarChartSVG")
        .attr("width", window.d3.width + window.d3.margin.left + window.d3.margin.right)
        .attr("height", window.d3.height + window.d3.margin.top + window.d3.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + window.d3.margin.left + "," + window.d3.margin.top + ")");


    /*
    window.d3.keys = d3.keys(window.d3.data[0]).filter(function (key) {
        return key;
    });
    */
    window.d3.keys = ["Temperature", "Moisture"];
    this.setData();

    window.d3.svgCont.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + window.d3.height + ")")
        .call(window.d3.xAxis)
        .append("text")
        .attr("transform", "translate(0,0)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-weight", "bold")
        .text(labels.x);
    window.d3.svgCont.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(-50,0)")
        .call(window.d3.yAxis1)
        .append("text")
        .attr("transform", "translate(-10,-30)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-weight", "bold")
        .text(labels.y1);

    window.d3.svgCont.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(window.d3.yAxis2)
        .append("text")
        .attr("transform", "translate(0,-30)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-weight", "bold")
        .text(labels.y2);

    var legend = window.d3.svgCont.selectAll(".legend")
        .data(window.d3.keys)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(" + ((i * 75) + (window.d3.width / 2) + 75) + "," + (-window.d3.margin.top + 10) + ")";
        });

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", window.d3.color);

    legend.append("text")
        .attr("dx", -5)
        .attr("dy", "1.2em")
        .style("text-anchor", "end")
        .text(function (d) {
            return d;
        });
};
D3GroupedBar.prototype.setData = function () {
    window.d3.data.forEach(function (d, i) {
        if (!d.Year) {
            d.Year = i + 1;
            d.years = window.d3.keys.map(function (name) {
                return {
                    name: name,
                    value: +d[name]
                };
            });
        }

    });


    window.d3.x0.domain(window.d3.data.map(function (d) {
        return d.Year;
    }));
    /* window.d3.y.domain([0, d3.max(window.d3.data, function (d) {
         return d3.max(d.years, function (d) {
             return d.value;
         });
     })]);
     */

    window.d3.svgCont.selectAll(".x.axis")
        .call(window.d3.xAxis);
}
D3GroupedBar.prototype.addValue = function (val) {
    window.d3.data.push(val);
    this.setData();
    this.draw();
}
D3GroupedBar.prototype.removeValue = function () {
    window.d3.data.pop();
    this.setData();
    this.draw();
}
D3GroupedBar.prototype.draw = function () {
    window.d3.x0.domain(window.d3.data.map(function (d) {
        return d.Year;
    }));
    window.d3.x1.domain(window.d3.keys).rangeRoundBands([0, window.d3.x0.rangeBand()]);



    window.d3.year = window.d3.svgCont.selectAll(".year")
        .data(window.d3.data);

    window.d3.year.transition().attr("transform", function (d) {
        return "translate(" + window.d3.x0(d.Year) + ",0)";
    });

    window.d3.year
        .enter()
        .append("g")
        .attr("class", "year")
        .attr("transform", function (d) {
            return "translate(" + window.d3.x0(d.Year) + ",0)";
        });

    window.d3.year.exit()
        .remove();

    window.d3.yearval = window.d3.year.selectAll("rect")
        .data(function (d) {
            return d.years;
        });

    window.d3.yearval.transition()
        .attr("x", function (d) {
            return window.d3.x1(d.name);
        })
        .attr("width", function (d) {
            return window.d3.x1.rangeBand();
        });

    window.d3.yearval
        .enter()
        .append("rect")
        .attr("width", function (d) {
            return window.d3.x1.rangeBand();
        })
        .attr("x", function (d) {
            return window.d3.x1(d.name);
        })
        .attr("y", function (d) {;
            return window.d3.y(d.value);
        })
        .attr("height", function (d) {
            return window.d3.height - window.d3.y(d.value);
        })
        .style("fill", function (d) {
            return window.d3.color(d.name);
        });

    window.d3.yearval.exit()
        .remove();

}
D3GroupedBar.prototype.remove = function () {
    d3.select("#BarChartSVG").remove();
}