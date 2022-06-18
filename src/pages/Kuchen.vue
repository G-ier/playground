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
        <q-input standout="bg-grey text-white" class="popreg" autogrow v-model="series[0].name" label="Datensatz" hint="* Mit Kommas getrennt, ohne das Leerzeichen zwischen den Kategorien" />
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

                    <q-td key="y" :props="props">
                      <div v-html="props.row.y"></div>
                      <q-popup-edit
                        buttons
                        v-model="props.row.y"
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

                    <q-td key="sliced" :props="props">
                      {{ props.row.sliced }}
                      <q-popup-edit v-model.number="props.row.sliced" v-slot="scope">
                        <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </q-td>
                    <q-td key="selected" :props="props">
                      {{ props.row.selected }}
                      <q-popup-edit v-model.number="props.row.selected" v-slot="scope">
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
              <q-input dense v-model="newList" label="Teil" hint="* Prozent des Charts" autofocus @keyup.enter="prompt = false" class="q-mt-sm popreg"/>
              <q-input dense v-model="newSliced" label="Sliced" hint="* 'true' für True | 'false' für false | leer wenn unsicher" autofocus @keyup.enter="prompt = false" class="popreg" />
              <q-input dense v-model="newSelected" label="Selected" hint="* 'true' für True | 'false' für false | leer wenn unsicher" autofocus @keyup.enter="prompt = false" class="popreg" />
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
      <KuchenDiagram :key="componentKey"/>
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

                chart: {{store.chart}},
                title: {{store.title}},
                tooltip: {{store.tooltip}},
                accessibility: {{store.accessibility}},
                plotOptions: {{store.plotOptions}},
                series: {{store.series}},

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
import KuchenDiagram from '../components/KuchenDiagram.vue'
import { useQuasar } from 'quasar'
import {useKuchenStore} from '../stores/kuchenstore'
import {mapWritableState, mapState } from 'pinia'

const columns = [
  { name: 'desc', style: 'min-width: 160px; width: 160px', align: 'left', label: 'Name', field: 'name' },
  { name: 'y', style: 'min-width: 200px; width: 200px', align: 'left', label: 'Teil', field: 'y' },
  { name: 'sliced', align: 'center', label: 'Sliced - true | false (default: empty)', field: 'sliced' },
  { name: 'selected', align: 'center', label: 'Selected - true | false (default: empty)', field: 'selected' }
]

var rows = [
    {
        name: 'Chrome',
        y: 61.41,
        sliced: true,
        selected: true
    }, {
        name: 'Internet Explorer',
        y: 11.84
    }, {
        name: 'Firefox',
        y: 10.85
    }, {
        name: 'Edge',
        y: 4.67
    }, {
        name: 'Safari',
        y: 4.18
    }, {
        name: 'Sogou Explorer',
        y: 1.64
    }, {
        name: 'Opera',
        y: 1.6
    }, {
        name: 'QQ',
        y: 1.2
    }, {
        name: 'Other',
        y: 2.61
    }
]
const store = useKuchenStore()
const $q = useQuasar()
export default defineComponent({
  name: 'KuchenPage',
  components: {
    KuchenDiagram
  },
  setup(){
    const $q = useQuasar()
    const store = useKuchenStore()
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
          var metho; 
          var metho2; 
          if(this.newSliced == 'true'){
            metho = true
          } else if (this.newSliced == 'false'){
            metho = false
          } else {
            metho = null
          }
          if(this.newSelected == 'true'){
            metho2 = true
          } else if (this.newSelected == 'false'){
            metho2 = false
          } else {
            metho2 = null
          }
          rows.push({
            name: this.newName,
            y: this.newList,
            sliced: metho,
            selected: metho2 
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
        this.series[0].data = []
        for(let i = 0; i < rows.length; i++){
          try{
            this.series[0].data.push({
                name: rows[i].name,
                y: parseInt(rows[i].y),
                sliced: rows[i].sliced,
                selected: rows[i].selected 
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

        store.chart = this.chart

        store.title = {
            text: this.title.text
        }
        store.tooltip = this.tooltip

        store.accessibility = this.accessibility

        store.plotOptions = this.plotOptions

        store.series = this.series
        this.componentKey = uid()
    },
    generate(){
      this.code = true
    }
  },
  data () {
    return {
      rows,
      categories: ref(null),
      table: ref(false),
      table2: ref(false),
      table3: ref(false),
      code: false,
      newName: ref(null),
      newList: ref(null),
      newSliced: ref(null),
      newSelected: ref(null),
       chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares in January, 2018'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Chrome',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: 'Internet Explorer',
                y: 11.84
            }, {
                name: 'Firefox',
                y: 10.85
            }, {
                name: 'Edge',
                y: 4.67
            }, {
                name: 'Safari',
                y: 4.18
            }, {
                name: 'Sogou Explorer',
                y: 1.64
            }, {
                name: 'Opera',
                y: 1.6
            }, {
                name: 'QQ',
                y: 1.2
            }, {
                name: 'Other',
                y: 2.61
            }]
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
code {
    background-color: #eee;
    border-radius: 3px;
    font-family: courier, monospace;
    padding: 0 3px;
}
</style>