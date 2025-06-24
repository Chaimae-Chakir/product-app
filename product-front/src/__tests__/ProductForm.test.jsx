import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../components/ProductForm';

test('renders ProductForm and validates price', () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();

    render(<ProductForm onSave={onSave} onCancel={onCancel} />);

    // Check for name and price fields
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();

    // Try to submit with price 0
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: 0 } });
    fireEvent.click(screen.getByText(/Add Product/i));

    expect(screen.getByText(/Price must be greater than 0/i)).toBeInTheDocument();
}); 