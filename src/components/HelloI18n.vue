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

    <h4>{{ $t('message') }}</h4>
    <h4>{{ $t('hello') }}</h4>
  </div>
</template>

<script>
import i18n from "@/i18n";

export default {
  name: 'HelloI18n',
  data() {
    return {
      selectedLanguage: 'en',
      languages: ['en', 'hi', 'fr'],
      i18n
    }
  },
  created() {
    this.selectedLanguage = localStorage.getItem('selectedLanguage') || 'en'
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
