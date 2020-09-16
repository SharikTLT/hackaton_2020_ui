<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar>
        <q-btn stretch flat to="/app"><q-toolbar-title>Нотариус</q-toolbar-title></q-btn>
        </q-toolbar>
        <q-btn flat style="float-right" @click="logOut">Выход</q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
  methods: {
    logOut: function () {
      this.$store.dispatch('client/logout')
    }
  }
}
</script>
