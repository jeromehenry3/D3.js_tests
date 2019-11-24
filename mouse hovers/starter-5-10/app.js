var data            =   [6,20,21,14,2,30,7,16,25,5,11,28,10,26,9];

// Create SVG Element
var chart_width     =   800;
var chart_height    =   400;
var sort_flag = false;
var svg             =   d3.select( '#chart' )
    .append( 'svg' )
    .attr( 'width', chart_width )
    .attr( 'height', chart_height );

// Create Scales
var x_scale         =   d3.scaleBand()
    .domain( d3.range( data.length ) )
    .rangeRound([ 0, chart_width ])
    .paddingInner( 0.05 );
var y_scale         =   d3.scaleLinear()
    .domain([
        0, d3.max( data )
    ])
    .range([ 0, chart_height ]);

// Bind Data and create bars
svg.selectAll( 'rect' )
    .data( data )
    .enter()
    .append( 'rect' )
    .attr( 'x', function( d, i ){
        return x_scale(i);
    })
    .attr( 'y', function(d ){
        return chart_height - y_scale( d );
    })
    .attr( 'width', x_scale.bandwidth() )
    .attr( 'height', function( d ){
        return y_scale( d );
    })
    .attr( 'fill', '#7ED26D' )
    .on('mouseover', (d, i, nodes) => {
        console.log(nodes[i])
        d3.select(nodes[i])
            .transition()
            .attr('fill', '#0C9CDF');

        var x = parseFloat(d3.select(nodes[i]).attr('x')) +
            x_scale.bandwidth() /2;
        var y = (parseFloat(d3.select(nodes[i]).attr('y')) + chart_height) /2

        d3.select('#tooltip')
            .style('left', x + 'px')
            .style('top', y + 'px')
            .style('display', 'block')
            .text(d)
    })
    .on('mouseout', (d, i, nodes) => {
        console.log(nodes[i]);
        d3.select(nodes[i])
            .transition('change_color_back')
            .attr('fill', '#7ED26D');

        d3.select('#tooltip')
            .style('display', 'none');
    })
    .on('click', () => {
        svg.selectAll('rect')
            .sort((a, b) => sort_flag ? d3.ascending(a, b): d3.descending(a, b))
            .transition('sort')
            .duration(1000)
            .attr( 'x', function( d, i ){
                return x_scale(i);
            });

        // svg.selectAll('text')
        // .sort((a, b) => sort_flag ? d3.ascending(a, b): d3.descending(a, b))
        //     .transition()
        //     .duration(1000)
        //     .attr( 'x', function( d, i ){
        //         return x_scale( i ) + x_scale.bandwidth() / 2;
        //     })
        //     .attr( 'y', function(d){
        //         return chart_height - y_scale(d) + 15;
        //     });
        sort_flag = !sort_flag;
    })
    .append('title')
    .text(data => data);

// Create Labels
// svg.selectAll( 'text' )
//     .data(data)
//     .enter()
//     .append( 'text' )
//     .text(function( d ){
//         return d;
//     })
//     .attr( 'x', function( d, i ){
//         return x_scale( i ) + x_scale.bandwidth() / 2;
//     })
//     .attr( 'y', function(d){
//         return chart_height - y_scale(d) + 15;
//     })
//     .attr( 'font-size', 14 )
//     .attr( 'fill', '#fff' )
//     .attr( 'text-anchor', 'middle' )
//     .style('pointer-events', 'none');