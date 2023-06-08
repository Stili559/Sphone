import { render, html } from "./node_modules/lit-html/development/lit-html.js";

let loginRegisterTemplate = html`
  <div id="loginRegister-popup" style="display:none;">
      <div class = "wraperbox">
            <div class="form-wrapper ULogin">
              <form action ="">
                <h2>Login</h2>
                <div class = "input-group">
                  <input type = "email" class="emailL" name="emailL" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email address">
                  <label for=""><i class="fa-solid fa-envelope"></i> Email</label>
                </div>
                <div class = "input-group">
                  <input type = "password" type = "passwordL" class="passwordL" required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$" title="Please enter a valid password with at least 6 characters and an upperCase letter.">
                  <label for=""><i class="fa-solid fa-lock"></i> Password</label>
                </div>
                <button type="submit">Login</button>
                 <div class ="register-link">
                  <p>Don't have an account? Please register.</p>
                </div>
                </form>

                <form action ="" style="margin-left: 1rem; position: relative; margin: 20px 0; border-left: 2px solid #fff;">
                <h2>Register</h2>
                <div class = "input-group">
                  <input type = "name" class="nameR" name="nameR" required pattern="[A-za-z0-9]{6,}$" title="Please enter a name with at least 6 characters">
                  <label for=""><i class="fa-solid fa-user"></i></i> Name</label>
                </div>
                <div class = "input-group">
                  <input type = "email" class="emailR" name="emailR" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email address">
                  <label for=""><i class="fa-solid fa-envelope"></i> Email</label>
                </div>
                <div class = "input-group">
                  <input type = "password" type = "passwordR" class="passwordR" required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$" title="Please enter a valid password with at least 6 characters, an upperCase letter and lowerCase letter.">
                  <label for=""><i class="fa-solid fa-lock"></i> Password</label>
                </div>
                <button type="submit">Register</button>
                <div class ="register-link">
                  <p>Have an account? Please login.</p>
                </div>
              </form>
            </div>
        </div>
    </div>
`;
export default loginRegisterTemplate;
