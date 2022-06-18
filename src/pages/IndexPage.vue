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
                    <q-btn no-caps flat class="rounded-borders" @click="goto('balken')">Zu Playground</q-btn>
                </q-card-actions>
            </q-card>
        </div>
        <div class="col">
            <q-card flat bordered class="my-card bg-grey-1">
                <q-card-section>
                    <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Blasendiagramme</div>
                    </div>
                    </div>
                </q-card-section>

                <q-card-section>
                    {{ lorem }}
                </q-card-section>

                <q-separator />

                <q-card-actions class="row justify-end">
                    <q-btn no-caps flat class="rounded-borders" @click="goto('bubble')">Zu Playground</q-btn>
                </q-card-actions>
            </q-card>
        </div>
    </div>
    <div class="container row q-mt-xl">
        <div class="col">
            <q-card flat bordered class="my-card bg-grey-1">
                <q-card-section>
                    <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Simple Balkendiagramme</div>
                    </div>
                    </div>
                </q-card-section>

                <q-card-section>
                    {{ lorem }}
                </q-card-section>

                <q-separator />

                <q-card-actions class="row justify-end">
                    <q-btn flat no-caps class="rounded-borders" @click="goto('simple-balken')">Zu Playground</q-btn>
                </q-card-actions>
            </q-card>
        </div>
        <div class="col q-mx-lg">
            <q-card flat bordered class="my-card bg-grey-1">
                <q-card-section>
                    <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Kuchendiagramm</div>
                    </div>
                    </div>
                </q-card-section>

                <q-card-section>
                    {{ lorem }}
                </q-card-section>

                <q-separator />

                <q-card-actions class="row justify-end">
                    <q-btn no-caps flat class="rounded-borders" @click="goto('kuchen')">Zu Playground</q-btn>
                </q-card-actions>
            </q-card>
        </div>
        <div class="col">
            <q-card flat bordered class="my-card bg-grey-1">
                <q-card-section>
                    <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Liniendiagramme</div>
                    </div>
                    </div>
                </q-card-section>

                <q-card-section>
                    {{ lorem }}
                </q-card-section>

                <q-separator />

                <q-card-actions class="row justify-end">
                    <q-btn no-caps flat class="rounded-borders" @click="goto('linien')">Zu Playground</q-btn>
                </q-card-actions>
            </q-card>
        </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import {ref} from 'vue'
import {uid, useQuasar} from 'quasar'
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
  setup(){
    const $q = useQuasar()
    return {
        $q
    }
  },
  mounted(){
    if(this.$q.localStorage.getItem("reloadOther") == 0){
        location.reload();
        this.$q.localStorage.set("reloadBalken", 0)
        this.$q.localStorage.set("reloadOther", 1)
    }
  }
})
</script>
<style scoped>
.main{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.container{
    width: 90vw;
    
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