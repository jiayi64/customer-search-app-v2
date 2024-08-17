import React, { useState } from 'react';
import axios from 'axios';

function AddCustomer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orders, setOrders] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 构建新客户对象
    const newCustomer = {
      name,
      email,
      phone,
      address,
      orders: orders.split(',')  // 将订单列表从字符串转换为数组
    };

    // 发送 POST 请求到后端
    axios.post('http://localhost:4000/customers', newCustomer)
      .then(response => {
        console.log('Customer added:', response.data);
        // 清空表单
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setOrders('');
        // 可选：刷新客户列表或显示通知
      })
      .catch(error => {
        console.error('There was an error adding the customer!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required
      />
      <input 
        type="text" 
        placeholder="Phone" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Address" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Orders (comma separated)" 
        value={orders} 
        onChange={(e) => setOrders(e.target.value)} 
      />
      <button type="submit">Add Customer</button>
    </form>
  );
}

export default AddCustomer;
