import { ApiGetCategoryList } from '@/api/category'

const state = {
  category: []
}

const mutations = {
  SET_CATEGORY: (state, category) => {
    state.category = category
  }
}

const actions = {
  getCategory({ commit, state }) {
    return new Promise((resolve, reject) => {
      ApiGetCategoryList().then(res => {
        const { data } = res
        commit('SET_CATEGORY', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
