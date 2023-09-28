<script setup lang="ts">
interface FormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  codepostal: string
  andress: string
  produitId: string
}

import { useLocataireStore } from '@/stores/locataires'
import { ref, type Ref } from 'vue'
import { RouterLink } from 'vue-router'

const call = useLocataireStore()
const isModalVisible: Ref<boolean> = ref(false)

const show = ref(true)
const form: Ref<FormData> = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  codepostal: '',
  andress: '',
  produitId: ''
})

const showModal = (produitId: string) => {
  console.log('produitId', produitId)
  isModalVisible.value = true
  form.value.produitId = produitId
}

const onCloseDialog = () => {
  isModalVisible.value = false
}

const onSubmit = (event: { preventDefault: () => void }) => {
  event.preventDefault()
  call?.createLocataire(form)
  onCloseDialog()
}

const onReset = (event: { preventDefault: () => void }) => {
  event.preventDefault()
  form.value.email = ''
  form.value.firstName = ''
  form.value.lastName = ''
  form.value.email = ''
}
</script>

<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-card
            title=" Produit 1"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text> Type: Non memblé </b-card-text>

            <b-button @click="showModal('1')" variant="primary">Ajouter un locataire</b-button>

            <p>
              <RouterLink to="/1">Locataires</RouterLink>
            </p>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            title=" Produit 2"
            img-src="https://picsum.photos/1024/480/?image=52"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>Type: memblé </b-card-text>

            <b-button @click="showModal('2')" variant="primary">Ajouter un locataire</b-button>

            <p>
              <RouterLink to="/2">Locataires</RouterLink>
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      id="modal-1"
      title="Information du locataire"
      v-model="isModalVisible"
      @cancel="onCloseDialog"
      @ok="onSubmit"
    >
      <b-container fluid>
        <div>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group class="mt-2" id="input-group-2" label="Nom:" label-for="input-2">
              <b-form-input
                class="mt-1"
                id="input-2"
                v-model="form.lastName"
                placeholder="Nom"
                required
                min="2"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mt-2" id="input-group-2" label="Prénom:" label-for="input-2">
              <b-form-input
                class="mt-1"
                id="input-2"
                v-model="form.firstName"
                placeholder="Prénom"
                required
                min="2"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mt-2" id="input-group-1" label="Adresse Mail:" label-for="input-1">
              <b-form-input
                class="mt-1"
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter votre mail"
                required
                min="2"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mt-2" id="input-group-1" label="Code postal:" label-for="input-1">
              <b-form-input
                class="mt-1"
                id="input-1"
                v-model="form.codepostal"
                type="number"
                placeholder="code postal"
                required
                min="2"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mt-2" id="input-group-1" label="Adress:" label-for="input-1">
              <b-form-input
                id="input-1"
                class="mt-1"
                v-model="form.andress"
                type="text"
                placeholder="Adresse"
                required
                min="2"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              class="mt-2"
              id="input-group-1"
              label="Numero de téléphone:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                class="mt-1"
                v-model="form.phoneNumber"
                type="tel"
                placeholder="Numero de téléphone"
                required
                min="2"
              ></b-form-input>
            </b-form-group>
          </b-form>
        </div>
      </b-container>
    </b-modal>
  </div>
</template>
