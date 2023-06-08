import { render, html } from "./node_modules/lit-html/development/lit-html.js";

let supportTemplate = html`
    <div id="support-popup" style="display:none;">
        <div style="background:linear-gradient(to right, #6d706e,#515753); width:80%; max-width:600px; margin:100px auto; padding:20px;">
            <h2>Contact Support:</h2>
            <p>Please fill out the form below to contact our support team:</p>
            <form>
                <div>
                    <label for="name">Name:</label>         
                     <input type="text" id="name" name="name" required> 
                </div>
            
                <div>
                    <label for="email">Email:</label>             
                     <input type="email" id="email" name="email" required> 
                </div>
            
                <div>
                    <label for="subject">Subject:</label>                  
                     <input type="text" id="subject" name="subject" required> 
                </div>
            
                <div>
                    <label for="message">Message:</label>                                
                     <textarea id="message" name="message" required></textarea>        
                </div> 
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
`;
export default supportTemplate;
