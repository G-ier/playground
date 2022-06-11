<template>
  <q-page class="main q-pa-lg popreg">
    <div class="container row">
        <div class="col">
            <q-card flat bordered class="my-card bg-grey-1">
                <q-card-section>
                    <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Spider Web Diagramme</div>
                    </div>
                    </div>
                </q-card-section>

                <q-card-section>
                    {{ lorem }}
                </q-card-section>

                <q-separator />

                <q-card-actions class="row justify-end">
                    <q-btn flat no-caps class="rounded-borders" @click="goto('spiderweb')">Zu Playground</q-btn>
                </q-card-actions>
            </q-card>
        </div>
        <div class="col q-mx-lg">
            <q-card flat bordered class="my-card bg-grey-1">
                <q-card-section>
                    <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Balkensäure Diagramme</div>
                    </div>
                    </div>
                </q-card-section>

                <q-card-section>
                    {{ lorem }}
                </q-card-section>

                <q-separator />

                <q-card-actions class="row justify-end">
                    <q-btn no-caps flat class="rounded-borders">Zu Playground</q-btn>
                </q-card-actions>
            </q-card>
        </div>
        <div class="col">
            <q-card flat bordered class="my-card bg-grey-1">
                <q-card-section>
                    <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Balkensäure Diagramme</div>
                    </div>
                    </div>
                </q-card-section>

                <q-card-section>
                    {{ lorem }}
                </q-card-section>

                <q-separator />

                <q-card-actions class="row justify-end">
                    <q-btn no-caps flat class="rounded-borders">Zu Playground</q-btn>
                </q-card-actions>
            </q-card>
        </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import {ref} from 'vue'
import {uid} from 'quasar'
import SpiderWeb from '../components/Spiderweb.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    SpiderWeb
  },
  methods: {
      goto(link){
          this.$router.push(link);
      }
  },
  data () {
    return {
      divName: uid(),
      model: ref('Spider Web'),
      categories: ref(null),
      options: [
        'Spider Web', '3D Force', 'Liniendiagramm', 'Säulendiagramm', 'Balsendiagramm', 'Balkendiagramm'
      ],
      chart: {
        polar: ref(true),
        type: ref('line')
      },
      title: {
        text: ref('Budget vs spending'),
        x: ref(-80)
      },
      pane: {
        size: ref('80%')
      },
      xAxis: {
          categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
                  'Information Technology', 'Administration'],
          tickmarkPlacement: ref('on'),
          lineWidth: ref(0)
      },
      yAxis: {
        gridLineInterpolation: ref('polygon'),
        lineWidth: ref(0),
        min: ref(0),
      },
      tooltip: {
        shared: ref(true),
        pointFormat: ref('<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>')
      },
      legend: {
        align: ref('right'),
        verticalAlign: ref('top'),
        y: ref(70),
        layout: ref('vertical')
      },
      series: [{
          name: 'Allocated Budget',
    
          data: [43000, 19000, 60000, 35000, 17000, 10000],
          pointPlacement: 'on'
      }, {
          name: 'Actual Spending',
          data: [50000, 39000, 42000, 31000, 26000, 14000],
          pointPlacement: 'on'
      }]
    }
  }
})
</script>
<style scoped>
.main{
  display: flex;
  justify-content: center;
}
.container{
    width: 90vw;
    height: 80vh;
}
.page{
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
}
.my-card{
    border-radius: 15px;
}
</style>