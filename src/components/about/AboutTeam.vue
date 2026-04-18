<template>
  <div class="about-team">
    <div class="about-team__grid">
      <div 
        v-for="(member, index) in members" 
        :key="index"
        class="about-team__card"
      >
        <div class="about-team__image">
          <img :src="member.image" :alt="member.name" />
        </div>
        <h3 class="about-team__name">{{ member.name }}</h3>
        <p class="about-team__position">{{ member.position }}</p>
        <div class="about-team__social">
          <a 
            v-if="member.socialLinks?.twitter" 
            :href="member.socialLinks.twitter"
            class="about-team__social-link"
            target="_blank"
          >
            <img src="@/assets/icons/social-media/twitter-icon.svg" alt="Twitter" />
          </a>
          <a 
            v-if="member.socialLinks?.instagram" 
            :href="member.socialLinks.instagram"
            class="about-team__social-link"
            target="_blank"
          >
            <img src="@/assets/icons/social-media/instagram-icon.svg" alt="Instagram" />
          </a>
           <a 
            v-if="member.socialLinks?.linkedin" 
            :href="member.socialLinks.linkedin"
            class="about-team__social-link"
            target="_blank"
          >
            <img src="@/assets/icons/social-media/linkedin-icon.svg" alt="Linkedin" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { TeamMember } from "@/types/about";

export default {
  name: "AboutTeam",
  props: {
    members: {
      type: Array as PropType<TeamMember[]>,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.about-team {
  margin-bottom: 80px;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  &__card {

    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }

  &__image {
    width: 370px;
    height: 430px;
    margin: 0 auto 20px;
    border-radius: 8px;
    overflow: hidden;
    background: #f5f5f5;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__name {
    font-size: 32px;
    font-weight: 500;
    margin: 0 0 8px 0;
    color: #000;
  }

  &__position {
    font-size: 16px;
    font-weight: 400;
    color: #000;
    margin: 0 0 12px 0;
  }

  &__social {
    display: flex;
    gap: 16px;
  }

  &__social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 900px) {
    &__grid {
      grid-template-columns: repeat(2, 1fr);
    }

    &__image {
      width: 100%;
      max-width: 270px;
    }
  }

  @media (max-width: 600px) {
    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>