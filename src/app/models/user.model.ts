export class User {

  static fromFirebase({email, name, uid}: any): User {

    return new User(uid, email, name);
  }

  constructor(
    public uid: string,
    public email: string,
    public name: string,
  ) {
  }

}
