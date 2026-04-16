<template>
  <div class="contact-container">
    <div class="contact-container__img">
      <img src="@/assets/images/contactView-img.svg" alt="Contact Us Banner" />
    </div>

    <div class="contact-container__whole-content">
      <div class="contact-container__content">
        <div class="contact-container__content__call-us">
          <div class="contact-container__content__call-us__header">
            <div class="contact-container__content__call-us__header__icon">
              <img src="@/assets/icons/phone-icon.svg" alt="Phone Icon" />
            </div>
            <h2 class="contact-container__content__call-us__header__title">
              Call Us
            </h2>
          </div>
          <div class="contact-container__content__call-us__details">
            <p class="contact-container__content__call-us__details__info">
              We are available 24/7, 7 days a week.
            </p>
            <p class="contact-container__content__call-us__details__info">
              Phone: +88061112222
            </p>
          </div>
        </div>

        <hr class="contact-container__divider" />

        <div class="contact-container__content__write-to-us">
          <div class="contact-container__content__write-to-us__header">
            <div class="contact-container__content__write-to-us__header__icon">
              <img src="@/assets/icons/mail-icon.svg" alt="Email Icon" />
            </div>
            <h2 class="contact-container__content__write-to-us__header__title">
              Write to Us
            </h2>
          </div>
          <div class="contact-container__content__write-to-us__details">
            <p class="contact-container__content__write-to-us__details__info">
              Fill out our form and we will contact you within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <form @submit.prevent="submitForm">
          <div class="contact-form__info">
            <div class="form-group">
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                placeholder="Your Email"
                aria-label="Email address"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                placeholder="Your Name"
                aria-label="Your name"
              />
            </div>
          </div>

          <div class="form-group">
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              placeholder="Your Message"
              aria-label="Your message"
            ></textarea>
          </div>

          <div class="form-actions">
            <BaseButton type="submit" variant="primary">
              Send Message
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  name: "ContactView",
  components: {
    BaseButton,
  },
  data() {
    return {
      form: {
        email: "",
        name: "",
        message: "",
      },
      isSubmitting: false,
    };
  },
  methods: {
    async submitForm() {
      if (this.isSubmitting) return;

      this.isSubmitting = true;

      try {
        console.log("Form submitted:", this.form);
        alert("Message sent successfully!");

        // Reset form
        this.resetForm();
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      this.form = {
        email: "",
        name: "",
        message: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>

.contact-container {
  display: flex;
  gap: 2rem;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;

  &__img {
    flex: 1;
    max-width: 700px;
    height: auto;
    position: relative;
    right: 10rem;
    min-width: 700px;
    img{
    border-radius: 4px;

    }
  }

  &__whole-content {
    flex: 1;
    min-width: 550px;
    background: #fff;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  &__content {
    max-width: 250px;

    &__call-us,
    &__write-to-us {
      &__header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
        color: #000;

        &__title {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
        }
      }

      &__details {
        font-size: 14px;
        font-weight: 400;

        &__info {
          margin-bottom: 8px;
        }
      }
    }
  }

  &__divider {
    margin: 30px 0;
  }
}

.contact-form {
  margin-top: 24px;

  &__info {
    display: flex;
    gap: 1rem;

    .form-group {
      flex: 1;
    }
  }

  .form-group {
    margin-bottom: 20px;
    width: 100%;

    input,
    textarea {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #e0e0e0;
      background-color: #f5f5f5;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      transition: all 0.2s;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: $color-primary;
        box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
        background-color: #fff;
      }

      &::placeholder {
        color: #aaa;
      }
    }

    textarea {
      resize: none;
      min-height: 200px;
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
  }
}

// Responsive Design
@media (max-width: 1400px) {
  .contact-container {
    flex-direction: column;
    &__img {
      right: 5rem;
      min-width: 500px;
      max-width: 100%;
      text-align: center;
    }

    &__whole-content {
      min-width: 450px;
    }
  }
}

@media (max-width: 1200px) {
  .contact-container {
    flex-direction: column;
    gap: 1rem;

    &__img {
      right: 2rem;
      min-width: 400px;
      max-width: 100%;
      text-align: center;
    }

    &__whole-content {
      min-width: 380px;
      padding: 30px;
    }
  }
}

@media (max-width: 992px) {
  .contact-container {
    gap: 1rem;
    padding: 30px 20px;

    &__img {
      right: 1rem;
      min-width: 350px;
      max-width: 450px;
    }

    &__whole-content {
      min-width: 350px;
      padding: 30px;
    }
  }
}

@media (max-width: 850px) {
  .contact-container {
    flex-direction: column;
    align-items: center;

    &__img {
      right: 0;
      min-width: auto;
      max-width: 100%;
      width: 100%;
    }

    &__whole-content {
      min-width: auto;
      width: 100%;
    }
  }

  .contact-form {
    &__info {
      flex-direction: column;
      gap: 0;
    }
  }
}

@media (max-width: 768px) {
  .contact-container {
    flex-direction: column;
    padding: 20px;

    &__img {
      right: 0;
      max-width: 100%;
      min-width: auto;
      text-align: center;
      img {
        right: 0;
        max-width: 100%;
        min-width: auto;
        text-align: center;
      }
    }

    &__whole-content {
      min-width: auto;
      padding: 24px;
    }
  }

  .contact-form {
    &__info {
      flex-direction: column;
      gap: 0;
    }
  }
}

@media (max-width: 480px) {
  .contact-container {
    padding: 15px;

    &__whole-content {
      padding: 20px;
    }
  }

  .contact-container__content {
    max-width: 100%;
  }

  .form-actions {
    .send-btn {
      width: 100%;
    }
  }
}
</style>
