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

        pane: this.store.pane,

        xAxis: {
            categories: this.store.xAxis.categories,
            tickmarkPlacement: this.store.xAxis.tickmarkPlacement,
            lineWidth: this.store.xAxis.lineWidth
        },

        yAxis: this.store.yAxis,

        tooltip: this.store.tooltip,

        legend: this.store.legend,

        series: this.store.series

    });

}
}
</script>

<style>

</style>