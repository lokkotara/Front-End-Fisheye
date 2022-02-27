export default function exposeElement(key, value){
  window[key] = value;
}