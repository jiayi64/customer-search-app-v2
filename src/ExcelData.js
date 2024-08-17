import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExcelData.css';

function ExcelData() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 获取Excel数据
    axios.get('http://localhost:4000/excel-data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the Excel data!", error);
      });
  }, []);

  // 处理搜索框输入
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 根据搜索条件过滤数据
  const filteredData = data.filter(row =>
    Object.values(row).some(
      value => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="excel-data-container">
      <h1>Excel Data</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table className="excel-data-table">
        <thead>
          <tr>
            <th>購買日</th>
            <th>姓名</th>
            <th>市話</th>
            <th>手機</th>
            <th>廠牌</th>
            <th>產品</th>
            <th>機型</th>
            <th>機號</th>
            <th>地址</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row["購買日"] || 'N/A'}</td>
              <td>{row["姓名"] || 'N/A'}</td>
              <td>{row["市話"] || 'N/A'}</td>
              <td>{row["手機"] || 'N/A'}</td>
              <td>{row["廠牌"] || 'N/A'}</td>
              <td>{row["產品"] || 'N/A'}</td>
              <td>{row["機型"] || 'N/A'}</td>
              <td>{row["機號"] || 'N/A'}</td>
              <td>{row["地址"] || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExcelData;
