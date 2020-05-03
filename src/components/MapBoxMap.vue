<template>
  <div>
    <Suggestion :suggestionId="suggestionId" :visibleSuggestion="visibleSuggestion"></Suggestion>
    <Legend :data="legend"></Legend>
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import Suggestion from "@/components/Suggestion.vue";
import Legend from "@/components/Legend.vue";
import Mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
Mapboxgl.accessToken =
  "pk.eyJ1IjoibW9pcy1pbHlhIiwiYSI6ImNrMXN6eGZhMzBhMzMzZ3J1c2o5eHRpZHkifQ.FLDN8SJE1R8asDEvcXHizQ";

const queryString = window.location.search;
const pointCoordinates = [30.345591, 59.924];
const isTouch = "ontouchstart" in window;

export default {
  name: "MapBoxMap",
  data() {
    return {
      map: false,
      legend: null,
      visibleSuggestion: false,
      suggestionId: null
    };
  },
  components: {
    Legend,
    Suggestion,
  },
  mounted() {
    const map = (this.map = new Mapboxgl.Map({
      container: this.$refs["map"],
      style: "mapbox://styles/mapbox/light-v10",
      zoom: 13.5,
      center: pointCoordinates
    }));

    const data = this.layer;

    this.legend = [
      ...new Set(data.features.map(item => item.properties.place))
    ].map(item => {
      const value = this.$store.getters.responsibilityAreas.find(
        x => x.name == item
      );
      return {
        color: value.color,
        title: value.title
      };
    });

    map.on("load", () => {
      map.addSource("ethnicity", {
        type: "geojson",
        data: data
      });

      map.addLayer({
        id: "population",
        type: "circle",
        source: "ethnicity",
        paint: {
          "circle-radius": isTouch ? 9 : 7,
          "circle-color": {
            property: "place",
            type: "categorical",
            stops: this.$store.getters.responsibilityAreas.map(item => [
              item.name,
              item.color
            ])
          }
        }
      });

      map.on("click", "population", e => {
        const feature = e.features[0];
        this.suggestionId = feature.properties.id;
        this.$store.dispatch("toggleVisibleSuggestionAction", true);
      });

      map.on("mouseenter", "population", function() {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "population", function() {
        map.getCanvas().style.cursor = "";
      });
    });
  },
  computed: {
    layer() {
      return this.$store.getters.layer;
    }
  }
};
</script>

<style scoped lang="scss">
body,
html,
.map {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
