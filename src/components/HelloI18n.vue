<template>
  <div>
    <h1>
      {{ $t('language_select_info') }}
    </h1>
    <div>
      <select v-model="selectedLanguage">
        <option v-for="lang in languages" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </select>
    </div>

    <div style="margin-top: 30px; font-size: larger">
      {{ $t("selected_language", { language: selected_language }) }}
    </div>

    <h4>{{ $t('message') }}</h4>
    <h4>{{ $t('hello') }}</h4>
  </div>
</template>

<script>
import i18n, { languages, selectedLocale } from "@/i18n";

export default {
  name: 'HelloI18n',
  data() {
    return {
      selectedLanguage: 'en',
      languages: [],
      languagesMap: {
        en: "English",
        fr: "French",
        hi: "Hindi",
      },
    }
  },

  computed: {
    selected_language() {
      return this.$t(this.languagesMap[this.selectedLanguage]);
    },
  },

  created() {
    this.languages = languages;
    this.selectedLanguage = localStorage.getItem('selectedLanguage') || selectedLocale || 'en'
    this.setLanguage(this.selectedLanguage)
  },

  watch: {
    selectedLanguage(value) {
      this.setLanguage(value)
    }
  },

  methods: {
    setLanguage(lang) {
      localStorage.setItem('selectedLanguage', lang)
      i18n.locale = this.selectedLanguage
    }
  }
}
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  },
  "hi": {
    "hello": "एसएफसी में नमस्ते i18n!"
  },
  "fr": {
    "hello": "Bonjour i18n dans SFC"
  }
}
</i18n>
