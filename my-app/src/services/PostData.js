export function PostData(type, userData) {
    let BaseURL = 'http://api-v1.traditionalme.life/api/auth/user/login';

    return new Promise((resolve, reject) => {


        fetch(BaseURL + type, {
                method: 'POST',
                body: JSON.stringify(userData)
            })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });


    });
}