
import ColorThief from './ColorThief.jsx'


function getColor(src) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      var thief = new ColorThief();
      var [ r, g, b ] = thief.getColor(img)
      var bg = `rgba(${r}, ${g}, ${b}, 1.0)`
      
      resolve({ bg: `rgba(${r}, ${g}, ${b}, 1.0)` })
    }
    img.src = src;
  });
}




export default getColor;