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
        <p class="text-p popreg">Simple Balkendiagramm Metadata</p>
        <q-input standout="bg-grey text-white" class="q-mb-sm popreg" v-model="title.text" label="Titel" :dense="dense" />
        <q-input standout="bg-grey text-white" class="q-mb-sm popreg" v-model="subtitle.text" label="Subtitel" :dense="dense" />
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
        <q-btn align="left" class="btn-fixed-width popreg q-mr-md" color="primary" label="Code generieren" no-caps @click="generate"/>
        <q-btn align="left" class="btn-fixed-width popreg" color="primary" label="Visualieren" no-caps icon-right="east" @click="visualize"/>
      </div>
    </div>
    <div class="example">
      <div class="text-h5 q-mb-xl popreg">
        Visualisierung
      </div>
      <BalkenSimple :key="componentKey"/>
    </div>
    <q-dialog
      v-model="code"
      full-height
      full-width
    >
      <q-card class="column full-height" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Code</div>
        </q-card-section>

        <q-card-section class="col q-pt-none">
          <div class="fullwidth column justify-center items-center">
            <p class="col-6 popreg">HTML</p>
            <code class="popreg q-pa-lg bg-grey rounded-borders">
              {{'<div id="' + store.divName + '"></div>'}}
            </code>
            <p class="col-6 popreg q-mt-lg">JS</p>
            <code class="popreg q-pa-lg bg-grey rounded-borders">
              Highcharts.chart( String("{{store.divName}}"), {

                chart: {
                    type: {{store.chart.type}}
                },

                title: {
                    text: {{store.title.text}}

                },

                subtitle: {{store.subtitle}},

                xAxis: {
                    categories: {{store.xAxis.categories}}
                },

                yAxis: {{store.yAxis}},

                plotOptions: {{store.plotOptions}},
                
                tooltip: {{store.tooltip}},

                series: {{store.series}}

              });
            </code>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Ok" no-caps v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import {ref} from 'vue'
import {uid} from 'quasar'
import BalkenSimple from '../components/BalkenSimple.vue'
import { useQuasar } from 'quasar'
import {useSimpleBalkenStore} from '../stores/simplebalkenstore'
import {mapWritableState, mapState } from 'pinia'

const columns = [
  { name: 'desc', style: 'min-width: 160px; width: 160px', align: 'left', label: 'Name', field: 'name' },
  { name: 'comment', style: 'min-width: 200px; width: 300px', align: 'left', label: 'Einträge (mit Kommas, ohne Leerzeichnen)', field: 'comment' },
]

var rows = [
  {
        name: 'Tokyo',
        comment: "49.9,71.5,106.4,129.2,144.0,176.0,135.6,148.5,216.4,194.1,95.6,54.4"

    }, {
        name: 'New York',
        comment: "83.6,78.8,98.5,93.4,106.0,84.5,105.0,104.3,91.2,83.5,106.6,92.3"

    }, {
        name: 'London',
        comment: "48.9,38.8,39.3,41.4,47.0,48.3,59.0,59.6,52.4,65.2,59.3,51.2"

    }, {
        name: 'Berlin',
        comment: "42.4,33.2,34.5,39.7,52.6,75.5,57.4,60.4,47.6,39.1,46.8,51.1"

    }
]
const store = useSimpleBalkenStore()
const $q = useQuasar()
export default defineComponent({
  name: 'SimpleBalkenPage',
  components: {
    BalkenSimple
  },
  setup(){
    const $q = useQuasar()
    const store = useSimpleBalkenStore()
    return{
      columns,
      store,
      $q,
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
        this.series = []
        for(let i = 0; i < rows.length; i++){

          try{
            this.series.push({
              name: this.rows[i].name,
              data: this.rows[i].comment.split(",").map(Number),
            })

          } catch (error) {
            this.$q.notify({
              message: 'Fehler beim Visualisieren - Dateien der Einträge enthalten Non-Numbers',
              color: 'red'
            })
            console.log("Our Error................")
            console.log(error)
          }
        }
        store.divName = this.divName;

        store.chart = {
            type: this.chart.type
        }

        store.title = {
            text: this.title.text

        }

        store.subtitle = this.subtitle

        store.xAxis = {
            categories: this.xAxis.categories
        }

        store.yAxis = this.yAxis

        store.plotOptions = this.plotOptions
        
        store.tooltip = this.tooltip

        store.series = this.series
        this.componentKey = uid()
    },
    generate(){
      this.code = true
    }
  },
  data () {
    return {
      rows: rows,
      categories: ref(null),
      table: ref(false),
      table2: ref(false),
      table3: ref(false),
      code: false,
      newName: ref(null),
      newList: ref(null),
      chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '</tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'London',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
            name: 'Berlin',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }],
      divName: uid(),
      componentKey: 0
    }
  },
  mounted(){
    
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
code {
    background-color: #eee;
    border-radius: 3px;
    font-family: courier, monospace;
    padding: 0 3px;
}
</style>