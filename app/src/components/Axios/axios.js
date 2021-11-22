import axios from 'axios'

const mainAxios = axios.create({
    baseURL: 'https://hr-portal-api-v2.herokuapp.com'
   /* baseURL: 'http://hr01.pob.portofbaku.com:8080/hrportal'*/
});

/*
mainAxios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
        }

        if (error.response.status === 406) {
            mainAxios({
                method: 'post',
                url: '/auth/refresh',
                data: {
                    token : localStorage.getItem('token')
                }
            }).then((res) => {
                console.log(res.data.data)
                localStorage.setItem('token', res.data.data);
                })
        }

        return Promise.reject(error);

    }
)
*/

export {
    mainAxios,
    axios
}

