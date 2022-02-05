function exposeElement(key, value){
  window[key] = value;
}

export {
  exposeElement
};