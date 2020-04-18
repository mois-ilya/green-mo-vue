<template>
  <div></div>
</template>

<script>
import Mapboxgl from "mapbox-gl";

export default {
  name: "Popup",
  props: {
    popup: Object,
    map: Object
  },
  mounted() {
    const description = `
            <strong>Название: #${this.popup.cartodb_id}</strong>
            <div>${this.popup.name}</div>

            <strong style="padding-top: 7px; display:block">Описание:</strong>
            <div style="word-wrap: break-word">${this.popup.description}</div>
            
            <strong style="padding-top: 7px; display:block">Зона ответственности:</strong>
            <div>${this.popup.place}</div>
            
            <strong style="padding-top: 7px; display:block">Что делать:</strong>
            <div>${this.popup.inAuthority}</div>
            
            <strong style="padding-top: 7px; display:block">Контакт:</strong>
            <div>${this.popup.contactText}</div>
        `;

    new Mapboxgl.Popup()
      .setLngLat(this.popup.coordinates)
      .setHTML(description)
      .on("close", () => {
        console.log("close");
        this.popup.visible = false;
      })
      .on("open", () => {
        console.log("open");
      })
      .addTo(this.map);
  }
};
</script>

<style lang="scss">
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: black;
}

.mapboxgl-popup-close-button {
    padding: 5px 10px;
    font-weight: bold;
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
