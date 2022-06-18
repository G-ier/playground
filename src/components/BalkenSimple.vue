<template>
  <div :id="store.divName"></div>
</template>

<script>
import {useSimpleBalkenStore} from '../stores/simplebalkenstore'
import {mapWritableState, mapState } from 'pinia'
import Vue from 'vue'
import { useQuasar } from 'quasar'

export default {

setup(){
    const store = useSimpleBalkenStore()
    const $q = useQuasar()
    return {
        store,
        $q
    }
},
mounted(){

    if(this.$q.localStorage.getItem("reloadBalken") == 0){
        location.reload();
        this.$q.localStorage.set("reloadBalken", 1)
        this.$q.localStorage.set("reloadOther", 0)
    }
    Highcharts.chart( String(this.store.divName), {

        chart: {
            type: this.store.chart.type
        },

        title: {
            text: this.store.title.text

        },

        subtitle: this.store.subtitle,

        xAxis: {
            categories: this.store.xAxis.categories
        },

        yAxis: this.store.yAxis,

        plotOptions: this.store.plotOptions,
        
        tooltip: this.store.tooltip,

        series: this.store.series

    });

}
}
</script>

<style>

</style>