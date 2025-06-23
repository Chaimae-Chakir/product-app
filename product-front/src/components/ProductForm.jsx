import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import ProductService from '../services/ProductService';

const ProductForm = ({ product, onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [id, setId] = useState(null);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setId(product.id);
        } else {
            setName('');
            setPrice(0);
            setId(null);
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (price <= 0) {
            alert('Price must be greater than 0');
            return;
        }
        const productData = { name, price };

        const saveMethod = id
            ? ProductService.updateProduct(id, productData)
            : ProductService.createProduct(productData);

        saveMethod
            .then(() => {
                onSave();
            })
            .catch(error => {
                console.error('There was an error saving the product!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="p-fluid">
            <div className="p-field">
                <label htmlFor="name">Name</label>
                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
            </div>
            <div className="p-field mt-3">
                <label htmlFor="price">Price</label>
                <InputNumber id="price" value={price} onValueChange={(e) => setPrice(e.value)} mode="currency" currency="USD" locale="en-US" required min={0.01} />
            </div>
            <div className="p-d-flex p-jc-end mt-4">
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onCancel} type="button" />
                <Button label={id ? "Update Product" : "Add Product"} icon="pi pi-check" type="submit" />
            </div>
        </form>
    );
};

export default ProductForm; 