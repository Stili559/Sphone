import { render, html } from "./node_modules/lit-html/development/lit-html.js";

let aboutUs = html`
<section id = "about-us" class = "about">
<h3 class = "sub-heading"> About us</h3>
<h1 class = "heading"> Why choose us?</h1>
<div class = "row">
  <div class = "image" data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine">
    <img src="img/AboutusPhone.png"alt="">
  </div>

  <div class = "content" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
    <h3>Best Eco Phones In The Country</h3>
    <p>
      At Sphone, we believe that mobile phones are more than just a means of communication. 
      They are an extension of ourselves, a reflection of our personalities and a gateway to the world. 
      That's why we are passionate about providing our customers with the eco-frendly mobile phones, paired with our new buying system, 
      that buys from you. 
    </p>
    <p>
      At Sphones, we buy your broken or old phones, repair them,
      and then sell them for one of the best market prices. Becauseof our system, 
      we are making less pollution and we are collecting all the electronics that are thrown into nature and use them to make our phones. 
      Here are just a few reasons why you should choose us for your mobile phone needs:
    </p>
    <div class = "icon-container">
       <div class = "icons">
            <i class = "fas fa-shipping-fast"></i>
            <span>Free Delivery</span>
       </div>
       <div class = "icons">
            <i class="fa-solid fa-leaf"></i>
            <span>Eco Friendly</span>
       </div>
       <div class = "icons">
            <i class = "fas fa-headset"></i>
            <span>24/7 service</span>
       </div>
    </div>
  </div> 
</div>
</section>
`;
export default aboutUs;
