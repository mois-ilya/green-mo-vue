<template>
  <div id="state-legend" class="legend">
    <h4>Зона ответственности</h4>
    <div v-for="item in data" :key="item.title">
      <span :style="{backgroundColor: item.color}"></span>
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import Mapboxgl from "mapbox-gl";

export default {
  name: "Legend",
  computed: {
    data() {
      const responsibilityAreas = this.$store.getters.responsibilityAreas;
      const layer = this.$store.getters.layer;
      const places = layer.features.map(item => item.properties.place);
      const placesArray = [...new Set(places)];
      
      return placesArray.map(getObjTitleAndColor);

      function getObjTitleAndColor(typeName) {
        const value = responsibilityAreas.find(x => x.name == typeName);
        return {
          color: value.color,
          title: value.title
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
.legend {
  background-color: #fff;
  border-radius: 3px;
  bottom: 30px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  padding: 10px;
  position: absolute;
  right: 10px;
  z-index: 1;
  color: black;
}

.legend h4 {
  margin: 0 0 10px;
}

.legend div span {
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  margin-right: 5px;
  width: 10px;
}
</style>
