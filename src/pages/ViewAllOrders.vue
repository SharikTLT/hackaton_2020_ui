<template>
  <q-page padding class="q-pa-md">
    <BreadcrumbsTpl>
      <q-breadcrumbs-el label="Просмотр заявки"></q-breadcrumbs-el>
    </BreadcrumbsTpl>
    <div >
      <q-card class="row q-pa-xs">
        <q-card-section class="col-12">
          <div class="text-h6">
            Title <q-badge outline color="blue">STATUS</q-badge>
          </div>
        </q-card-section>
        <q-card-section class="row">
        <q-btn>Просмотр</q-btn>
        </q-card-section>
      </q-card>
    </div>
    <q-pagination/>
  </q-page>
</template>

<script>
import BreadcrumbsTpl from 'components/BreadcrumbsTpl.vue'

export default {
  name: 'ViewAllOrders',
  components: {
    BreadcrumbsTpl
  },
  mounted: function () {

  },
  data: function () {
    return {}
  },
  computed: {
    getMyOrderListFull: function () {
      return this.$store.getters['order/']
    },
    ordersList: function () {
      return [{
        created: 'Label'
      }]
    }
  }
}
</script>
