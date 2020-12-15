import Map from './map';

import './index.css';

const WorldMap = ({ summaries }) => {

  const right = document.querySelector('#right')
  const left = document.querySelector('#left')
  const up = document.querySelector('#up')
  const down = document.querySelector('#down')
  const zoomIn = document.querySelector('#zoomIn')
  const zoomOut = document.querySelector('#zoomOut')

// добавляем движеня на кнопки
  right.onclick = ()  => {
    const svg = document.querySelector('svg')
    const x = +(svg.getAttribute("viewBox").split(' ')[0])
    const y = +(svg.getAttribute("viewBox").split(' ')[1])
    svg.setAttribute("viewBox", `${x+50} ${y} 2000 1000`)
    svg.attributes.viewBox = "0 0 1000 500"
    console.log( svg.getAttribute("viewBox").split(' ')[0]);

  }
  left.onclick = () => {
    const svg = document.querySelector('svg')
    const x = +(svg.getAttribute("viewBox").split(' ')[0])
    const y = +(svg.getAttribute("viewBox").split(' ')[1])
    svg.setAttribute("viewBox", `${x-50} ${y} 2000 1000`)
  }
  up.onclick = () => {
    const svg = document.querySelector('svg')
    const x = +(svg.getAttribute("viewBox").split(' ')[0])
    const y = +(svg.getAttribute("viewBox").split(' ')[1])
    svg.setAttribute("viewBox", `${x} ${y+50} 2000 1000`)
  }
  down.onclick = () => {
    const svg = document.querySelector('svg')
    const x = +(svg.getAttribute("viewBox").split(' ')[0])
    const y = +(svg.getAttribute("viewBox").split(' ')[1])
    svg.setAttribute("viewBox", `${x} ${y-50} 2000 1000`)
  }
  //добавляем масштабирование по кнопке
zoomIn.onclick = () => {
  const svg = document.querySelector('svg')
  const zoomX = svg.getAttribute("transform").substring(6,svg.getAttribute("transform").length-1).split(',')[0]
  const zoomY = svg.getAttribute("transform").substring(6,svg.getAttribute("transform").length-1).split(',')[1]
  svg.setAttribute("transform", `scale(${zoomX*1.1},${zoomY*1.1})`)
  console.log(zoomY, zoomX)
}
zoomOut.onclick = () => {
  const svg = document.querySelector('svg')
  const zoomX = svg.getAttribute("transform").substring(6,svg.getAttribute("transform").length-1).split(',')[0]
  const zoomY = svg.getAttribute("transform").substring(6,svg.getAttribute("transform").length-1).split(',')[1]
  svg.setAttribute("transform", `scale(${zoomX/1.1},${zoomY/1.1})`)
  console.log(zoomY, zoomX)
}

     return (

    <div className="App">


    <div id="tooltip" display="none"></div>
      <h4>The World Map will be built here</h4>
      <Map summaries={summaries} />
    </div>

  );


};



export default WorldMap;
