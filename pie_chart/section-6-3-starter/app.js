// Data
var data            =   [ 20, 25, 30, 25 ];
var chart_width     =   600;
var chart_height    =   600;
var color = d3.scaleOrdinal(d3.schemeCategory10);

//Pie layout

var pie = d3.pie();

//Arc layout
var outer_radius = chart_width / 3;
var inner_radius = 120;
var arc = d3.arc()
    .innerRadius(inner_radius)
    .outerRadius(outer_radius);

var svg = d3.select("#chart")
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height)


// groups
var arcs = svg.selectAll('g.arc')
    .data(pie(data))
    .enter()
    .append("g")
    .attr('class', 'arc')
    .attr(
        'transform',
        `translate(${outer_radius}, ${chart_height / 2})`
    );

// arcs
arcs.append('path')
    .attr('fill', (d, i) => color(i) )
    .attr('d', arc);

// labels
arcs.append('text')
        .attr('transform', (d, i) => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'text-middle')
        .text(d => d.value)