// unpack csv file and assign variable names to each column
const unpack = (data, key) => data.map(row => row[key])

Plotly.d3.csv("../csv_files/section3_2.csv", plastic_gen_data => { 
    const location = unpack(plastic_gen_data, 'Code');
    const share_plast = unpack(plastic_gen_data, 'Share of global plastics emitted to ocean');
    const country = unpack(plastic_gen_data, 'Entity');

    // define type of graph as cholopleth and the variable being mentioned
    var data = [{
        type: 'choropleth',
        locations: location,
        z: share_plast,
        text: country,
        colorscale: 'Jet',
        hovertemplate: '%{text}<br>Share of global plastics emmited to ocean: %{z}%<extra></extra>',
        marker: {
            line: {
                color: 'rgb(180,180,180)',
                width: 0.5
            }
        // style the colour bar on the right side of the chloropleth map
        },
        colorbar: {
            len: 0.7,
            ticksuffix: '%',
            title: {text: 'Global plastics emmited to the ocean<br>(as a %)',
                    font: {color: 'white'}
            },
            // font of the colour bar notches
            tickfont: { color: 'white' }
        },
        // Define the range of colour
        colorscale: [ 
            [0, '#2EC4B6'], [1, '#BA5624']
        ]
    }];

    // layout of the chloropleth graph
    var layout = {
        width: 1200,
        height: 800,
        // bg colour
        plot_bgcolor: '#081C30',
        paper_bgcolor: '#081C30',
        // title and position
        title: {
            text: "Plastic Emitted to the World's Oceans as a % of the Total",
            y:0.8,
            x:0.43,
            font: { color: 'white' },
        },
        margin: {
            autosize: true,
            t: 0,
            // l: 0,
            b: 0,
            // r: 0,
        },

        // acknowledgement including the source of where the data is coming from
        annotations: [
            {
              text: 'Source: Our World in Data Share of Global Plastic Emitted to the Ocean',
              showarrow: false,
              x: 0.2,
              y: 0.15,
              margin: 50,
              xref: 'paper',
              yref: 'paper',
              xanchor: 'center',
              yanchor: 'bottom',
              opacity: 0.5,
              font: {
                size: 10,
                color: 'white',    
              }
            }
          ],

        // projection of the map and styling the features
        geo: {
            showframe: false,
            showocean: true,
            showland: true,
            landcolor: '#081C30',
            oceancolor: '#081C30',
            bgcolor: '#081C30',
            projection: { 
                type: 'equirectangular', 
                // ensures the map is zoomed in
                scale: 1.7,
        },
        // makes sure user lands ont the Philippines
            center: {lon: 85, lat: 10},
    },
    };

    // ensures user cannot zoom too far out
    var config = {
        scrollZoom: false,
        editable: false,
        displayModeBar: false,
        responsive: true,
    };

    // plot graph
    Plotly.newPlot('choropleth_2', data, layout, config);
});