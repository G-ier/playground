<template>
  <div :id="store.divName"></div>
</template>

<script>
import {useBalkenStore} from '../stores/balkenstore'
import {mapWritableState, mapState } from 'pinia'
import Vue from 'vue'

export default {

setup(){
    const store = useBalkenStore()
    return {
        store,
        reload: store.reload
    }
},
mounted(){
    Highcharts.chart( String(this.store.divName), {

        chart: {
            type: this.store.chart.type
        },
        title: {
            text: this.store.title.text
        },
        xAxis: {
            categories: this.store.xAxis.categories
        },
        yAxis: {
            min: this.store.yAxis.min,
            title: {
                text: this.store.yAxis.title.text
            }
        },
        legend: {
            reversed: this.store.legend
        },
        plotOptions: {
            series: {
                stacking: this.store.plotOptions.series.stacking
            }
        },
        
        series: this.store.series

    });

}
}
</script>

<style>

</style>