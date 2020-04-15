const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  login: state => state.user.login,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  category: state => state.category.category
}
export default getters
