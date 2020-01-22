export const server = {
  fetch: async () => {
    const res = await fetch('/projects', {
      method: 'GET'
    });

    return res.json();
  }
};
