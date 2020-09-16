<template>
  <q-breadcrumbs class="q-ma-lg">
    <q-breadcrumbs-el label="Главная" to="/app"/>
    <slot></slot>
  </q-breadcrumbs>
</template>

<script>
export default {
  name: 'BreadcrumbsTpl',
  data () {
    return {}
  }
}
</script>
