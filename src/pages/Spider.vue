<template>
  <q-page class="main q-pa-lg">
    <div class="angaben">
      <div class="row justify-center items-center">
        <div class="text-h5 popreg">
          Wähle die Optionen deines Charts manuell
        </div>
      </div>
      <q-separator />
      <div class="entry q-mt-xl">
        <p class="text-p popreg">Spider Web Diagramm Metadata</p>
        <q-input standout="bg-grey text-white" class="q-mb-sm popreg" v-model="title.text" label="Titel" :dense="dense" />
        <q-input standout="bg-grey text-white" class="popreg" autogrow v-model="xAxis.categories" label="Kategorien" hint="* Mit Kommas getrennt, ohne das Leerzeichen zwischen den Kategorien" />
        <p class="text-p q-ma-none q-mt-lg q-mb-xs popreg" style="padding: 0;">Serie Dateien</p>
        
        <div class="row justify-evenly q-mt-lg">
          <q-btn color="primary" no-caps label="Neuer Eintrag" class="col-3 q-mr-md popreg" @click="table3 = true"/>
          <q-btn color="primary" no-caps label="Bearbeiten" class="col-3 q-mr-md popreg" @click="table = true"/>
          <q-btn color="red" no-caps label="Löschen" class="col-3 popreg" @click="table2 = true"/>
        </div>
        <q-dialog
          v-model="table"
          persistent
          :maximized="true"
          transition-show="slide-up"
          transition-hide="slide-down"
          full-height
          full-width
        >
          <q-card class="bg-primary text-white">
            <q-bar>
              <q-space />
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip class="bg-white text-primary popreg">Close</q-tooltip>
              </q-btn>
            </q-bar>

            <q-card-section>
              <q-table
                :rows="rows"
                :columns="columns"
                title="Klicken zum Bearbeiten"
                :rows-per-page-options="[]"
                row-key="name"
                wrap-cells
                class="popreg"
              >
              
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="desc" :props="props">
                      {{ props.row.name }}
                      <q-popup-edit v-model="props.row.name" v-slot="scope">
                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="comment" :props="props">
                      <div v-html="props.row.comment"></div>
                      <q-popup-edit
                        buttons
                        v-model="props.row.comment"
                        v-slot="scope"
                      >
                        <q-editor
                          v-model="scope.value"
                          min-height="5rem"
                          autofocus
                          @keyup.enter.stop
                        />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="calories" :props="props">
                      {{ props.row.calories }}
                      <q-popup-edit v-model.number="props.row.calories" v-slot="scope">
                        <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-card-section>
          </q-card> 
        </q-dialog>
        <q-dialog v-model="table2" transition-show="fade" transition-hide="fade">
          <q-card>
            <q-card-section>
              <div class="text-h6 popreg">Löschenverwaltung</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="row items-center q-mb-md" v-for="data in rows" :key="data.name">
                <q-btn
                  color="red"
                  round
                  icon="delete"
                  class="q-mr-lg popreg"
                  size="sm"
                  @click="deleteE(data.name)"
                />
                <p class="text-p center-text popreg" style="padding: 0; margin: 0;">{{data.name}}</p>
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Close" color="primary" class="popreg" @click="table2= false"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="table3" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6 popreg">Neuen Eintrag einfügen</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input dense v-model="newName" label="Name" autofocus @keyup.enter="prompt = false" class="popreg" />
              <q-input dense v-model="newList" label="Dateien für jede Kategorie" hint="* Mit Kommas getrennt, ohne das Leerzeichen zwischen den Einträgen" autofocus @keyup.enter="prompt = false" class="q-mt-sm popreg"/>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat no-caps label="Abbrechen" class="popreg" v-close-popup />
              <q-btn flat no-caps label="Einfügen" class="popreg" @click="table3 = false; addNew()" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div class="fit row justify-end items-center">
        <q-btn align="left" class="btn-fixed-width popreg" color="primary" label="Visualieren" no-caps icon-right="east" @click="visualize"/>
      </div>
    </div>
    <div class="example">
      <div class="text-h5 q-mb-xl popreg">
        Visualisierung
      </div>
      <SpiderWeb :key="componentKey"/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import {ref} from 'vue'
import {uid} from 'quasar'
import SpiderWeb from '../components/Spiderweb.vue'
import { useQuasar } from 'quasar'
import {useMainStore} from '../stores/mainstore'
import {mapWritableState, mapState } from 'pinia'

const columns = [
  { name: 'desc', style: 'min-width: 160px; width: 160px', align: 'left', label: 'Name', field: 'name' },
  { name: 'comment', style: 'min-width: 200px; width: 200px', align: 'left', label: 'Einträge (mit Kommas getrennt)', field: 'comment' },
  { name: 'calories', align: 'center', label: 'Point placement (default: on)', field: 'point' },
]

var rows = [
  {
      name: 'Allocated Budget',

      comment: "43000, 19000, 60000, 35000, 17000, 10000",
      point: "on"
  }, {
      name: 'Actual Spending',
      comment: "50000, 39000, 42000, 31000, 26000, 14000",
      point: "on"
  }
]
const store = useMainStore()
const $q = useQuasar()
export default defineComponent({
  name: 'IndexPage',
  components: {
    SpiderWeb
  },
  setup(){
    const $q = useQuasar()
    const store = useMainStore()
    return{
      columns,
      store,
      deleteE(name){
        for (let i = 0; i < rows.length; i++) {
          if(rows[i].name == name){
            rows.splice(i, 1);
            this.table2 = false;
            this.table2 = true;
          }
        }
      },
      addNew(){
        try{
          rows.push({
            name: this.newName,
            comment: this.newList,
            point: 'on'
          })
          this.newName = null;
          this.newList = null;
          $q.notify({
            message: 'Eintrag eingefügt',
            color: 'green'
          })
        } catch (error){
          $q.notify({
            message: 'Falsches Format - beachte den Hint',
            color: 'red'
          })
        }
      }
    }
  },
  methods: {
    visualize(){
        for(let i = 0; i < rows.length; i++){
          try{
            this.series.push({
              name: this.rows[i].name,
              data: this.rows[i].comment.split(",").map(Number),
              pointPlacement: this.rows[i].point
            })
          } catch (error) {
            $q.notify({
              message: 'Fehler beim Visualisieren - Dateien der Einträge enthalten Non-Numbers',
              color: 'red'
            })
            console.log("Our Error................")
            console.log(error)
          }
        }
        store.divName = this.divName;

        store.chart = {
            polar: this.chart.polar,
            type: this.chart.type
        }

        store.title = {
            text: this.title.text,
            x: this.title.x
        }

        store.pane = {
            size: this.pane.size
        }

        store.xAxis = {
            categories: this.xAxis.categories,
            tickmarkPlacement: this.xAxis.tickmarkPlacement,
            lineWidth: this.xAxis.lineWidth
        }

        store.yAxis = {
            gridLineInterpolation: this.yAxis.gridLineInterpolation,
            lineWidth: this.yAxis.lineWidth,
            min: this.yAxis.min
        }

        store.tooltip = {
            shared: this.tooltip.shared,
            pointFormat: this.tooltip.pointFormat
        }

        store.legend = {
            align: this.legend.align,
            verticalAlign: this.legend.verticalAlign,
            y: this.legend.y,
            layout: this.legend.layout
        }

        store.series = this.series
        this.componentKey = uid()
      }
  },
  data () {
    return {
      rows,
      categories: ref(null),
      table: ref(false),
      table2: ref(false),
      table3: ref(false),
      newName: ref(null),
      newList: ref(null),
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
      }],
      divName: uid(),
      componentKey: 0
    }
  }
})
</script>
<style scoped>
.dorm{
  display: flex;
  flex-direction: column;
}
.smol{
  width: 40%;
}
.main{
  display: grid;
  grid-template-columns: 40% 60%;
  min-height: 100%;
}
.angaben{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.example{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.entry{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}
.dateien{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.bisher{
  background-color: #f2f2f2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  width: 250px;
  margin-right: 20px;
}
.neue{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
}
</style>