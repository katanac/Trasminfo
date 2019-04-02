var db = new loki('trasmilenio.db', {
  autoload: true,
  autoloadCallback : databaseInitialize,
  autosave: true, 
  autosaveInterval: 4000
});
    var estaciones = db.addCollection('estaciones');

    
    function databaseInitialize() {
      if (!db.getCollection('estaciones')) {
        db.addCollection('estaciones');
      }
    }

    $.ajax({
      method: "POST",
      data: '{"resource_id":"d0775af7-1706-4404-8bea-387194287d73","q":"","filters":{},"limit":1000,"offset":0}',
      url: "http://datosabiertos.bogota.gov.co/api/3/action/datastore_search",

    })
      .done(function (data) {

        data.result.records.forEach(item => {
          estaciones.insert({
            Estacion: item.Name,
            Troncal: item.Corredor,
            Codigo: item.Id,
            LatLon: { Lat: item.Latitud, Lon: item.Longitud },
            Rutas:[]
          });
        });
        
      });



    function Ver(darta) {
        document.getElementById(darta).innerHTML = '';
        const app = document.getElementById(darta);
        const container = document.createElement('div');
        container.setAttribute('class', 'container');
        app.appendChild(container);
        container.innerHTML = '';
       estaciones.find({'Troncal': darta}).forEach(item => {
        const card = document.createElement('ul');
        card.setAttribute('class', 'card');
        const li = document.createElement('li');
        li.textContent = item.Estacion;
        container.appendChild(card);
        card.appendChild(li);
      });
      
    }
    function VerMuseo(darta) {
        document.getElementById(darta).innerHTML = '';
        const app = document.getElementById(darta);
        const container = document.createElement('div');
        container.setAttribute('class', 'container');
        app.appendChild(container);
        container.innerHTML = '';
       estaciones.find({'Estacion': darta}).forEach(item => {
        const card = document.createElement('ul');
        card.setAttribute('class', 'card');
        const li = document.createElement('li');
        li.textContent = item.Estacion;
        container.appendChild(card);
        card.appendChild(li);
      });
      
    }

    function Buscar() {
        var palabra = document.getElementById('troncalBuscada').value;
        document.getElementById('busquedaIngresada').innerHTML = '';
        const app = document.getElementById('busquedaIngresada');
        const container = document.createElement('div');
        container.setAttribute('class', 'container');
        app.appendChild(container);
        container.innerHTML = '';
       estaciones.find({'Troncal': palabra}).forEach(item => {
        const card = document.createElement('ul');
        card.setAttribute('class', 'card');
        const li = document.createElement('li');
        li.textContent = item.Estacion;
        container.appendChild(card);
        card.appendChild(li);
      });
      
    }