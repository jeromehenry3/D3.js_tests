// d3.csv('data.csv').then(
//     data => {
//         console.log(data)
//         // generate(data.columns)
//     }
// );

let data = []

for (let i=0; i<30; i++) {
    var num = Math.floor(d3.randomUniform(1, 100)());
    data.push(num)
}

generate(data);

// d3.json('data.json').then(
//     data => {
//         generate(data);
//     }
// );

function generate(dataset) {
    
    const svg = d3.select('div#chart')
        .append('svg')
        .attr('width', 800)
        .attr('height', 400);
    // Bond data and Create bars
    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * (800 / dataset.length))
        .attr('y', (d) => 400 - d * 4)
        .attr('width', `calc((100% / ${dataset.length}) - 2px)`)
        .attr('height', d => `calc(100% * (${d} / 100))`)
        .classed('bar', true)
        .style('fill', d => `rgb(${d * 4}, 155, 100)`);

    svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', (d, i) => i * (800 / dataset.length) + (800 / dataset.length - 1) /2)
        .attr('y', (d) => 415 - d * 4)
        .style('font-size', 14)
        .style('font-weight', 'bold')
        .style('fill', '#fff')
        .attr('text-anchor', 'middle')

};