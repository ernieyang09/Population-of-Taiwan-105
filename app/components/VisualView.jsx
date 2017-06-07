import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as d3scale from 'd3-scale-chromatic';
import * as topojson from 'topojson';

window.d3 = d3;

const check = (Loading, TopoJson, props) => {
  if(!Loading) {
    return;
  }
  const a = TopoJson.objects.map.geometries.map(ss =>({
    'vill': parseInt(ss.properties.VILLCODE),
    'name': ss.properties.VILLNAME
  }))
  const b = props.map(ss =>({
    'vill':ss.VillageCode,
    'name':ss.VillageName
  }))
  const c = a.filter(oo=>{
    return !b.some(function(obj2) {
        return oo.name == obj2.name;
    });
  })
  const d = b.filter(oo=>{
    return !a.some(function(obj2) {
        return oo.name == obj2.name;
    });
  })
  console.log(c, d);
}

const getMap = (TopoJson, VillageData, onClick) => {

  const Population = VillageData.map((Village) => {
    const sum = Object.keys(Village).filter(key => (key.includes('male')))
    .map(key => Village[key]).reduce((a, b) => a + b, 0);
    return {
      vill: Village.VillageCode,
      sum,
    };
  });


  const MAX = d3.max(Population.map(vill => vill.sum));
  // var color = d3.scaleQuantize()
  //   .domain([0, MAX])
  //   .range(d3scale.schemeBlues[9]);

  var color2 = d3.scaleLinear().domain([0, MAX])
              .interpolate(d3.interpolateHcl)
              .range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"]);


  var width = 700;
  var height = 700;

  var svg = d3.select('.visual');
  svg.attr('width', width).attr('height', height).selectAll('*').remove();

  var zoom = d3.zoom().scaleExtent([0, 10]).on("zoom", function(){
    g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
    g.attr("transform", d3.event.transform); // updated for d3 v4
  });


  var geojson = topojson.feature(TopoJson, TopoJson.objects.map);


  var projection = d3.geoMercator().fitSize([width, height], geojson);

  var path = d3.geoPath()
    .projection(projection);

  var g = svg.append('g');

  g.selectAll('path')
  .data(geojson.features)
  .enter()
  .append('path')
  .attr('d', path)
  .attr('fill', (d) => {
    const village = Population.filter(single =>
       d.properties.VILLCODE === single.vill.toString(),
    );
    const sum = (village.length === 1) ? village[0].sum : 0;
    return color2(sum);
  })
  .on('click', (d) => {
    onClick(d.properties);
  });

  svg.call(zoom.transform, d3.zoomIdentity).call(zoom);
};

const VisualView = ({
  Loading,
  TopoJson,
  VillageData,
  _getVillageInfo,
  ...props,
}) => {
  // check(Loading, TopoJson , VillageData);
  return (
    <div className="left col-md-5 col-sm-12 col-xs-12">
      <div className="content">
        <svg className="visual">
          {
            (Loading) ? getMap(TopoJson, VillageData, _getVillageInfo) : null
          }
        </svg>
      </div>
    </div>
  )
};

export default VisualView;
