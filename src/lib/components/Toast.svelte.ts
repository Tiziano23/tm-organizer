let activationTimeout: NodeJS.Timeout | null = null;
let visibilityTimeout: NodeJS.Timeout | null = null;

export const toast = $state({
  text: "",

  active: false,
  visible: false,
});

export function toastNotification(text: string, duration?: number) {
  toast.text = text;
  
  if (toast.active) {
    if (activationTimeout) clearTimeout(activationTimeout);
    if (visibilityTimeout) clearTimeout(visibilityTimeout);
  } else {
    toast.active = true;
    toast.visible = true;
  }

  let t = duration || 3000;
  visibilityTimeout = setTimeout(() => {
    toast.visible = false;
  }, t);
  activationTimeout = setTimeout(() => {
    toast.active = false;
  }, t + 1000);
}
