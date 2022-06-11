<template>
  <div :id="store.divName"></div>
</template>

<script>
import {useMainStore} from '../stores/mainstore'
import {mapWritableState, mapState } from 'pinia'
import Vue from 'vue'

export default {

setup(){
    const store = useMainStore()
    return {
        store,
        reload: store.reload
    }
},
mounted(){
    Highcharts.chart( String(this.store.divName), {

        chart: {
            polar: this.store.chart.polar,
            type: this.store.chart.type
        },

        title: {
            text: this.store.title.text,
            x: this.store.title.x
        },

        pane: {
            size: this.store.pane.size
        },

        xAxis: {
            categories: this.store.xAxis.categories,
            tickmarkPlacement: this.store.xAxis.tickmarkPlacement,
            lineWidth: this.store.xAxis.lineWidth
        },

        yAxis: {
            gridLineInterpolation: this.store.yAxis.gridLineInterpolation,
            lineWidth: this.store.yAxis.lineWidth,
            min: this.store.yAxis.min
        },

        tooltip: {
            shared: this.store.tooltip.shared,
            pointFormat: this.store.tooltip.pointFormat
        },

        legend: {
            align: this.store.legend.align,
            verticalAlign: this.store.legend.verticalAlign,
            y: this.store.legend.y,
            layout: this.store.legend.layout
        },

        series: this.store.series

    });

}
}
</script>

<style>

</style>