import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // 获取客户数据
    axios.get('http://localhost:4000/customers', {
      params: { search }  // 将搜索关键词作为查询参数发送
    })
    .then(response => {
      setCustomers(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the customers!", error);
    });
  }, [search]);  // 监听 search 变化，自动更新列表

  return (
    <div>
      <h1>Customer List</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}  // 更新搜索关键词
      />
      <ul>
        {customers.map(customer => (
          <li key={customer._id}>{customer.name} - {customer.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;
