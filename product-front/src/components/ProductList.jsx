import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import ProductService from '../services/ProductService';
import ProductForm from './ProductForm';
import { useAuth } from '../context/AuthContext';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const toast = useRef(null);
    const { user } = useAuth();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        ProductService.getAllProducts()
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error loading products:", error));
    };

    const openNew = () => {
        setSelectedProduct(null);
        setDisplayDialog(true);
    };

    const editProduct = (product) => {
        setSelectedProduct(product);
        setDisplayDialog(true);
    };

    const hideDialog = () => {
        setDisplayDialog(false);
    };

    const saveProduct = () => {
        loadProducts();
        hideDialog();
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Saved', life: 3000 });
    };

    const confirmDelete = (product) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => deleteProduct(product.id),
        });
    };

    const deleteProduct = (id) => {
        ProductService.deleteProduct(id)
            .then(() => {
                loadProducts();
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            })
            .catch(error => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Could not delete product', life: 3000 });
                console.error("Error deleting product:", error);
            });
    };

    const isAdmin = !!user && (user.roles || []).includes('ROLE_ADMIN');

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDelete(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap justify-content-between align-items-center">
            <h2 className="m-0">Product List</h2>
            {isAdmin && <Button label="New" icon="pi pi-plus" className="p-button-success" onClick={openNew} />}
        </div>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <ConfirmDialog />
            <DataTable value={products} header={header} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} responsiveLayout="scroll">
                <Column field="name" header="Name" sortable></Column>
                <Column
                    field="price"
                    header="Price"
                    sortable
                    body={(rowData) =>
                        rowData.price?.toLocaleString('fr-MA', {
                            style: 'currency',
                            currency: 'MAD'
                        })
                    }
                />
                <Column field="description" header="Description" />
                <Column
                    field="createdAt"
                    header="Date"
                    body={(rowData) => rowData.createdAt ? new Date(rowData.createdAt).toLocaleString('fr-MA') : ''}
                />
                <Column
                    field="updatedAt"
                    header="Updated"
                    body={(rowData) => rowData.updatedAt ? new Date(rowData.updatedAt).toLocaleString('fr-MA') : ''}
                />
                {isAdmin && <Column body={actionBodyTemplate} exportable={false} className="actions-column"></Column>}
            </DataTable>

            <Dialog visible={displayDialog} header={selectedProduct ? "Edit Product" : "Add Product"} modal className="p-fluid product-dialog" onHide={hideDialog}>
                <ProductForm product={selectedProduct} onSave={saveProduct} onCancel={hideDialog} />
            </Dialog>
        </div>
    );
};

export default ProductList; 