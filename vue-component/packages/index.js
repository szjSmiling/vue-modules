
const requireContext = require.context('./components', true, /\.vue$/);
const install = Vue => {
  requireContext.keys().forEach(key => {
    console.log(requireContext(key));
    const module = requireContext(key);
    const component = module.default || module;
    Vue.component(component.name, component);
  })
}

if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}