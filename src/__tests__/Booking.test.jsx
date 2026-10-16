import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

function SampleTravelComponent() {
  const [travelers, setTravelers] = React.useState(1);
  const price = 48000;
  return (
    <div>
      <h1>Bali Tropical Dream</h1>
      <label htmlFor="travelers">Travelers</label>
      <input 
        id="travelers" 
        type="number" 
        value={travelers} 
        onChange={(e) => setTravelers(Number(e.target.value))} 
      />
      <div>Total: ₹{price * travelers}</div>
    </div>
  );
}

test('renders package and updates calculation', () => {
  render(<SampleTravelComponent />);
  expect(screen.getByText(/Bali Tropical Dream/i)).toBeInTheDocument();
  
  const input = screen.getByLabelText(/Travelers/i);
  fireEvent.change(input, { target: { value: '2' } });
  
  expect(screen.getByText(/Total: ₹96000/i)).toBeInTheDocument();
});