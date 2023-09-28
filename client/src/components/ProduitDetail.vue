<script setup lang="ts">
import { useLocataireStore } from '@/stores/locataires'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { ref, type Ref } from 'vue'

const call = useLocataireStore()
const route = useRoute()
onMounted(() => {
  const id = route.params?.id

  if (id) call.fetchlocataire(id as string)
})

interface IFacture {
  currency: string
  dueDate: string
  locataireId: string
}

const isModalFactureVisible: Ref<boolean> = ref(false)
const isDetailFactureOpen: Ref<boolean> = ref(false)

let search: Ref<string> = ref('')

const formFact: Ref<IFacture> = ref({
  currency: '',
  dueDate: '',
  locataireId: ''
})

const showModalFacture = (locataireId: string) => {
  console.log('produitId', locataireId)
  isModalFactureVisible.value = true
  formFact.value.locataireId = locataireId
}

const onOpenDetailFacture = (locataireId: string) => {
  isDetailFactureOpen.value = true
  call.fetchFactureDetail(locataireId)
}

const onSearch = () => {
  search.value = '' as any
}

const onCloseDialogFacture = () => {
  isModalFactureVisible.value = false
  isDetailFactureOpen.value = false
}

const onCreateFacture = (event: { preventDefault: () => void }) => {
  event.preventDefault()
  call.createFacture(formFact)
  onCloseDialogFacture()
}
</script>

<template>
  <b-container class="bv-example-row">
    <b-row cols="1" cols-sm="3" cols-md="3" cols-lg="3">
      <b-col>
        <a role="button" @click="$router.go(-1)">Retour</a>
      </b-col>
      <b-col>
        <b-form-input
          v-model="search"
          size="sm"
          class="mr-sm-2"
          placeholder="Search a locataire"
        ></b-form-input>
      </b-col>
      <b-col>
        <b-button @click="onSearch" size="sm" class="my-2 my-sm-0">Reset</b-button>
      </b-col>
    </b-row>
  </b-container>
  <ListItem
    v-for="item in call?.$state.locataires.filter((item) =>
      item.firstName.toLocaleUpperCase().includes(search.toLocaleUpperCase())
    )"
  >
    <b-list-group>
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        <b-container class="bv-example-row">
          <b-row cols="1" cols-sm="3" cols-md="3" cols-lg="3">
            <b-col> {{ item.firstName }} {{ item.lastName }} {{ item.andress }} </b-col>
            <b-col>
              <b-badge variant="secondary" @click="showModalFacture(item?._id as string)" pill
                ><b-button>Ajouter un demande de paiement </b-button></b-badge
              >
            </b-col>
            <b-col>
              <!-- <b-badge variant="secondary" @click="onOpenDetailFacture(item?._id as string)" pill
                ><b-button>voir la facture</b-button></b-badge
              > -->
              <div v-if="!item?.factures?.length">Pas de demande de paiement</div>

              <div v-if="item?.factures?.length">
                <b-card>
                  <div>Loyé: {{ item?.factures[0].currency }} Euro</div>
                  <template #header>
                    <h6 class="mb-0">Demande de paiement</h6>
                  </template>
                  <b-card-text>Date: {{ item?.factures[0].dueDate }}</b-card-text>

                  <template #footer>
                    <em>ref:1</em>
                  </template>
                </b-card>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
    </b-list-group>
  </ListItem>

  <b-modal
    id="modal-1"
    title="Ajouter une demande de paiement"
    v-model="isModalFactureVisible"
    @cancel="onCloseDialogFacture"
    @ok="onCreateFacture"
  >
    <b-container fluid>
      <div>
        <b-form @submit="onCreateFacture">
          <b-form-group class="mt-2" id="input-group-2" label="Montant:" label-for="input-2">
            <b-form-input
              class="mt-1"
              id="input-2"
              type="number"
              v-model="formFact.currency"
              placeholder="Montant"
              required
              min="2"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="mt-2"
            id="input-group-2"
            label="période de paiement:"
            label-for="input-2"
          >
            <b-form-input
              class="mt-1"
              id="input-2"
              type="date"
              v-model="formFact.dueDate"
              placeholder="période de paiement"
              required
              min="2"
            ></b-form-input>
          </b-form-group>
        </b-form>
      </div>
    </b-container>
  </b-modal>

  <b-modal
    id="modal-1"
    title="Information de paiement"
    v-model="isDetailFactureOpen"
    @cancel="onCloseDialogFacture"
    @ok="onCloseDialogFacture"
  >
    <b-container fluid>
      <div>{{ call?.$state?.facture?.dueDate }}</div>
    </b-container>
  </b-modal>
</template>
