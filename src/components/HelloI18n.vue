<template>
  <div>
    <h1>
      {{ $t('language_select_info') }}
    </h1>
    <div>
      <select v-model="selectedLanguage" class="minimal">
        <option v-for="lang in languages" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </select>
    </div>

    <div style="margin-top: 30px; font-size: larger">
      {{ $t("selected_language", { language: selected_language }) }}
    </div>

    <p>{{ $tc('car', 0) }}</p>
    <p>{{ $tc('car', 1) }}</p>
    <p>{{ $tc('car', 10, { count: 10 }) }}</p>

    <h4>{{ $t('message') }}</h4>
    <h4 v-html="$t('hello')"></h4>

    <div class="hierarchy">
      <ul>
        <li>
          {{ $t("parent") }}
          <ul>
            <li>{{ $t("child") }} 1</li>
            <li>
              {{ $t("child") }} 2
              <ul>
                <li>{{ $t("parent.child.inner_child") }}</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
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
    "hello": "Hello <br>i18n in SFC!",
    "parent": "parent",
    "child": "child"
  },
  "hi": {
    "hello": "एसएफसी <br> में नमस्ते i18n!",
    "parent": "माता-पिता",
    "child": "बालक"
  },
  "fr": {
    "hello": "Bonjour <br> i18n dans SFC",
    "parent": "parent",
    "child": "enfant"
  }
}
</i18n>


<style scoped>
select {
  /* styling */
  background-color: white;
  border: thin solid blue;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.2em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select.minimal {
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
}

select.minimal:focus {
  background-image: linear-gradient(45deg, green 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, green 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

h1 {
  line-height: 100%;
  margin: 0 auto 2rem auto;
  max-width: 30rem;
  font-size: larger;
}

.hierarchy {
  line-height: 100%;
  margin: 0 auto 2rem auto;
  max-width: 15rem;
  font-size: larger;
  text-align: justify;
}
</style>
