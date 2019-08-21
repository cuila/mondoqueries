const { RESTDataSource } = require("apollo-datasource-rest");

class DogFood extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://dogfood.jinmayamashita.now.sh/api";
  }

  async getName() {
    const name = await this.get("/name");

    return name;
  }
}

module.exports = DogFood;