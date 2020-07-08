<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left>
      <v-toolbar-title class="title">Владимирский МО</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-text-field
        hide-details
        prepend-icon="search"
        single-line
        clearable
        width="200"
        @keydown.enter="test"
      ></v-text-field>-->
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
import xlsx from "xlsx";
import { saveAs } from "file-saver";

export default {
  props: {
    source: String
  },
  data() {
    return {
      isGeolocate: false
    };
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
      alert("test");
    },
    saveXLS() {
      const data = this.$store.getters.layerForXLS;

      const wb = xlsx.utils.book_new();
      wb.Props = {
        Title: "SheetJS Tutorial",
        Subject: "Test",
        Author: "Red Stapler",
        CreatedDate: new Date(2017, 12, 19)
      };

      wb.SheetNames.push("Test Sheet");
      const ws_data = data;
      const ws = xlsx.utils.aoa_to_sheet(ws_data);
      wb.Sheets["Test Sheet"] = ws;
      const wbout = xlsx.write(wb, { bookType: "xlsx", type: "binary" });
      function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }

      saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        "test.xlsx"
      );
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

.title {
  user-select: none; 
}
</style>
