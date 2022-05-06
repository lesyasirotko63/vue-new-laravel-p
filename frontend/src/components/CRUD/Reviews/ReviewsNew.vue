<template>
  <v-card class="mt-6 py-3">
    <form @submit.prevent="submitHandler">
      <div class="px-8">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">New Reviews</h4>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Body</p>
          </v-col>
          <v-col cols="9">
            <v-textarea label="Body" v-model="body"></v-textarea>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Rating</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              type="number"
              label="Rating"
              v-model.number="rating"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Product</p>
          </v-col>
          <v-col cols="9">
            <v-autocomplete
              v-model="product"
              :items="optionsProduct.map((item) => item.label)"
              :search-input.sync="searchModelProduct"
              label="Product"
            >
            </v-autocomplete>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">User</p>
          </v-col>
          <v-col cols="9">
            <v-autocomplete
              v-model="user"
              :items="optionsUser.map((item) => item.label)"
              :search-input.sync="searchModelUser"
              label="User"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary" :loading="loading"> Save </v-btn>

        <v-btn @click="resetData" class="ml-2"> Reset </v-btn>

        <router-link :to="cancelUrl" class="text-decoration-none">
          <v-btn type="button" class="ml-2"> Cancel </v-btn>
        </router-link>
      </div>
    </form>
  </v-card>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import dataFormatter from '@/use/dataFormatter.js';
  import ImageUploader from '@/components/Uploaders/ImageUploader';
  import FileUploader from '@/components/Uploaders/FileUploader';

  export default {
    data() {
      return {
        id: null,

        body: '',

        rating: 0,

        product: '',
        searchModelProduct: '',

        user: '',
        searchModelUser: '',
      };
    },
    computed: {
      ...mapState({
        data: (state) => state.reviewsForm.data,
        loading: (state) => state.reviewsForm.loading,

        optionsProduct: (state) => state.reviewsForm.searchResultProduct,

        optionsUser: (state) => state.reviewsForm.searchResultUser,
      }),

      cancelUrl() {
        return (
          '/' + this.$route.fullPath.split('/').slice(1).splice(0, 2).join('/')
        );
      },
      dataFormatter() {
        return dataFormatter;
      },
    },
    methods: {
      ...mapMutations({
        showSnackbar: 'snackbar/showSnackbar',
      }),
      ...mapActions({
        searchProduct: 'reviewsForm/searchProduct',

        searchUser: 'reviewsForm/searchUser',

        newHandler: 'reviewsForm/newHandler',
      }),
      async submitHandler() {
        const data = {
          body: this.body,

          rating: this.rating,

          product: this.product,

          user: this.user,
        };

        const productEl = this.optionsProduct.filter(
          (i) => i.label === this.product,
        );
        data.product = productEl.length ? productEl[0].id : null;

        const userEl = this.optionsUser.filter((i) => i.label === this.user);
        data.user = userEl.length ? userEl[0].id : null;

        try {
          await this.newHandler({ data });
          this.$router.push('/admin/reviews');
        } catch (e) {
          console.log(e);
          this.showSnackbar(e);
        }
      },

      resetData() {
        this.body = '';

        this.rating = 0;

        this.product = '';

        this.user = '';
      },
    },
    async beforeMount() {
      await this.searchProduct();

      await this.searchUser();
    },
    watch: {
      async searchModelProduct() {
        await this.searchProduct(this.searchModelProduct);
      },

      async searchModelUser() {
        await this.searchUser(this.searchModelUser);
      },
    },
    components: {
      ImageUploader,
      FileUploader,
      VDatetimePicker: () =>
        import('vuetify-datetime-picker/src/components/DatetimePicker.vue'),
    },
  };
</script>
