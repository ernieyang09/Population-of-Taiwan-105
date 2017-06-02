import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as topojson from 'topojson';

window.d3 = d3;

const getMap = (TopoJson) => {
  console.log(2)
  if(!TopoJson.hasOwnProperty('objects')){
    return;
  }
  d3.selectAll('path').remove();
  var width = 800;
  var height = 700;

var svg = d3.select('.visual');
var g = svg.attr('width',800).attr('height',700).append("g");

  var geojson = topojson.feature(TopoJson, TopoJson.objects.map);

  var projection = d3.geoMercator().fitSize([800, 700], geojson);

  var path = d3.geoPath()
    .projection(projection);


var zoom = d3.zoom().scaleExtent([1, 10]).on("zoom", function(){
  g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
  g.attr("transform", d3.event.transform); // updated for d3 v4
});

     g.selectAll('path').data(geojson.features)
     .enter().append('path').attr('d',path);
     svg.call(zoom)

}

const VisualView = ({
  TopoJson,
  ...props,
}) => {
console.log(1)
  return (
    <div className="left col-md-12 col-sm-12 col-xs-12">
      <svg className="visual">
        {
          getMap(TopoJson)
        }
      </svg>
    </div>
  )
};

export default VisualView;
