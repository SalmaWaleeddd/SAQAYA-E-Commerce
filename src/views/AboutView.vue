<template>
  <div class="about-page">
    <div class="about-page__container">
      <!-- Hero Section -->
      <AboutHero />

      <!-- Statistics Section -->
      <div class="about-page__stats">
        <TrustBadge
          v-for="(stat, index) in statsBadges"
          :key="index"
          :badge="stat"
          :has-border="true"
        />
      </div>

      <!-- Team Section -->
      <AboutTeam :members="teamMembers" />

      <!-- Trust Badges Section -->
      <div class="about-page__trust-badges">
        <TrustBadge
          v-for="(badge, index) in trustBadges"
          :key="index"
          :badge="badge"
          :has-border="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { STATS_BADGES, TRUST_BADGES } from "@/constants/trustBadges";
import { TEAM_MEMBERS } from "@/constants/about";
import AboutHero from "@/components/about/AboutHero.vue";
import AboutTeam from "@/components/about/AboutTeam.vue";
import TrustBadge from "@/components/common/TrustBadge.vue";

export default {
  name: "AboutView",
  components: {
    AboutHero,
    AboutTeam,
    TrustBadge,
  },
  data() {
    return {
      statsBadges: STATS_BADGES,
      trustBadges: TRUST_BADGES,
      teamMembers: TEAM_MEMBERS,
    };
  },
};
</script>

<style lang="scss" scoped>
.about-page {
  padding: 40px 0 80px;
  background: #fff;
  min-height: 100vh;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin: 60px 0;
    padding: 40px 0;
  }

  &__trust-badges {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 60px;
    padding-top: 40px;
  }

  @media (max-width: 1024px) {
    &__stats {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 0 60px;

    &__stats {
      grid-template-columns: 1fr;
      gap: 20px;
      margin: 40px 0;
    }

    &__trust-badges {
      grid-template-columns: 1fr;
      gap: 20px;
      margin-top: 40px;
    }
  }
}
</style>
