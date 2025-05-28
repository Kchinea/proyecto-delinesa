"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function cargarMenuVegano() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('img/menu.json');
        const platos = yield res.json();
        const menuList = document.getElementById('menu-list');
        if (!menuList)
            return;
        // Solo platos veganos
        const platosFiltrados = platos.filter((plato) => plato.vegano);
        menuList.innerHTML = platosFiltrados.map((plato) => `
    <div class="column is-12-mobile is-6-tablet is-4-desktop">
      <div class="card mb-4">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${plato.imagen}" alt="${plato.nombre}">
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-4 has-text-delinesa-green">${plato.nombre}</p>
          <p class="subtitle is-6">${plato.descripcion}</p>
          <p class="has-text-weight-bold has-text-delinesa-orange">€${plato.precio.toFixed(2)}</p>
        </div>
      </div>
    </div>
  `).join('');
    });
}
document.addEventListener('DOMContentLoaded', cargarMenuVegano);
