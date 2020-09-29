<template>
  <q-page padding>
    <BreadcrumbsTpl>
      <q-breadcrumbs-el label="Создать заявку"></q-breadcrumbs-el>
    </BreadcrumbsTpl>
    <h4>Нотариальный перевод документа</h4>
    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step
        :name="1"
        title="Выбор языка перевода"
        icon="language"
        :done="step > 1"
        :disable="payed"
        :header-nav="true"
      >
        <p>
          Выберите язык для перевода документов
        </p>
        <q-btn-dropdown :label="selectedLanguageName(languageFrom, 'Язык оригинала')">
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="type in languagesFrom"
              :key="type.code"
              @click="selectLanguageFrom(type)"
            >
              <q-item-section>
                <q-item-label>{{ type.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-icon name="keyboard_arrow_right" size="2rem" />
        <q-btn-dropdown :label="selectedLanguageName(languageTo, 'Язык перевода')">
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="type in languagesTo"
              :key="type.code"
              @click="selectLanguageTo(type)"
            >
              <q-item-section>
                <q-item-label>{{ type.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <div>
          <q-input label="Количество страниц" type="number" v-model.number="pages" style="width:200px" @change="e => {e.target.value = Math.max(1, e.target.value) }"/>
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Продолжить" v-bind:disable='!languageSelected' />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Загрузка документов"
        icon="cloud_upload"
        :done="step > 2"
        :disable="payed"
        :header-nav="true"
      >
        <p>
         Приложите сканы оригиналов документов.
        </p>
        <FilesUploader :bus="bus" :package="currentFilePack"/>
        <q-stepper-navigation>
          <q-btn :disable="filesSelected" @click="initUpload()" color="primary" label="Продолжить" />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Назад"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Оплата" icon="attach_money" :done="step > 3" :disable="payed" :header-nav="true">
        <h5 v-if="languageSelected">Стоимость перевода: {{ price }} руб.</h5>
        <q-stepper-navigation>
          <q-btn :disable="isSending" @click="createOrder(); payed = true" color="primary" label="Оплата"  />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Назад"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>

  </q-page>
</template>

<script>
import title from './title'
import BreadcrumbsTpl from 'components/BreadcrumbsTpl.vue'
import FilesUploader from 'components/FilesUploader.vue'
import Vue from 'vue'

const initialData = function () {
  const bus = new Vue()
  return {
    bus,
    packageId: null,
    languageFrom: {
      title: 'Английский',
      code: 'eng',
      price: 50
    },
    languageTo: {
      title: 'Русский',
      code: 'rus',
      price: 40
    },
    step: 1,
    pages: 1,
    payed: false,
    orderLaguages: [
      {
        title: 'Английский',
        code: 'eng',
        price: 50
      },
      {
        title: 'Русский',
        code: 'rus',
        price: 40
      },
      {
        title: 'Китайский',
        code: 'ch',
        price: 100
      },
      {
        title: 'Немецкий',
        code: 'de',
        price: 30
      }
    ],
    isSending: false
  }
}

export default {
  name: 'CreateOrder',
  components: {
    BreadcrumbsTpl,
    FilesUploader
  },
  meta: {
    title: title('Создание заявки')
  },
  computed: {
    languageSelected: function () {
      return this.languageFrom != null && this.languageTo != null
    },
    languagesTo: function () {
      return this.languageFrom != null ? this.orderLaguages.filter(lang => lang.code !== this.languageFrom.code) : this.orderLaguages
    },
    languagesFrom: function () {
      return this.languageTo != null ? this.orderLaguages.filter(lang => lang.code !== this.languageTo.code) : this.orderLaguages
    },
    price: function () {
      return this.languageSelected ? this.pages * (this.languageFrom.price + this.languageTo.price) : 0
    },
    currentFilePack: function () {
      const pack = this.$store.getters['attachment/getCurrentPack']
      if (pack.state === 'READY') {
        this.filesUploaded()
      }
      return pack
    },
    filesSelected: function () {
      return this.$store.getters['attachment/getCurrentPack'].files.length === 0
    }
  },
  data: function () {
    return initialData()
  },
  mounted: function () {
    this.resetData()
  },
  methods: {
    resetData: function () {
      const data = initialData()
      Object.keys(data).forEach(k => { this[k] = data[k] })
    },
    selectLanguageFrom: function (code) {
      this.languageFrom = code
    },
    selectLanguageTo: function (code) {
      this.languageTo = code
    },
    selectedLanguageName: function (lang, fallback) {
      return lang != null
        ? lang.title
        : fallback
    },
    filesUploaded: function () {
      this.step = 3
      console.log('files uploaded triggered')
    },
    initUpload: function () {
      if (this.currentFilePack.step !== 'ready') {
        this.bus.$emit('uploadFiles')
      } else {
        this.filesUploaded()
      }
    },
    createOrder: function () {
      this.isSending = true
      console.log('start sending')
      this.$store.dispatch('order/create', {
        languageFrom: this.languageFrom.code,
        languageTo: this.languageTo.code,
        pages: this.pages,
        filePackageOriginals: this.currentFilePack.remoteId
      })
        .then(value => {
          this.$store.commit('attachment/resetCurrentPackage')
          this.$router.push({ name: 'viewOrder', params: { id: value.payload.uuid } })
        })
        .catch(e => {
          console.error(e)
        }).finally(e => {
          this.isSending = false
        })
    }
  }
}
</script>
