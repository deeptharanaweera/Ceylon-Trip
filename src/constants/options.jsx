export const SelectTravelList = [
    {
        id: 1,
        title: 'Just me',
        description: 'I am traveling alone',
        people: '1 person',
        icon: 'backpacker.png'
    },
    {
        id: 2,
        title: 'Couple',
        description: 'I am traveling with my partner',
        people: '2 people',
        icon: 'parents.png'
    },
    {
        id: 3,
        title: 'Family',
        description: 'I am traveling with my family members',
        people: '3 to 5 People',
        icon: 'family-trip.png'
    },
    {
        id: 4,
        title: 'Group',
        description: 'I am traveling with a group of friends',
        people: '6 to 10 People',
        icon: 'people (1).png'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Low',
        description: 'I am traveling with a tight budget',
        icon: '⭐'
    },
    {
        id: 2,
        title: 'Medium',
        description: 'I am traveling with a moderate budget',
        icon: '⭐⭐⭐'
    },
    {
        id: 3,
        title: 'High',
        description: 'I am traveling with a high budget',
        icon: '⭐⭐⭐⭐'
    },
    {
        id: 4,
        title: 'Luxury',
        description: 'I am traveling with a luxury budget',
        icon: '⭐⭐⭐⭐⭐'
    }
]

export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} days for {traveler} with a {budget} budget , Give me a Hotels options list with Hotel Name, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place image url, Geo coordinates, ticket pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit  in JSON format.'