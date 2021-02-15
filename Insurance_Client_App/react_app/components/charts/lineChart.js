import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import React, { Fragment, useEffect } from "react";

export default function LineChart({ chartData }) {

    //Create Line Chart and renders when region value change
    const createLineChart = () => {

        am4core.useTheme(am4themes_animated);
        am4core.useTheme(am4themes_material);

        // Create chart instance
        let chart = am4core.create("lineChartdiv", am4charts.XYChart);

        // Add data
        chart.data = chartData; // extracted data from DB.

        // Create category axis
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "UNIQUE_MONTH";
        categoryAxis.renderer.opposite = false;

        // Create value axis
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inversed = false;
        valueAxis.title.text = "No. of Policies bought";
        valueAxis.renderer.minLabelPosition = 0.01;


        const seriesArray = { 'Series1': 'North', 'Series2': 'South', 'Series3': 'West', 'Series4': 'East' };

        for (let [series, region] of Object.entries(seriesArray)) { // for loop to create dynamic series of line chart
            // Create series
            if (chartData.filter(idx => idx.CUSTOMER_REGION === region).length) {
                series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = region;
                series.dataFields.categoryX = "UNIQUE_MONTH";
                series.name = region;
                series.bullets.push(new am4charts.CircleBullet());
                series.tooltipText = "Ploicies bought in {name} region in {categoryX} month : {valueY}";
                series.legendSettings.valueText = "{valueY}";
                series.visible = false;

                region = series.segments.template.states.create("hover")
                region.properties.strokeWidth = 5;
                series.segments.template.strokeWidth = 1;
            }
        }

        // Add chart cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "zoomY";

        // Add legend
        chart.legend = new am4charts.Legend();
        chart.legend.itemContainers.template.events.on("over", (event) => {
            let segments = event.target.dataItem.dataContext.segments;
            segments.each((segment) => {
                segment.isHover = true;
            })
        })

        chart.legend.itemContainers.template.events.on("out", (event) => {
            let segments = event.target.dataItem.dataContext.segments;
            segments.each((segment) => {
                segment.isHover = false;
            })
        })

        am4core.options.autoDispose = true;
    }

    useEffect(() => {
        //Call the create Chart function when chart data changes
        createLineChart();
    }, [chartData])

    return (
        <Fragment>
            <div id="lineChartdiv" style={{ width: "100%", height: "67vh" }}></div>
        </Fragment>
    );

};