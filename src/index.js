
// import "./index.css"
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import homeStyle from "./index.css"
console.log(homeStyle,'homeStyle')
import logoUrl from './assets/lq@ccccc.jpeg'
import pngUrl from './assets/12.png'
const logo = new Image();
const png = new Image()
png.src=pngUrl
logo.src = logoUrl
document.body.appendChild(png)
document.body.appendChild(logo)
import $ from 'jquery'
$('h1').css('color','#58bc58')
const func = () => {
    const a = "es6的写法"
    console.log(a)
}
func()