import React, { useState, useEffect } from 'react';
import { Table, notification } from 'antd';
import Login from '../common/login/login';
const axios = require('axios');

function ViewUserDetails() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    } else {
      console.log(isLoggedIn);
    }
  }, [isLoggedIn]);

  const fetchUsers = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/person/',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        setUsers(response.data.data.people);
      })
      .catch(function (error) {
        console.log(error.response.data);
        if (error.response.status == 500) {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
        notification.error({
          message: error.response.data.message,
        });
      })
      .then(function () {
        setIsLoading(false);
      });
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'SSN',
      dataIndex: 'ssn',
      key: 'ssn',
    },
  ];

  return (
    <div className='limit-width'>
      <div>
        <h1 className='text-center title'>Hey Zuckerberg! Here's all the data that you already have.</h1>
      </div>
      {isLoggedIn ? (
        <Table className='users-table' columns={columns} dataSource={users} loading={isLoading} />
      ) : (
        <Login callback={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default ViewUserDetails;
