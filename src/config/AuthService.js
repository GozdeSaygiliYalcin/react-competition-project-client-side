import RestApis from './RestApis';
const AuthService={
    register: RestApis.authservice +'/auth/register',
    login: RestApis.authservice +'/auth/dologin',
}
export default AuthService;