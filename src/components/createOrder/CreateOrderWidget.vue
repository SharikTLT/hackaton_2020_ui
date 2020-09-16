<template>
  <q-card class="my-card col q-ma-md">
    <q-card-section>
      <div class="text-h6">Мои заявки</div>
    </q-card-section>
    <q-card-section>
      Заявок нет
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-btn to="/app/order/create">Создать заявку</q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'CreateOrderWidget',
  data () {
    return {}
  }
}
</script>
