
var treeData = [
  {
    "name": "Top Level",
    "parent": "null",
    "children": [
      {
        "name": "JavaScript",
        "parent": "Top Level",
        "children": [
          {
            "name": "ReactJS",
            "parent": "JavaScript",
            "children": [
              {
                "name": "redux",
                "parent": "ReactJS",
              }
            ]
          },
          {
            "name": "jQuery",
            "parent": "JavaScript"
          },
          {
            "name": "ES6",
            "parent": "JavaScript"
          },
          {
            "name": "AJAX",
            "parent": "JavaScript"
          },
          {
            "name": "LeafLet",
            "parent": "JavaScript"
          }
        ]
      },
      {
        "name": "PHP",
        "parent": "Top Level",
        "children": [
          {
            "name": "POO",
            "parent": "PHP"
          },
          {
            "name": "Architecture MVC",
            "parent": "PHP"
          },
          {
            "name": "Laravel Lumen",
            "parent": "PHP"
          }
        ]
      },
      {
        "name": "HTML 5",
        "parent": "Top Level",
        "children": [
          {
            "name": "Sémantique",
            "parent": "HTML 5"
          },
          {
            "name": "SVG",
            "parent": "HTML 5"
          },
        ]
      },
      {
        "name": "CSS 3",
        "parent": "Top Level",
        "children": [
          {
            "name": "SCSS",
            "parent": "CSS 3"
          },
          {
            "name": "Sass",
            "parent": "CSS 3"
          },
          {
            "name": "Animations",
            "parent": "CSS 3"
          }
        ]
      },
    ]
  }
];

// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;
	
var i = 0;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
  
update(root);

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Declare the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { 
		  return "translate(" + d.y + "," + d.x + ")"; });

  nodeEnter.append("circle")
	  .attr("r", 10)
	  .style("fill", "#fff");

  nodeEnter.append("text")
	  .attr("x", function(d) { 
		  return d.children || d._children ? -13 : 13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { 
		  return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1);

  // Declare the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", diagonal);

}
