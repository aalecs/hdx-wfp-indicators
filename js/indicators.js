var config = {};

    config.colors = lg.colors(['#B8DBFE','#89C3FD','#59ABFD','#2A93FC','#206ED7','#154AB1','#0B258C','#000066']);

    config.countries = [{name:'Guinea',code:106,adm:1},
        {name:'Liberia',code:144,adm:1},
        {name:'Iraq',code:118,adm:1},
        {name:'Sierra Leone',code:221,adm:2},
        //{name:'Yemen',code:269,adm:1}
    ];

    var percentAccessor = function(d){
        if(isNaN(d)){
            return d;
        } else {
            return Math.round(d*100)+'%';
        }
    }

    config.columns = [{
        heading:'rCSI',
        display:'Reduced Coping Strategy',
        domain:[0,20],
        labelAccessor:function(d){
            return d;
        }
    },
    {
        heading:'FCG',
        display:'food consumption group',
        domain:[0,20],
        labelAccessor:function(d){
            return d;
        }
    },
    {
        heading:'BorrowOrHelp>=1',
        display:'% getting help or borrowing',
        domain:[0,1],
        labelAccessor:percentAccessor
    }/*,
    {
        heading:'rCSI>=1',
        display:'% using coping strategies',
        domain:[0,1]
    }*/,
    {
        heading:'ReduceNumMeals>=1',
        display:'% reducing meals',
        domain:[0,1],
        labelAccessor:percentAccessor
    },
    {
        heading:'RestrictConsumption>=1',
        display:'% restricting consumption',
        domain:[0,1],
        labelAccessor:percentAccessor
    },
    {
        heading:'LimitPortionSize>=1',
        display:'% limiting portion size',
        domain:[0,1],
        labelAccessor:percentAccessor
    },
    {
        heading:'LessExpensiveFood>=1',
        display:'% buying less expensive food',
        domain:[0,1],
        labelAccessor:percentAccessor
    }];

var dataStoreID = '14fa16fe-b4c3-4068-8b38-6ad8c3e75a59';

function initMap(){
    
    var base1 = L.tileLayer(
            'https://data.hdx.rwlabs.org/mapbox-base-tiles/{z}/{x}/{y}.png',{
            attribution: '&copy; OpenStreetMap contributors'}
    );

    var base2 = L.tileLayer(
        'https://data.hdx.rwlabs.org/mapbox-layer-tiles/{z}/{x}/{y}.png',{
            attribution: '&copy; OpenStreetMap contributors'}
    );
          
    var topmap = L.map('wfp-viz-map', {
        center: [0,0],
        zoom: 3,
        layers: [base1,base2]
    });
    
    topmap.scrollWheelZoom.disable();

    var info = L.control();

    info.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'wfp-viz-mapinfo');
        return div;
    };

    info.addTo(topmap);    
    $('.wfp-viz-mapinfo').html('Click country for indicator data');
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
            layer.on('mouseover',function(e){
                $('.wfp-viz-mapinfo').html('Click to see indicators for '+feature.properties.ADM0_NAME);
            });
            layer.on('mouseout',function(e){
                $('.wfp-viz-mapinfo').html('Click country for indicator data');
            });            
            layer.on('click', function (e) {
                initCountry(feature);
            });
        }  
    }).addTo(topmap);    
}

function initCountry(feature){
    $('#wfp-viz-maplayer').slideUp(function(){
        $('#wfp-viz-gridmap').html('<p id="wfp-viz-loading">Loading...</i>')
        $('#wfp-viz-gridlayer').show();
    });
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
    data.forEach(function(d){
        if(variables.indexOf(d['Variable'])!=-1&&sac[d[admcode]]!=undefined){
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
        columns.push(new lg.column(c['heading']).label(c['display']).domain(c['domain']).labelAccessor(c['labelAccessor']));
    });

    lg.colors = config.colors;

    var gridmap = new lg.map('#wfp-viz-gridmap').geojson(geom).nameAttr(admname).joinAttr(admcode).zoom(1).center([0,0]);

    var grid = new lg.grid('#wfp-viz-grid')
        .data(data)
        .width($('#wfp-viz-grid').width())
        .height(650)
        .nameAttr('name')
        .joinAttr('joinID')
        .hWhiteSpace(5)
        .vWhiteSpace(10)
        .columns(columns)
        .labelAngle(65)
        .margins({top: 200, right: 50, bottom: 20, left: 120});

    lg.init();

    bottommap = gridmap.map();

    var baselayer2 = L.tileLayer('https://data.hdx.rwlabs.org/mapbox-layer-tiles/{z}/{x}/{y}.png', {});

    baselayer2.addTo(bottommap);

    zoomToGeom(geom);

    function zoomToGeom(geom){
        var bounds = d3.geo.bounds(geom);
        bottommap.fitBounds([[bounds[0][1],bounds[0][0]],[bounds[1][1],bounds[1][0]]]);
    }    
}

var topmap = initMap();
var bottommap;
addCountriesToMap(config.countries);

$('#wfp-viz-returnmap').on('click',function(e){
    $('#wfp-viz-grid').html('');
    $('#wfp-viz-gridlayer').hide();
    lg._gridRegister = [];
    bottommap.remove();

    $('#wfp-viz-maplayer').slideDown();
});