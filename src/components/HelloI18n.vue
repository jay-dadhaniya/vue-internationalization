<template>
  <div>
    <h4>{{ $t('message') }}</h4>
    <h4>{{ $t('hello') }}</h4>
  </div>
</template>

<script>
export default {
  name: 'HelloI18n'
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
