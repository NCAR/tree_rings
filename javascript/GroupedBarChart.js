function unique(list) {
    var result = [];
    $.each(list, function (i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}
var D3GroupedBar = function (width, height, init) {
    window.d3.init = init;
    window.d3.data = new Array();

    var temperatureFormat = function (d) {
        switch (d) {
        case 1:
            return 'Cool';
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
            return 'Dry';
            break;
        case 2:
            return 'Normal';
            break;
        case 3:
            return 'Wet';
            break;
        }
    };

    window.d3.margin = window.d3.init.margin,
        window.d3.width = width - window.d3.margin.left - window.d3.margin.right,
        window.d3.height = height - window.d3.margin.top - window.d3.margin.bottom;

    // xaxis
    window.d3.x0 = d3.scale.ordinal().domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        .rangeRoundBands([0, window.d3.width], .2);

    // only add second x if both temp and moisture are included
    if (window.d3.init.type == 'b') {
        window.d3.x1 = d3.scale.ordinal();
    }
    window.d3.y = d3.scale.linear()
        .range([window.d3.height, 0])
        .domain([0, 3]);


    window.d3.color = d3.scale.ordinal()
        .range([window.d3.init.colors.y1, window.d3.init.colors.y2]);

    window.d3.xAxis = d3.svg.axis()
        .scale(window.d3.x0)
        .ticks(15)
        .orient("bottom");

    // do this because there will always be at least 1 y axis
    window.d3.yAxis1 = d3.svg.axis()
        .scale(window.d3.y)
        .orient("left")
        .ticks(3);

    // if both axis are needed or only one axis is needed and that axis is for temperature
    if (window.d3.init.type == 'b' || window.d3.init.type == 't') {
        window.d3.yAxis1
            .tickFormat(temperatureFormat);
    }

    // if only one axis is needed and that axis is for moisture
    if (window.d3.init.type == 'm') {
        window.d3.yAxis1
            .tickFormat(moistureFormat);
    }
    // if both axis are needed then the second axis will be moisture
    if (window.d3.init.type == 'b') {
        window.d3.yAxis2 = d3.svg.axis()
            .scale(window.d3.y)
            .orient("left")
            .ticks(3)
            .tickFormat(moistureFormat);
    }

    window.d3.svgCont = d3.select("#gameContainer").append("svg")
        .attr("id", "BarChartSVG")
        .attr("width", window.d3.width + window.d3.margin.left + window.d3.margin.right)
        .attr("height", window.d3.height + window.d3.margin.top + window.d3.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + window.d3.margin.left + "," + window.d3.margin.top + ")");

    switch (window.d3.init.type) {
    case 'b':
        window.d3.keys = ["Temperature", "Moisture"];
        break;
    case 't':
        window.d3.keys = ["Temperature"];
        break;
    case 'm':
        window.d3.keys = ["Moisture"];
        break;
    }
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
        .text(window.d3.init.labels.x);

    // first y axis - always needed
    window.d3.yaxis1 = window.d3.svgCont.append("g")
        .attr("class", "y axis");
    // if type is both or temperature, give temperature id
    if (window.d3.init.type == 'b' || window.d3.init.type == 't') {
        window.d3.yaxis1.attr("id", "temperatureAxis");
    } else if (window.d3.init.type == 'm') {
        // otherwise if type is m for moisture, give moisture id
        window.d3.yaxis1.attr("id", "moistureAxis")
    }
    if (window.d3.init.type == 'b') {
        var yaxis1_transx = -50;
        var yaxis1_label_transx = -10;
        var yaxis1_label_transy = -30;
    } else {

        var yaxis1_transx = 0;
        var yaxis1_label_transx = 0;
        var yaxis1_label_transy = -30;
    }
    window.d3.yaxis1.attr("transform", "translate(" + yaxis1_transx + ",0)")
        .call(window.d3.yAxis1)
        .append("text")
        .attr("transform", "translate(" + yaxis1_label_transx + "," + yaxis1_label_transy + ")")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-weight", "bold")
        .style("fill", window.d3.init.colors.y1)
        .text(window.d3.init.labels.y1);

    // if both axis are needed then the second axis will be moisture
    if (window.d3.init.type == 'b') {
        window.d3.svgCont.append("g")
            .attr("class", "y axis")
            .attr("id", "moistureAxis")
            .attr("transform", "translate(0,0)")
            .call(window.d3.yAxis2)
            .append("text")
            .attr("transform", "translate(0,-30)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-weight", "bold")
            .style("fill", window.d3.init.colors.y2)
            .text(window.d3.init.labels.y2);
    }

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

    if (window.d3.init.type == 'b') {
        window.d3.x1.domain(window.d3.keys).rangeRoundBands([0, window.d3.x0.rangeBand()]);
    }
    window.d3.year = window.d3.svgCont.selectAll(".year")
        .data(window.d3.data);

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

    window.d3.yearval
        .enter()
        .append("rect")
        .attr("width", function (d) {
            if (window.d3.init.type == 'b') {
                return window.d3.x1.rangeBand();
            } else {
                return window.d3.x0.rangeBand();
            }
        })
        .attr("x", function (d) {
            if (window.d3.init.type == 'b') {
                return window.d3.x1(d.name);
            } else {
                return window.d3.x0(d.name);
            }
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