function getSensorDetailsById(sensorId) {
    switch(parseInt(sensorId)) {
        case 1:
            return ambientTempDetails()
        case 2:
            return ambientHumDetails()
        case 3:
            return luxDetails()
        case 4:
            return soilHumDetails()
        default: 
            return ambientTempDetails()
    }
}

const luxDetails = () => {
    return {
        title: "Intensidad de luz",
        unit: "lux",
        icon: "fas fa-sun",
        max: null,
        min: null
    }
}

const ambientTempDetails = () => {
    return {
        title: "Temperatura ambiente",
        unit: "°C",
        icon: "fas fa-thermometer-half",
        max: null,
        min: null
    }
}

const ambientHumDetails = () => {
    return {
        title: "Humedad ambiente",
        unit: "%",
        icon: "fas fa-humidity",
        max: 100,
        min: 0
    }
}

const soilHumDetails = () => {
    return {
        title: "Humedad de suelo",
        unit: "%",
        icon: "fas fa-seedling",
        max: 100,
        min: 0
    }
}

class Color {
    static darkGreen(alpha = 1) {
        return `rgba(39, 78, 23, ${alpha})`
    }
}

module.exports = {
    getSensorDetailsById,
    Color
}