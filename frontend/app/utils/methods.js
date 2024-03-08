export function getBase64(blob) {
  return new Promise(res => {
    const reader = new FileReader();
    reader.addEventListener('load', () => res(reader.result));
    reader.readAsDataURL(blob);
  });
}
