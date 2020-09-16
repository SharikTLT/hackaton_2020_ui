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
          Загрузите сканы оригиналов документов.
        </p>
        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" label="Продолжить" />
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
          <q-btn @click="step = 4; payed = true" color="primary" label="Оплата"  />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Назад"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="4" title="Ожидание выполнения" icon="timer" active-icon="timer" :done="step > 3">
        Ваш заказ принят. Наши специалисты уже принялись за работу.

        <q-stepper-navigation>
          <q-btn color="primary" label="На главную" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>

  </q-page>
</template>

<script>
import title from './title'
import BreadcrumbsTpl from 'components/BreadcrumbsTpl.vue'

export default {
  name: 'CreateOrder',
  components: {
    BreadcrumbsTpl
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
    }
  },
  data: function () {
    return {
      languageFrom: null,
      languageTo: null,
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
      ]
    }
  },
  methods: {
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
    }
  }
}
</script>