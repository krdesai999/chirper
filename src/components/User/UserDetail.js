
export class UserDetail {
  #authorizationToken;

  constructor(userName, authorizationToken, attributes) {
    this.userName = userName;
    this.#authorizationToken = authorizationToken;
    this.attributes = attributes;
  }

  getAuthorizationToken() {
    return this.#authorizationToken;
  }
}