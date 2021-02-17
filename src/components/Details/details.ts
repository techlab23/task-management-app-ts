import { ref, SetupContext } from "vue";

export default function details(context: SetupContext) {
  const detailsRef = ref<HTMLElement>();
  const open = () => detailsRef.value?.setAttribute('open', '');
  const close = () => detailsRef.value?.removeAttribute('open');
  const popupToggled = () => {
    const isOpen =
      detailsRef.value?.getAttribute('open') !== null ? true : false;
      context.emit('popup-toggled', isOpen);
  };

  return {
    open,
    close,
    detailsRef,
    popupToggled
  }
}