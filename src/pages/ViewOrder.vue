<template>
  <q-page padding>
    <BreadcrumbsTpl>
      <q-breadcrumbs-el label="Просмотр заявки"></q-breadcrumbs-el>
    </BreadcrumbsTpl>
    <q-skeleton v-if="state == 'loading'" type="text" height="100px" />
     <div class="q-pa-md">
      <q-card v-if="isViewClientResult" class="q-pa-md">
        <h5>{{info.clientResultView.title}}</h5>
        <p>
          {{info.clientResultView.desc}}
        </p>
      </q-card>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card  class="q-pa-md">
        <h5>Оригиналы документов</h5>
        <p>
          {{info.clientResultView.desc}}
        </p>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import BreadcrumbsTpl from 'components/BreadcrumbsTpl.vue'

export default {
  name: 'ViewOrder',
  components: {
    BreadcrumbsTpl
  },
  data: function () {
    return {
      id: this.$route.params.id,
      state: 'loading',
      info: null
    }
  },
  computed: {
    isViewClientResult: function () {
      return this.accessable('viewClientResult')
    }
  },
  mounted: function () {
    this.$store.dispatch('order/view', { id: this.id }).then(res => {
      this.state = res.payload.state
      this.info = res.payload
    })
  },
  methods: {
    accessable: function (key) {
      return this.info != null && this.info.actions.indexOf(key) > -1
    }
  }
}
</script>
