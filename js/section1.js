// Unpack all the data from the csv and define the columns with variable names
Plotly.d3.csv("../csv_files/section1.csv", (history_data) => {
    const year = unpack(history_data, 'year');
    const global_plastic_prod = unpack(history_data, 'global_plastic_prod');
    const macroplastic = unpack(history_data, 'macroplastic');
    const microplastic = unpack(history_data, 'microplastic');

    // define the properties of the plastic over time line in the graph
    const production_over_time = {
        x: year,
        y: global_plastic_prod,
        type: 'scatter',
        mode: 'lines',
        line: {color: '#2EC4B6'},
        name: 'Global Plastic Production (tonnes)',
        }
    
    // define the properties of the macroplastic line in the graph
    const macroplastic_over_time = {
        x: year,
        y: macroplastic,
        type: 'scatter',
        mode: 'lines',
        line: {color: '#BA5624'},
        name: 'Global Macroplastic Found',
        yaxis: 'y2'
        }
    
    // define the properties of the microplastic line in the graph
    const microplastic_over_time = {
        x: year,
        y: microplastic,
        type: 'scatter',
        mode: 'lines',
        line: {color: '#FFA552'},
        name: 'Global Microplastic Found',
        yaxis: 'y2'
        }
    
    // define the properties and styling for graph
        const chart_layout = {
        // positioning and styling of the chart title
        title: {
            text: "<b>Plastics Over Time</b>",
            font: { color: '#FFFFFF'},
            y: 0.86,
            x: 0.423,
        },
        // background colour of the graph
        paper_bgcolor: '#081C30',
        plot_bgcolor: '#081C30',
        xaxis: {
            title: 'Years',
            color: '#FFFFFF',
        },
        yaxis: {
            title: 'Plastic Production Over Time (tonnes)',
            color: '#2EC4B6'
        },

        // add a second y-axis to ensure uniformity in the graph
        yaxis2: {
            title: 'Amount of Plastic Found in the Ocean (tonnes)',
            color: '#FFFFFF',
            overlaying: 'y',
            side: 'right'
        },

        // style the poisition and font of the legend of the graph
        legend: {
            x: 1.1,
            y: 0.5,
            font: {
                color: 'white'
            }
        },

        // width of the graph
        width: 1300,

        // annotation which credits the source of the graph
        annotations: [
            {
              text: 'Source: Our World in Data Global Plastic Production/ Micro and Macro Plastic in the Ocean',
              showarrow: false,
              x: 0.2,
              y: -0.3,
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
          ]

        };

        // eliminates distracting buttons and options etc
        var config = {
            scrollZoom: false,
            editable: false,
            displayModeBar: false,
            responsive: true,
        };
    
    // ChatGPT assisted in the animation process of creating/slicing the frames 
    
    // array used for the animating frames of the graph
    const frames = [];

    // for loop accumulates a frame for each year of the graph into an array
    for (let i = 2; i < year.length; i++) {
        const cur_frame = {
            data: [
                { x: year.slice(0, i), y: global_plastic_prod.slice(0, i) },
                { x: year.slice(0, i), y: macroplastic.slice(0, i) },
                { x: year.slice(0, i), y: microplastic.slice(0, i) }
            ],
        };
        frames.push(cur_frame);
    }  
    
    // define what will be shown on the grpah
    const data = [production_over_time, macroplastic_over_time, microplastic_over_time];

    // displays graph and animates graph using the accumulated frames from above
    Plotly.newPlot('line_graph', data, chart_layout, config).then(function() {
        Plotly.addFrames('line_graph', frames);
    });

    // use of same intersection observer from https://www.youtube.com/watch?v=T33NN_pPeNI 
    var observer_line_graph = new IntersectionObserver(function(entries_intersect) {
        entries_intersect.forEach(function(entry_instanc) {
        if (entry_instanc.isIntersecting) {
            Plotly.animate('line_graph', frames, {
                // defines the time taken for animation to run
                frame: {duration: 20, redraw: false}
            });
        } 
        else {
            Plotly.pause('line_graph');
            }
        });
      });
      
      observer_line_graph.observe(document.getElementById('line_graph'));
      
});