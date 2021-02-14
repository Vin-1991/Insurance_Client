import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { Fragment, useEffect } from "react";

export default function LineChart({ chartData }) {

    am4core.useTheme(am4themes_animated);

    const createLineChart = () => {
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("lineChartdiv", am4charts.XYChart);

        // Add data
        chart.data = chartData;

        // Create category axis
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "UNIQUE_MONTH";
        categoryAxis.renderer.opposite = true;

        // Create value axis
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inversed = true;
        valueAxis.title.text = "No. of Policies bought";
        valueAxis.renderer.minLabelPosition = 0.01;


        const seriesArray = { 'Series1': 'North', 'Series2': 'South', 'Series3': 'West', 'Series4': 'East' };

        for (let [series, region] of Object.entries(seriesArray)) {
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
    }

    useEffect(() => {
        createLineChart();
    }, [chartData])

    return (
        <Fragment>
            <div id="lineChartdiv" style={{ width: "100%", height: "75vh" }}></div>
        </Fragment>
    );

};