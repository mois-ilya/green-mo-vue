<template>
  <div id="home">
    <div v-if="loading" class="loading">Loading</div>

    <div v-if="error" class="error">{{ error }}</div>

    <MapBoxMap v-if="loaded" class="map"></MapBoxMap>
  </div>
</template>

<script>
import MapBoxMap from "@/components/MapBoxMap.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    MapBoxMap
  },
  data() {
    return {
      loading: false,
      loaded: false,
      error: null
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.error = this.layer = null;
      this.loading = true;

      axios
        .get("./api/advice_to_plants")
        .then(response => {
          this.$store.dispatch("setLayerAction", response.data);
          this.loading = false;
          this.loaded = true;
        })
        .catch(function(error) {
          this.loading = false;
          this.error = err.toString();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
}
</style>