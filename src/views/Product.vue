<template>
  <div class="product">
    <HeaderShayna />
    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section text-left">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text product-more">
                        <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
                        <span>Detail</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="product-pic-zoom">
                                <img class="product-big-img" :src="gambar_default" alt="" />
                            </div>
                            <div class="product-thumbs" v-if="productDetails.galleries.length > 0">
                                <carousel class="product-thumbs-track ps-slider" :dots="false" :nav="false">
                                    <div v-for="imgProducts in productDetails.galleries" :key="imgProducts.id" class="pt" @click="changeImage(imgProducts.photo)" :class="imgProducts.photo==gambar_default ? 'active': '' ">
                                        <img :src="imgProducts.photo" alt="" />
                                    </div>
                                </carousel>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="product-details text-left">
                                <div class="pd-title">
                                    <span>{{ productDetails.type }}</span>
                                    <h3>{{ productDetails.name }}</h3>
                                </div>
                                <div class="pd-desc">
                                    <p v-html="productDetails.description"></p>
                                    <p>
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam possimus quisquam animi, commodi, nihil voluptate nostrum neque architecto illo officiis doloremque et corrupti cupiditate voluptatibus error illum. Commodi expedita animi nulla aspernatur.
                                        Id asperiores blanditiis, omnis repudiandae iste inventore cum, quam sint molestiae accusamus voluptates ex tempora illum sit perspiciatis. Nostrum dolor tenetur amet, illo natus magni veniam quia sit nihil dolores.
                                        Commodi ratione distinctio harum voluptatum velit facilis voluptas animi non laudantium, id dolorem atque perferendis enim ducimus? A exercitationem recusandae aliquam quod. Itaque inventore obcaecati, unde quam
                                        impedit praesentium veritatis quis beatae ea atque perferendis voluptates velit architecto?
                                    </p>
                                    <h4>${{productDetails.price}}</h4>
                                </div>
                                <div class="quantity">
                                    <router-link to="/shopping-cart">
                                        <a @click="saveCart(productDetails.id, productDetails.name, productDetails.price, productDetails.galleries[0].photo)" href="#" class="primary-btn pd-cart">Add To Cart</a>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Product Shop Section End -->
    <RelatedProductShayna />
    <FooterShayna />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import HeaderShayna from '@/components/HeaderShayna.vue';
import FooterShayna from '@/components/FooterShayna.vue';
import RelatedProductShayna from '@/components/RelatedProductShayna.vue';

import carousel from'vue-owl-carousel';
import axios from'axios';

export default {
  name: 'product',
  components: {
    HeaderShayna,
    FooterShayna,
    carousel,
    RelatedProductShayna
    //HelloWorld
  },
  data() {
    return {
      gambar_default:"",
      productDetails: [],
      cartUser: []
    };
  },
  methods: {
    changeImage(urlImage) {
      this.gambar_default = urlImage;
    },
    setDataPicture(data) {
        // replace object productDetails dengan data dari API
        this.productDetails = data;
        // replace value gambar
        this.gambar_default = data.galleries[0].photo;
    },
    saveCart(idProduct,nameProduct,priceProduct, photoProduct) {

        var productStore = {
            "id": idProduct,
            "name":nameProduct,
            "price": priceProduct,
            "photo": photoProduct
        }
        this.cartUser.push(productStore);
        
        const parsed = JSON.stringify(this.cartUser);
        localStorage.setItem('cartUser', parsed);
    }
  },
  mounted() {
        if (localStorage.getItem('cartUser')) {
            try {
                this.cartUser = JSON.parse(localStorage.getItem('cartUser'));
            } catch(e) {
                localStorage.removeItem('cartUser');
            }
        }
        axios
            .get("http://127.0.0.1:8000/api/products", {
                params: {
                    id: this.$route.params.id
                }
            })
            .then(res=>(this.setDataPicture(res.data.data)))
            
            .catch(err => console.log(err));   
    }
}
</script>

<style scoped>
  .product-thumbs .pt {
    margin-right: 12px;
  }
</style>