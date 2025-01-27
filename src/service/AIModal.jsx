import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_TRIP_PLAN_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel Plan for Location : Ella, Sri Lanka, for 2 days for Couple with a Cheap budget , Give me a Hotels options list with Hotel Name, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place image url, Geo coordinates, ticket pricing, rating, Time travel each of the location for 2 days with each day plan with best time to visit  in JSON format." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"location\": \"Ella, Sri Lanka\",\n  \"duration\": \"2 days\",\n  \"budget\": \"Cheap\",\n  \"travelers\": \"Couple\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"Ella Escapade\",\n      \"address\": \"Passara Road, Ella, Sri Lanka\",\n      \"price\": \"USD 20-30 per night\",\n      \"imageUrl\": \"https://example.com/ella_escapade.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 6.8755,\n        \"longitude\": 81.0490\n      },\n      \"rating\": 4.2,\n      \"description\": \"Simple and clean guesthouse with beautiful views, budget-friendly options, and friendly staff.\"\n    },\n    {\n      \"hotelName\": \"Mountain Heavens Ella\",\n      \"address\": \"Wellawaya Road, Ella, Sri Lanka\",\n        \"price\": \"USD 25-35 per night\",\n      \"imageUrl\": \"https://example.com/mountain_heavens.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 6.8775,\n        \"longitude\": 81.0480\n      },\n       \"rating\": 4.0,\n      \"description\": \"Basic rooms with mountain views, offering great value for budget travelers. Close to the main road.\"\n    },\n     {\n      \"hotelName\": \"Ella Flower Garden Resort\",\n      \"address\": \"Ella - Passara Rd, Ella, Sri Lanka\",\n        \"price\": \"USD 30-40 per night\",\n      \"imageUrl\": \"https://example.com/ella_flower_garden.jpg\",\n      \"geoCoordinates\": {\n         \"latitude\": 6.8764,\n        \"longitude\": 81.0447\n      },\n      \"rating\": 4.1,\n      \"description\": \"Cozy place with gardens, family-run atmosphere, and reasonable pricing.\"\n    }\n\n  ],\n    \"itinerary\": [\n  {\n       \"bestTimeToVisit\":\"Morning and Afternoon\",\n     \"day\":\"Day 1\",\n       \"plan\": [\n        {\n          \"placeName\": \"Nine Arch Bridge\",\n          \"placeDetails\": \"Iconic colonial-era railway bridge surrounded by lush greenery. A great spot for photos and a short walk through the tea fields.\",\n          \"imageUrl\": \"https://example.com/nine_arch_bridge.jpg\",\n          \"geoCoordinates\": {\n           \"latitude\": 6.8644,\n            \"longitude\": 81.0407\n          },\n          \"ticketPricing\": \"Free\",\n           \"rating\": 4.6,\n           \"travelTime\": \"20-30 minutes by tuk-tuk from Ella town\"\n        },\n         {\n            \"placeName\":\"Little Adam's Peak\",\n           \"placeDetails\":\"Easy hike to a peak with panoramic views of the surrounding valleys. Great for sunrise or sunset viewing.\",\n           \"imageUrl\":\"https://example.com/little_adams_peak.jpg\",\n             \"geoCoordinates\": {\n              \"latitude\": 6.8723,\n               \"longitude\": 81.0446\n            },\n          \"ticketPricing\": \"Free\",\n           \"rating\": 4.5,\n           \"travelTime\": \"10-15 minutes by tuk-tuk from Ella town, then a 30-45 minute hike\"\n\n          },\n           {\n           \"placeName\":\"Ravana Falls\",\n           \"placeDetails\":\"A majestic waterfall located along the main road, a good spot for a quick stop and photo opportunity.\",\n          \"imageUrl\": \"https://example.com/ravana_falls.jpg\",\n            \"geoCoordinates\": {\n           \"latitude\": 6.8618,\n            \"longitude\": 81.0853\n           },\n           \"ticketPricing\": \"Free\",\n           \"rating\": 4.1,\n          \"travelTime\": \"20-30 minutes by tuk-tuk from Ella town\"\n          }\n\n       ]\n    },\n    {\n     \"bestTimeToVisit\":\"Morning\",\n   \"day\":\"Day 2\",\n   \"plan\": [\n         {\n           \"placeName\": \"Ella Rock\",\n           \"placeDetails\": \"A challenging but rewarding hike to a rock outcrop with spectacular panoramic views. Requires moderate fitness levels.\",\n           \"imageUrl\": \"https://example.com/ella_rock.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 6.8622,\n               \"longitude\": 81.0449\n           },\n           \"ticketPricing\": \"Free\",\n            \"rating\": 4.4,\n            \"travelTime\": \"30 minutes by tuk-tuk from Ella town, then a 2-3 hour hike\"\n         },\n         {\n           \"placeName\":\"Tea Plantation Walk\",\n            \"placeDetails\": \"Wander through the tea plantations surrounding Ella. Enjoy the views and fresh air.\",\n            \"imageUrl\":\"https://example.com/tea_plantation.jpg\",\n             \"geoCoordinates\":{\n              \"latitude\": 6.8809,\n               \"longitude\": 81.0436\n              },\n           \"ticketPricing\":\"Free\",\n            \"rating\": 4.3,\n            \"travelTime\":\"Can be accessed directly from the town or on the way to other attractions\"\n         }\n\n      ]\n   }\n  }\n\n ]\n}\n```" },
            ],
        },
    ],
});


