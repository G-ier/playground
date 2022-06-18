<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        
        <q-toolbar-title class="popreg">
          <router-link class="popreg text-white" :to="'/'" style="text-decoration: none;">Visualisierung Playground</router-link>
        </q-toolbar-title>

        <q-btn size="sm" color="white" text-color="primary" class="q-mr-md popreg" label="Rocketchat Kanal" target="_blank" href="https://acis-chat.dbis.rwth-aachen.de/" />
        <q-btn size="sm" color="white" text-color="primary" class="popreg" label="Copy Discord Tag" @click="copy"/>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { copyToClipboard } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'
import { useQuasar } from 'quasar'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const $q = useQuasar()

    return {
      essentialLinks: linksList,
      copy(){
        copyToClipboard('Discord Tag').then(() => {
          $q.notify({
            progress: true,
            message: 'Discord Tag kopiert',
            color: 'green'
          })
        }).catch(() => {
          $q.notify({
            progress: true,
            message: 'Kopieren schiefgegangen',
            color: 'red'
          })
        })
      }
    }
  }
})
</script>
