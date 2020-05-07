<template>
  <v-bottom-sheet v-model="visibleSuggestion" inset hide-overlay>
    <v-sheet>
      <v-form ref="form">
        <v-row style="max-height: 60vh; overflow: auto">
          <v-col class="text-center" cols="1"></v-col>
          <v-col v-if="visibleSuggestion" class="text-center" cols="10">
            <v-toolbar-title class="font-weight-light">#{{suggestion.id}}</v-toolbar-title>
            <v-text-field
              :disabled="!isEditable"
              color="white"
              label="Название"
              v-model="suggestion.name"
            ></v-text-field>
            <v-textarea
              label="Описание"
              rows="1"
              placeholder="Описание отсутствует"
              :disabled="!isEditable"
              :value="suggestion.description"
              auto-grow
            ></v-textarea>
            <v-select
              :disabled="!isEditable"
              :items="responsibilityAreas"
              v-model="suggestion.place"
              item-text="title"
              item-value="name"
              label="Зона ответственности"
              persistent-hint
              return-object
            ></v-select>
            <v-select
              v-model="suggestion.category"
              :items="category"
              :disabled="!isEditable"
              item-text="value"
              item-value="key"
              label="Категория изменений"
              persistent-hint
              return-object
            ></v-select>
            <v-text-field
              :disabled="!isEditable"
              color="white"
              label="Контакт"
              placeholder="Контакт отсутсвует"
              v-model="suggestion.contact"
            ></v-text-field>
            <v-row align="center">
              <v-col class="text-center" cols="6" sm="6">
                <v-btn
                  text
                  large
                  right
                  v-if="isEditable"
                  @click="save"
                  :loading="loading"
                  :disabled="loading || !changed"
                >
                  <template>Сохраниять</template>

                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </template>
                  <template>
                    <v-icon light v-if="error">error</v-icon>
                  </template>
                </v-btn>
              </v-col>
              <v-col class="text-center" cols="6" sm="6">
                <v-btn text large right @click.stop="visibleSuggestion = false">Отменить</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import axios from "axios";
import "material-design-icons-iconfont/dist/material-design-icons.css";

export default {
  name: "Suggestion",
  data() {
    return {
      changed: true,
      loading: false,
      error: false,
    };
  },
  props: ["suggestionId"],
  computed: {
    suggestion() {
      return Object.assign({}, this.$store.getters.suggestion(this.suggestionId)); 
    },
    visibleSuggestion: {
      get: function() {
        return this.$store.getters.visibleSuggestion;
      },
      set: function(value) {
        this.$store.dispatch("toggleVisibleSuggestionAction", false);
      }
    },
    isEditable() {
      return this.$store.getters.isEditable;
    },
    category() {
      return this.$store.getters.category;
    },
    responsibilityAreas() {
      return this.$store.getters.responsibilityAreas;
    }
  },
  methods: {
    save() {
      this.loading = true;

      axios
        .post("./api/changeSuggestion", this.suggestion)
        .then(() => {
          this.loading = false;
          this.$store.dispatch("saveSuggestionAction", this.suggestion);
        })
        .catch(error => {
          this.loading = false;
          this.error = true;
        });
    }
  }
};
</script>

<style lang="scss">
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
