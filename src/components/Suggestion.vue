<template>
  <v-bottom-sheet v-model="drawer" inset hide-overlay>
    <v-sheet>
      <v-row style="max-height: 60vh; overflow: auto">
        <v-col class="text-center" cols="1"></v-col>
        <v-col class="text-center" cols="10">
          <v-toolbar-title class="font-weight-light">#{{suggestion.id}}</v-toolbar-title>
          <v-text-field
            :disabled="!isEditing"
            color="white"
            label="Название"
            v-model="suggestion.name"
          ></v-text-field>
          <v-textarea
            label="Описание"
            rows="1"
            :disabled="!isEditing"
            :value="suggestion.description"
            auto-grow
          ></v-textarea>
          <v-select
            :disabled="!isEditing"
            v-model="suggestion.place"
            :items="responsibilityAreas"
            item-text="title"
            item-value="name"
            label="Зона ответственности"
            persistent-hint
            return-object
            single-line
          ></v-select>
          <v-select
            v-model="suggestion.category"
            :items="category"
            :disabled="!isEditing"
            item-text="value"
            item-value="key"
            label="Категория изменений"
            persistent-hint
            return-object
            single-line
          ></v-select>
          <v-text-field
            :disabled="!isEditing"
            color="white"
            label="Контакт"
            v-model="suggestion.contactText"
          ></v-text-field>
          <v-row align="center">
            <v-col class="text-center" cols="6" sm="6">
              <v-btn v-if="isEditing" text large right>Сохраниять</v-btn>
            </v-col>
            <v-col class="text-center" cols="6" sm="6">
              <v-btn text large right @click.stop="drawer = !drawer">Отменить</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>

export default {
  name: "Suggestion",
  computed: {
    drawer: {
      get: function() {
        return this.$store.getters.suggestion.visible;
      },
      set: function(value) {
        this.$store.getters.suggestion.visible = value;
      }
    },
    suggestion() {
      return this.$store.getters.suggestion;
    },
    isEditing() {
      return this.$store.getters.isEditing;
    },
    category() {
      return this.$store.getters.category;
    },
    responsibilityAreas() {
      return this.$store.getters.responsibilityAreas;
    }
  }
};
</script>

<style lang="scss">
</style>
