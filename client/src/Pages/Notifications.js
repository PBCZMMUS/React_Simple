// Pages/Notifications.js
import React from 'react';

function Notifications() {
  const notifications = [
    { id: 1, message: 'New free course available!' },
    { id: 2, message: 'Discount on premium courses!' },
  ];

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;