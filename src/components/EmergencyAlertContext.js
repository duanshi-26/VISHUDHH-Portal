// import React, { createContext, useContext, useState } from 'react';

// const EmergencyAlertContext = createContext();

// const EmergencyAlertProvider = ({ children }) => {
//   const [emergencyAlerts, setEmergencyAlerts] = useState([]);

//   const value = {
//     emergencyAlerts,
//     setEmergencyAlerts,
//   };

//   return (
//     <EmergencyAlertContext.Provider value={value}>
//       {children}
//     </EmergencyAlertContext.Provider>
//   );
// };

// export const useEmergencyAlertContext = () => useContext(EmergencyAlertContext);

// export default EmergencyAlertProvider;