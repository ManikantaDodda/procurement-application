// src/components/PurchaseOrderList.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PurchaseOrderList() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await api.get('/api/get-purchase-orders', { params: { status: 'all' } });
      setPurchaseOrders(response.data);
    } catch (err) {
      console.error("Error fetching purchase orders:", err);
    }
  };

  const handleShowItems = (order) => {
    setSelectedItems(order.items);
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handlePrintOrder = (order) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Purchase Order</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        </head>
        <body>
          <div class="container mt-4">
            <h3>Purchase Order Details</h3>
            <p><strong>Order No:</strong> ${order.orderNo}</p>
            <p><strong>Supplier:</strong> ${order.supplier ? order.supplier.supplierName : 'N/A'}</p>
            <p><strong>Item Total:</strong> $${order.itemTotal.toFixed(2)}</p>
            <p><strong>Discount Total:</strong> $${order.discountTotal.toFixed(2)}</p>
            <p><strong>Net Amount:</strong> $${order.netAmount.toFixed(2)}</p>
            <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>

            <h5>Items</h5>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Item No</th>
                  <th>Order Quantity</th>
                  <th>Discount</th>
                  <th>Item Amount</th>
                  <th>Net Amount</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td>${item.itemNo}</td>
                    <td>${item.orderQty}</td>
                    <td>$${item.discount.toFixed(2)}</td>
                    <td>$${item.itemAmount.toFixed(2)}</td>
                    <td>$${item.netAmount.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Purchase Order List</h3>
      <Link to="/purchase-order-form">
        <Button variant="primary" className="mb-3">
          Create New Purchase Order
        </Button>
      </Link>
      <Table bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Order No</th>
            <th>Supplier</th>
            <th>Item Total</th>
            <th>Discount Total</th>
            <th>Net Amount</th>
            <th>Order Date</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.orderNo}</td>
              <td>{order.supplier ? order.supplier.supplierName : 'N/A'}</td>
              <td>${order.itemTotal.toFixed(2)}</td>
              <td>${order.discountTotal.toFixed(2)}</td>
              <td>${order.netAmount.toFixed(2)}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>
                <Button variant="info" onClick={() => handleShowItems(order)}>
                  View Items
                </Button>
              </td>
              <td>
                <Button variant="secondary" onClick={() => handlePrintOrder(order)}>
                  Print
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for displaying items */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Item No</th>
                <th>Order Quantity</th>
                <th>Discount</th>
                <th>Item Amount</th>
                <th>Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item) => (
                <tr key={item._id.$oid}>
                  <td>{item.itemNo}</td>
                  <td>{item.orderQty}</td>
                  <td>${item.discount.toFixed(2)}</td>
                  <td>${item.itemAmount.toFixed(2)}</td>
                  <td>${item.netAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PurchaseOrderList;
