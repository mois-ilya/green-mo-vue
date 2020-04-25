<template>
  <v-app id="inspire">
    <Suggestion></Suggestion>

    <v-app-bar app clipped-left>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Suggestion from '@/components/Suggestion.vue'

export default {
  props: {
    source: String
  },
  components: {
    Suggestion
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden !important;
}
</style>
