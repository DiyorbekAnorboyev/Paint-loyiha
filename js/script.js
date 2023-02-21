const canvas = document.querySelector('canvas'),
toolBtns = document.querySelectorAll('.tool')
fillColor = document.querySelector('#fill-color')
sizeSlider = document.querySelector('#size-slider')
colorBtns = document.querySelectorAll('.colors .option')

let ctx = canvas.getContext('2d'),
isDrawing = false,
brushWidth = 5,
selectedTool = 'brush',
selectedColor = '#000',
prevMouseX,
prevMouseY,
snapshot

window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

const startDraw = e => {
    isDrawing = true
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = brushWidth
    ctx.strokeStyle = selectedColor
    ctx.fillStyle = selectedColor
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

const stopDraw = () => {
    isDrawing = false
}

const drawRectangle = e => {
    fillColor.checked 
    ? ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY) 
    : ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    // if(!fillColor.checked) {
    //     return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    // }
    // ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

const drawCircle = e => {
    ctx.beginPath()
    const radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 2)
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
    ctx.stroke()
    fillColor.checked ? ctx.fill() : ctx.stroke()
}

// tekis chiziq

// const drawTriangle = e => {
//     ctx.beginPath()
//     ctx.moveTo(prevMouseX, prevMouseY)
//     ctx.lineTo(e.offsetX, e.offsetY)
//     ctx.stroke()
// }

const drawTriangle = e => {
    ctx.beginPath()
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
    ctx.closePath()
    ctx.stroke()
    fillColor.checked ? ctx.fill() : ctx.stroke()
}


toolBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.options .active').classList.remove('active')
        btn.classList.add('active')
        selectedTool = btn.id
        console.log(selectedTool);
    })
})

sizeSlider.addEventListener('change', () => (brushWidth = sizeSlider.value))

colorBtns.forEach(btn => {
	btn.addEventListener('click', e => {
		document.querySelector('.options .selected').classList.remove('selected')
		btn.classList.add('selected')
		const bgColor = window.getComputedStyle(btn).getPropertyValue('background-color')
		selectedColor = bgColor
	})
})


const drawing = e => {
    if(!isDrawing) return
    ctx.putImageData(snapshot, 0, 0)

    switch (selectedTool) {
        case 'brush':
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            break;

        case 'rectangle':
            drawRectangle(e)
            break;

        case 'circle':
            drawCircle(e)
            break;

        case 'triangle':
            drawTriangle(e)
            break;

        case 'eraser':
            
            break;
    
        default:
            break;
    }
    
}

canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mouseup', stopDraw)