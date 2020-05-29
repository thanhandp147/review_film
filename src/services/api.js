import fetchApi from "./config";

const METHOD = {
    POST: 'post',
    GET: 'get',
    PUT: 'put',
    DELETE: 'delete',
};

export const login = (data) => () => {
    let { username, password } = data
    console.log({ username, password })
    return fetchApi(`/users/login/`, {username, password }, METHOD.POST)
}
