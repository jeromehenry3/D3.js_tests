// Data
var data            =   {
    nodes:              [
        { name: "JavaScript" }, { name: "React" },
        { name: "jQuery" }, { name: "ES6" },
        { name: "D3.js" }, { name: "PHP" },
        { name: "Symfony" }, { name: "Laravel" },
        { name: "POO" }, { name: "Redux" }
    ],
    links:              [
        { source: 0, target: 1 }, { source: 0, target: 2 },
        { source: 0, target: 3 }, { source: 0, target: 4 },
        { source: 5, target: 6 }, { source: 5, target: 7 },
        { source: 5, target: 8 }, { source: 5, target: 0 },
        { source: 0, target: 5 }, { source: 5, target: 0 },
        { source: 0, target: 9 }, { source: 1, target: 9 },
        // { source: 8, target: 9 }
    ]
};

//Width and height
var chart_width     =   600;
var chart_height    =   600;
var colors          =   d3.scaleOrdinal( d3.schemeCategory10 );

//force layout
var force = d3.forceSimulation(data.nodes)
    .force('charge', d3.forceManyBody().strength(-200))
    .force('link', d3.forceLink(data.links))
    .force(
        'center', 
        d3.forceCenter()
            .x(chart_width / 2)
            .y(chart_height / 2)
    )
    .force('collision', d3.forceCollide().radius(20));

// SVG
var svg             =   d3.select("#chart")
    .append( "svg" )
    .attr( "width", chart_width )
    .attr( "height", chart_height );

// Lines AKA Links
var lines           =   svg.selectAll("line")
    .data(data.links)
    .enter()
    .append( "line" )
    .style( "stroke", "#24292e" )
    .style( "stroke-width", 2 );

// Nodes
var nodes           =   svg.selectAll("circle")
    .data(data.nodes)
    .enter()
    .append( "circle" )
    .attr( "r", 20 )
    .style( "fill", function( d, i ) {
        return colors(i);
    })
    // .append("text")
    // .text(d => d.name);
nodes.append("text")
    .text(d => d.name)
    .style('fill', "#fff")
    .attr('x', 300)
    .attr('y', 300);
// Tooltip
nodes.append("title")
    .text(function( d ) {
        return d.name;
    })
    

force.on('tick', () => {
    lines.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    nodes.attr("cx", d => d.x)
        .attr("cy", d => d.y)
});