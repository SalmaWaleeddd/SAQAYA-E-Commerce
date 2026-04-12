<!-- DefaultFooter.vue -->
<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__column">
        <h2 class="footer__logo">Exclusive</h2>
        <div class="footer__subscribe">
          <h3 class="footer__title">Subscribe</h3>
          <p class="footer__subtitle">Get 10% off your first order</p>
          <div class="footer__email">
            <input
              type="email"
              v-model="email"
              placeholder="Enter your email"
              @keyup.enter="handleSubscribe"
              class="footer__email__input"
            />
            <button @click="handleSubscribe" class="footer__email__btn">
              <img src="@/assets/icons/send-icon.svg" alt="Send" />
            </button>
          </div>
        </div>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Support</h3>
        <address class="footer__col-info address">
          111 Bijay sarani, Dhaka,<br />
          DH 1515, Bangladesh.
        </address>
        <p class="footer__col-info email">exclusive@gmail.com</p>
        <p class="footer__col-info phone">+88015-88888-9999</p>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Account</h3>
        <ul class="footer__links">
          <li><router-link to="/account">My Account</router-link></li>
          <li><router-link to="/login">Login / Register</router-link></li>
          <li><router-link to="/cart">Cart</router-link></li>
          <li><router-link to="/wishlist">Wishlist</router-link></li>
          <li><router-link to="/shop">Shop</router-link></li>
        </ul>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Quick Link</h3>
        <ul class="footer__links">
          <li><router-link to="/privacy">Privacy Policy</router-link></li>
          <li><router-link to="/terms">Terms Of Use</router-link></li>
          <li><router-link to="/faq">FAQ</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Download App</h3>
        <p class="footer__app-text">Save $3 with App New User Only</p>
        <div class="footer__app-buttons">
          <div class="footer__app_qr-code">
            <img
              src="@/assets/images/qrCode-img.svg"
              alt="QR Code"
              class="qr-code-image"
            />
          </div>
          <div class="footer__app_links">
            <img src="@/assets/images/appStore-img.svg" alt="App Store" />
            <img src="@/assets/images/googlePlay-img.svg" alt="Google Play" />
          </div>
        </div>
        <div class="footer__social-media">
          <a href="https://www.facebook.com" target="_blank" rel="noopener">
            <img
              src="@/assets/icons/social-media/facebook-icon.svg"
              alt="Facebook"
            />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener">
            <img
              src="@/assets/icons/social-media/twitter-icon.svg"
              alt="Twitter"
            />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener">
            <img
              src="@/assets/icons/social-media/instagram-icon.svg"
              alt="Instagram"
            />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener">
            <img
              src="@/assets/icons/social-media/linkedin-icon.svg"
              alt="LinkedIn"
            />
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="footer__copyright">
      <p>&copy; Copyright Rimel 2022. All rights reserved</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "DefaultFooter",

  data() {
    return {
      email: "",
    };
  },

  methods: {
    handleSubscribe() {
      if (this.email && this.isValidEmail(this.email)) {
        console.log("Subscribing email:", this.email);
        this.$emit("subscribe", this.email);
        this.email = "";
        // You can add a success message or API call here
      } else if (this.email) {
        console.log("Invalid email address");
        this.$emit("error", "Please enter a valid email address");
      }
    },

    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.footer {
  background-color: #000;
  color: $color-app-white;
  padding: 60px 0 0;
  margin-top: auto;

  &__container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 48px;
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__logo {
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 10px 0;
  }

  &__title {
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 8px 0;
  }

  &__subtitle {
    font-size: 16px;
    margin: 0;
  }
  &__subscribe {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__email {
    display: flex;
    align-items: center;
    border: 1px solid $color-app-white;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 8px;
    width: 217px;
    box-sizing: border-box;

    &__input {
      width: 60%;
      flex: 1;
      background: transparent;
      border: none;
      padding: 12px 16px;
      color: $color-app-white;
      font-size: 16px;
      outline: none;

      &::placeholder {
        color: $color-app-white;
        opacity: 0.4;
      }

      &:focus {
        border-color: $color-primary;
      }
    }

    &__btn {
      flex: 0 0 48px;
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  &__col-info {
    font-weight: 400;
    font-size: 16px;
    margin: 0;
  }

  &__links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      a {
        text-decoration: none;
        color: $color-app-white;
        font-size: 16px;
        transition: color 0.3s ease;

        &:hover {
          color: $color-primary;
        }
      }
    }
  }

  &__app-text {
    font-size: 12px;
    color: $color-app-white;
    margin: 0;
    opacity: 0.7;
  }

  &__app-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;

    img {
      cursor: pointer;
    }
  }

  &__social-media {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 20px;

    a {
      display: inline-block;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-2px);
      }
    }
  }

  &__copyright {
    text-align: center;
    padding: 24px 0;
    margin-top: 48px;
    border-top: 1px solid #222;

    p {
      font-size: 14px;
      color: #888;
      margin: 0;
    }
  }
}

@media (max-width: 1024px) {
  .footer {
    &__container {
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
    }
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0 0;

    &__container {
      grid-template-columns: repeat(2, 1fr);
      padding: 0 20px;
      gap: 32px;
    }
  }
}

@media (max-width: 480px) {
  .footer {
    &__container {
      grid-template-columns: 1fr;
      text-align: center;
    }

    &__column {
      align-items: center;
    }

    &__email {
      width: 100%;
      max-width: 280px;
    }

    &__links {
      align-items: center;
    }
  }
}
</style>
