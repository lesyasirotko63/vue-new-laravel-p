<template>
    <v-card class="mt-6 py-3">
       <form @submit.prevent="submitHandler">
         <div class="px-8">
           <v-row>
           <v-col cols="12">
               <h4 class="page-title">Edit Categories</h4>
           </v-col>

           <v-col cols="3" class="d-flex align-center">
               <p class="fs-normal greyBold--text mb-0">Title</p>
           </v-col>
           <v-col cols="9">
               <v-text-field
                 label="Title"
                 v-model="title"
               ></v-text-field>
           </v-col>

              <v-col cols="12 mt-5">
                <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                >
                    Save
                </v-btn>

                <v-btn @click="formatData" class="ml-2">
                    Reset
                </v-btn>

                <router-link :to="cancelUrl" class="text-decoration-none">
<v-btn
        type="button"
        class="ml-2"
>
    Cancel
</v-btn>
</router-link>
              </v-col>
            </v-row>
         </div>
      </form>
    </v-card>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import dataFormatter from '@/use/dataFormatter.js'
import ImageUploader from '@/components/Uploaders/ImageUploader'
import FileUploader from '@/components/Uploaders/FileUploader'

export default {
    data () {
      return {

        title: '',

    }
  },
  computed: {
    ...mapState({
        data: state => state.categoriesForm.data,
        loading: state => state.categoriesForm.loading,

    }),

    cancelUrl() {
        return '/' + this.$route.fullPath
            .split('/')
            .slice(1)
            .splice(0, 2)
            .join('/')
    },
    dataFormatter() {
        return dataFormatter
    }
   },
    methods: {
    ...mapMutations({
        showSnackbar: 'snackbar/showSnackbar',
    }),
    ...mapActions({
        getData: 'categoriesForm/getData',

        edit: 'categoriesForm/edit'
    }),
    async submitHandler() {
        const data = this.data

        data.title = this.title

        try {
            await this.edit({id: this.id, data})
            this.$router.push('/admin/categories')
         } catch (e) {
            this.showSnackbar(e)
        }
    },

        formatData() {

            this.title = this.data.title

        }
     },
    async beforeMount() {
        try {

            const pathArray = this.$route.fullPath.split('/')
            const id = pathArray[pathArray.length - 2]
            this.id = id
            await this.getData(id)

            this.formatData()
        } catch (e) {
            this.showSnackbar(e)
        }
    },
    watch: {

    },
    components: {ImageUploader, FileUploader, VDatetimePicker: () => import('vuetify-datetime-picker/src/components/DatetimePicker.vue')}
}
</script>

