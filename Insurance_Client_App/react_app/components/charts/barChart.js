import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { Fragment, useEffect } from "react";

export default function BarChart({ chartData }) {

    am4core.useTheme(am4themes_animated);

    const createBarChart = () => {
        // Create chart instance
        let chart = am4core.create("barChartdiv", am4charts.XYChart);
        chart.scrollbarX = new am4core.Scrollbar();

        // Add data
        chart.data = chartData;

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "UNIQUE_MONTH";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 50;

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.sequencedInterpolation = false;
        series.dataFields.valueY = "NO_OF_POLICIES_BOUGHT";
        series.dataFields.categoryX = "UNIQUE_MONTH";
        series.tooltipText = "{CUSTOMER_REGION} : {valueY}[/]";
        series.columns.template.strokeWidth = 0;

        series.tooltip.pointerOrientation = "vertical";

        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.fillOpacity = 0.8;

        // on hover, make corner radiuses bigger
        let hoverState = series.columns.template.column.states.create("hover");
        hoverState.properties.cornerRadiusTopLeft = 0;
        hoverState.properties.cornerRadiusTopRight = 0;
        hoverState.properties.fillOpacity = 1;

        series.columns.template.adapter.add("fill", (fill, target) => {
            return chart.colors.getIndex(target.dataItem.index);
        });

        // Cursor
        chart.cursor = new am4charts.XYCursor();
    }

    useEffect(() => {
        createBarChart();
    }, [chartData])

    return (
        <Fragment>
            <div id="barChartdiv" style={{ width: "100%", height: "85vh" }}></div>
        </Fragment>
    );

};