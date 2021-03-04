import Api from './Api';

export const list = async email =>{
    var url = `company`;
    return await Api.get(url);
};

export const get = async companyRegister =>{
    var url = `company?register=${companyRegister}`;
    return await Api.get(url);
};

export const post = async data =>{
    var url = 'company';
    return await Api.post(url, data);
};

export const put = async data =>{
    var url = 'company';
    return await Api.put(url, data);
};