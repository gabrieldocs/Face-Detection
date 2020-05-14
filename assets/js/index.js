// baseado no tutorial https://www.youtube.com/watch?v=aGecIY04ymQ 
//retorna uma promisse com uma lista de dispositivos 
const cam = document.getElementById("cam")
const teste = document.getElementById("candidate")
const button = document.getElementById("sup")


const startVideo = () => {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => { 
            if(Array.isArray(devices)) {
                devices.forEach(device => {
                    if(device.kind === 'videoinput') {
                        console.table(device)
                        navigator.getUserMedia(
                            {video : {
                                deviceId: device.deviceId
                            }},
                            stream => cam.srcObject = stream,
                            error => console.error(error)
                    )
                }
            })
        }
    })
}
//navigator.getUserMedia({video:true})

// os rótulos são carregados a partir da estrutura de pastas
// neste momento só há duas pastas no diretório do projeto 

const loadLabels = () => {
    const labels = ['Lucas Gabriel', 'Augusto Coelho']
    return Promise.all(labels.map(async label => {
        const descriptions = [] // array com descritores nas imagens 
        for(let i = 1 ; i < 5; i++) {
            const img = await faceapi.fetchImage(`/lib/face-api/labels/${label}/${i}.jpg`)
            
            // similar a detecção inferior, sem reconhecimento
            // detectar um rosto único e comparar com o video 
            const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor()
            descriptions.push(detections.descriptor)
        }   
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
    }))
}

// Carrega os models da face-api e em seguida inicia o video 

Promise.all([    
    faceapi.nets.tinyFaceDetector.loadFromUri('/lib/face-api/models'), // detectar rostos no video 
    faceapi.nets.faceLandmark68Net.loadFromUri('/lib/face-api/models'), // desenha traços no rosto 
    faceapi.nets.faceRecognitionNet.loadFromUri('/lib/face-api/models'), // reconhecimento
    faceapi.nets.faceExpressionNet.loadFromUri('/lib/face-api/models'), // emoji 
    faceapi.nets.ageGenderNet.loadFromUri('/lib/face-api/models'), // adivinhar idade 
    faceapi.nets.ssdMobilenetv1.loadFromUri('/lib/face-api/models') // 

]).then(startVideo)


cam.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(cam)
    const canvasSize = {
        width: cam.width,
        height: cam.height
    }
    const labels = await loadLabels()    
    faceapi.matchDimensions(canvas, canvasSize)
    
    document.body.appendChild(canvas)
    
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(cam, 
            new faceapi.TinyFaceDetectorOptions() //detecta todos os rostos do video 
        )
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors()

        const resizedDetections = faceapi.resizeResults(detections, canvasSize)

        //taxa de acerto esperada de 60%
        const faceMatcher = new faceapi.FaceMatcher(labels, 0.7)

        const results = resizedDetections.map(d =>        
            faceMatcher.findBestMatch(d.descriptor)
       )

        //get size 
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        
        //faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

        resizedDetections.forEach(detection => {
            const { age, gender, genderProbability } = detection
            new faceapi.draw.DrawTextField([
                `${parseInt(age, 10)} years`,
                `${gender} gender (${parseInt(genderProbability * 100, 10)})`,

            ], detection.detection.box.topRight).draw(canvas)
        })
        results.forEach((result, index) => {
            const box = resizedDetections[index].detection.box
            const {label, distance} = result 
            new faceapi.draw.DrawTextField([
                `${label} (${parseInt(distance * 100)})`
            ], box.bottomRight).draw(canvas)

            if(parseInt(distance * 100) > 40 ) { 
                //console.log(`Hey, it ${label}! Whaaaat!`)
                //button.classList.add('btn-success')
                //button.innerHTML = '<a class = "btn btn-lg text-white btn-primary">Avançar </a>'
                candidate.innerHTML = `Olá, ${label}! 😊 `
                console.log(`Olá, ${label}! 😊 `)
                
            } else {
                console.log('Failed to recognize this person')
            }
        })
        //console.log(detections)    
    }, 100)
})



// get positioned elements 

const start = document.getElementById('start')
const timer = document.getElementById('timer')

const startMin = 15 
let time = startMin * 60 

function countdown(){
    setInterval(updateCountdown, 1000)
    function updateCountdown(){
        const min = Math.floor(time / 60)
        let seconds  = time % 60 
    
        timer.innerHTML = `${min} : ${seconds}`
        if(time <= 0) {
            // Adicionar custom event aqui 
            alert('Encerrando...') 
            clearInterval(time = 0)
        } else {
            time--;
        }
        
    }
}

const section = document.getElementById('section')
const header = document.getElementById('header')
start.addEventListener('click', (e)=>{
    e.preventDefault()
    header.style.display = 'none'
    section.style.display = 'none'
    countdown()
})

/*
let timeLeft = 9000
function countdown(){
    setInterval(function(){
        if(timeLeft <=0){
            clearInterval(timeLeft = 0)    
        }
        timer.innerHTML = timeLeft
        timeLeft -=1
    }, 1000)
}
start.addEventListener('click', (e)=>{
    e.preventDefault()
    countdown()
})
*/