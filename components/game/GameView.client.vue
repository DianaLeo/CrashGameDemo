<template>
    <div class="">
      <h1>nuxt-plotly module playground!</h1>
      <div >{{newestYValue}}x</div>
      <nuxt-plotly
        :data="data"
        :layout="layout"
        :config="config"
        style="width: 50%"
        @on-ready="myChartOnReady"
      />
    </div>
  </template>
  
  <script setup lang="ts">

  let exp = "Math.pow(x,1.8)/50+1"
  
  // Generate values
  const xValues = ref([])
  const yValues = ref([])
  const newestYValue = ref(1)
  let x = 0
  setInterval(()=>{
    xValues.value.push(x)
    yValues.value.push(eval(exp))
    newestYValue.value = eval(exp).toFixed(2)
    x += 0.05
  },50)
  
  // Display using Plotly
  const data = computed(()=>[{x:xValues.value, y:yValues.value, mode:"lines"}])
  const layout = {
    title: "y = " + exp,
    xaxis: {
      title: {
        text: 'Time in seconds',
        font: {
          family: 'Arial, sans-serif',
          size: 18,
          color: '#000'
        }
      },
      showline: true,
      showgrid: false,
      // zeroline: true,
      gridcolor: 'rgba(0,0,0,0.1)',
      tickformat: '.1f',
      ticksuffix: 's',
    },
    yaxis: {
      title: {
        text: 'Muliplier',
        font: {
          family: 'Arial, sans-serif',
          size: 18,
          color: '#000'
        }
      },
      showline: true,
      showgrid:false,
      // zeroline: true,
      gridcolor: 'rgba(0,0,0,0.1)',
      tickformat: '.1f',
      ticksuffix: 'x',
      // range:[1,null],
    },
    margin: {
      l: 50,  // left margin
      r: 50,  // right margin
      b: 60,  // bottom margin
      t: 60   // top margin
    },
    legend: {
      x: 0,
      y: 1,
      font: {
        family: 'Arial, sans-serif',
        size: 12,
        color: '#000'
      },
      bgcolor: 'rgba(255, 255, 255, 0.5)',
      bordercolor: '#444',
      borderwidth: 1
    },
    paper_bgcolor: 'rgba(245, 245, 245, 1)',
    plot_bgcolor: 'rgba(245, 245, 245, 1)',
    // annotations: [
    //   {
    //     x: 10,
    //     y: Math.pow(10, 3)/1000+1,
    //     xref: 'x',
    //     yref: 'y',
    //     text: `${newestYValue.value}`,
    //     showarrow: true,
    //     arrowhead: 7,
    //     ax: 0,
    //     ay: -40
    //   }
    // ],
    shapes: [
      {
        type: 'line',
        x0: 0,
        y0: 1,
        x1: 10,
        y1: Math.pow(10, 1.8)/50+1,
        line: {
          color: 'Violet',
          width: 2
        }
      }
    ]
  }
  const config: NuxtPlotlyConfig = { scrollZoom: true, displayModeBar: false };
  
  function myChartOnReady(plotlyHTMLElement: NuxtPlotlyHTMLElement) {
    const { $plotly } = useNuxtApp()
    console.log({ $plotly })
    console.log({ plotlyHTMLElement })
  
    plotlyHTMLElement.on?.('plotly_afterplot', function () {
      console.log('done plotting')
    })
  
    plotlyHTMLElement.on?.('plotly_click', function () {
      alert('You clicked this Plotly chart!');
    })
  }
  </script>
  