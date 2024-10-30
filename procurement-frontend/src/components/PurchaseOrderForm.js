// src/components/PurchaseOrderForm.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Form, Button, Table, Container } from 'react-bootstrap';

function PurchaseOrderForm() {
  const [purchaseOrder, setPurchaseOrder] = useState({
    supplier: '',
    items: [],
    itemTotal: 0,
    discount: 0,
    netAmount: 0,
  });
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await api.get('/api/get-suppliers');
        setSuppliers(response.data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      }
    };
    fetchSuppliers();
  }, []);

  const handleSupplierChange = async (e) => {
    const selectedSupplier = e.target.value;
    setPurchaseOrder((prev) => ({ ...prev, supplier: selectedSupplier, items: [] }));

    try {
      const response = await api.get(`/api/get-items/${selectedSupplier}`);
      setAvailableItems(response.data.data);
    } catch (err) {
      console.error("Error fetching supplier items:", err);
    }
  };

  const handleItemSelection = (item) => {
    const isSelected = purchaseOrder.items.find((selectedItem) => selectedItem._id === item._id);

    if (isSelected) {
      const updatedItems = purchaseOrder.items.filter((selectedItem) => selectedItem._id !== item._id);
      updateOrderTotals(updatedItems);
    } else {
      const newItem = {
        ...item,
        orderQty: 1,
        itemAmount: item.unitPrice,
        discount: 0,
        netAmount: item.unitPrice,
        packingUnit: 'box', // Default packing unit
      };
      updateOrderTotals([...purchaseOrder.items, newItem]);
    }
  };

  const handleQtyChange = (index, value) => {
    const updatedItems = purchaseOrder.items.map((item, idx) => {
      if (idx === index) {
        const newQty = parseFloat(value);
        const itemAmount = newQty * item.unitPrice;
        return {
          ...item,
          orderQty: newQty,
          itemAmount,
          netAmount: itemAmount - item.discount,
        };
      }
      return item;
    });
    updateOrderTotals(updatedItems);
  };

  const handleDiscountChange = (index, value) => {
    const updatedItems = purchaseOrder.items.map((item, idx) => {
      if (idx === index) {
        const newDiscount = parseFloat(value);
        const netAmount = item.itemAmount - newDiscount;
        return {
          ...item,
          discount: newDiscount,
          netAmount,
        };
      }
      return item;
    });
    updateOrderTotals(updatedItems);
  };

  const updateOrderTotals = (updatedItems) => {
    const itemTotal = updatedItems.reduce((total, item) => total + item.itemAmount, 0);
    const totalDiscount = updatedItems.reduce((total, item) => total + item.discount, 0);
    const netAmount = itemTotal - totalDiscount;

    setPurchaseOrder((prev) => ({
      ...prev,
      items: updatedItems,
      itemTotal,
      discount: totalDiscount,
      netAmount,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/create-purchase-order', purchaseOrder);
      alert('Purchase order created successfully');
    } catch (error) {
      console.error('Error creating purchase order:', error);
    }
  };

  return (
    <Container className="p-4 border rounded shadow-sm" >
    <Form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">Create Purchase Order</h3>

      <Form.Group>
        <Form.Label>Supplier</Form.Label>
        <Form.Control
          as="select"
          name="supplier"
          value={purchaseOrder.supplier}
          onChange={handleSupplierChange}
          required
        >
          <option>Select Supplier</option>
          {suppliers.map((s) => (
            <option key={s._id} value={s._id}>{s.supplierName}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <h5 className="mt-4">Available Items</h5>
      <Table bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Select</th>
            <th>Item No</th>
            <th>Item Name</th>
            <th>Stock Unit</th>
            <th>Unit Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {availableItems.map((item) => (
            <tr key={item._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={!!purchaseOrder.items.find((selectedItem) => selectedItem._id === item._id)}
                  onChange={() => handleItemSelection(item)}
                />
              </td>
              <td>{item.itemNo}</td>
              <td>{item.itemName}</td>
              <td>{item.stockUnit}</td>
              <td>{item.unitPrice}</td>
              <td>
                <img src={item.imageUrl} alt={item.itemName} width="50" height="50" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5 className="mt-4">Selected Items</h5>
      <Table bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Item No</th>
            <th>Item Name</th>
            <th>Order Qty</th>
            <th>Unit Price</th>
            <th>Item Amount</th>
            <th>Discount</th>
            <th>Net Amount</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrder.items.map((item, index) => (
            <tr key={item._id}>
              <td>{item.itemNo}</td>
              <td>{item.itemName}</td>
              <td>
                <Form.Control
                  type="number"
                  value={item.orderQty}
                  onChange={(e) => handleQtyChange(index, e.target.value)}
                />
              </td>
              <td>{item.unitPrice}</td>
              <td>{item.itemAmount}</td>
              <td>
                <Form.Control
                  type="number"
                  value={item.discount}
                  onChange={(e) => handleDiscountChange(index, e.target.value)}
                />
              </td>
              <td>{item.netAmount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="mt-3">
        <p>Item Total: <strong>{purchaseOrder.itemTotal || 0}</strong></p>
        <p>Total Discount: <strong>{purchaseOrder.discount || 0}</strong></p>
        <p>Net Amount: <strong>{purchaseOrder.netAmount || 0}</strong></p>
      </div>

      <Button variant="primary" type="submit" block>
        Create Purchase Order
      </Button>
    </Form>
    </Container>
  );
}

export default PurchaseOrderForm;
