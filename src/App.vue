<template>
  <v-app id="inspire">

    <v-app-bar app clipped-left>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="toggleEditMode">
        <v-icon v-if="!isEditable">mdi-pencil</v-icon>
        <v-icon v-if="isEditable">mdi-eye</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  props: {
    source: String
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  computed: {
    isEditable() {
      return this.$store.getters.isEditable;
    }
  },
  methods: {
    toggleEditMode() {
      this.$store.dispatch("toggleEditModeAction");
    }
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
