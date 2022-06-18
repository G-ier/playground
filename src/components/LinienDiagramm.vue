<template>
  <div :id="store.divName"></div>
</template>

<script>
import {useLineStore} from '../stores/linestore'
import {mapWritableState, mapState } from 'pinia'
import Vue from 'vue'

export default {

setup(){
    const store = useLineStore()
    return {
        store,
        reload: store.reload
    }
},
mounted(){
    if(this.$q.localStorage.getItem("reloadBalken") == 0){
        location.reload();
        this.$q.localStorage.set("reloadBalken", 1)
        this.$q.localStorage.set("reloadOther", 0)
    }
    Highcharts.chart( String(this.store.divName), {

        title: {
            text: this.store.title.text,
        },

        subtitle: {
            text: this.store.subtitle.text,
        },

        xAxis: this.store.xAxis,

        yAxis: this.store.yAxis,

        legend: this.store.legend,
        plotOptions: this.store.plotOptions,
        responsive: this.store.responsive,

        series: this.store.series

    });

}
}
</script>

<style>

</style>