
function Dashboard() {
  return (
    <div className="my-jobs-container">
      <h1>Choose your next Gig!</h1>
      <div className="filters">
        <select>
          
        
          <option value="">Skills</option>
          <option value="Event Staffing">Event Staffing</option>
          <option value="Hospitality Services">Hospitality Services</option>
          <option value="Retail Assistance">Retail Assistance</option>
          <option value="Delivery Services">Delivery Services</option>
          <option value="Maintenance and Repair">Maintenance and Repair</option>
          <option value="Personal Services">Personal Services</option>
          <option value="Construction and Renovation">
            Construction and Renovation
          </option>
          <option value="Healthcare Assistance">Healthcare Assistance</option>
          <option value="Transportation Services">
            Transportation Services
          </option>
          <option value="Technical Support">Technical Support</option>
          <option value="Cleaning Services">Cleaning Services</option>
          <option value="Fitness Instruction">Fitness Instruction</option>
          <option value="Photography and Videography">
            Photography and Videography
          </option>
          <option value="Creative Services">Creative Services</option>
          <option value="Security Services">Security Services</option>
        </select>
      </div>     
    </div>
  )    
}
export default Dashboard