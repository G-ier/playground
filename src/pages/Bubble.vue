<template>
  <q-page class="main q-pa-lg">
    <div class="angaben">
      <div class="row justify-center items-center">
        <div class="text-h5 popreg">
          Wähle die Optionen deines Charts manuell
        </div>
      </div>
      <q-separator />
      <div class="entry q-mt-xl ">
        <p class="text-p popreg">Blasendiagramm Metadata</p>
        <q-input standout="bg-grey text-white" class="q-mb-sm popreg" v-model="title.text" label="Titel" :dense="dense" />
        <q-input standout="bg-grey text-white" class="q-mb-sm popreg" v-model="subtitle.text" label="Untertitel" :dense="dense" />
        <div class="row justify-evenly items-center q-mt-md">
          <q-btn color="primary" no-caps label="Eigenschaften" class="col-3 q-mr-md popreg" @click="tablee = true"/>
          <q-btn color="primary" no-caps label="X Achse" class="col-3 q-mr-md popreg" @click="tablex = true"/>
          <q-btn color="primary" no-caps label="Y Achse" class="col-3 q-mr-md popreg" @click="tabley = true"/>
        </div>
        
        <p class="text-p q-ma-none q-mt-lg q-mb-xs popreg" style="padding: 0;">Blasen</p>
        
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
                    <q-td key="y" :props="props">
                      {{ props.row.y }}
                      <q-popup-edit v-model.number="props.row.y" auto-save v-slot="scope">
                        <q-input v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </q-td>
                    <q-td key="x" :props="props">
                      {{ props.row.x }}
                      <q-popup-edit v-model.number="props.row.x" auto-save v-slot="scope">
                        <q-input v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </q-td>
                    <q-td key="z" :props="props">
                      {{ props.row.z }}
                      <q-popup-edit v-model.number="props.row.z" auto-save v-slot="scope">
                        <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="desc" :props="props">
                      <div v-html="props.row.name"></div>
                      <q-popup-edit
                        buttons
                        v-model="props.row.name"
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

                    <q-td key="country" :props="props">
                      <div v-html="props.row.country"></div>
                      <q-popup-edit
                        buttons
                        v-model="props.row.country"
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
                <q-input dense standout="bg-grey text-white" label="Eigenschaft auf der X Achse" type="number" hint="*Zahl eingeben" v-model="newx" autofocus  />
                <q-input dense standout="bg-grey text-white" class="q-my-sm" type="number" label="Eigenschaft auf der Y Achse" hint="*Zahl eingeben" v-model="newy" autofocus  />
                <q-input dense standout="bg-grey text-white" class="q-my-sm" type="number" label="Eigenschaft 3" hint="*Zahl eingeben" v-model="newz" autofocus  />
                <q-input dense standout="bg-grey text-white" class="q-my-sm" label="Abkürzung" v-model="newName" autofocus  />
                <q-input dense standout="bg-grey text-white" class="q-my-sm" label="Title" v-model="newCountry" autofocus  />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat no-caps label="Abbrechen" class="popreg" v-close-popup />
              <q-btn flat no-caps label="Einfügen" class="popreg" @click="table3 = false; addNew()" />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="tablex" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                <div class="text-h6">X Axis</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                <q-input dense standout="bg-grey text-white" label="Titel" hint="*Titel heißt das, was auf der Achse steht" v-model="xAxis.plotLines[0].label.text" autofocus  />
                <q-input dense standout="bg-grey text-white" class="q-my-sm" label="Beschreibung" hint="*Beschreibung heißt das, was außen dem Diagramm steht" v-model="xAxis.title.text" autofocus  />
                <q-input dense standout="bg-grey text-white" class="q-my-sm" label="Einheit" hint="*Ändere den {value} nicht" v-model="xAxis.labels.format" autofocus  />
                <q-input dense standout="bg-grey text-white" class="q-my-sm" label="Color" hint="*Name der Farbe auf Englisch" v-model="xAxis.plotLines[0].color" autofocus  />
                <q-select standout="bg-grey text-white" dense v-model="xAxis.plotLines[0].dashStyle" :options="options" label="Line style" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Fertig" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="tabley" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                <div class="text-h6">Y Axis</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                <q-input dense standout="bg-grey text-white" label="Titel" hint="*Titel heißt das, was auf der Achse steht" v-model="yAxis.plotLines[0].label.text" autofocus  />
                <q-input dense standout="bg-grey text-white" class="q-my-sm" label="Beschreibung" hint="*Beschreibung heißt das, was außen dem Diagramm steht" v-model="yAxis.title.text" autofocus  />
                <q-input dense standout="bg-grey text-white" class="q-my-sm" label="Einheit" hint="*Ändere den {value} nicht" v-model="yAxis.labels.format" autofocus  />
                <q-input dense standout="bg-grey text-white" class="q-my-sm" label="Color" hint="*Name der Farbe auf Englisch" v-model="yAxis.plotLines[0].color" autofocus  />
                <q-select standout="bg-grey text-white" dense v-model="yAxis.plotLines[0].dashStyle" :options="options" label="Line style" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Fertig" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="tablee" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                <div class="text-h6">Y Axis</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                <q-input standout="bg-grey text-white" class="q-mb-sm popreg" v-model="tooltipgarbo.eig1" label="Eigenschaft 1" dense />
                <q-input standout="bg-grey text-white" class="q-mb-sm popreg" v-model="tooltipgarbo.eig2" label="Eigenschaft 2" dense />
                <q-input standout="bg-grey text-white" class="q-mb-sm popreg" v-model="tooltipgarbo.eig3" label="Eigenschaft 3" dense />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Fertig" v-close-popup />
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
      <BubbleDiagramm :key="componentKey"/>
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

                store.chart = {{store.chart}}

                store.title = {{store.title}}
                store.subtitle = {{store.subtitle}}

                store.accessibility = {{store.accessibility}}

                store.xAxis = {{store.xAxis}}

                store.yAxis = {{store.yAxis}}

                store.legend = {{store.legend}}

                store.tooltip = {{store.tooltip}}

                store.plotOptions = {{store.plotOptions}}

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
import BubbleDiagramm from '../components/BubbleDiagramm.vue'
import { useQuasar } from 'quasar'
import {useBubbleStore} from '../stores/bubblestore'
import {mapWritableState, mapState } from 'pinia'

const columns = [
  { name: 'y', align: 'left', label: 'Eigenschaft 2 (Achse Y)', field: 'y' }, 
  { name: 'x', align: 'left', label: 'Eigenschaft 1 (Achse X)', field: 'x' },
  { name: 'z', align: 'left', label: 'Eigenschaft 3', field: 'z' },
  { name: 'desc', style: 'min-width: 200px; width: 300px', align: 'left', label: 'Title Abkürzung', field: 'name' },
  { name: 'country', style: 'min-width: 200px; width: 300px', align: 'left', label: 'Title', field: 'country' }
]

var rows = [
    { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
    { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
    { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
    { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
    { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
    { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
    { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
    { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
    { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
    { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
    { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
    { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
    { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
    { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
    { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
]
const store = useBubbleStore()
const $q = useQuasar()
export default defineComponent({
  name: 'BubblePage',
  components: {
    BubbleDiagramm
  },
  setup(){
    const $q = useQuasar()
    const store = useBubbleStore()
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
            x: this.newx, y: this.newy, z: this.newz, name: this.newName, country: this.newCountry
          })
          this.newName = null;
          this.newCountry = null;
          this.newx = null;
          this.newy = null;
          this.newz = null;
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
        this.tooltip.pointFormat = '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
                '<tr><th>' + this.tooltipgarbo.eig1 +':</th><td>{point.x}g</td></tr>' +
                '<tr><th>' + this.tooltipgarbo.eig2 +':</th><td>{point.y}g</td></tr>' +
                '<tr><th>' + this.tooltipgarbo.eig3 +':</th><td>{point.z}%</td></tr>'
        for(let i = 0; i < rows.length; i++){

          try{
            this.series[0].data.push({
              x: rows[i].x,
              y: rows[i].y,
              z: rows[i].z,
              name: rows[i].name,
              country: rows[i].country
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
        store.subtitle = {
            text: this.subtitle.text

        }

        store.accessibility = this.accessibility

        store.xAxis = this.xAxis

        store.yAxis = this.yAxis

        store.legend = {
            enabled: this.legend.enabled
        }

        store.tooltip = this.tooltip

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
      rows: rows,
      categories: ref(null),
      xstyle: "",
      ystyle: "",
      newx: 0,
      newy: 0,
      newz: 0,
      newCountry: "",
      options: [
        "dot", "line"
      ],
      table: ref(false),
      table2: ref(false),
      table3: ref(false),
      tablex: ref(false),
      tabley: ref(false),
      tablee: ref(false),
      code: false,
      newName: ref(null),
      newList: ref(null),

      tooltipgarbo: {
        eig1: "Fat intake" ,
        eig2: "Sugar intake",
        eig3: "Obesity (adults)"
      },

      chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {
            enabled: false
        },

        title: {
            text: 'Sugar and fat intake per country'
        },

        subtitle: {
            text: 'Source: <a href="http://www.euromonitor.com/">Euromonitor</a> and <a href="https://data.oecd.org/">OECD</a>'
        },

        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
            }
        },

        xAxis: {
            gridLineWidth: 1,
            title: {
                text: 'Daily fat intake'
            },
            labels: {
                format: '{value} gr'
            },
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 65,
                label: {
                    rotation: 0,
                    y: 15,
                    style: {
                        fontStyle: 'italic'
                    },
                    text: 'Safe fat intake 65g/day'
                },
                zIndex: 3
            }],
            accessibility: {
                rangeDescription: 'Range: 60 to 100 grams.'
            }
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Daily sugar intake'
            },
            labels: {
                format: '{value} gr'
            },
            maxPadding: 0.2,
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 50,
                label: {
                    align: 'right',
                    style: {
                        fontStyle: 'italic'
                    },
                    text: 'Safe sugar intake 50g/day',
                    x: -10
                },
                zIndex: 3
            }],
            accessibility: {
                rangeDescription: 'Range: 0 to 160 grams.'
            }
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
                '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
                '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
                '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },

        series: [{
            data: [
                { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
                { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
                { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
                { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
                { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
                { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
                { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
                { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
                { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
                { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
                { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
                { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
                { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
                { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
                { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
            ]
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
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  overflow: scroll;
  height: 100%;
}
 /* Hide scrollbar for Chrome, Safari and Opera */
.angaben::-webkit-scrollbar {
  display: none;
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