//fix labels

var config = {};

    config.colors = lg.colors(['#B8DBFE','#89C3FD','#59ABFD','#2A93FC','#206ED7','#154AB1','#0B258C','#000066']);

    config.countries = [{name:'Guinea',code:106,adm:1},
        {name:'Liberia',code:144,adm:1},
        {name:'Iraq',code:118,adm:1},
        {name:'Sierra Leone',code:221,adm:2},
        {name:'Yemen',code:269,adm:1}
    ];

var dataStoreID = '748b40dd-7bd3-40a3-941b-e76f0bfbe0eb';
var apiURL = 'https://data.hdx.rwlabs.org/api/3/action/datastore_search_sql';

var percentAccessor = function(d){
    if(isNaN(d)){
        return d;
    } else {
        return Math.round(d*100)+'%';
    }
}

var vanilla = function(d){
        return d;
    },
    round1 = function(d){
        var dataValue = parseFloat(d).toFixed(1);
        return dataValue;
    },
    round2 = function(d){
        var dataValue = parseFloat(d).toFixed(2);
        return dataValue;
    };

config.columns = [
    {
        heading:'rCSI',
        display:'rCSI Median',
        domain:[0,100],
        labelAccessor:round1,
        group:'Overview',
        value:'Median'
    },
    {
        heading:'rCSI>=1',
        display:'% using reduced coping mechanisms',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'Overview',
        value:'Mean'
    },    
    {
        heading:'FCG<=2',
        display:'% Poor+Borderline Food Consumption',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'Overview',
        value:'Mean'
    },   
    {
        heading:'FCG==1',
        display:'% Poor Food Consumption',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'Overview',
        value:'Mean'
    },    
    {
        heading:'Sentiment',
        display:'Perceptions of Food Security',
        domain:[-1,1],
        labelAccessor:vanilla,
        group:'Overview',
        value:'Median'
    },
    {
        heading:'rCSI',
        display:'rCSI Median',
        domain:[0,100],
        labelAccessor:round1,
        group:'rCSI',
        value:'Median'
    },
    {
        heading:'rCSI',
        display:'rCSI Mean',
        domain:[0,100],
        labelAccessor:round2,
        group:'rCSI',
        value:'Mean'
    },
    {
        heading:'rCSI>=1',
        display:'% using reduced coping mechanisms',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'rCSI',
        value:'Mean'
    },
    {
        heading:'BorrowOrHelp>=1',
        display:'% getting help or borrowing',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'rCSI',
        value:'Mean'
    },
    {
        heading:'ReduceNumMeals>=1',
        display:'% reducing meals',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'rCSI',
        value:'Mean'
    },
    {
        heading:'RestrictConsumption>=1',
        display:'% restricting consumption',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'rCSI',
        value:'Mean'
    },
    {
        heading:'LimitPortionSize>=1',
        display:'% limiting portion size',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'rCSI',
        value:'Mean'
    },
    {
        heading:'LessExpensiveFood>=1',
        display:'% buying less expensive food',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'rCSI',
        value:'Mean'
    },
    {
        heading:'FCS',
        display:'Mean Food Consumption Score',
        domain:[0,112],
        labelAccessor:round2,
        group:'FCS',
        value:'Mean'
    },
    {
        heading:'FCG==1',
        display:'Poor Food Consumption',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'FCS',
        value:'Mean'
    },
    {
        heading:'FCG==2',
        display:'Borderline Food Consumption',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'FCS',
        value:'Mean'
    },
    {
        heading:'FCG==3',
        display:'Acceptable Food Consumption',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'FCS',
        value:'Mean'
    },
    {
        heading:'Protein>=3',
        display:'Consuming Proteins 3 or more Days/Week',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'FCS',
        value:'Mean'
    },
    {
        heading:'Dairy>=3',
        display:'Consuming Dairy 3 or more Days/Week',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'FCS',
        value:'Mean'
    },
    {
        heading:'Staples>=3',
        display:'Consuming Staples 3 or more Days/Week',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'FCS',
        value:'Mean'
    },
    {
        heading:'Veg>=3',
        display:'Consuming Vegetables 3 or more Days/Week',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'FCS',
        value:'Mean'
    },
    {
        heading:'Sugars>=6',
        display:'Consuming Sugars 6 or more Days/Week',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'FCS',
        value:'Mean'
    },
    {
        heading:'HouseType==Camp',
        display:'% in Camp',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'Housing',
        value:'Mean'
    },
    {
        heading:'HouseType==Other',
        display:'% in Other',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'Housing',
        value:'Mean'
    },
    {
        heading:'HouseType==Own_home',
        display:'% in Own home',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'Housing',
        value:'Mean'
    },
    {
        heading:'HouseType==Public_building',
        display:'% in Public building',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'Housing',
        value:'Mean'
    },
    {
        heading:'HouseType==Rental',
        display:'% in Rental',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'Housing',
        value:'Mean'
    },
    {
        heading:'HouseType==Staying_with_someone_for_free',
        display:'% staying with someone for free',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'Housing',
        value:'Mean'
    },
    {
        heading:'HouseType==Unfinished_building',
        display:'% in unfinished building',
        domain:[0,1],
        labelAccessor:percentAccessor,
        group:'Housing',
        value:'Mean'
    }
];

/*function initMap(){
    
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
*/
function initCountry(ADM0_CODE){
    $('#wfp-viz-maplayer').slideUp(function(){
        $('#wfp-viz-gridmap').html('<p id="wfp-viz-loading">Loading...</i>')
        $('#wfp-viz-gridlayer').show();
    });
    var sql ='';
    config.countries.forEach(function(c){
        //if(Number(feature.properties.ADM0_CODE)*1==Number(c.code)*1){
        if(Number(ADM0_CODE)*1==Number(c.code)*1){
            if(c.adm==1){
                sql = 'SELECT * FROM "'+dataStoreID+'" WHERE "ADM0_CODE"=\''+ADM0_CODE+ '\' AND "ADM1_CODE"<>\'\' AND "ADM2_CODE"=\'\' AND "ADM3_CODE"=\'\' ORDER BY LENGTH("SvyYear"),"SvyYear", LENGTH("SvyMonthNum"),"SvyMonthNum"';
            } else {
                sql = 'SELECT * FROM "'+dataStoreID+'" WHERE "ADM0_CODE"=\''+ADM0_CODE+ '\' AND "ADM2_CODE"<>\'\' AND "ADM3_CODE"=\'\' AND ("CnfIntvHi"-"CnfIntvLo")/"Mean"<=0.12 ORDER BY LENGTH("SvyYear"), "SvyYear",LENGTH("SvyMonthNum"),"SvyMonthNum"';
            }
        }
    });
    loadData(sql,ADM0_CODE);
}

function filterRecords(records){
    var final = [];
    for (var i = 0; i < records.length; i++){
        var item = records[i];

        // implementing filtering by criteria (CnfIntvHi-CnfIntvLo)/Mean<=0.12 on the client side
        //    since the fields couldn't be altered on the datastore
        var cnfIntvHi = parseFloat(item.CnfIntvHi);
        var cnfIntvLo = parseFloat(item.CnfIntvLo);
        var mean = parseFloat(item.Mean);
        var value = (cnfIntvHi - cnfIntvLo) / mean;
        if (value <= 0.12){
            final.push(item);
        } else {
            //console.log("filtered:" + value);
        }
    }
    return final;
}

function loadData(sql,countryID){
    
    var data = encodeURIComponent(JSON.stringify({sql: sql}));

    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: apiURL,
      data: data,
      success: function(data) {
          console.time("filterRecords");
          var records = filterRecords(data.result.records);
          console.timeEnd("filterRecords");
          loadGeo(countryID,records);
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
    });
    var variables = [];
    var meanormedian = {};
    config.columns.forEach(function(c){
        variables.push(c['heading']);
        meanormedian[c['heading']] = c['value'];
    });
    var outputData = {};
    var dates = [];
    data.forEach(function(d){
        if(variables.indexOf(d['Variable'])!=-1&&sac[d[admcode]]!=undefined){
            if(dates.indexOf(d['SvyDate'])==-1){
                var gridData = [];
                geoData.features.forEach(function(f,i){
                    var gd = {joinID:f.properties[admcode],name:f.properties[admname]};
                    config.columns.forEach(function(c){
                        gd[c['heading']] = 'No Data';
                    });
                    gridData.push(gd);
                });                
                outputData[d['SvyDate']] = gridData;
                dates.push(d['SvyDate']);
            }
            outputData[d['SvyDate']][sac[d[admcode]]][d['Variable']] = d[meanormedian[d['Variable']]];
        }
    });
    initGrid(outputData,dates,geoData,countryID);

    $('#catoverview').on('click',function(e){
        $('.wfp-viz-grid').hide();
        lg._selectedBar = -1;
        $('#wfp-viz-grid-overview').show();
    });    

    $('#catrcsi').on('click',function(e){
        $('.wfp-viz-grid').hide();
        lg._selectedBar = -1;
        $('#wfp-viz-grid-rcsi').show();
    });

    $('#catfcs').on('click',function(e){
        $('.wfp-viz-grid').hide();
        lg._selectedBar = -1;
        $('#wfp-viz-grid-fcs').show();
    });

    //$('#cathousing').on('click',function(e){
    //    $('.wfp-viz-grid').hide();
    //    lg._selectedBar = -1;
    //    $('#wfp-viz-grid-housing').show();
    //});
}

function initGrid(data,dates,geom,countryID){
    
    var admcode = '';
    var admname = '';
    var lastdate = dates[dates.length-1];
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

    var gridmap = new lg.map('#wfp-viz-gridmap').geojson(geom).nameAttr(admname).joinAttr(admcode).zoom(1).center([0,0]);

    var categories = ['Overview','rCSI','FCS'/*,'Housing'*/];

    var grid = {}; 

    categories.forEach(function(cat){
        var columns = [];
        config.columns.forEach(function(c){
            if(c['group']==cat){
                columns.push(new lg.column(c['heading']).label(c['display']).domain(c['domain']).labelAccessor(c['labelAccessor']));
            }
        });

        lg.colors = config.colors;

        grid[cat] = new lg.grid('#wfp-viz-grid-'+cat.toLowerCase())
            .data(data[lastdate])
            .width($('#wfp-viz-grid-'+cat.toLowerCase()).width())
            .height(775)
            .nameAttr('name')
            .joinAttr('joinID')
            .hWhiteSpace(5)
            .vWhiteSpace(5)
            .columns(columns)
            .labelAngle(65)
            .margins({top: 300, right: 70, bottom: 20, left: 120});
    });

    lg.init();
    bottommap = gridmap.map();

    var baselayer2 = L.tileLayer('https://{s}.tiles.mapbox.com/v3/reliefweb.l43d4f5j/{z}/{x}/{y}.png', {});

    baselayer2.addTo(bottommap);

    zoomToGeom(geom);        

    for (var i = 0; i < categories.length; i++){
        lg._gridRegister[i].updateData = updateData;
    }
    generateTimeSlider(dates,data);

    function zoomToGeom(geom){
        bottommap.invalidateSize()
        var bounds = d3.geo.bounds(geom);
        bottommap.fitBounds([[bounds[0][1],bounds[0][0]],[bounds[1][1],bounds[1][0]]]);
    }
    function generateTimeSlider(dates,data){
        var max = dates.length-1;
        var min = 0;
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        $('#wfp-viz-slider').html('<input id="wfp-viz-slider-input" type="range" min=0 max='+max+' value='+min+'>');
        
        $('#wfp-viz-slider-input').on('change',function(e){
            for (var i = 0; i < categories.length; i++){
                lg._gridRegister[i].updateData(data[dates[$('#wfp-viz-slider-input').val()]]);
            }
            var mdy = new Date(dates[$('#wfp-viz-slider-input').val()]);
            $('#wfp-viz-date').html(months[mdy.getMonth()]+' '+ mdy.getFullYear());
        });
        $('#wfp-viz-slider-input').change();
        var mdy = new Date(dates[$('#wfp-viz-slider-input').val()]);
        $('#wfp-viz-date').html(months[mdy.getMonth()]+' '+mdy.getFullYear());

    }

}

updateData = function(data){
        columns = this._initColumns(this._columns);
        _parent = this;
        _parent._data = data;
        columns.forEach(function(v,i){

            data.sort(function(a, b) {
                    return a[_parent._nameAttr].localeCompare(b[_parent._nameAttr]);
                });

                var newData = [];        

            var newData = [];

            data.forEach(function(d,i){
                var nd = {};
                nd.pos = i;
                nd.join = d[_parent._joinAttr];
                nd.value = d[v._dataName];
                newData.push(nd);
            });

            d3.selectAll('.bars'+i+'id'+_parent._idnum)
                .data(newData)
                .transition()
                .attr("width", function(d){
                        if(v._valueAccessor(d.value)==null||isNaN(v._valueAccessor(d.value)) || v._valueAccessor(d.value)===''){
                            return _parent._properties.boxWidth;
                        }
                        return _parent._properties.x[i](v._valueAccessor(d.value));
                    })
                .attr("fill",function(d,i2){
                        if(v._valueAccessor(d.value)==null||isNaN(v._valueAccessor(d.value)) || v._valueAccessor(d.value)===''){
                            return '#cccccc';
                        }                        
                        var c = v._colorAccessor(d.value,i2,v._domain[0],v._domain[1])
                        return v._colors[c];
                    });

            var dataSubset = [];

            newData.forEach(function(d){
                dataSubset.push({'key':d.join,'value':d.value, 'pos': d.pos});
            });                

            if(_parent._highlighted == i){    
                lg.mapRegister.colorMap(dataSubset,v);
            }
            d3.selectAll('.selectbars'+i+'id'+_parent._idnum)
                .data(newData)
                .on("mouseover.color",function(d,i2){
                        if(lg._selectedBar==-1){
                            lg.mapRegister.colorMap(dataSubset,v);
                        }                        
                    })
                .on('click.color',function(d,i2){
                        lg.mapRegister.colorMap(dataSubset,v);
                    })

            d3.selectAll('.sortLabel'+i+'id'+_parent._idnum).on("mouseover.color",function(d,i2){
                        lg.mapRegister.colorMap(dataSubset,v);
                    });                
        });
    }


var bottommap;
initCountry(269);