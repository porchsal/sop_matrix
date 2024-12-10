
import "../styles/SignIn.css";


const SignIn = () => {
  

  return (
    <div className="center-container">
      <h2>SOP Training Matrix</h2>
      <h2>Sign In</h2>
      <form >
        <div className="form-group">
          <label htmlFor="signInUserID">UserId:</label>
          <input
            type="text"
            id="userId"
            name="UserId"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="signInPassword">Password:</label>
          <input
            type="password"
            id="signInPassword"
            name="password"
            required
          />
          
        </div>

        <button type="submit">Sign In</button>
        
      </form>

    </div>
  );
};

export default SignIn;