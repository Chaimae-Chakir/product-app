import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import ProductService from '../services/ProductService';

const ProductForm = ({ product, onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [id, setId] = useState(null);
    const [priceError, setPriceError] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setId(product.id);
            setDescription(product.description || '');
        } else {
            setName('');
            setPrice(0);
            setId(null);
            setDescription('');
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!price || price <= 0) {
            setPriceError('Price must be greater than 0');
            return;
        } else {
            setPriceError('');
        }
        const productData = { name, price, description };
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
                <InputNumber
                    id="price"
                    value={price}
                    onValueChange={(e) => setPrice(e.value)}
                    mode="currency"
                    currency="MAD"
                    locale="fr-MA"
                    required
                    min={0.01}
                    className={priceError ? 'p-invalid' : ''}
                />
                {priceError && <Message severity="error" text={priceError} />}
            </div>
            <div className="p-field mt-3">
                <label htmlFor="description">Description</label>
                <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="p-d-flex p-jc-end mt-4">
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onCancel} type="button" />
                <Button label={id ? "Update Product" : "Add Product"} icon="pi pi-check" type="submit" />
            </div>
        </form>
    );
};

export default ProductForm; 