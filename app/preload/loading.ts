/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
export function useLoading() {
  const className = `loaders-css__square-spin`
  const styleContent = `
  body {
    background-color: #202225;
    font-family: 'Source Sans Pro', sans-serif;
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(88, 101, 242, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(88, 101, 242, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(88, 101, 242, 0);
  }
}
.app-loading-wrap {
  background: #5865F2;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(88, 101, 242, 1);
  margin: 10px;
  height: 20px;
  width: 20px;
  transform: scale(1);
  animation: pulse 2s infinite;
}
    `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `<div class="${className}"></div>`

  return {
    appendLoading() {
      document.head.appendChild(oStyle)
      document.body.appendChild(oDiv)
    },
    removeLoading() {
      document.head.removeChild(oStyle)
      document.body.removeChild(oDiv)
    },
  }
}
