"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getWeather(city, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=fr`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                const errorData = yield response.json();
                throw new Error(((_a = errorData.error) === null || _a === void 0 ? void 0 : _a.message) || 'Erreur inconnue');
            }
            const data = yield response.json();
            const weather = {
                city: data.location.name,
                temperature: data.current.temp_c,
                description: data.current.condition.text,
                windSpeed: data.current.wind_kph,
            };
            return weather;
        }
        catch (error) {
            console.error("Erreur getWeather:", error.message || error);
            return null;
        }
    });
}
const apiKey = "2669174130844dd79cf161650251905 ";
getWeather("Paris", apiKey).then((weather) => {
    if (weather) {
        console.log(`🌤 Ville : ${weather.city}`);
        console.log(`🌡 Température : ${weather.temperature}°C`);
        console.log(`📖 Description : ${weather.description}`);
        console.log(`💨 Vent : ${weather.windSpeed} km/h`);
    }
    else {
        console.log("❌ Impossible de récupérer la météo.");
    }
});
