<template>
  <q-page padding>
    <!-- content -->
    <q-skeleton height="200px" type="rect" v-if="modules.length == 0"/>
    <div class="q-pa-md row items-start q-gutter-md">
      <div class="row">
        <CreateOrderWidget v-if="available('CREATE_ORDER')"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import title from './title'
import CreateOrderWidget from 'components/createOrder/CreateOrderWidget.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    CreateOrderWidget
  },
  meta: {
    title: title('Главная')
  },
  computed: {
    modules: function () {
      return this.$store.getters['client/modules']
    }
  },
  mounted: function () {
    this.loadModules()
  },
  methods: {
    available: function (key) {
      return this.modules.includes(key)
    },
    ...mapActions({
      loadModules: 'client/loadModules'
    })
  }
}
</script>
