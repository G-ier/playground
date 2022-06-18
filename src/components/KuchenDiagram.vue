<template>
  <div :id="store.divName"></div>
</template>

<script>
import {useKuchenStore} from '../stores/kuchenstore'
import {mapWritableState, mapState } from 'pinia'
import Vue from 'vue'

export default {

setup(){
    const store = useKuchenStore()
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

        chart: this.store.chart,
        title: this.store.title,
        tooltip: this.store.tooltip,
        accessibility: this.store.accessibility,
        plotOptions: this.store.plotOptions,
        series: this.store.series

    });

}
}
</script>

<style>

</style>