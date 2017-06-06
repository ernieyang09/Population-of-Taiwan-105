import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const getChart = (VillageData) => {
  const width = 700;
  const height = 500;

  const margin = {
    top: 20,
    right: 50,
    bottom: 40,
    left: 50,
    middle: 40,
  };

  const regionWidth = (width / 2) - margin.middle;

  // these are the x-coordinates of the y-axes
  const pointA = regionWidth;
  const pointB = width - regionWidth;

  const malePopulation = Object.keys(VillageData).filter(key => (key.startsWith('male')))
                                .map(key => ({ [key.slice(5)]: VillageData[key] }));
  const femalePopulation = Object.keys(VillageData).filter(key => (key.startsWith('female')))
                                 .map(key => ({ [key.slice(7)]: VillageData[key] }));

  malePopulation.map((single, index) => Object.values(single)[0]);
  femalePopulation.map((single, index) => Object.values(single)[0]);
  const X_MAX = d3.max(
    [
      malePopulation.map((single, index) => Object.values(single)[0]),
      femalePopulation.map((single, index) => Object.values(single)[0]),
    ], array => d3.max(array));

  d3.select('.statistic').selectAll('*').remove();
  const svg = d3.select('.statistic')
        .attr('width', margin.left + width + margin.right)
        .attr('height', margin.top + height + margin.bottom)
        .append('g')
          .attr('class', 'inner-region')
          .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleLinear()
  .domain([0, X_MAX])
  .range([0, regionWidth])
  .nice();
  const xAxisLeft = d3.axisBottom().scale(xScale.copy().range([pointA, 0]));
  const xAxisRight = d3.axisBottom().scale(xScale);


  const yScale = d3.scaleBand()
    .domain(malePopulation.map(d => Object.keys(d)))
    .rangeRound([height, 0])
    .padding(0.1);
  const yAxisLeft = d3.axisRight()
    .scale(yScale)
    .tickSize(4, 0);

  const yAxisRight = d3.axisLeft()
    .scale(yScale)
    .tickSize(4, 0)
    .tickPadding(margin.middle - 20);

  svg.append('g')
    .attr('class', 'axis x left')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxisLeft);

  svg.append('g')
    .attr('class', 'axis x right')
    .attr('transform', `translate(${pointB}, ${height})`)
    .call(xAxisRight);

  svg.append('g')
    .attr('class', 'axis y left')
    .attr('transform', `translate(${pointA}, 0)`)
    .call(yAxisLeft)
    .selectAll('text')
    .remove();
    // .style('text-anchor', 'middle');

  svg.append('g')
    .attr('class', 'axis y right')
    .attr('transform', `translate(${pointB}, 0)`)
    .call(yAxisRight);

  svg.append('g')
    .attr('transform', `translate(${pointA}, 0) scale(-1,1)`)
    .selectAll('.bar.left')
    .data(malePopulation)
    .enter()
    .append('rect')
    .attr('class', 'bar right')
    .attr('x', 0)
    .attr('y', d => yScale(Object.keys(d)))
    .attr('width', d => xScale(Object.values(d)))
    .attr('height', yScale.bandwidth());

  svg.append('g')
    .attr('transform', `translate(${pointB}, 0) `)
    .selectAll('.bar.right')
    .data(femalePopulation)
    .enter()
    .append('rect')
    .attr('class', 'bar right')
    .attr('x', 0)
    .attr('y', d => yScale(Object.keys(d)))
    .attr('width', d => xScale(Object.values(d)))
    .attr('height', yScale.bandwidth());
};

const DataView = ({
  VillageInfo,
  VillageData,
  ...props
}) => (
  <div className="right col-md-12 col-sm-12 col-xs-12">
    <div className="row">
      <div className="col-md-6 col-sm-6  col-xs-12">
        <h3>現在鄉鎮：{VillageInfo.VILLNAME}</h3>
        <table>
          <tbody>
            <tr>
              <td>城市名稱</td>
              <td>{VillageInfo.COUNTYNAME}</td>
            </tr>
            <tr>
              <td>城市代碼</td>
              <td>{VillageInfo.COUNTYCODE}</td>
            </tr>
            <tr>
              <td>鄉鎮市區名稱</td>
              <td>{VillageInfo.TOWNNAME}</td>
            </tr>
            <tr>
              <td>鄉鎮市區代碼</td>
              <td>{VillageInfo.TOWNCODE}</td>
            </tr>
            <tr>
              <td>村里名稱</td>
              <td>{VillageInfo.VILLNAME}</td>
            </tr>
            <tr>
              <td>村里英文名稱</td>
              <td>{VillageInfo.VILLENG}</td>
            </tr>
            <tr>
              <td>村裡代碼</td>
              <td>{VillageInfo.VILLCODE}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-md-12 col-sm-12  col-xs-12">
        <svg className="statistic">
          {
            getChart(VillageData)
          }
        </svg>
      </div>
    </div>

  </div>
);


export default DataView;
