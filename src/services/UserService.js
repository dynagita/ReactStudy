import Api from './Api';

export const get = async email =>{
    var url = `user?email=${email}`;
    return await Api.get(url);
};

export const post = async data =>{
    var url = 'user';
    return await Api.post(url, data);
};

export const put = async data =>{
    var url = 'user';
    return await Api.put(url, data);
};

export const changePassword = async data =>{
    var url = 'user/changePassword';
    return await Api.post(url, data);
}