<template>
  <div :id="store.divName"></div>
</template>

<script>
import {useBubbleStore} from '../stores/bubblestore'
import {mapWritableState, mapState } from 'pinia'
import Vue from 'vue'

export default {

setup(){
    const store = useBubbleStore()
    return {
        store,
        reload: store.reload
    }
},
mounted(){
    Highcharts.chart( String(this.store.divName), {

        chart: {
            type: this.store.chart.type,
            plotBorderWidth: this.store.chart.plotBorderWidth,
            zoomType: this.store.chart.zoomType
        },

        legend: {
            enabled: this.store.legend.enabled
        },

        title: {
            text: this.store.title.text
        },

        subtitle: {
            text: this.store.subtitle.text
        },

        accessibility: {
            point: {
                valueDescriptionFormat: this.store.accessibility.point.valueDescriptionFormat
            }
        },

        xAxis: {
            gridLineWidth: this.store.xAxis.gridLineWidth,
            title: {
                text: this.store.xAxis.title.text
            },
            labels: {
                format: this.store.xAxis.labels.format
            },
            plotLines: this.store.xAxis.plotLines,
            accessibility: {
                rangeDescription: this.store.xAxis.accessibility.rangeDescription
            }
        },

        yAxis: {
            startOnTick: this.store.yAxis.startOnTick,
            endOnTick: this.store.yAxis.endOnTick,
            title: {
                text: this.store.yAxis.title.text
            },
            labels: {
                format: this.store.yAxis.labels.format
            },
            maxPadding: this.store.yAxis.maxPadding,
            plotLines: this.store.yAxis.plotLines,
            accessibility: {
                rangeDescription: this.store.yAxis.accessibility.rangeDescription
            }
        },

        tooltip: this.store.tooltip,

        plotOptions: this.store.plotOptions,

        series: this.store.series

    });

}
}
</script>

<style>

</style>