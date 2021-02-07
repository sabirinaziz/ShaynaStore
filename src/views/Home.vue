<template>
  <div class="home">
    <HeaderShayna />
    <HeroShayna />
    <WomanBannerShayna />
    <InstagramShayna />
    <PartnerShayna />
    <FooterShayna />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import HeaderShayna from '@/components/HeaderShayna.vue';
import HeroShayna from '@/components/HeroShayna.vue';
import WomanBannerShayna from '@/components/WomanBannerShayna.vue';
import InstagramShayna from '@/components/InstagramShayna.vue';
import PartnerShayna from '@/components/PartnerShayna.vue';
import FooterShayna from '@/components/FooterShayna.vue';

export default {
  name: 'Home',
  components: {
    HeaderShayna,
    HeroShayna,
    WomanBannerShayna,
    InstagramShayna,
    PartnerShayna,
    FooterShayna
    //HelloWorld
  }
}
</script>
