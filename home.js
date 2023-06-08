import { render, html } from "./node_modules/lit-html/development/lit-html.js";

let home = html`
<section id="home" class = "home">
    <h4 class = "sub-heading"> Why EcoVaPhone is</h4>
    <h1 class = "heading"> The best?</h1>
        <div class = "swiper mySwiper home-slider">
          <div class = "swiper-wrapper wrapper">
            <div class = "swiper-slide slide">
              <div class = "content item">
                <span class="price item-price">Best Seller</span>
                <h3>EcoVaPhone</h3>
                <p>The EcoVaPhone is designed to be environmentally friendly, 
                  with a casing made from recycled materials, 
                  and a battery that can be recharged using solar power.</p>
                </div>
                <div class = "image">
                    <img src = "img/MainPhone3.png" alt="">
                </div>
            </div>          
          </div>    
          <img src="img/jpeg-optimizer_SliderSecondBackground (4).jpg" class="preload-img">
          <div class="containerS" data-aos="fade-right">
            <div class="rowS">
              <div class="col-sm-12S">
                <div class="square">
                  <div class="square-image">
                    <img src="img/Salles.jpg" alt="Image 1">
                  </div>
                  <div class="square-text">
                    <h2>Sells</h2>
                    <p>Over 40000 thousand sells in one month(July).</p>
                  </div>
                </div>
                <div class="square">
                  <div class="square-image">
                    <img src="img/Design.jpg" alt="Image 2">
                  </div>
                  <div class="square-text">
                    <h2>Design</h2>
                    <p>EcoVaPhone has a beautiful design made by professionals.</p>
                  </div>
                </div>
                <div class="square">
                  <div class="square-image">
                    <img src="img/CPU.jpg" alt="Image 3">
                  </div>
                  <div class="square-text">
                    <h2>CPU</h2>
                    <p>Our cpu is one of the fastest cpus in the world.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>             
        </div>
    </section>   
`;
export default home;
