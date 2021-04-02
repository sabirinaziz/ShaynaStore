<template>
    <div class="shopping">
        <HeaderShayna />
        <!-- Breadcrumb Section Begin -->
        <div class="breacrumb-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb-text product-more text-left">
                            <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
                            <span>Shopping Cart</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Section Begin -->
        <!-- Shopping Cart Section Begin -->
        <section class="shopping-cart spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="cart-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th class="p-name text-center">Product Name</th>
                                                <th>Price</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="cartUser.length > 0">
                                            <tr v-for="cart in cartUser" :key="cart.id">
                                                <td class="cart-pic first-row">
                                                    <img :src="cart.photo" />
                                                </td>
                                                <td class="cart-title first-row text-center">
                                                    <h5>{{cart.name}}</h5>
                                                </td>
                                                <td class="p-price first-row">${{cart.price}}</td>
                                                <td @click="removeItem(cartUser.index)" class="delete-item"><a href="#"><i class="material-icons">
                                                close
                                                </i></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-lg-8 text-left">
                                <h4 class="mb-4">
                                    Informasi Pembeli:
                                </h4>
                                <div class="user-checkout">
                                    <form>
                                        <div class="form-group">
                                            <label for="namaLengkap">Nama lengkap</label>
                                            <input 
                                            type="text" 
                                            class="form-control" 
                                            id="namaLengkap" 
                                            aria-describedby="namaHelp" 
                                            placeholder="Masukan Nama"
                                            v-model="customerInfo.name"
                                            >
                                        </div>
                                        <div class="form-group">
                                            <label for="namaLengkap">Email Address</label>
                                            <input type="email" class="form-control" id="emailAddress" aria-describedby="emailHelp" placeholder="Masukan Email"  v-model="customerInfo.email">
                                        </div>
                                        <div class="form-group">
                                            <label for="namaLengkap">No. HP</label>
                                            <input type="text" class="form-control" id="noHP" aria-describedby="noHPHelp" placeholder="Masukan No. HP"  v-model="customerInfo.number">
                                        </div>
                                        <div class="form-group">
                                            <label for="alamatLengkap">Alamat Lengkap</label>
                                            <textarea class="form-control" id="alamatLengkap" rows="3"  v-model="customerInfo.addres"></textarea>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="proceed-checkout">
                                    <ul class="text-left">
                                        <li class="subtotal">ID Transaction <span>#SH12000</span></li>
                                        <li class="subtotal mt-3">Subtotal <span>${{subTotal}}.00</span></li>
                                        <li class="subtotal mt-3">Pajak (10%) <span>${{addedTax}}</span></li>
                                        <li class="subtotal mt-3">Total Biaya <span>${{totalPrice}}</span></li>
                                        <li class="subtotal mt-3">Bank Transfer <span>Mandiri</span></li>
                                        <li class="subtotal mt-3">No. Rekening <span>2208 1996 1403</span></li>
                                        <li class="subtotal mt-3">Nama Penerima <span>Shayna</span></li>
                                    </ul>
                                    <a @click="checkout()" href="#" class="proceed-btn">I ALREADY PAID </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Shopping Cart Section End -->
    </div>
</template>
<script>
    import HeaderShayna from '@/components/HeaderShayna.vue';
    import axios from'axios';
     
    export default {
        name: 'ShoppingCart',
        components: {
            HeaderShayna
        },
        data() {
            return {
                cartUser: [],
                customerInfo: {
                    name: '',
                    email: '',
                    number: '',
                    addres: ''
                }
            };
        },
        methods: {
            removeItem(index) {
                this.cartUser.splice(index, 1);
                const parsed = JSON.stringify(this.cartUser);
                localStorage.setItem('cartUser', parsed);
            },

            checkout(){
                let productIds = this.cartUser.map(function(product){
                    return product.id;
                });

                let checkoutData = {
                    "name" : this.customerInfo.name,
                    "email" : this.customerInfo.email,
                    "number": this.customerInfo.number,
                    "addres" : this.customerInfo.addres,
                    "transaction_total" : this.totalPrice,
                    "transaction_status" : "PENDING",
                    "transaction_details" : productIds
                };

                axios
                    .post("http://127.0.0.1:8000/api/checkout", checkoutData)
                    .then(() =>  this.$router.push("success"))
                    
                    .catch(err => console.log(err));   
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
        },
        computed: {
            subTotal(){
                return this.cartUser.reduce(function(items, data){
                    return items + data.price;
                }, 0);
            },
            addedTax(){
                return (this.subTotal * 10) / 100;
            },
            totalPrice(){
                return this.subTotal + this.addedTax;
            }
        }
    };
</script>