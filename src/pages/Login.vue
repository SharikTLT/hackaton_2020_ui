<template>
  <q-page padding>
    <!-- content -->
    <!-- <div class="q-gutter-md" style="max-width: 300px"> -->
  <div class="window-height window-width row justify-center items-center">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h5">Login</div>
        <form>
            <q-input v-model="email" type="email" placeholder="E-Mail" required></q-input>
            <q-input v-model="password" type="password" placeholder="Password" required></q-input>
        </form>
      </q-card-section>

      <q-card-actions>
        <q-btn @click="login" type="submit">Login</q-btn>
      </q-card-actions>
    </q-card>
  </div>

    <!-- </div> -->
  </q-page>
</template>

<script>
export default {
  name: 'PageName',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('client/callLogin', {
        login: this.email,
        password: this.email
      })
    }
  }
}
</script>
