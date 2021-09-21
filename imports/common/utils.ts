export const waitForMsTime = (time: number) => {
  while (Date.now() < time) {
    /* empty */
  }
};

export const clamp = (val: number, min: number, max: number) => {
  return Math.max(Math.min(val, max), min);
};

export const makeRandomId = (keyLength = 16) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < keyLength; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getRandomHexColor = () => {
  const characters = '0123456789abcdef';
  const charactersLength = characters.length;
  let result = '#';
  for (let i = 0; i < 6; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getComplementaryColor = (colorString: string) => {
  const colorCode = colorString.split('#')[1];
  const complementaryColor = 0xffffff - parseInt(colorCode, 16);
  return `#${complementaryColor.toString(16)}`;
};
