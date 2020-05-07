<template>
  <v-app id="inspire">

    <v-app-bar app clipped-left>
      <v-toolbar-title>Владимирский МО</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-text-field
        hide-details
        prepend-icon="search"
        single-line
        clearable
        width="200"
        @keydown.enter="test"
      ></v-text-field> -->
      <v-btn text @click="toggleEditMode">
        <v-icon v-if="!isEditable">mdi-pencil</v-icon>
        <v-icon v-if="isEditable">mdi-eye</v-icon>
      </v-btn>
      <v-btn text @click="saveXLS">
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import XlsExport from 'xlsexport';

export default {
  props: {
    source: String
  },
  data() {
    return {
      isGeolocate: false
    }
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
    },
    test() {
      alert('test')
    },
    saveXLS() {
      const data = this.$store.getters.layerForXLS;
      const xls = new XlsExport(data, `Данные о заявках на ${new Date()}`);

      xls.exportToXLS('Заявки на озеленение.xlsx');
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
