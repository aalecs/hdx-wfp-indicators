var config = {};

    config.colors = lg.colors(['#B8DBFE','#89C3FD','#59ABFD','#2A93FC','#206ED7','#154AB1','#0B258C','#000066']);

    config.countries = [{name:'Guinea',code:106,adm:1},
        {name:'Liberia',code:144,adm:1},
        {name:'Iraq',code:118,adm:1},
        {name:'Sierra Leone',code:221,adm:2},
        {name:'Yemen',code:269,adm:1}
    ];

    config.columns = [{
        heading:'rCSI',
        display:'Reduced Coping Strategy',
        domain:[0,25]
    },
    {
        heading:'BorrowOrHelp>=1',
        display:'A household borrows or helps 1 or more times per week',
        domain:[0,1]
    },
    {
        heading:'rCSI>=1',
        display:'A household borrows or helps 1 or more times per week',
        domain:[0,1]
    },
    {
        heading:'ReduceNumMeals>=1',
        display:'A household borrows or helps 1 or more times per week',
        domain:[0,1]
    },
    {
        heading:'RestrictConsumption>=1',
        display:'A household borrows or helps 1 or more times per week',
        domain:[0,1]
    },
    {
        heading:'LimitPortionSize>=1',
        display:'A household borrows or helps 1 or more times per week',
        domain:[0,1]
    },
    {
        heading:'LessExpensiveFood>=1',
        display:'A household borrows or helps 1 or more times per week',
        domain:[0,1]
    }];

var dataStoreID = '14fa16fe-b4c3-4068-8b38-6ad8c3e75a59';

function initMap(){
    
    var base_osm = L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: '&copy; OpenStreetMap contributors'}
    );
          
    var topmap = L.map('map', {
        center: [0,0],
        zoom: 2,
        layers: [base_osm]
    });
    
    topmap.scrollWheelZoom.disable();
    
    return topmap;
}

function addCountriesToMap(countries){
    
    var world_style = {
        color: '#fff',
        fillColor: '#2a93fc',
        fillOpacity:0.8,
        opacity:0.8,
        weight:1
    };
    
    var world = topojson.feature(un_world, un_world.objects.un_world);
    var countryCodes = [];
    countries.forEach(function(d){
        countryCodes.push(d.code);
    });

    for(i = world.features.length-1; i >= 0; i--){
        if( $.inArray(world.features[i].properties.ADM0_CODE, countryCodes ) === -1 ){
            world.features.splice(i, 1);
        }        
    }
    
    var overlay_world = L.geoJson(world.features,{
        style:world_style,
        onEachFeature: function(feature, layer){
            layer.on('click', function (e) {
                initCountry(feature);
            });
        }  
    }).addTo(topmap);    
}

function initCountry(feature){
    $('#maplayer').slideUp();
    var sql =''
    config.countries.forEach(function(c){
        if(Number(feature.properties.ADM0_CODE)*1==Number(c.code)*1){
            if(c.adm==1){
                sql = 'SELECT * FROM "748b40dd-7bd3-40a3-941b-e76f0bfbe0eb" WHERE "ADM0_CODE"=\''+feature.properties.ADM0_CODE+ '\' AND "ADM1_CODE"<>\'\' AND "ADM2_CODE"=\'\' AND "ADM3_CODE"=\'\'';
            } else {
                sql = 'SELECT * FROM "748b40dd-7bd3-40a3-941b-e76f0bfbe0eb" WHERE "ADM0_CODE"=\''+feature.properties.ADM0_CODE+ '\' AND "ADM2_CODE"<>\'\' AND "ADM3_CODE"=\'\'';
            }
        }
    });
    console.log(sql);
    loadData(sql,feature.properties.ADM0_CODE);
}

function loadData(sql,countryID){
    
    var data = encodeURIComponent(JSON.stringify({sql: sql}));

    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: 'https://data.hdx.rwlabs.org/api/3/action/datastore_search_sql',
      data: data,
      success: function(data) {
          loadGeo(countryID,data.result.records);
      }
    });
}

function loadGeo(countryID,data){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: 'data/'+countryID+'.geojson',
      success: function(geoData) {
          compileData(data,geoData,countryID);
      }
    });    
}

function compileData(data,geoData,countryID){
    var admcode = '';
    var admname = '';
    config.countries.forEach(function(c){
        if(Number(countryID)*1==Number(c.code)*1){
            if(c.adm==1){
                admcode = 'ADM1_CODE';
                admname = 'ADM1_NAME';
            } else {
                admcode = 'ADM2_CODE';
                admname = 'ADM2_NAME';
            };
        }
    });

    var sac = {};
    var gridData = [];
    geoData.features.forEach(function(f,i){
        sac[f.properties[admcode]] = i;
        var gd = {joinID:f.properties[admcode],name:f.properties[admname]};
        config.columns.forEach(function(c){
            gd[c['heading']] = 'No Data';
        });
        gridData.push(gd);
    });
    var variables = [];
    config.columns.forEach(function(c){
        variables.push(c['heading']);
    });
    console.log(sac);
    console.log(gridData);
    data.forEach(function(d){
        if(variables.indexOf(d['Variable'])!=-1){
            console.log(sac[d[admcode]]);
            gridData[sac[d[admcode]]][d['Variable']] = d['Mean'];
        }
    });
    initGrid(gridData,geoData,countryID);
}


function initGrid(data,geom,countryID){
    var admcode = '';
    var admname = '';
    config.countries.forEach(function(c){
        if(Number(countryID)*1==Number(c.code)*1){
            if(c.adm==1){
                admcode = 'ADM1_CODE';
                admname = 'ADM1_NAME';
            } else {
                admcode = 'ADM2_CODE';
                admname = 'ADM2_NAME';
            };
        }
    });

    var columns = [];
    config.columns.forEach(function(c){
        columns.push(new lg.column(c['heading']).label(c['heading']).domain(c['domain']));
    });

    lg.colors = config.colors;

    var gridmap = new lg.map('#gridmap').geojson(geom).nameAttr(admname).joinAttr(admcode).zoom(1).center([0,0]);

    var grid = new lg.grid('#grid')
        .data(data)
        .width($('#grid').width())
        .height(500)
        .nameAttr('name')
        .joinAttr('joinID')
        .hWhiteSpace(5)
        .vWhiteSpace(10)
        .columns(columns);

    lg.init();
}

var topmap = initMap();
addCountriesToMap(config.countries);