<template>
  <q-card class="my-card col q-ma-md">
    <q-card-section>
      <div class="text-h6">Мои заявки <q-badge outline v-if="myOrdersCount !== null" color="blue">{{ myOrdersCount || 0 }}</q-badge></div>
    </q-card-section>
    <q-skeleton type="text" v-if="myOrdersCount == null"></q-skeleton>
    <q-card-section v-if="myOrdersCount == 0">
      Заявок нет
    </q-card-section>
    <q-card v-for="order in myOrderList" v-bind:key="order.uuid">
      <q-card-section >
        <router-link :to="{ name: 'viewOrder', params: { id: order.uuid } }">
          {{ formatDate(order.created) }} <q-badge color:="getStatusBadgeColor(order.state)">{{ order.statusDescription || order.status }}</q-badge>
        </router-link>
      </q-card-section>
    </q-card>
    <q-separator/>
    <q-card-section class="q-pt-none q-pa-md q-gutter-sm">
      <q-btn v-if="myOrdersCount > 0" v-on="showAllOrders()">Показать все</q-btn>
      <q-btn color="primary" to="/app/order/create">Создать заявку</q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'CreateOrderWidget',
  data () {
    return {}
  },
  computed: {
    myOrdersCount: function () {
      return this.$store.getters['order/myOrderCount']
    },
    myOrderList: function () {
      return this.$store.getters['order/myOrderList'].slice(0, 5)
    }
  },
  mounted: function () {
    this.$store.dispatch('order/getMyOrdersLight')
  },
  methods: {
    formatDate: function (ts) {
      return date.formatDate(ts, 'DD-MM-YYYY HH:mm')
    },
    getStatusBadgeColor: function (state) {
      return 'blue'
    },
    showAllOrders: function () {
      this.$router.push({ name: 'viewAllOrders' })
    }
  }
}
</script>
