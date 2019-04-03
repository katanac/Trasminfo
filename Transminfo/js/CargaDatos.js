var db = new loki('trasmilenio.db', {
  autoload: true,
  autoloadCallback : databaseInitialize,
  autosave: true, 
  autosaveInterval: 4000
});
    var estaciones = db.addCollection('estaciones');
    var vagones = db.addCollection('vagones');
    var rutas = db.addCollection('rutas');

    
    function databaseInitialize() {
      if (!db.getCollection('estaciones')) {
        db.addCollection('estaciones');
      }
      if (!db.getCollection('vagones')) {
        db.addCollection('vagones');
      }
      if (!db.getCollection('rutas')) {
        db.addCollection('rutas');
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
            NameEstacion: item.Name,
            Troncal: item.Corredor,
            idEstacion: item.Id,
            LatLon: { Lat: item.Latitud, Lon: item.Longitud }
          });
        });
        
      });


      vagones.insert([
        {idVagon:'Olaya1', Name:'1', NameEstacion:'Olaya'},
        {idVagon:'Olaya2', Name:'2', NameEstacion:'Olaya'},
        {idVagon:'Narino1', Name:'1', NameEstacion:'Nariño'},
        {idVagon:'Narino2', Name:'2', NameEstacion:'Nariño'},
        {idVagon:'Campina1',Name:'1', NameEstacion:'Campina'},
        {idVagon:'Campina2',Name:'2', NameEstacion:'Campina'},
        {idVagon:'Campina3',Name:'3', NameEstacion:'Campina'},
        {idVagon:'Campina4',Name:'4', NameEstacion:'Campina'},
        {idVagon:'tv911',Name:'1', NameEstacion:'Tv 91'},
        {idVagon:'tv912',Name:'1', NameEstacion:'Tv 91'},
        {idVagon:'tv913',Name:'1', NameEstacion:'Tv 91'},
        {idVagon:'tv914',Name:'1', NameEstacion:'Tv 91'}

      ]);

      rutas.insert([
        {idRuta:'16_H15', Name:'H15', idVagon:'Olaya2'},
        {idRuta:'15_H15', Name:'H15', idVagon:'Narino2'},
        {idRuta:'16_H21', Name:'H21', idVagon:'Olaya1'},
        {idRuta:'12_H73', Name:'H73', idVagon:'Olaya1'},
        {idRuta:'19_C19', Name:'C19', idVagon:'Campina4'},
        {idRuta:'2_B50', Name:'B50', idVagon:'Campina2'},
        {idRuta:'12_C50', Name:'B50', idVagon:'Campina3'},
        {idRuta:'2_C17', Name:'C17', idVagon:'Campina4'},
        {idRuta:'20_H17', Name:'H17', idVagon:'Campina1'},
        {idRuta:'2_F19', Name:'F19', idVagon:'Campina1'},
        {idRuta:'18_C29', Name:'C29', idVagon:'Campina1'},
        {idRuta:'2_7', Name:'7', idVagon:'Campina2'},
        {idRuta:'2_F29', Name:'F29', idVagon:'Campina1'},
        {idRuta:'2_G3O', Name:'G30', idVagon:'Campina3'},
        {idRuta:'16_C3O', Name:'C30', idVagon:'Campina2'},
        {idRuta:'2_J73', Name:'J73', idVagon:'Campina1'},
        {idRuta:'8_C73', Name:'C73', idVagon:'Campina3'},
        {idRuta:'3_7', Name:'7', idVagon:'tv912'},
        {idRuta:'17_C29', Name:'C29', idVagon:'tv914'},
        {idRuta:'3_F29', Name:'F29', idVagon:'tv911'},
        {idRuta:'3_J73', Name:'J73', idVagon:'tv911'},
        {idRuta:'7_C73', Name:'C73', idVagon:'tv913'},
        {idRuta:'3_G30', Name:'G30', idVagon:'tv912'},
        {idRuta:'15_C30', Name:'C30', idVagon:'tv913'},
        {idRuta:'3_F19', Name:'F19', idVagon:'tv911'},
        {idRuta:'18_C19', Name:'C19', idVagon:'tv914'},
        {idRuta:'3_B50', Name:'B50', idVagon:'tv911'},
        {idRuta:'11_C50', Name:'C50', idVagon:'tv914'}
      ]);

     

      var testArray = [{id:"Olaya",troncal:"Caracas",test:"1"}];

      function verVagones(dato_nombreEstacion){
        let vagones = db.getCollection('vagones');

        var vagonesFiltrados = $.grep(vagones.data,function(value){
          return value.NameEstacion == dato_nombreEstacion;
        });
         $.each(vagonesFiltrados,function(index,value){
          verRutas(value.idVagon);
        });
        
        //console.log(vagonesFiltrados);
      }


      function verRutas(dato_idVagon){

        let rutas = db.getCollection('rutas');

        var rutasFiltradas = $.grep(rutas.data,function(value){
          return value.idVagon == dato_idVagon;
        });
        console.log(rutasFiltradas);
        
        //$("#rutaspop").empty();
        var html = '';
        $.each(rutasFiltradas,function(index,value){
        html += `<div style="margin-top:10px"> <ul><li>' ${value.Name} '</li> <ul></div>`
        });
        $("#rutaspop").append(html);

      }

      //console.log(mostrarRutas('Olaya1'));

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
        li.textContent = item.NameEstacion;
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
        li.textContent = item.NameEstacion;
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