<template>
  <div>
    <Popup
      v-if="popup.visible"
      :map="map"
      :popup="popup"
    ></Popup>
    <Legend :data="legend"></Legend>
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import Legend from "@/components/Legend.vue";
import Popup from "@/components/Popup.vue";
import Mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
Mapboxgl.accessToken =
  "pk.eyJ1IjoibW9pcy1pbHlhIiwiYSI6ImNrMXN6eGZhMzBhMzMzZ3J1c2o5eHRpZHkifQ.FLDN8SJE1R8asDEvcXHizQ";

const queryString = window.location.search;
const pointCoordinates = [30.345591, 59.924];
const isTouch = "ontouchstart" in window;

const map_inAuthority = {
  мелкий: "Мелкий саженец цветы, кусты, земля и т.д.",
  деревья: "Деревья",
  вертикаль: "Вертикальное озеленение",
  благоустройство: "Благоустройство",
  элемент: "Любой элемент благоустройства"
};

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
      map: false,
      legend: null,
      popup: {
        visible: false
      }
    };
  },
  components: {
    Legend,
    Popup
  },
  props: ["layer"],
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
      const value = map_values.find(x => x.name == item);
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
            stops: map_values.map(item => [item.name, item.color])
          }
        }
      });

      map.on("click", "population", e => {
        const feature = e.features[0];
        const properties = feature.properties;
        const coordinates = feature.geometry.coordinates.slice();

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        debugger

        this.popup.coordinates = coordinates;
        this.popup.cartodb_id = properties.cartodb_id;
        this.popup.name = properties.name;
        this.popup.place = map_values.find(item => item.name == properties.place).title;
        this.popup.inAuthority = map_inAuthority[properties.inAuthority];
        this.popup.contactText = properties.contact || "Контакт отсутсвует";
        this.popup.description = properties.description || "Описание отсутствует";
        this.popup.visible = true;
      });

      map.on("mouseenter", "population", function() {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "population", function() {
        map.getCanvas().style.cursor = "";
      });
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
</style>
