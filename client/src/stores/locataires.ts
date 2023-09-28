// @ts-check
import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { type Ref } from 'vue'
import { API_URL } from '../config'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  codepostal: string
  andress: string
  produitId: string
  _id?: string
  factures?: IFacture[]
}

interface IFacture {
  currency: string
  dueDate: string
  _id?: string
}

export const useLocataireStore = defineStore({
  id: 'locataires',
  state: (): { locataires: FormData[]; facture: IFacture | Record<string, any> } => ({
    locataires: [],
    facture: {}
  }),

  actions: {
    async fetchlocataire(id: string) {
      try {
        const data = await axios.get(`${API_URL}/product/${id}`)
        this.locataires = data?.data?.data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },

    async fetchFactureDetail(locataireId: string) {
      try {
        const data = await axios.get(`${API_URL}/facture/${locataireId}`)
        this.facture = data?.data?.data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },

    async createLocataire(form: Ref<FormData>) {
      try {
        const data = await axios({
          method: 'post',
          url: `${API_URL}/locataire/create`,
          headers: {},
          data: {
            ...form.value
          }
        })
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },

    async createFacture(form: Ref<IFacture>) {
      try {
        const data = await axios({
          method: 'post',
          url: `${API_URL}/facture/create`,
          headers: {},
          data: {
            ...form.value
          }
        })

        this.locataires = this.locataires.map((item) => {
          return {
            ...item,
            factures: [...item?.factures!, data?.data?.data]
          }
        })
        console.log(data)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },

    onSearchLocataire(filter: string) {
      // this.locataires = this.locataires.filter((item) =>
      //   item.firstName.toLocaleLowerCase().includes(filter.toLocaleUpperCase())
      // )
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocataireStore, import.meta.hot))
}
