import profileReducer, {actions} from "./profile-reducer";

let initialState: any = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 1},
        {id: 2, message: "It`s my first post", likesCount: 5},
        {id: 3, message: "Third one", likesCount: 9},
    ],

}
test("length of posts should be incremented", () => {
    // 1. start test data
    let action: any = actions.addPostAC("example test")

    // 2. action
    let newState = profileReducer(initialState, action)
    //3. expectation
    expect(newState.posts.length).toBe(4)

});
test("message of new post should be example test", () => {
    // 1. start test data
    let action: any = actions.addPostAC("example test")

    // 2. action
    let newState = profileReducer(initialState, action)
    //3. expectation

    expect(newState.posts[3].message).toBe("example test")
});
test("after removing length of message should be decremented", () => {
    // 1. start test data
    let action: any = actions.deletePostAC(1)

    // 2. action
    let newState = profileReducer(initialState, action)
    //3. expectation

    expect(newState.posts.length).toBe(2)
});
