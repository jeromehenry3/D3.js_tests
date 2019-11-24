// var data            =   [
//     [ 400, 200 ],
//     [ 210,140 ],
//     [ 722,300 ],
//     [ 70,160 ],
//     [ 250,50 ],
//     [ 110,280 ],
//     [ 699,225 ],
//     [ 90, 220 ]
// ];

var chart_width     =   800;
var chart_height    =   400;
var padding = 50;
var data = [
    {date: '02/01/2019', num:20},
    {date: '02/02/2019', num:37},
    {date: '02/03/2019', num:25},
    {date: '02/05/2019', num:12},
    {date: '02/06/2019', num:50},
    {date: '02/07/2019', num:43},
    {date: '02/08/2019', num:44},
    {date: '02/09/2019', num:59},
    {date: '02/10/2019', num:33},
    {date: '02/12/2019', num:23},
];
var timeParse = d3.timeParse('%m/%d/%Y');
var timeFormat = d3.timeFormat('%d/%m');

// Loop thru each date
data.forEach((e, i) => data[i].date = timeParse(e.date));


// Creat SVG element
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height)

// Create scales
const x_scale = d3.scaleTime()
    .domain([d3.min(data, d => d.date), d3.max(data, function(d) {
        return d.date
    })])
    .range([padding, chart_width - padding * 2]);

const y_scale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {
        return d.num;
    })])
    .range([chart_height - padding, padding]);

// var r_scale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d[1])])
//     .range([5, 30]);

var a_scale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.num)])
    .range([0, 25]);

// Create axis
var x_axis = d3.axisBottom()
    .scale(x_scale)
    .ticks(6);

svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${chart_height - padding})`)
    .call(x_axis);

var y_axis = d3.axisLeft(y_scale)
    .ticks(5)
    .tickFormat(d => d + ' %');

svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${padding}, 0)`)
    .call(y_axis);

// Creat circles

svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => x_scale(d.date))
    .attr('cy', (d) => y_scale(d.num))
    .attr('r', (d) => a_scale(d.num))
    .attr('fill', '#D1AB0E');

// creat labels

svg.append('g').selectAll('.x-axis text')
    .data(data)
    .enter()
    .append('text')
    .text(d => timeFormat(d.date))
    .attr('x', d => x_scale(d.date))
    .attr('y', d => y_scale(d.num));