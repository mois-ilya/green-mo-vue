<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="layer" class="content">
      <h2>{{ layer }}</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import mapBoxMap from '@/components/mapBoxMap.vue'

export default {
  name: 'Home',
  components: {
    mapBoxMap
  },
  data() {
    return {
      loading: false,
      layer: null,
      error: null
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
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
            this.layer = layer;
          }
        });
    }
  }
};
</script>
