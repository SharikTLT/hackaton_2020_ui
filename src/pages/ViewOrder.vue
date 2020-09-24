<template>
  <q-page padding>
    <BreadcrumbsTpl>
      <q-breadcrumbs-el label="Создать заявку"></q-breadcrumbs-el>
    </BreadcrumbsTpl>
    <h4>Статус заказа</h4>
     <q-skeleton v-if="state == 'loading'" :type="type"  height="100px"/>
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
  mounted: function () {
    this.$store.dispatch('order/view', { id: this.id }).then(res => {
      this.state = res.payload.state
      this.info = res.payload
    })
  }
}
</script>
