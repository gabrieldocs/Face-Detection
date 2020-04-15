
//retorna uma promisse com uma lista de dispositivos 
const cam = document.getElementById("cam")


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

Promise.all([    
    faceapi.nets.tinyFaceDetector.loadFromUri('/assets/lib/face-api/models'), // detectar rostos no video 
    faceapi.nets.faceLandmark68Net.loadFromUri('/assets/lib/face-api/models'), // desenha traços no rosto 
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/lib/face-api/models'), // reconhecimento
    faceapi.nets.faceExpressionNet.loadFromUri('/assets/lib/face-api/models'), // emoji 
    faceapi.nets.ageGenderNet.loadFromUri('/assets/lib/face-api/models'), // adivinhar idade 
    faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/lib/face-api/models') // 

]).then(startVideo)


cam.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(cam)
    const canvasSize = {
        width: cam.width,
        height: cam.height
    }
    faceapi.matchDimensions(canvas, canvasSize)
    document.body.appendChild(canvas)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(cam, 
            new faceapi.TinyFaceDetectorOptions() //detecta todos os rostos do video 
        )
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()

        const resizedDetections = faceapi.resizeResults(detections, canvasSize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

        resizedDetections.forEach(detection => {
            const { age, gender, genderProbability } = detection
            new faceapi.draw.DrawTextField([
                `${parseInt(age, 10)} years`,
                `${gender} gender (${parseInt(genderProbability * 100, 10)})`,

            ], detection.detection.box.topRight).draw(canvas)
        })

        console.log(detections)    
    }, 100)
})

