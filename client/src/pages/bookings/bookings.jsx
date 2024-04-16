

// const Bookings = ({ activity }) => {
//   const [clientName, setClientName] = useState('');
  
//   const handleBookClick = async () => {
//     try {
//       const response = await axios.post('/api/bookings', {
//         itemId: item._id,
//         clientName: clientName // Assuming you have a form field for client name
//         // Other booking details can be added here
//       });
//       console.log('Booking created:', response.data);
//       // Optionally, you can update the UI to reflect the booking creation
//     } catch (error) {
//       console.error('Error creating booking:', error);
//       // Handle error, show error message to the user, etc.
//     }
//   };
  
//   return (
//     <div>
//       <h2>{item.name}</h2>
//       <p>{item.description}</p>
//       <input 
//         type="text" 
//         value={clientName} 
//         onChange={(e) => setClientName(e.target.value)} 
//         placeholder="Enter your name"
//       />
//       <button onClick={handleBookClick}>Book</button>
//     </div>
//   );
// };

// export default ItemComponent;
