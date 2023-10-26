const endPoints = {
  inventory: {
    add: {
      method: "POST",
      url: "/",
    },
    getAllWithSearch: {
      method: "GET",
      url: "/",
    },
    getByID: {
      method: "Get",
      uri: "/:id",
    },
    update: {
      method: "PUT",
      url: "/",
    },
  },
};

export default endPoints;
