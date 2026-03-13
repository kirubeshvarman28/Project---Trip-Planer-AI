import TripWorkspace from '@/components/TripWorkspace';

export default function TripPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch initial data from your Node.js backend here
  // using fetch(`http://localhost:5000/api/trips/${params.id}`)
  
  // Dummy data for demo
  const dummyInitialData = {
    title: "Enchanting Japan",
    destination: "Tokyo, Kyoto",
    startDate: new Date(),
    duration: 3,
    itinerary: [
      {
        dayNumber: 1,
        date: new Date(),
        locations: [
          {
            id: "loc1",
            name: "Senso-ji Temple",
            description: "Ancient Buddhist temple in Asakusa",
            coordinates: [139.7967, 35.7148],
            costEstimate: 10
          },
          {
            id: "loc2",
            name: "Tokyo Skytree",
            description: "Tallest tower in Japan with observation deck",
            coordinates: [139.8107, 35.7100],
            costEstimate: 45
          }
        ]
      },
      {
        dayNumber: 2,
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        locations: [
          {
            id: "loc3",
            name: "Shibuya Crossing",
            description: "The busiest pedestrian crossing in the world",
            coordinates: [139.7001, 35.6595],
            costEstimate: 0
          },
          {
            id: "loc4",
            name: "Meiji Shrine",
            description: "Shinto shrine surrounded by a magical forest",
            coordinates: [139.6993, 35.6764],
            costEstimate: 5
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full flex-1">
      <TripWorkspace tripId={params.id} initialData={dummyInitialData} />
    </div>
  );
}
