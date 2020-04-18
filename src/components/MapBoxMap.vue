<template>
  <div>
    <Legend :data="legend"></Legend>
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import Legend from '@/components/Legend.vue'
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
      map: false,
      legend: [
            {color: 'red', title: 'Город'},
            {color: 'green', title: 'Мо '}
        ]
    };
  },
  components: {
    Legend
  },
  props: ['layer'],
  mounted() {  
    const map = this.map = new Mapboxgl.Map({
      container: this.$refs['map'],
      style: "mapbox://styles/mapbox/light-v10",
      zoom: 13.5,
      center: pointCoordinates
    });

    const data = {
        type: this.layer.type,
        features: this.layer.features.filter(item => placeFilter ? item.properties.place == placeFilter : true)
    }

    this.legend = [... new Set(data.features.map(item => item.properties.place))].map(item => {
        const value = map_values.find(x => x.name == item);
        return {
            color: value.color,
            title: value.title
        };
    });

    map.on('load', () => {
        map.addSource('ethnicity', {
            type: 'geojson',
            data: data
        });

        map.addLayer({
            'id': 'population',
            'type': 'circle',
            'source': 'ethnicity',
            'paint': {
                'circle-radius': isTouch ? 9 : 7,
                'circle-color': {
                    property: 'place',
                    type: 'categorical',
                    stops: map_values.map(item => [item.name, item.color])
                }
            }
        });

        const point = idParam && data.features.find(x => x.properties.cartodb_id == idParam);
        point && map.flyTo({ center: point.geometry.coordinates });
        point && new Popup(point.properties, point.geometry.coordinates, map, map_inAuthority, showContacts, map_values);

        // map.on('click', 'population',  popupEventShow)

        map.on('mouseenter', 'population', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'population', function () {
            map.getCanvas().style.cursor = '';
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
