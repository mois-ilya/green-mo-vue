<template>
  <div>
    <div id="state-legend" class="legend">
      <h4>Зона ответственности</h4>
    </div>
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import Mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
Mapboxgl.accessToken =
  "pk.eyJ1IjoibW9pcy1pbHlhIiwiYSI6ImNrMXN6eGZhMzBhMzMzZ3J1c2o5eHRpZHkifQ.FLDN8SJE1R8asDEvcXHizQ";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const placeFilter = urlParams.get('placeFilter') || urlParams.get('street'); // street depricated
const idParam = urlParams.get('id');
const showContacts = urlParams.get('showContacts') == 'true';
const pointCoordinates =  [30.345591, 59.924];
const isTouch = "ontouchstart" in window

const map_inAuthority = {
    "мелкий": "Мелкий саженец цветы, кусты, земля и т.д.",
    "деревья": "Деревья",
    "вертикаль": "Вертикальное озеленение",
    "благоустройство": "Благоустройство",
    "элемент": "Любой элемент благоустройства"
}

const map_values = [
    {
        name: "мо",
        title: "ЗНОП местного значения",
        color: "greenyellow"
    },
    {
        name: "район",
        title: "Центральный район",
        color: "green"
    },
    {
        name: "город",
        title: "ЗНОП городского значения",
        color: "yellow"
    },
    {
        name: "улица",
        title: "Улица",
        color: "purple"
    },
    {
        name: "дом",
        title: "Собственность дома",
        color: "pink"
    },
    {
        name: "хз",
        title: "Нерелевантные запросы",
        color: "gray"
    }
];

export default {
  name: "MapBoxMap",
  data() {
    return {
      map: false
    };
  },
  mounted() {    
    this.map = new Mapboxgl.Map({
      container: this.$refs['map'],
      style: "mapbox://styles/mapbox/light-v10",
      zoom: 13.5,
      center: pointCoordinates
    });
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

.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.filter-group {
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  border-radius: 3px;
  width: 120px;
  color: #fff;
}

.filter-group input[type="checkbox"]:first-child + label {
  border-radius: 3px 3px 0 0;
}

.filter-group label:last-child {
  border-radius: 0 0 3px 3px;
  border: none;
}

.filter-group input[type="checkbox"] {
  display: none;
}

.filter-group input[type="checkbox"] + label {
  background-color: #3386c0;
  display: block;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

.filter-group input[type="checkbox"] + label {
  background-color: #3386c0;
  text-transform: capitalize;
}

.filter-group input[type="checkbox"] + label:hover,
.filter-group input[type="checkbox"]:checked + label {
  background-color: #4ea0da;
}

.filter-group input[type="checkbox"]:checked + label:before {
  content: "✔";
  margin-right: 5px;
}
</style>
