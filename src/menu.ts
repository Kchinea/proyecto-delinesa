async function cargarMenu() {
  const res = await fetch('img/menu.json');
  const platos = await res.json();

  const menuList = document.getElementById('menu-list');
  if (!menuList) return;

  menuList.innerHTML = platos.map((plato: any) => `
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
}

document.addEventListener('DOMContentLoaded', cargarMenu);