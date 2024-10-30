import { BrowserRouter, Route, Routes } from "react-router-dom";
import SupplierForm from "./components/SupplierForm";
import ItemForm from "./components/ItemForm";
import PurchaseOrderForm from "./components/PurchaseOrderForm";
import SupplierList from "./components/SupplierList";
import NavBar from "./components/Nav";
import ItemList from "./components/ItemList";
import PurchaseOrderList from "./components/PurchaseOrderList";
const Router = () => {
    return (
        <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path="/" element={<SupplierList/>}/>
            <Route path="/supplier-form" element={<SupplierForm/>}/>
            <Route path="/item-form" element={<ItemForm/>}/>
            <Route path="/item" element={<ItemList/>}/>
            <Route path="/purchase-order" element={<PurchaseOrderList/>}/>
            <Route path="/purchase-order-form" element={<PurchaseOrderForm/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Router;