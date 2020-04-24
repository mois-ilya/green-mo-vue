<template>
  <div id="home">
    <div v-if="loading" class="loading">Loading</div>

    <div v-if="error" class="error">{{ error }}</div>

    <MapBoxMap v-if="loaded" class="map"></MapBoxMap>
  </div>
</template>

<script>
import MapBoxMap from '@/components/MapBoxMap.vue'

export default {
  name: 'Home',
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

      fetch("./api/advice_to_plants.geojson")
        .then(x => x.json())
        .then((layer, err) => {
          this.loading = false;
          if (err) {
            this.error = err.toString();
          } else {
            this.$store.dispatch('setLayerAction', layer)
            this.loaded = true;
            // this.layer = layer;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#home{
  width: 100%;
  height: 100%;
}
</style>