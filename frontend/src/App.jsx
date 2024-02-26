import React from 'react'
import AddEmployees from './AddEmployees'
import {Routes,Route} from 'react-router-dom'
import View from './EmployeeList'
import ApplyLeave from './ApplLeave'
import HrDashboard from './Hrdash'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AddEmployees/>}/>
      <Route path="/viewemployee" element={<View/>}/>
      <Route path="/applyleave" element={<ApplyLeave/>}/>
      <Route path="/hrdash" element={<HrDashboard/>}/>
    </Routes>
      
  
  )
}

export default App
