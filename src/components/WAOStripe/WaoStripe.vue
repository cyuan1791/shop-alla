<template>
  <div class="wao-stripe">

    <div id="main" class="row">
      <div class="col-xs-12 col-sm-6">
        <div id="checkout">
          <div id="payment-request">
            <div id="payment-request-button"></div>
          </div>
          <form id="payment-form" method="POST" action="/orders">
            <p class="instruction">Complete your shipping and payment details below</p>
            <section>
              <h2>Shipping &amp; Billing Information</h2>
              <fieldset class="with-state">
                <label>
                  <span>Name</span>
                  <input name="name" class="field" placeholder="Jenny Rosen" required>
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" class="field" placeholder="jenny@example.com" required>
                </label>
                <label>
                  <span>Address</span>
                  <input name="address" class="field" placeholder="185 Berry Street Suite 550">
                </label>
                <label>
                  <span>City</span>
                  <input name="city" class="field" placeholder="San Francisco">
                </label>
                <label class="state">
                  <span>State</span>
                  <input name="state" class="field" placeholder="CA">
                </label>
                <label class="zip">
                  <span>ZIP</span>
                  <input name="postal_code" class="field" placeholder="94107">
                </label>
                <label class="select">
                  <span>Country</span>
                  <div id="country" class="field US">
                    <select name="country">
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="BE">Belgium</option>
                      <option value="BR">Brazil</option>
                      <option value="CA">Canada</option>
                      <option value="CN">China</option>
                      <option value="DK">Denmark</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="HK">Hong Kong</option>
                      <option value="IE">Ireland</option>
                      <option value="IT">Italy</option>
                      <option value="JP">Japan</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MX">Mexico</option>
                      <option value="NL">Netherlands</option>
                      <option value="NZ">New Zealand</option>
                      <option value="NO">Norway</option>
                      <option value="PT">Portugal</option>
                      <option value="SG">Singapore</option>
                      <option value="ES">Spain</option>
                      <option value="SE">Sweden</option>
                      <option value="CH">Switzerland</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US" selected="selected">United States</option>
                    </select>
                  </div>
                </label>
              </fieldset>
            </section>
            <section>
              <h2>Payment Information</h2>
              <nav id="payment-methods">
                <ul>
                  <li>
                    <input type="radio" name="payment" id="payment-card" value="card" checked>
                    <label for="payment-card">Card</label>
                  </li>
                  <li>
                    <input type="radio" name="payment" id="payment-ach_credit_transfer" value="ach_credit_transfer" checked>
                    <label for="payment-ach_credit_transfer">Bank Transfer</label>
                  </li>
                  <li>
                    <input type="radio" name="payment" id="payment-alipay" value="alipay">
                    <label for="payment-alipay">Alipay</label>
                  </li>
                  <li>
                    <input type="radio" name="payment" id="payment-bancontact" value="bancontact">
                    <label for="payment-bancontact">Bancontact</label>
                  </li>
                  <li>
                    <input type="radio" name="payment" id="payment-eps" value="eps">
                    <label for="payment-eps">EPS</label>
                  </li>
                  <li>
                    <input type="radio" name="payment" id="payment-ideal" value="ideal">
                    <label for="payment-ideal">iDEAL</label>
                  </li>
                  <li>
                    <input type="radio" name="payment" id="payment-giropay" value="giropay">
                    <label for="payment-giropay">Giropay</label>
                  </li>
                  <li>
                    <input type="radio" name="payment" id="payment-multibanco" value="multibanco">
                    <label for="payment-multibanco">Multibanco</label>
                  </li>
                  <li>
                    <input type="radio" name="payment" id="payment-sepa_debit" value="sepa_debit">
                    <label for="payment-sepa_debit">SEPA Direct Debit</label>
                  </li>
                  <li>
                    <input type="radio" name="payment" id="payment-sofort" value="sofort">
                    <label for="payment-sofort">SOFORT</label>
                  </li>
                  <li>
                    <input type="radio" name="payment" id="payment-wechat" value="wechat">
                    <label for="payment-wechat">WeChat Pay</label>
                  </li>
                </ul>
              </nav>
              <div class="payment-info card visible">
                <fieldset>
                  <label>
                    <span>Card</span>
                    <div id="card-element" class="field"></div>
                  </label>
                </fieldset>
              </div>
              <div class="payment-info sepa_debit">
                <fieldset>
                  <label>
                    <span>IBAN</span>
                    <div id="iban-element" class="field"></div>
                  </label>
                </fieldset>
                <p class="notice">By providing your IBAN and confirming this payment, you’re authorizing Payments Demo and Stripe, our payment
                  provider, to send instructions to your bank to debit your account. You’re entitled to a refund under the terms
                  and conditions of your agreement with your bank.</p>
              </div>
              <div class="payment-info ideal">
                <fieldset>
                  <label>
                    <span>iDEAL Bank</span>
                    <div id="ideal-bank-element" class="field"></div>
                  </label>
                </fieldset>
              </div>
              <div class="payment-info redirect">
                <p class="notice">You’ll be redirected to the banking site to complete your payment.</p>
              </div>
              <div class="payment-info receiver">
                <p class="notice">Payment information will be provided after you place the order.</p>
              </div>
              <div class="payment-info wechat">
                <div id="wechat-qrcode"></div>
                <p class="notice">Click the button below to generate a QR code for WeChat.</p>
              </div>
            </section>
            <button type="submit">Pay</button>
          </form>
          <div id="card-errors" class="element-errors"></div>
          <div id="iban-errors" class="element-errors"></div>
        </div>

      </div>
      <div  class="col-xs-12 col-sm-6">
        <div id="summary">
          <header>
            <h1>Order Summary</h1>
          </header>
          <div id="order-items"></div>
          <div id="order-total">
            <div class="line-item subtotal">
              <p class="label">Subtotal</p>
              <p class="price" data-subtotal></p>
            </div>
            <div class="line-item shipping">
              <p class="label">Shipping</p>
              <p class="price">Free</p>
            </div>
            <div class="line-item total">
              <p class="label">Total</p>
              <p class="price" data-total></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WaoStripe',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  /**
  * store.css
  * Stripe Payments Demo. Created by Romain Huet (@romainhuet).
  */

  * {
    font-size: 15px;
  }
  /* Overall Container */

  #main {
    width: 100%;
    text-align: center;
    transition: width 0.3s ease-in-out;
  }
  /* Checkout */

  #checkout {
    max-width: 480px;
    margin: 0 auto;
    padding: 0 0;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear 0.5s;
  }

  #main.checkout #checkout {
    visibility: visible;
    opacity: 1;
  }

  section {
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: left;
  }
  #payment-form h2 {
    text-align: center;
    margin: 15px 0;
    color: #32325d;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-size: 13px;
    font-weight: 500;
  }

  /* Payment Request */

  #payment-request {
    visibility: hidden;
    opacity: 0;
    min-height: 100px;
    padding: 20px 0;
    transition: visibility 0s, opacity 0.3s ease-in;
  }

  #payment-request.visible {
    visibility: visible;
    opacity: 1;
  }

  #payment-form {
    border-radius: 4px;
    border: 1px solid #e8e8fb;
  }

  /* Form */

  fieldset {
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.15),
    0 4px 6px 0 rgba(112, 157, 199, 0.15);
    border-radius: 4px;
    border: none;
    font-size: 0;
  }

  fieldset label {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 42px;
    padding: 10px 0;
    align-items: center;
    justify-content: center;
    color: #8898aa;
    font-weight: 400;
  }

  fieldset label:not(:last-child) {
    border-bottom: 1px solid #f0f5fa;
  }

  fieldset label.state {
    display: inline-flex;
    width: 75%;
  }

  fieldset:not(.with-state) label.state {
    display: none;
  }
  fieldset label.zip {
    display: inline-flex;
    width: 25%;
    padding-right: 60px;
  }

  fieldset:not(.with-state) label.zip {
    width: 100%;
  }

  fieldset label span {
    min-width: 125px;
    padding: 0 15px;
    text-align: right;
  }

  fieldset .redirect label span {
    width: 100%;
    text-align: center;
  }

  p.instruction {
    display: inline-table;
    margin-top: -32px;
    padding: 0 5px;
    text-align: center;
    background: #f8fbfd;
  }

  p.tip {
    margin: -10px auto 10px;
    padding: 5px 0 5px 30px;
    font-size: 14px;
    background: url(/images/tip.svg) left center no-repeat;
  }

  .field {
    flex: 1;
    padding: 0 15px;
    background: transparent;
    font-weight: 400;
    color: #31325f;
    outline: none;
    cursor: text;
  }

  .field::-webkit-input-placeholder {
    color: #aab7c4;
  }
  .field::-moz-placeholder {
    color: #aab7c4;
  }
  .field:-ms-input-placeholder {
    color: #aab7c4;
  }
  fieldset .select::after {
    content: '';
    position: absolute;
    width: 9px;
    height: 5px;
    right: 20px;
    top: 50%;
    margin-top: -2px;
    background-image: url(/images/dropdown.svg);
    pointer-events: none;
  }

  input {
    flex: 1;
    border-style: none;
    outline: none;
    color: #313b3f;
  }

  select {
    flex: 1;
    border-style: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    color: #313b3f;
    cursor: pointer;
    background: transparent;
  }

  select:focus {
    color: #666ee8;
  }

  ::-webkit-input-placeholder {
    color: #cfd7e0;
  }
  ::-moz-placeholder {
    color: #cfd7e0;
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: #cfd7e0;
  }

  input:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-text-fill-color: #666ee8;
    transition: background-color 100000000s;
    -webkit-animation: 1ms void-animation-out 1s;
  }

  .StripeElement--webkit-autofill {
    background: transparent !important;
  }

  #card-element {
    margin-top: -1px;
  }

  #ideal-bank-element {
    padding: 0;
  }

  #payment-form button {
    display: block;
    background: #666ee8;
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    border: 0;
    font-weight: 700;
    width: 100%;
    height: 40px;
    outline: none;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  #payment-form button:focus {
    background: #555abf;
  }

  #payment-form button:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1),
    0 3px 6px 0 rgba(0, 0, 0, 0.08);
  }

  #payment-form button :active {
    background: #43458b;
  }

  #country {
    display: flex;
    align-items: center;
  }

  #country select {
    margin: 0 -15px 0 -30px;
    padding: 0 15px 0 30px;
  }
  #country::before {
    display: inline-flex;
    content: '';
    width: 21px;
    height: 15px;
    background-position: -1000px -1000px;
    background-repeat: no-repeat;
    margin-right: 10px;
  }

  #country.at::before {
    background-position: -165px -10px;
  }
  #country.au::before {
    background-position: -196px -10px;
  }
  #country.be::before {
    background-position: -227px -10px;
  }
  #country.br::before {
    background-position: -351px -10px;
  }
  #country.ca::before {
    background-position: -382px -10px;
  }
  #country.ch::before {
    background-position: -475px -10px;
  }
  #country.cn::before {
    background-position: -41px -35px;
  }
  #country.de::before {
    background-position: -134px -35px;
  }
  #country.dk::before {
    background-position: -196px -35px;
  }
  #country.es::before {
    background-position: -320px -35px;
  }
  #country.eu::before {
    background-position: -351px -35px;
  }
  #country.fi::before {
    background-position: -382px -35px;
  }
  #country.fr::before {
    background-position: -413px -35px;
  }
  #country.gb::before {
    background-position: -475px -35px;
  }
  #country.hk::before {
    background-position: -41px -60px;
  }
  #country.ie::before {
    background-position: -196px -60px;
  }
  #country.it::before {
    background-position: -351px -60px;
  }
  #country.jp::before {
    background-position: -444px -60px;
  }
  #country.lu::before {
    background-position: -258px -85px;
  }
  #country.mx::before {
    background-position: -475px -85px;
  }
  #country.nl::before {
    background-position: -103px -110px;
  }
  #country.no::before {
    background-position: -134px -110px;
  }
  #country.nz::before {
    background-position: -165px -110px;
  }
  #country.pt::before {
    background-position: -413px -110px;
  }
  #country.se::before {
    background-position: -103px -135px;
  }
  #country.sg::before {
    background-position: -134px -135px;
  }
  #country.us::before {
    background-position: -475px -135px;
  }
  /* Payment Methods */

  #payment-methods {
    margin: 0 0 20px;
    border-bottom: 2px solid #e8e8fb;
  }

  #payment-methods li {
    display: none;
  }

  #payment-methods li.visible {
    display: inline-block;
    margin: 0 20px 0 0;
    list-style: none;
  }

  #payment-methods input {
    display: none;
  }

  #payment-methods label {
    display: flex;
    flex: 1;
    cursor: pointer;
  }

  #payment-methods input + label {
    position: relative;
    padding: 5px 0;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 13px;
  }

  #payment-methods label::before {
    content: '';
    position: absolute;
    width: 100%;
    bottom: -2px;
    left: 0;
    border-bottom: 2px solid #6772e5;
    opacity: 0;
    transform: scaleX(0);
    transition: all 0.25s ease-in-out;
  }

  #payment-methods label:hover {
    color: #6772e5;
    cursor: pointer;
  }

  #payment-methods input:checked + label {
    color: #6772e5;
  }

  #payment-methods label:hover::before,
  #payment-methods input:checked + label::before {
    opacity: 1;
    transform: scaleX(1);
  }

  #payment-methods,
  .payment-info {
    display: none;
  }

  .payment-info:not(.card) {
    margin-bottom: 15px;
  }

  .payment-info.ideal {
    margin-bottom: 0;
  }

  #payment-methods.visible,
  .payment-info.visible {
    display: block;
  }

  .payment-info.card.visible,
  .payment-info.sepa_debit.visible {
    text-align: center;
  }

  .payment-info p.notice {
    font-size: 14px;
    color: #8898aa;
    text-align: left;
  }

  #wechat-qrcode img {
    margin: 0 auto;
  }

  .element-errors {
    display: inline-flex;
    height: 20px;
    margin: 15px auto 0;
    padding-left: 20px;
    color: #e25950;
    opacity: 0;
    transform: translateY(10px);
    transition-property: opacity, transform;
    transition-duration: 0.35s;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    background-size: 15px 15px;
  }

  .element-errors.visible {
    opacity: 1;
    transform: none;
  }

  #iban-errors {
    margin-top: -20px;
  }
  /* Order Summary */

  #summary {
    overflow: auto;
    height: 80%;
    background: #fff;
    box-shadow: 0 2px 19px 4px rgba(0, 0, 0, 0.04);
    transition: right 0.3s ease-in-out;
  }

  #main.checkout:not(.success):not(.error) + #summary {
    right: 0;
  }

  #summary header {
    background: #fff;
  }

  #summary h1 {
    margin: 0 30px;
    line-height: 80px;
    font-weight: 400;
  }

  #summary p {
    font-size: 16px;
    font-weight: 400;
    margin-top: 10px;
  }

  #summary .discount p {
    margin-top: 0;
  }

  #summary .line-item {
    display: flex;
    flex-direction: row;
    padding: 30px 30px 0 30px;
  }

  #summary .line-item .image {
    display: block;
    width: 80px;
    height: 80px;
    margin-right: 15px;
    background: #f6f9fc;
    border-radius: 3px;
  }

  #summary .line-item .label {
    flex: 1;
    text-align: left;
  }

  #summary .line-item .product {
    color: #424770;
  }

  #summary .line-item .sku {
    font-size: 14px;
    color: #8898aa;
  }
  #summary .line-item .count,
  #summary .line-item .price {
    font-size: 14px;
    padding-left: 10px;
    align-self: right;
    text-align: right;
    line-height: 24px;
  }

  #summary .line-item .count {
    color: #8898aa;
  }

  #summary .line-item .price {
    color: #8ba4fe;
    font-weight: bold;
  }

  #summary .line-item.subtotal {
    margin-top: 30px;
    margin-bottom: 0;
    padding-top: 10px;
    border-top: 1px solid #f3f3ff;
  }

  #summary .line-item.shipping {
    padding-top: 0;
  }

  #summary .line-item.total {
    margin-top: 15px;
    margin-bottom: 30px;
    padding-top: 15px;
    font-size: 21px;
    border-top: 1px solid #f3f3ff;
  }

  #summary .line-item.total .label,
  #summary .line-item.total .price {
    color: #424770;
    font-size: 24px;
    font-weight: 400;
    line-height: inherit;
  }

  #demo {
    padding: 15px;
    margin: -15px -15px 0;
    background: #f6f9fc;
    border-radius: 5px;
  }

  #demo p.label {
    margin: 0 0 10px;
    color: #666ee8;
  }

  #demo p.note {
    display: block;
    margin: 10px 0 0;
    font-size: 14px;
  }
  #demo p.note a,
  #demo p.note em {
    font-size: 14px;
  }

  #demo p.note a:hover {
    text-decoration: none;
  }

  /* Order Confirmation */

  #confirmation {
    width: 100%;
    visibility: hidden;
    overflow-x: hidden;
    opacity: 0;
    background: #f8fbfd;
    text-align: left;
    transition: visibility 0s, opacity 0.5s linear 0.5s;
  }

  #main.success #confirmation,
  #main.error #confirmation {
    visibility: visible;
    opacity: 1;
  }

  #main.success #order,
  #main.error #order {
    visibility: hidden;
    opacity: 0;
  }

  #confirmation h1 {
    font-size: 42px;
    font-weight: 300;
    color: #6863d8;
    letter-spacing: 0.3px;
    margin-bottom: 30px;
  }

  #confirmation .status {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 75px 0 275px;
    max-width: 75%;
    height: 350px;
    margin: 100px auto;
    box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.15);
    border-radius: 6px;
  }

  #confirmation .status.error {
    display: none;
  }

  #confirmation .status p {
    margin: 0 0 15px;
  }
  #confirmation .status li {
    margin-bottom: 5px;
    list-style: none;
  }

  #main.success:not(.processing) #confirmation .status.processing,
  #main.success:not(.receiver) #confirmation .status.receiver {
    display: none;
  }

  #main.processing #confirmation .status.success,
  #main.receiver #confirmation .status.success {
    display: none;
  }

  #main.error #confirmation .status.success,
  #main.error #confirmation .status.processing,
  #main.error #confirmation .status.receiver {
    display: none;
  }

  #main.error #confirmation .status.error {
    display: flex;
  }

  #main.error #confirmation .error-message {
    font-family: monospace;
  }

</style>
