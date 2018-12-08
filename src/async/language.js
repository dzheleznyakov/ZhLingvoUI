export const loadLanguagesFromServer = () => {
  const languages = [
    { code: 'En', name: 'English' }, 
    { code: 'Es', name: 'Español' }, 
    { code: 'Ru', name: 'Русский' },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(languages);
    }, 200);
  });
};