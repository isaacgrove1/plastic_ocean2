// MOST POLLUTING RIVERS GRAPH

// reference the csv data
const dataSource_sec4 = "../csv_files/section4.csv";

// reference the plot in html
const plotDiv_sec4 = document.getElementById('polluting_river');

// define load data function
function loadData(){
    Plotly.d3.csv(dataSource_sec4, function(data){ processData(data) } );
};

loadData();

// traverse all the data and set x and y values
function processData(allRows) {
    let x = [], y = [];
    for (let i=0; i < allRows.length; i++){
        let row = allRows[i];
        x.push(row['Entity']);
        y.push(row['Share of global plastics emitted to ocean']);
    }
 
    // call the makePlot function
    makePlot(x,y);
}  

// setting the layout of the chart, with title, axis labels and font
var layout = {
    title: 'Most plastic-polluting rivers in the World',
    xaxis: {title: 'Name of River', tickangle: -45, },
    yaxis: {
        title: 'Share of Plastic Emmitted into the Ocean (as a % of total ocean plastic)',
        // tickformat: '%',
        tickvals: [1,2,3,4,5,6],
        ticktext: ['1%', '2%', '3%', '4%', '5%', '6%']
    },
    font: {
        family: "Avenir",
        size: 12,
        color: 'white'
    },

    //background colour 
    plot_bgcolor: '#081C30',
    paper_bgcolor: '#081C30',
    margin: {
        b:220
    },
    height: 630,

    // define the annotations of the source and where the data is coming from
    annotations: [
        {
          text: 'Source: Our World in Data Share of Plastics from the Largest Emitting Rivers',
          showarrow: false,
          x: 0.15,
          y: -0.45,
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
  };

// gets rid of irritating buttons at the top
var config = {
    scrollZoom: false,
    editable: false,
    displayModeBar: false,
    responsive: true,
}

// makes the plot, and color values based on the y values are assigned
function makePlot(x,y){
    let traces = [
        {
            x: x,
            y: y,
            type: 'bar',

            // define the colours based on whether the country is the Philippines or not
            marker:{
                color: ['#FFA552', '#2EC4B6', '#FFA552', '#2EC4B6', '#FFA552', '#FFA552', '#FFA552', '#2EC4B6', '#FFA552', '#FFA552']
              },
            
            // label the countries
            text: ['Philippines', 'Malaysia', 'Philippines', 'India', 'Philippines', 'Philippines', 'Philippines', 'India', 'Philippines', 'Philippines' ],
            textposition: 'inside',
            textfont: { 
                color:'white'
            }
        }
    ]

    // draw the graph
    Plotly.newPlot(plotDiv_sec4, traces, layout, config);

}