import { ref } from 'vue'
import { gql } from '@apollo/client/core'
import { apolloClient } from '@/services/apolloClient.ts'

interface Category {
  name: string
}

interface Product {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  category: Category
}

interface ProductsData {
  products: Product[]
}

export function useProducts() {
  const products = ref<Product[]>([])
  const productsLoading = ref(false)

  const PRODUCTS_QUERY = gql`
    query {
      products {
        id
        title
        price
        description
        images
        category {
          name
        }
      }
    }
  `

  async function getProducts(): Promise<void> {
    productsLoading.value = true

    try {
      const result: ApolloQueryResult<ProductsData> = await apolloClient.query({
        query: PRODUCTS_QUERY,
      })

      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors.map(e => e.message).join(', '))
      }

      if (result.data && result.data.products) {
        products.value = result.data.products
      }
    } catch (error) {
      alert('Данные по товарам не получены')
      console.error(error)
    } finally {
      productsLoading.value = false
    }
    productsLoading.value = false
  }

  getProducts()

  return { products, productsLoading }
}